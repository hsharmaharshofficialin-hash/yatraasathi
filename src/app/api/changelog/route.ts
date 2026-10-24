import { changelog } from "@/db/schema";
import { db } from "@/db";
import { ensureSeeded } from "@/lib/seed";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureSeeded();
    const rows = await db.select().from(changelog).orderBy(desc(changelog.createdAt)).limit(50);
    return Response.json({
      entries: rows.map((row) => ({
        id: row.id,
        siteSlug: row.siteSlug,
        field: row.field,
        message: row.message,
        lang: row.lang,
        createdAt: row.createdAt.toISOString(),
      })),
    });
  } catch {
    return Response.json({ entries: [], demo: true });
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    site_slug?: string;
    field?: string;
    message?: string;
    lang?: string;
  };
  const message = (body.message || "").trim();
  if (!message) return Response.json({ error: "message required" }, { status: 400 });
  try {
    await ensureSeeded();
    const [row] = await db
      .insert(changelog)
      .values({
        siteSlug: body.site_slug || null,
        field: body.field || null,
        message,
        lang: body.lang || "en",
        createdAt: new Date(),
        status: "public",
      })
      .returning();
    return Response.json({
      entry: {
        id: row.id,
        siteSlug: row.siteSlug,
        field: row.field,
        message: row.message,
        lang: row.lang,
        createdAt: row.createdAt.toISOString(),
      },
    });
  } catch {
    return Response.json({
      entry: {
        id: Date.now(),
        siteSlug: body.site_slug || null,
        field: body.field || null,
        message,
        lang: body.lang || "en",
        createdAt: new Date().toISOString(),
      },
      demo: true,
    });
  }
}
