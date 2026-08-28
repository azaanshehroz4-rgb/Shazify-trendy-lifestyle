import { NextResponse } from "next/server";
import { resend } from "../../lib/resend";
import { adminDb, adminAuth } from "../../lib/firebaseAdmin";
export async function POST(req: Request) {
  console.log("EMAIL API HIT");

  try {
    // Get Firebase ID token from request
    const authorization = req.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const idToken = authorization.split("Bearer ")[1];

    // Verify Firebase user
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    const userId = decodedToken.uid;

    // Get only orderId from browser
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required." },
        { status: 400 }
      );
    }

    // Find order in Firestore
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

    // Make sure this order belongs to logged-in user
    if (order.userId !== userId) {
      return NextResponse.json(
        { error: "You are not allowed to access this order." },
        { status: 403 }
      );
    }

    // Use Firestore data, NOT browser-supplied data
    const email = order.email;
    const fullName = order.fullName;
    const totalPrice = order.totalPrice;

    if (!email) {
      return NextResponse.json(
        { error: "Order email is missing." },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Shazify <onboarding@resend.dev>",
      to: email,
      subject: `Order Confirmation - ${order.orderId}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:30px;">
          <h1 style="color:#e91e63;">
            Thank you for your order!
          </h1>

          <p>
            Dear <strong>${fullName}</strong>,
          </p>

          <p>
            Your order has been received successfully.
          </p>

          <hr>

          <p>
            <strong>Order ID:</strong> ${order.orderId}
          </p>

          <p>
            <strong>Total:</strong> $${totalPrice}
          </p>

          <p>
            <strong>Status:</strong> ${order.status}
          </p>

          <hr>

          <p>
            Thank you for shopping with
            <strong>Shazify</strong>.
          </p>
        </div>
      `,
    });

    console.log("RESEND RESPONSE:", data);

    return NextResponse.json({
      success: true,
      data,
    });

   } catch (error: any) {
  console.error("ORDER EMAIL API ERROR:", error);

  return NextResponse.json(
    {
      error: error?.message || "Email failed",
      name: error?.name || "UnknownError",
    },
    { status: 500 }
  );
}
}