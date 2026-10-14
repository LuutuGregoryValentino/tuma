import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getUserById } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ user: null }, { status: 401 });
  const user = await getUserById(session.userId);
  if (!user) return NextResponse.json({ user: null }, { status: 401 });
  return NextResponse.json({ user }, { headers: { "Cache-Control": "no-store" } });
}
