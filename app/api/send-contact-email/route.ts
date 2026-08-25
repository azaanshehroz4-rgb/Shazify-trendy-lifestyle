import { NextResponse } from "next/server";
import { resend } from "../../lib/resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Shazify <onboarding@resend.dev>",
      to:  "azaanshehroz4@gmail.com",
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:30px;">

          <h1 style="color:#e91e63;">
            New Contact Message
          </h1>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <hr>

          <p>
            <strong>Message:</strong>
          </p>

          <p>
            ${message}
          </p>

          <hr>

          <p>
            This message was sent from the
            <strong>Shazify Contact Form</strong>.
          </p>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("Contact email error:", error);

    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}