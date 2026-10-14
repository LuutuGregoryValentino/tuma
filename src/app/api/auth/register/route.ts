import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { writeAuditLog } from "@/lib/audit";
import { createSession } from "@/lib/session";

const inputSchema = z.object({ name: z.string().trim().min(1).max(100), email: z.string().trim().email().max(254), password: z.string().min(12).max(128) });

export async function POST(request: Request) {
  const form = await request.formData();
  const parsed = inputSchema.safeParse({ name: form.get("name"), email: form.get("email"), password: form.get("password") });
  if (!parsed.success) return NextResponse.json({ error: "Please provide a valid name, email, and password (12–128 characters)." }, { status: 400 });

  const { name, password } = parsed.data;
  const email = parsed.data.email.toLowerCase();
  const passwordHash = await bcrypt.hash(password, 12);
  try {
    const result = await db.query<{ id: string; role: "user" | "admin" }>(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, role",
      [name, email, passwordHash],
    );
    const user = result.rows[0];
    await createSession({ userId: user.id, role: user.role });
    await writeAuditLog({ actorUserId: user.id, action: "auth.register", resourceType: "user", resourceId: user.id, ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(), userAgent: request.headers.get("user-agent") ?? undefined });
    return NextResponse.redirect(new URL("/dashboard", request.url), 303);
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
      return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    }
    throw error;
  }
}
