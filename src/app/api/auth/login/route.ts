import { NextRequest, NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { env } from "cloudflare:workers";
import {
  createSession,
  SESSION_COOKIE,
  sessionDuration,
} from "@/server/auth/session";

export async function POST(request: NextRequest) {
  console.log("LOGIN ENV CHECK:", {
  hasAccessCode: Boolean(process.env.PLAYER_ACCESS_CODE),
  hasSessionSecret: Boolean(process.env.SESSION_SECRET),
});
  try {
    const expectedCode = env.PLAYER_ACCESS_CODE;

    if (!expectedCode) {
      return NextResponse.json(
        { error: "Player access is not configured." },
        { status: 503 },
      );
    }

    const body = await request.json();

    if (!body || typeof body.code !== "string" || body.code.length > 200) {
      return NextResponse.json(
        { error: "Invalid access code." },
        { status: 400 },
      );
    }

    const hash = (value: string) => createHash("sha256").update(value).digest();

    const valid = timingSafeEqual(hash(body.code), hash(expectedCode));

    if (!valid) {
      return NextResponse.json(
        { error: "The chest growls. Wrong password." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set(SESSION_COOKIE, createSession(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: sessionDuration,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to process login." },
      { status: 400 },
    );
  }
}
