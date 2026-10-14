import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { writeAuditLog } from "@/lib/audit";
import { createSession } from "@/lib/session";

const inputSchema = z.object({ email: z.string().trim().email().max(254), password: z.string().min(1).max(128) });

export async function POST(request: Request) {
  const form = await request.formData();
  const parsed = inputSchema.safeParse({ email: form.get("email"), password: form.get("password") });
  if (!parsed.success) return NextResponse.json({ error: "Invalid email or password." }, { status: 400 });

  const email = parsed.data.email.toLowerCase();
  const result = await db.query<{ id: string; role: "user" | "admin"; password_hash: string }>(
    "SELECT id, role, password_hash FROM users WHERE email = $1",
    [email],
  );
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(parsed.data.password, user.password_hash))) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  await createSession({ userId: user.id, role: user.role });
  await writeAuditLog({ actorUserId: user.id, action: "auth.login", resourceType: "user", resourceId: user.id, ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(), userAgent: request.headers.get("user-agent") ?? undefined });
  return NextResponse.redirect(new URL("/dashboard", request.url), 303);
}
