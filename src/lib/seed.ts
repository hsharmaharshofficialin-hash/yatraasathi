import { changelog, etiquetteFacts, itineraries, knowledgeFacts, sites, sources } from "@/db/schema";
import {
  DEFAULT_ITINERARY,
  ETIQUETTE,
  KNOWLEDGE,
  SITES,
  SOURCES,
} from "@/data/jaipur-sites";
import { db } from "@/db";
import { sql } from "drizzle-orm";

function parseDate(value: string | null) {
  return value ? new Date(value) : null;
}

let seedPromise: Promise<void> | null = null;

export async function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = (async () => {
      const existing = await db.select({ id: sites.id }).from(sites).limit(1);
      if (existing.length) return;

      await db.insert(sources).values(
        SOURCES.map((row) => ({
          code: row.code,
          title: row.title,
          publisher: row.publisher,
          url: row.url,
          verifiedAt: parseDate(row.verifiedAt) ?? new Date("1970-01-01T00:00:00.000Z"),
          verifier: row.verifier,
          notes: row.notes,
        })),
      );

      await db.insert(sites).values(
        SITES.map((row) => ({
          slug: row.slug,
          nameEn: row.nameEn,
          nameHi: row.nameHi,
          summaryEn: row.summaryEn,
          summaryHi: row.summaryHi,
          narrativeEn: row.narrativeEn,
          narrativeHi: row.narrativeHi,
          lat: row.lat,
          lng: row.lng,
          city: row.city,
          areaEn: row.areaEn,
          areaHi: row.areaHi,
          unesco: row.unesco,
          unescoRef: row.unescoRef,
          imageUrl: row.imageUrl,
          imageCredit: row.imageCredit,
          dayHint: row.dayHint,
        })),
      );

      await db.insert(etiquetteFacts).values(
        ETIQUETTE.map((row) => ({
          siteSlug: row.siteSlug,
          field: row.field,
          valueEn: row.valueEn,
          valueHi: row.valueHi,
          sourceCode: row.sourceCode,
          verifiedAt: parseDate(row.verifiedAt),
          status: row.status,
        })),
      );

      await db.insert(knowledgeFacts).values(
        KNOWLEDGE.map((row) => ({
          siteSlug: row.siteSlug,
          claimEn: row.claimEn,
          claimHi: row.claimHi,
          sourceCode: row.sourceCode,
          verifiedAt: parseDate(row.verifiedAt),
          status: row.status,
          tags: row.tags,
        })),
      );

      await db.insert(itineraries).values(
        DEFAULT_ITINERARY.map((row, index) => ({
          guestId: "seed-demo",
          clientId: `seed-${index + 1}`,
          dayNumber: row.dayNumber,
          siteSlug: row.siteSlug,
          notes: row.notes,
          updatedAt: new Date(),
          rev: 1,
        })),
      );

      await db.insert(changelog).values({
        siteSlug: null,
        field: "policy",
        message:
          "Seeded public ledger: YatraSathi will not invent ratings. Corrections from travellers appear here.",
        lang: "en",
        createdAt: new Date(),
        status: "public",
      });
    })().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  await seedPromise;
}

export async function pingDb() {
  await db.execute(sql`select 1`);
}
