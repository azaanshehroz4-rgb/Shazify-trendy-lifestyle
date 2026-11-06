
import { NextResponse } from "next/server";
import { adminDb, adminAuth } from "../../../lib/firebaseAdmin";
import { resend } from "../../../lib/resend";

export const runtime = "nodejs";

const ADMIN_EMAIL = "shazifyofficial@gmail.com";

export async function GET(req: Request) {
  try {
    // Verify admin login
    const authorization = req.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(
      authorization.slice(7)
    );

    if (decodedToken.email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Admin access only." },
        { status: 403 }
      );
    }

    // Fetch return requests securely
    const snapshot = await adminDb
      .collection("returnRequests")
      .orderBy("createdAt", "desc")
      .limit(100)
      .get();

    const requests = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.().toISOString() || null,
        deliveredAt: data.deliveredAt?.toDate?.().toISOString() || null,
      };
    });

    return NextResponse.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("ADMIN RETURN REQUESTS ERROR:", error);

    return NextResponse.json(
      { error: "Unable to load return requests." },
      { status: 500 }
    );
  }
  
}
export async function POST(req: Request) {
  try {
    const authorization = req.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(
      authorization.slice(7)
    );

    if (decodedToken.email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Admin access only." },
        { status: 403 }
      );
    }

    const body = await req.json();

    const requestId = String(body.requestId || "").trim();
    const action = String(body.action || "").trim();
    const adminNote = String(body.adminNote || "").trim();

    if (!requestId || !["Approved", "Rejected"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid return request information." },
        { status: 400 }
      );
    }

    if (adminNote.length > 1000) {
      return NextResponse.json(
        { error: "Admin note is too long." },
        { status: 400 }
      );
    }

    const requestRef = adminDb
      .collection("returnRequests")
      .doc(requestId);

    const requestSnapshot = await requestRef.get();

    if (!requestSnapshot.exists) {
      return NextResponse.json(
        { error: "Return request not found." },
        { status: 404 }
      );
    }

    const returnRequest = requestSnapshot.data()!;

    if (returnRequest.status !== "Pending") {
      return NextResponse.json(
        { error: "This request has already been reviewed." },
        { status: 409 }
      );
    }

    await requestRef.update({
      status: action,
      adminNote,
      reviewedAt: new Date(),
      reviewedBy: decodedToken.email,
    });

    // Send customer email
    let emailSent = false;

    try {
      const customerEmail = String(
        returnRequest.customerEmail || ""
      ).trim();

      if (customerEmail) {
        const isApproved = action === "Approved";

        const safeName = String(
          returnRequest.customerName || "Customer"
        ).replace(/[<>&"']/g, "");

        const safeOrderId = String(
          returnRequest.orderId || ""
        ).replace(/[<>&"']/g, "");

        const safeNote = adminNote.replace(/[<>&"']/g, "");

        const emailResult = await resend.emails.send({
          from: "Shazify <orders@shazify.shop>",
          to: customerEmail,
          replyTo: "shazifyofficial@gmail.com",
          subject: isApproved
            ? `Return Request Approved - ${safeOrderId}`
            : `Return Request Update - ${safeOrderId}`,
          html: `
            <div style="font-family:Arial,sans-serif;line-height:1.7">
              <h2>Hello ${safeName},</h2>
              <p>Your return request for order
              <strong>${safeOrderId}</strong> has been
              <strong>${action}</strong>.</p>
              ${
                isApproved
                  ? "<p>Our team will contact you separately with the applicable return instructions. Please do not dispatch the parcel until you receive those instructions.</p>"
                  : "<p>Unfortunately, we are unable to approve your return request.</p>"
              }
              ${
                safeNote
                  ? `<p><strong>Additional note:</strong> ${safeNote}</p>`
                  : ""
              }
              <p>Thank you for contacting Shazify.</p>
              <p>Shazify Customer Support</p>
            </div>
          `,
        });

        if (!emailResult.error) {
          emailSent = true;
        } else {
          console.error("Return email error:", emailResult.error);
        }
      }
    } catch (emailError) {
      console.error("Return email sending failed:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: `${action} successfully.`,
      emailSent,
    });
  } catch (error) {
    console.error("RETURN REVIEW ERROR:", error);

    return NextResponse.json(
      { error: "Unable to review return request." },
      { status: 500 }
    );
  }
}