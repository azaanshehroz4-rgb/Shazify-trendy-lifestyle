import { NextResponse } from "next/server";
import createImageKit from "@imagekit/nodejs";

const imagekit = new createImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

export async function GET() {
  try {
    const authenticationParameters =
      imagekit.helper.getAuthenticationParameters();

    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error("ImageKit authentication error:", error);

    return NextResponse.json(
      { error: "Failed to generate ImageKit authentication parameters." },
      { status: 500 }
    );
  }
}