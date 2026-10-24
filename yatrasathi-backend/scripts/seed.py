"""Seed the hosted or local database. Never called at app startup."""

from __future__ import annotations

import sys
from datetime import datetime, timezone
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from sqlalchemy import select

from src.data.jaipur_sites import ETIQUETTE, KNOWLEDGE, SITES, SOURCES
from src.db import get_engine, get_session
from src.models import Changelog, EtiquetteFact, KnowledgeFact, Site, Source


def main() -> None:
    get_engine()
    session = next(get_session())
    if session.scalar(select(Site.id).limit(1)):
        print("Database already has sites. Skipping seed.")
        return
    epoch = datetime(1970, 1, 1, tzinfo=timezone.utc)
    for row in SOURCES:
        session.add(
            Source(
                code=row["code"],
                title=row["title"],
                publisher=row["publisher"],
                url=row["url"],
                verified_at=row["verified_at"] or epoch,
                verifier=row["verifier"],
                notes=row["notes"],
            )
        )
    for row in SITES:
        session.add(
            Site(
                slug=row["slug"],
                name_en=row["name_en"],
                name_hi=row["name_hi"],
                summary_en=row["summary_en"],
                summary_hi=row["summary_hi"],
                narrative_en=row["narrative_en"],
                narrative_hi=row["narrative_hi"],
                lat=row["lat"],
                lng=row["lng"],
                city=row["city"],
                area_en=row["area_en"],
                area_hi=row["area_hi"],
                unesco=row["unesco"],
                unesco_ref=row["unesco_ref"],
                image_url=row["image_url"],
                image_credit=row["image_credit"],
                day_hint=row["day_hint"],
            )
        )
    for row in ETIQUETTE:
        session.add(
            EtiquetteFact(
                site_slug=row["site_slug"],
                field=row["field"],
                value_en=row["value_en"],
                value_hi=row["value_hi"],
                source_code=row["source_code"],
                verified_at=row["verified_at"],
                status=row["status"],
            )
        )
    for row in KNOWLEDGE:
        session.add(
            KnowledgeFact(
                site_slug=row["site_slug"],
                claim_en=row["claim_en"],
                claim_hi=row["claim_hi"],
                source_code=row["source_code"],
                verified_at=row["verified_at"],
                status=row["status"],
                tags=row["tags"],
            )
        )
    session.add(
        Changelog(
            site_slug=None,
            field="policy",
            message="Seeded public ledger: YatraSathi will not invent ratings.",
            lang="en",
            created_at=datetime.now(timezone.utc),
            status="public",
        )
    )
    session.commit()
    print("Seeded Jaipur pack.")


if __name__ == "__main__":
    main()
