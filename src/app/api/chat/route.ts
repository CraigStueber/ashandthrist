import { NextRequest, NextResponse } from "next/server";

import { SESSION_COOKIE, verifySession } from "@/server/auth/session";

import { chatWithVarek, type ChatMessage } from "@/server/ai/chat";

export const runtime = "edge";

const MAX_MESSAGES = 12;
const MAX_USER_MESSAGE_LENGTH = 1000;
const MAX_ASSISTANT_MESSAGE_LENGTH = 5000;

export async function POST(request: NextRequest) {
  try {
    // Never allow unauthenticated access to OpenAI.
    const session = request.cookies.get(SESSION_COOKIE)?.value;

    if (!verifySession(session)) {
      return NextResponse.json(
        { error: "You must enter the tavern first." },
        { status: 401 },
      );
    }

    const contentLength = Number(request.headers.get("content-length") || 0);

    if (contentLength > 16000) {
      return NextResponse.json(
        { error: "Your message is too large." },
        { status: 413 },
      );
    }

    const body = await request.json();

    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Invalid conversation." },
        { status: 400 },
      );
    }

    if (body.messages.length === 0 || body.messages.length > MAX_MESSAGES) {
      return NextResponse.json(
        { error: "Conversation limit exceeded." },
        { status: 400 },
      );
    }

    const messages: ChatMessage[] = body.messages;

    const valid = messages.every((message) => {
      if (!message || typeof message.content !== "string") {
        return false;
      }

      if (!message.content.trim()) {
        return false;
      }

      if (message.role === "user") {
        return message.content.length <= MAX_USER_MESSAGE_LENGTH;
      }

      if (message.role === "assistant") {
        return message.content.length <= MAX_ASSISTANT_MESSAGE_LENGTH;
      }

      return false;
    });

    if (!valid || messages[messages.length - 1].role !== "user") {
      return NextResponse.json({ error: "Invalid messages." }, { status: 400 });
    }

    const reply = await chatWithVarek(messages);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Varek chat error:", error);

    return NextResponse.json(
      { error: "Varek seems distracted. Try again." },
      { status: 500 },
    );
  }
}
