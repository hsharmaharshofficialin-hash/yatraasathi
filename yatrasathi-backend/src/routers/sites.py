from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from src.db import get_session
from src.models import EtiquetteFact, KnowledgeFact, Site, Source
from src.schemas.api import EtiquetteOut, SiteDetailOut, SiteOut, SitesOut, SourceOut
from src.services.retrieval import haversine_m

router = APIRouter()


def _source_out(row: Source | None) -> SourceOut | None:
    if not row:
        return None
    return SourceOut(
        code=row.code,
        title=row.title,
        publisher=row.publisher,
        url=row.url,
        verifiedAt=row.verified_at,
        verifier=row.verifier,
        notes=row.notes,
    )


def _site_out(site: Site, distance: float | None = None) -> SiteOut:
    return SiteOut(
        slug=site.slug,
        nameEn=site.name_en,
        nameHi=site.name_hi,
        summaryEn=site.summary_en,
        summaryHi=site.summary_hi,
        narrativeEn=site.narrative_en,
        narrativeHi=site.narrative_hi,
        lat=site.lat,
        lng=site.lng,
        city=site.city,
        areaEn=site.area_en,
        areaHi=site.area_hi,
        unesco=site.unesco,
        unescoRef=site.unesco_ref,
        imageUrl=site.image_url,
        imageCredit=site.image_credit,
        dayHint=site.day_hint,
        distanceM=distance,
    )


@router.get("/sites", response_model=SitesOut)
def list_sites(
    lat: float | None = Query(default=None),
    lng: float | None = Query(default=None),
    radius: float | None = Query(default=None),
    session: Session = Depends(get_session),
):
    rows = list(session.scalars(select(Site)).all())
    out: list[SiteOut] = []
    for site in rows:
        distance = haversine_m(lat, lng, site.lat, site.lng) if lat is not None and lng is not None else None
        if radius is not None and distance is not None and distance > radius:
            continue
        out.append(_site_out(site, distance))
    out.sort(key=lambda item: item.distanceM if item.distanceM is not None else item.dayHint)
    return SitesOut(sites=out)


@router.get("/sites/{slug}", response_model=SiteDetailOut)
def get_site(slug: str, session: Session = Depends(get_session)):
    site = session.scalar(select(Site).where(Site.slug == slug))
    if not site:
        raise HTTPException(status_code=404, detail="unknown site")
    etiquette_rows = list(session.scalars(select(EtiquetteFact).where(EtiquetteFact.site_slug == slug)).all())
    knowledge_rows = list(session.scalars(select(KnowledgeFact).where(KnowledgeFact.site_slug == slug)).all())
    source_rows = {row.code: row for row in session.scalars(select(Source)).all()}
    etiquette = [
        EtiquetteOut(
            field=row.field,
            valueEn=row.value_en,
            valueHi=row.value_hi,
            source=_source_out(source_rows.get(row.source_code) if row.source_code else None),
            verifiedAt=row.verified_at,
            status=row.status,
        )
        for row in etiquette_rows
    ]
    used = {e.source.code for e in etiquette if e.source} | {k.source_code for k in knowledge_rows if k.source_code}
    payload = _site_out(site)
    payload.etiquette = etiquette
    payload.sources = [_source_out(source_rows[code]) for code in used if code in source_rows]
    return SiteDetailOut(site=payload)
