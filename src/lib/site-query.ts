import { etiquetteFacts, knowledgeFacts, sites, sources } from "@/db/schema";
import { db } from "@/db";
import { haversineMeters } from "@/lib/geo";
import { memorySite, memorySites } from "@/lib/site-memory";
import { ensureSeeded } from "@/lib/seed";
import type { EtiquetteOut, SiteOut, SourceOut } from "@/lib/types";
import { eq } from "drizzle-orm";

export { memorySite, memorySites };

export async function listSites(lat?: number, lng?: number, radius?: number): Promise<SiteOut[]> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(sites);
    const mapped: SiteOut[] = rows.map((site) => {
      const distanceM =
        lat != null && lng != null ? Math.round(haversineMeters(lat, lng, site.lat, site.lng)) : undefined;
      return {
        slug: site.slug,
        nameEn: site.nameEn,
        nameHi: site.nameHi,
        summaryEn: site.summaryEn,
        summaryHi: site.summaryHi,
        narrativeEn: site.narrativeEn,
        narrativeHi: site.narrativeHi,
        lat: site.lat,
        lng: site.lng,
        city: site.city,
        areaEn: site.areaEn,
        areaHi: site.areaHi,
        unesco: site.unesco,
        unescoRef: site.unescoRef,
        imageUrl: site.imageUrl,
        imageCredit: site.imageCredit,
        dayHint: site.dayHint,
        distanceM,
      };
    });
    return mapped
      .filter((site) => (radius != null && site.distanceM != null ? site.distanceM <= radius : true))
      .sort((a, b) => (a.distanceM ?? a.dayHint) - (b.distanceM ?? b.dayHint));
  } catch {
    return memorySites(lat, lng, radius);
  }
}

export async function getSite(slug: string): Promise<SiteOut | null> {
  try {
    await ensureSeeded();
    const [site] = await db.select().from(sites).where(eq(sites.slug, slug)).limit(1);
    if (!site) return memorySite(slug);
    const etiquetteRows = await db.select().from(etiquetteFacts).where(eq(etiquetteFacts.siteSlug, slug));
    const sourceRows = await db.select().from(sources);
    const sourceLookup = new Map(sourceRows.map((row) => [row.code, row]));
    const knowledgeRows = await db.select().from(knowledgeFacts).where(eq(knowledgeFacts.siteSlug, slug));
    const etiquette: EtiquetteOut[] = etiquetteRows.map((row) => {
      const src = row.sourceCode ? sourceLookup.get(row.sourceCode) : undefined;
      return {
        field: row.field,
        valueEn: row.valueEn,
        valueHi: row.valueHi,
        source: src
          ? {
              code: src.code,
              title: src.title,
              publisher: src.publisher,
              url: src.url,
              verifiedAt: src.verifiedAt?.toISOString() ?? null,
              verifier: src.verifier,
              notes: src.notes,
            }
          : null,
        verifiedAt: row.verifiedAt?.toISOString() ?? null,
        status: row.status === "verified" ? "verified" : "unverified",
      };
    });
    const used = new Set(
      [
        ...etiquette.map((row) => row.source?.code),
        ...knowledgeRows.map((row) => row.sourceCode),
      ].filter((code): code is string => Boolean(code)),
    );
    const siteSources: SourceOut[] = [];
    for (const code of used) {
      const src = sourceLookup.get(code);
      if (!src) continue;
      siteSources.push({
        code: src.code,
        title: src.title,
        publisher: src.publisher,
        url: src.url,
        verifiedAt: src.verifiedAt ? src.verifiedAt.toISOString() : null,
        verifier: src.verifier,
        notes: src.notes,
      });
    }
    return {
      slug: site.slug,
      nameEn: site.nameEn,
      nameHi: site.nameHi,
      summaryEn: site.summaryEn,
      summaryHi: site.summaryHi,
      narrativeEn: site.narrativeEn,
      narrativeHi: site.narrativeHi,
      lat: site.lat,
      lng: site.lng,
      city: site.city,
      areaEn: site.areaEn,
      areaHi: site.areaHi,
      unesco: site.unesco,
      unescoRef: site.unescoRef,
      imageUrl: site.imageUrl,
      imageCredit: site.imageCredit,
      dayHint: site.dayHint,
      etiquette,
      sources: siteSources,
    };
  } catch {
    return memorySite(slug);
  }
}
