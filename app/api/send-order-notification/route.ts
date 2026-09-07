import { NextResponse } from "next/server";
import { getMessaging } from "firebase-admin/messaging";
import { adminDb, adminAuth } from "../../lib/firebaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  console.log("NOTIFICATION API HIT");

  try {
    const authorization = req.headers.get("authorization");
    const body = await req.json();

    const { orderId, email } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required." },
        { status: 400 }
      );
    }

    // Find order
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

    // Guest order requires matching email
    if (
      order.isGuestOrder === true ||
      order.checkoutType === "guest"
    ) {
      if (!email) {
        return NextResponse.json(
          { error: "Email is required for guest orders." },
          { status: 401 }
        );
      }

      const orderEmail = String(order.email || "")
        .trim()
        .toLowerCase();

      const providedEmail = String(email)
        .trim()
        .toLowerCase();

      if (!orderEmail || orderEmail !== providedEmail) {
        return NextResponse.json(
          { error: "You are not allowed to access this order." },
          { status: 403 }
        );
      }

      console.log("Guest order notification authorized:", orderId);
    } else {
      // Logged-in order requires Firebase ID token
      if (!authorization?.startsWith("Bearer ")) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }

      const idToken = authorization.split("Bearer ")[1];

      const decodedToken = await adminAuth.verifyIdToken(idToken);
      const userId = decodedToken.uid;

      // Make sure logged-in order belongs to user
      if (order.userId !== userId) {
        return NextResponse.json(
          { error: "You are not allowed to access this order." },
          { status: 403 }
        );
      }
    }

    // Get all admin notification tokens
    const tokenSnapshot = await adminDb
      .collection("adminNotificationTokens")
      .get();

    if (tokenSnapshot.empty) {
      return NextResponse.json({
        success: true,
        message: "No admin notification tokens found.",
      });
    }

    const tokens = tokenSnapshot.docs
      .map((doc) => doc.data().token)
      .filter(Boolean);

    if (tokens.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No valid admin notification tokens found.",
      });
    }

    const messaging = getMessaging();

    const response = await messaging.sendEachForMulticast({
      tokens,

      notification: {
        title: "🛍️ New Shazify Order!",
        body: `${order.fullName || "Customer"} placed order ${order.orderId}`,
      },

      data: {
        orderId: String(order.orderId),
        status: String(order.status || "Pending"),
      },

      webpush: {
        notification: {
          title: "🛍️ New Shazify Order!",
          body: `${order.fullName || "Customer"} placed order ${order.orderId}`,
          icon: "/favicon.ico",
        },
      },
    });

    console.log("FCM RESPONSE:", response);

    return NextResponse.json({
      success: true,
      sent: response.successCount,
      failed: response.failureCount,
    });
  } catch (error: any) {
    console.error("ORDER NOTIFICATION API ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message || "Notification failed",
        name: error?.name || "UnknownError",
      },
      { status: 500 }
    );
  }
}