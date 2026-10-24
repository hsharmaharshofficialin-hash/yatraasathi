export type ClaimStatus = "verified" | "inferred" | "unknown";

export type SourceOut = {
  code: string;
  title: string;
  publisher: string;
  url: string | null;
  verifiedAt: string | null;
  verifier: string;
  notes: string | null;
};

export type SegmentOut = {
  text: string;
  status: ClaimStatus;
  sourceIds: string[];
  reason?: string;
};

export type AskResponse = {
  segments: SegmentOut[];
  sources: SourceOut[];
  engine: "openai" | "rule-based" | "on-device";
  mode: "pramaan" | "plain";
  lang: string;
  abstained: boolean;
};

export type EtiquetteOut = {
  field: string;
  valueEn: string;
  valueHi: string;
  source: SourceOut | null;
  verifiedAt: string | null;
  status: "verified" | "unverified";
};

export type SiteOut = {
  slug: string;
  nameEn: string;
  nameHi: string;
  summaryEn: string;
  summaryHi: string;
  narrativeEn: string;
  narrativeHi: string;
  lat: number;
  lng: number;
  city: string;
  areaEn: string;
  areaHi: string;
  unesco: boolean;
  unescoRef: string | null;
  imageUrl: string;
  imageCredit: string;
  dayHint: number;
  distanceM?: number;
  etiquette?: EtiquetteOut[];
  sources?: SourceOut[];
};

export type ItineraryItem = {
  clientId: string;
  dayNumber: number;
  siteSlug: string | null;
  notes: string;
  updatedAt: string;
  rev: number;
};

export type SyncResult = {
  clientId: string;
  status: "saved" | "conflict";
  rev: number;
};

export type ChangelogRow = {
  id: number;
  siteSlug: string | null;
  field: string | null;
  message: string;
  lang: string;
  createdAt: string;
};
