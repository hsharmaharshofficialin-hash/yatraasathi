import { DEFAULT_ITINERARY, SITES } from "@/data/jaipur-sites";
import { memorySite, memorySites } from "@/lib/site-memory";
import { buildPlainAnswer, buildPramaanAnswer, unsupportedFromPlain } from "@/lib/pramaan";
import type {
  AskResponse,
  ChangelogRow,
  ItineraryItem,
  SiteOut,
  SyncResult,
} from "@/lib/types";

export class ApiError extends Error {
  demo = true;
}

function apiBase(): string {
  const external = process.env.NEXT_PUBLIC_API_URL;
  if (external) return external.replace(/\/$/, "");
  return "/api";
}

async function readBody<T>(res: Response): Promise<T> {
  return res.json() as Promise<T>;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${apiBase()}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) throw new ApiError(`Request failed ${res.status}`);
  return readBody<T>(res);
}

function encodeBody(payload: unknown): string {
  return JSON.stringify(payload);
}

export async function fetchSites(params?: {
  lat?: number;
  lng?: number;
  radius?: number;
}): Promise<{ sites: SiteOut[]; demo: boolean }> {
  const query = new URLSearchParams();
  if (params?.lat != null) query.set("lat", String(params.lat));
  if (params?.lng != null) query.set("lng", String(params.lng));
  if (params?.radius != null) query.set("radius", String(params.radius));
  const suffix = query.toString() ? `?${query.toString()}` : "";
  try {
    const data = await request<{ sites: SiteOut[] }>(`/sites${suffix}`);
    return { sites: data.sites, demo: false };
  } catch {
    return { sites: memorySites(params?.lat, params?.lng, params?.radius), demo: true };
  }
}

export async function fetchSite(slug: string): Promise<{ site: SiteOut | null; demo: boolean }> {
  try {
    const data = await request<{ site: SiteOut }>(`/sites/${encodeURIComponent(slug)}`);
    return { site: data.site, demo: false };
  } catch {
    return { site: memorySite(slug), demo: true };
  }
}

export async function askQuestion(input: {
  question: string;
  lang: string;
  siteSlug?: string;
  mode?: "pramaan" | "plain";
}): Promise<{ answer: AskResponse; demo: boolean }> {
  try {
    const data = await request<AskResponse>("/ask", {
      method: "POST",
      body: encodeBody({
        question: input.question,
        lang: input.lang,
        site_slug: input.siteSlug,
        mode: input.mode || "pramaan",
      }),
    });
    return { answer: data, demo: false };
  } catch {
    return {
      answer: buildPramaanAnswer({
        question: input.question,
        lang: input.lang,
        siteSlug: input.siteSlug,
        engine: "on-device",
      }),
      demo: true,
    };
  }
}

export async function syncItinerary(guestId: string, items: ItineraryItem[]): Promise<{
  results: SyncResult[];
  items?: ItineraryItem[];
  demo: boolean;
}> {
  try {
    const data = await request<{ results: SyncResult[]; items?: ItineraryItem[] }>("/itinerary/sync", {
      method: "POST",
      body: encodeBody({ guest_id: guestId, items }),
    });
    return { ...data, demo: false };
  } catch {
    return {
      results: items.map((item) => ({ clientId: item.clientId, status: "conflict", rev: item.rev })),
      demo: true,
    };
  }
}

export async function fetchChangelog(): Promise<{ entries: ChangelogRow[]; demo: boolean }> {
  try {
    const data = await request<{ entries: ChangelogRow[] }>("/changelog");
    return { entries: data.entries, demo: false };
  } catch {
    return { entries: [], demo: true };
  }
}

export async function postChangelog(input: {
  siteSlug?: string;
  field?: string;
  message: string;
  lang: string;
}): Promise<{ demo: boolean }> {
  try {
    await request("/changelog", {
      method: "POST",
      body: encodeBody({
        site_slug: input.siteSlug,
        field: input.field,
        message: input.message,
        lang: input.lang,
      }),
    });
    return { demo: false };
  } catch {
    return { demo: true };
  }
}

export async function fetchServices(lat: number, lng: number): Promise<{
  services: { id: number; lat?: number; lng?: number; kind: string; name: string | null }[];
  unknown: boolean;
}> {
  try {
    const data = await request<{
      services: { id: number; lat?: number; lng?: number; kind: string; name: string | null }[];
      unknown?: boolean;
    }>(`/services?lat=${lat}&lng=${lng}`);
    return { services: data.services || [], unknown: Boolean(data.unknown) };
  } catch {
    return { services: [], unknown: true };
  }
}

export async function fetchPack(): Promise<unknown> {
  return request("/pack");
}

export function defaultItineraryItems(): ItineraryItem[] {
  return DEFAULT_ITINERARY.map((row, index) => ({
    clientId: `local-${index + 1}`,
    dayNumber: row.dayNumber,
    siteSlug: row.siteSlug,
    notes: row.notes,
    updatedAt: new Date().toISOString(),
    rev: 1,
  }));
}

export { siteName } from "@/lib/localize";

export { SITES };
