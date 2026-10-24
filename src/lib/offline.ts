import { fetchPack } from "@/lib/api";
import { idbGet, idbSet } from "@/lib/idb";
import { ETIQUETTE, KNOWLEDGE, SITES, SOURCES } from "@/data/jaipur-sites";
import { PHRASES } from "@/data/phrases";

const KEYS = {
  pack: "pack",
  maps: "ready.maps",
  stories: "ready.stories",
  cards: "ready.cards",
  phrases: "ready.phrases",
} as const;

export type Readiness = {
  maps: boolean;
  stories: boolean;
  cards: boolean;
  phrases: boolean;
};

export async function getReadiness(): Promise<Readiness> {
  return {
    maps: Boolean(await idbGet(KEYS.maps)),
    stories: Boolean(await idbGet(KEYS.stories)),
    cards: Boolean(await idbGet(KEYS.cards)),
    phrases: Boolean(await idbGet(KEYS.phrases)),
  };
}

export async function cacheTripPack(): Promise<Readiness> {
  let pack: unknown = { facts: KNOWLEDGE, sources: SOURCES, sites: SITES, etiquette: ETIQUETTE, phrases: PHRASES };
  try {
    pack = await fetchPack();
  } catch {
    // Seeded pack is enough offline.
  }
  await idbSet(KEYS.pack, pack);
  await idbSet(KEYS.maps, {
    at: Date.now(),
    days: [
      { day: 1, slugs: SITES.filter((s) => s.dayHint === 1).map((s) => s.slug) },
      { day: 2, slugs: SITES.filter((s) => s.dayHint === 2).map((s) => s.slug) },
      { day: 3, slugs: SITES.filter((s) => s.dayHint === 3).map((s) => s.slug) },
    ],
  });
  await idbSet(KEYS.stories, SITES.map((s) => ({ slug: s.slug, narrativeEn: s.narrativeEn, narrativeHi: s.narrativeHi })));
  await idbSet(KEYS.cards, ETIQUETTE);
  await idbSet(KEYS.phrases, PHRASES);
  if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    const ready = await navigator.serviceWorker.ready;
    ready.active?.postMessage({ type: "cache-shell" });
  }
  return getReadiness();
}

export async function loadCachedPack() {
  const pack = await idbGet<{ facts: typeof KNOWLEDGE; sources: typeof SOURCES }>(KEYS.pack);
  return pack || { facts: KNOWLEDGE, sources: SOURCES };
}
