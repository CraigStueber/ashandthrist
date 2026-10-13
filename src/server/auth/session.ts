import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "ashandthirst_session";

const SESSION_DURATION = 60 * 60 * 24 * 7;

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters.");
  }

  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSession(): string {
  const expires = Math.floor(Date.now() / 1000) + SESSION_DURATION;
  const payload = String(expires);

  return `${payload}.${sign(payload)}`;
}

export function verifySession(token?: string): boolean {
  if (!token) return false;

  const [expires, signature, extra] = token.split(".");

  if (extra !== undefined || !expires || !signature) {
    return false;
  }

  if (!/^\d+$/.test(expires) || !/^[a-f0-9]{64}$/.test(signature)) {
    return false;
  }

  if (Number(expires) <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  const expected = Buffer.from(sign(expires), "hex");
  const received = Buffer.from(signature, "hex");

  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}

export const sessionDuration = SESSION_DURATION;
