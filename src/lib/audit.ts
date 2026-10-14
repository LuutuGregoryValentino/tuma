import "server-only";
import { db } from "@/lib/db";

export async function writeAuditLog(input: {
  actorUserId?: string | null;
  action: string;
  resourceType?: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}) {
  await db.query(
    `INSERT INTO audit_logs (actor_user_id, action, resource_type, resource_id, ip_address, user_agent, metadata)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [input.actorUserId ?? null, input.action, input.resourceType ?? null, input.resourceId ?? null,
      input.ipAddress ?? null, input.userAgent ?? null, JSON.stringify(input.metadata ?? {})],
  );
}
