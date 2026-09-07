import { NextResponse } from "next/server";
import { resend } from "../../lib/resend";
import { adminDb, adminAuth } from "../../lib/firebaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  console.log("EMAIL API HIT");

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

   

     /*
 * Guest order:
 * Order ID + matching email are required.
 */
const isGuestOrder =
  order.isGuestOrder === true ||
  order.checkoutType === "guest";

if (isGuestOrder) {
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

  console.log("Guest order email authorized:", orderId);
} else {
  /*
   * Account order:
   * Firebase ID token is required and ownership is verified.
   */
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const idToken = authorization.split("Bearer ")[1];

  const decodedToken = await adminAuth.verifyIdToken(idToken);

  const userId = decodedToken.uid;

  if (order.userId !== userId) {
    return NextResponse.json(
      { error: "You are not allowed to access this order." },
      { status: 403 }
    );
  }
}

    // Use Firestore data, NOT browser-supplied data
    const orderEmail = order.email;
    const fullName = order.fullName || "Customer";
    const totalPrice = order.totalPrice;
    const currency = order.currency || "PKR";

    if (!email) {
      return NextResponse.json(
        { error: "Order email is missing." },
        { status: 400 }
      );
    }

    let formattedTotal = "";

    switch (currency) {
      case "PKR":
        formattedTotal = `Rs. ${Math.round(
          Number(totalPrice)
        ).toLocaleString("en-PK")}`;
        break;

      case "EUR":
        formattedTotal = `€${Number(totalPrice).toFixed(2)}`;
        break;

      case "GBP":
        formattedTotal = `£${Number(totalPrice).toFixed(2)}`;
        break;

      case "USD":
      default:
        formattedTotal = `$${Number(totalPrice).toFixed(2)}`;
        break;
    }

    const data = await resend.emails.send({
      from: "Shazify <orders@shazify.shop>",
      to: orderEmail,
      replyTo: "shazifyofficial@gmail.com",
      subject: `Order Confirmation - ${order.orderId}`,

      html: `
        <div style="font-family:Arial,sans-serif;padding:30px;max-width:600px;margin:auto;">

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
            <strong>Total:</strong> ${formattedTotal}
          </p>

          <p>
            <strong>Status:</strong> ${order.status || "Pending"}
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