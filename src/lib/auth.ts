import "server-only";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession, type Session } from "@/lib/session";

export async function requireUser(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/login");
  const user = await getUserById(session.userId);
  if (!user) redirect("/login");
  return { userId: user.id, role: user.role };
}

export async function requireAdmin(): Promise<Session> {
  const session = await requireUser();
  if (session.role !== "admin") redirect("/dashboard");
  return session;
}

export async function getUserById(id: string) {
  const result = await db.query<{ id: string; email: string; name: string; role: "user" | "admin" }>(
    "SELECT id, email, name, role FROM users WHERE id = $1",
    [id],
  );
  return result.rows[0] ?? null;
}
