
import { NextResponse } from "next/server";
import { adminDb, adminAuth } from "../../lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export const runtime = "nodejs";

const RETURN_WINDOW_MS = 72 * 60 * 60 * 1000;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orderId = String(body.orderId || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const reason = String(body.reason || "").trim();
    const description = String(body.description || "").trim();

    if (!orderId || !reason) {
      return NextResponse.json(
        { error: "Order ID and return reason are required." },
        { status: 400 }
      );
    }

    if (orderId.length > 100 || reason.length > 100 || description.length > 2000) {
      return NextResponse.json(
        { error: "Some submitted information is too long." },
        { status: 400 }
      );
    }

    // Find the order using its public Order ID
    const orderSnapshot = await adminDb
      .collection("orders")
      .where("orderId", "==", orderId)
      .limit(1)
      .get();

    if (orderSnapshot.empty) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    const orderDoc = orderSnapshot.docs[0];
    const order = orderDoc.data();

    // Verify customer ownership
    const isGuestOrder =
      order.isGuestOrder === true ||
      order.checkoutType === "guest";

    if (isGuestOrder) {
      const orderEmail = String(order.email || "")
        .trim()
        .toLowerCase();

      if (!email || !orderEmail || email !== orderEmail) {
        return NextResponse.json(
          { error: "Order ID and matching email are required." },
          { status: 403 }
        );
      }
    } else {
      const authorization = req.headers.get("authorization");

      if (!authorization?.startsWith("Bearer ")) {
        return NextResponse.json(
          { error: "Please log in to submit your return request." },
          { status: 401 }
        );
      }

      try {
        const idToken = authorization.slice(7);
        const decodedToken = await adminAuth.verifyIdToken(idToken);

        if (!order.userId || order.userId !== decodedToken.uid) {
          return NextResponse.json(
            { error: "You are not allowed to request a return for this order." },
            { status: 403 }
          );
        }
      } catch {
        return NextResponse.json(
          { error: "Your login session is invalid. Please log in again." },
          { status: 401 }
        );
      }
    }

    // Only delivered orders are eligible
    if (order.status !== "Delivered") {
      return NextResponse.json(
        { error: "A return can only be requested after delivery." },
        { status: 400 }
      );
    }

    // Verify actual delivery timestamp
    const deliveredAt = order.deliveredAt;

    if (!deliveredAt || typeof deliveredAt.toMillis !== "function") {
      return NextResponse.json(
        { error: "Delivery date is unavailable. Please contact Shazify support." },
        { status: 400 }
      );
    }

    const deadline = deliveredAt.toMillis() + RETURN_WINDOW_MS;

    if (Date.now() > deadline) {
      return NextResponse.json(
        { error: "The 3-day return request period has expired." },
        { status: 400 }
      );
    }

    // One return request per order
    const returnRequestRef = adminDb
      .collection("returnRequests")
      .doc(orderDoc.id);

    const existingRequest = await returnRequestRef.get();

    if (existingRequest.exists) {
      return NextResponse.json(
        { error: "A return request has already been submitted for this order." },
        { status: 409 }
      );
    }

    await returnRequestRef.create({
      orderDocId: orderDoc.id,
      orderId: order.orderId,
      customerEmail: order.email,
      customerName: order.fullName || "Customer",
      reason,
      description,
      status: "Pending",
      checkoutType: isGuestOrder ? "guest" : "account",
      userId: isGuestOrder ? null : order.userId,
      deliveredAt,
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your return request has been submitted successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("RETURN REQUEST API ERROR:", error);

    return NextResponse.json(
      { error: "Unable to submit your return request. Please try again." },
      { status: 500 }
    );
  }
}
