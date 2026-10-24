import { ETIQUETTE, KNOWLEDGE, SITES, SOURCES } from "@/data/jaipur-sites";
import { haversineMeters } from "@/lib/geo";
import { toSourceOut } from "@/lib/pramaan";
import type { EtiquetteOut, SiteOut, SourceOut } from "@/lib/types";

function sourceByCode(code: string | null): SourceOut | null {
  if (!code) return null;
  return toSourceOut(SOURCES.find((row) => row.code === code));
}

export function memorySites(lat?: number, lng?: number, radius?: number): SiteOut[] {
  return SITES.map((site) => {
    const distanceM =
      lat != null && lng != null ? Math.round(haversineMeters(lat, lng, site.lat, site.lng)) : undefined;
    return { ...site, distanceM };
  })
    .filter((site) => (radius != null && site.distanceM != null ? site.distanceM <= radius : true))
    .sort((a, b) => (a.distanceM ?? a.dayHint) - (b.distanceM ?? b.dayHint));
}

export function memorySite(slug: string): SiteOut | null {
  const site = SITES.find((row) => row.slug === slug);
  if (!site) return null;
  const etiquette: EtiquetteOut[] = ETIQUETTE.filter((row) => row.siteSlug === slug).map((row) => ({
    field: row.field,
    valueEn: row.valueEn,
    valueHi: row.valueHi,
    source: sourceByCode(row.sourceCode),
    verifiedAt: row.verifiedAt,
    status: row.status,
  }));
  const used = new Set(
    [
      ...etiquette.map((row) => row.source?.code),
      ...KNOWLEDGE.filter((row) => row.siteSlug === slug).map((row) => row.sourceCode),
    ].filter((code): code is string => Boolean(code)),
  );
  const siteSources = SOURCES.filter((row) => used.has(row.code))
    .map((row) => toSourceOut(row))
    .filter((row): row is SourceOut => Boolean(row));
  return { ...site, etiquette, sources: siteSources };
}
