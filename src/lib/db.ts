import { Pool } from "pg";
import { getEnv } from "@/lib/env";

const globalForPool = globalThis as unknown as { pgPool?: Pool };

export const db = globalForPool.pgPool ?? new Pool({ connectionString: getEnv().DATABASE_URL });

if (process.env.NODE_ENV !== "production") globalForPool.pgPool = db;
