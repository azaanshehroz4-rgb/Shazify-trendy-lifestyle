
import { NextResponse } from "next/server";
import { adminDb, adminAuth } from "../../lib/firebaseAdmin";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const authorization = req.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Please log in to view your return requests." },
        { status: 401 }
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(
      authorization.slice(7)
    );

    // Fetch only this customer's requests
    const snapshot = await adminDb
      .collection("returnRequests")
      .where("userId", "==", decodedToken.uid)
      .limit(100)
      .get();

    const requests = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        orderId: data.orderId || "",
        reason: data.reason || "",
        description: data.description || "",
        status: data.status || "Pending",
        adminNote: data.adminNote || "",
        createdAt:
          data.createdAt?.toDate?.().toISOString() || null,
        reviewedAt:
          data.reviewedAt?.toDate?.().toISOString() || null,
      };
    });

    requests.sort((a, b) => {
      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });

    return NextResponse.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("MY RETURN REQUESTS ERROR:", error);

    return NextResponse.json(
      { error: "Unable to load your return requests." },
      { status: 500 }
    );
  }
}
