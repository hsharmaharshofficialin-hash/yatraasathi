from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from src.db import get_session
from src.models import Changelog
from src.schemas.api import ChangelogIn, ChangelogListOut, ChangelogRow

router = APIRouter()


@router.get("/changelog", response_model=ChangelogListOut)
def list_changelog(session: Session = Depends(get_session)):
    rows = list(session.scalars(select(Changelog).order_by(Changelog.created_at.desc()).limit(50)).all())
    return ChangelogListOut(
        entries=[
            ChangelogRow(
                id=row.id,
                siteSlug=row.site_slug,
                field=row.field,
                message=row.message,
                lang=row.lang,
                createdAt=row.created_at,
            )
            for row in rows
        ]
    )


@router.post("/changelog")
def add_changelog(body: ChangelogIn, session: Session = Depends(get_session)):
    row = Changelog(
        site_slug=body.site_slug,
        field=body.field,
        message=body.message,
        lang=body.lang or "en",
        created_at=datetime.now(timezone.utc),
        status="public",
    )
    session.add(row)
    session.commit()
    session.refresh(row)
    return {
        "entry": ChangelogRow(
            id=row.id,
            siteSlug=row.site_slug,
            field=row.field,
            message=row.message,
            lang=row.lang,
            createdAt=row.created_at,
        )
    }
