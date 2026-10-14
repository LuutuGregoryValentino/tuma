import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getEnv } from "@/lib/env";

export const SESSION_COOKIE = "saas_session";
function sessionKey() {
  return new TextEncoder().encode(getEnv().SESSION_SECRET);
}
const sessionTtlSeconds = 60 * 60 * 24 * 7;

export type Session = { userId: string; role: "user" | "admin" };

export async function createSession(session: Session) {
  const token = await new SignJWT({ role: session.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.userId)
    .setIssuedAt()
    .setExpirationTime(`${sessionTtlSeconds}s`)
    .sign(sessionKey());

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionTtlSeconds,
  });
}

export async function readSession(token?: string): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, sessionKey(), { algorithms: ["HS256"] });
    if (!payload.sub || (payload.role !== "user" && payload.role !== "admin")) return null;
    return { userId: payload.sub, role: payload.role };
  } catch {
    return null;
  }
}

export async function getSession() {
  return readSession((await cookies()).get(SESSION_COOKIE)?.value);
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}
