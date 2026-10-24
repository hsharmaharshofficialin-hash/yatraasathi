import { db, pool } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!pool) {
    return Response.json({ ok: true, database: "memory" });
  }
  try {
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, database: "postgres" });
  } catch {
    return Response.json({ ok: false, database: "disconnected" }, { status: 500 });
  }
}
