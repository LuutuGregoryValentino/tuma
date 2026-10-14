import { NextResponse } from "next/server";
import { destroySession, getSession } from "@/lib/session";
import { writeAuditLog } from "@/lib/audit";

export async function POST(request: Request) {
  const session = await getSession();
  if (session) await writeAuditLog({ actorUserId: session.userId, action: "auth.logout", resourceType: "user", resourceId: session.userId });
  await destroySession();
  return NextResponse.redirect(new URL("/", request.url), 303);
}
