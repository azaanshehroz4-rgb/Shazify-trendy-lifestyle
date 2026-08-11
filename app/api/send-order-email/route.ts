import { NextResponse } from "next/server";
import { resend } from "../../lib/resend";

export async function POST(req: Request) {
  console.log("EMAIL API HIT");
  try {
    const body = await req.json();

    const { email, fullName, orderId, totalPrice } = body;

    const data = await resend.emails.send({
      
      from: "Shazify <onboarding@resend.dev>",
      to: email,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:30px;">
          <h1 style="color:#e91e63;">Thank you for your order!</h1>

          <p>Dear <strong>${fullName}</strong>,</p>

          <p>Your order has been received successfully.</p>

          <hr>

          <p><strong>Order ID:</strong> ${orderId}</p>

          <p><strong>Total:</strong> $${totalPrice}</p>

          <p>Status: Pending</p>

          <hr>

          <p>
            Thank you for shopping with
            <strong>Shazify</strong>.
          </p>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Email failed" },
      { status: 500 }
    );
  }
}