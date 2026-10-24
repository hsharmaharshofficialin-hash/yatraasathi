from datetime import datetime

from pydantic import BaseModel, Field


class HealthOut(BaseModel):
    ok: bool
    service: str = "yatrasathi-backend"


class SourceOut(BaseModel):
    code: str
    title: str
    publisher: str
    url: str | None
    verifiedAt: datetime | None
    verifier: str
    notes: str | None


class EtiquetteOut(BaseModel):
    field: str
    valueEn: str
    valueHi: str
    source: SourceOut | None
    verifiedAt: datetime | None
    status: str


class SiteOut(BaseModel):
    slug: str
    nameEn: str
    nameHi: str
    summaryEn: str
    summaryHi: str
    narrativeEn: str
    narrativeHi: str
    lat: float
    lng: float
    city: str
    areaEn: str
    areaHi: str
    unesco: bool
    unescoRef: str | None
    imageUrl: str
    imageCredit: str
    dayHint: int
    distanceM: float | None = None
    etiquette: list[EtiquetteOut] | None = None
    sources: list[SourceOut] | None = None


class SitesOut(BaseModel):
    sites: list[SiteOut]


class SiteDetailOut(BaseModel):
    site: SiteOut


class AskIn(BaseModel):
    question: str
    lang: str = "en"
    site_slug: str | None = None
    mode: str = Field(default="pramaan")
    stream: bool = False


class SegmentOut(BaseModel):
    text: str
    status: str
    sourceIds: list[str] = []
    reason: str | None = None


class AskOut(BaseModel):
    segments: list[SegmentOut]
    sources: list[SourceOut]
    engine: str
    mode: str
    lang: str
    abstained: bool


class ArenaIn(BaseModel):
    question: str
    lang: str = "en"
    site_slug: str | None = None


class UnsupportedOut(BaseModel):
    text: str
    reason: str


class ArenaOut(BaseModel):
    question: str
    lang: str
    plain: AskOut
    pramaan: AskOut
    unsupported: list[UnsupportedOut]


class ItineraryItemIn(BaseModel):
    clientId: str
    dayNumber: int
    siteSlug: str | None = None
    notes: str = ""
    updatedAt: str | None = None
    rev: int = 1


class SyncIn(BaseModel):
    guest_id: str
    items: list[ItineraryItemIn] = []


class SyncResultOut(BaseModel):
    clientId: str
    status: str
    rev: int


class SyncOut(BaseModel):
    results: list[SyncResultOut]
    items: list[ItineraryItemIn] | None = None


class ChangelogIn(BaseModel):
    site_slug: str | None = None
    field: str | None = None
    message: str
    lang: str = "en"


class ChangelogRow(BaseModel):
    id: int
    siteSlug: str | None
    field: str | None
    message: str
    lang: str
    createdAt: datetime


class ChangelogListOut(BaseModel):
    entries: list[ChangelogRow]
