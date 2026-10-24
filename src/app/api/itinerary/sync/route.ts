import { itineraries } from "@/db/schema";
import { db } from "@/db";
import { ensureSeeded } from "@/lib/seed";
import { and, eq } from "drizzle-orm";
import type { ItineraryItem, SyncResult } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    guest_id?: string;
    items?: ItineraryItem[];
  };
  const guestId = body.guest_id?.trim();
  if (!guestId) return Response.json({ error: "guest_id required" }, { status: 400 });
  const items = body.items || [];
  try {
    await ensureSeeded();
    const results: SyncResult[] = [];
    for (const item of items) {
      const [existing] = await db
        .select()
        .from(itineraries)
        .where(and(eq(itineraries.guestId, guestId), eq(itineraries.clientId, item.clientId)))
        .limit(1);
      if (!existing) {
        await db.insert(itineraries).values({
          guestId,
          clientId: item.clientId,
          dayNumber: item.dayNumber,
          siteSlug: item.siteSlug,
          notes: item.notes || "",
          updatedAt: new Date(item.updatedAt || Date.now()),
          rev: item.rev || 1,
        });
        results.push({ clientId: item.clientId, status: "saved", rev: item.rev || 1 });
        continue;
      }
      if (existing.rev > (item.rev || 0)) {
        results.push({ clientId: item.clientId, status: "conflict", rev: existing.rev });
        continue;
      }
      const nextRev = (item.rev || existing.rev) + 1;
      await db
        .update(itineraries)
        .set({
          dayNumber: item.dayNumber,
          siteSlug: item.siteSlug,
          notes: item.notes || "",
          updatedAt: new Date(),
          rev: nextRev,
        })
        .where(eq(itineraries.id, existing.id));
      results.push({ clientId: item.clientId, status: "saved", rev: nextRev });
    }
    const stored = await db.select().from(itineraries).where(eq(itineraries.guestId, guestId));
    return Response.json({
      results,
      items: stored.map((row) => ({
        clientId: row.clientId,
        dayNumber: row.dayNumber,
        siteSlug: row.siteSlug,
        notes: row.notes,
        updatedAt: row.updatedAt.toISOString(),
        rev: row.rev,
      })),
    });
  } catch {
    return Response.json({
      results: items.map((item) => ({ clientId: item.clientId, status: "conflict", rev: item.rev })),
      demo: true,
    });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const guestId = url.searchParams.get("guest_id");
  if (!guestId) return Response.json({ items: [] });
  try {
    await ensureSeeded();
    const stored = await db.select().from(itineraries).where(eq(itineraries.guestId, guestId));
    return Response.json({
      items: stored.map((row) => ({
        clientId: row.clientId,
        dayNumber: row.dayNumber,
        siteSlug: row.siteSlug,
        notes: row.notes,
        updatedAt: row.updatedAt.toISOString(),
        rev: row.rev,
      })),
    });
  } catch {
    return Response.json({ items: [], demo: true });
  }
}
