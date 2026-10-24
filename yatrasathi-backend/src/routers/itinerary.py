from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from src.db import get_session
from src.models import Itinerary
from src.schemas.api import ItineraryItemIn, SyncIn, SyncOut, SyncResultOut

router = APIRouter()


@router.post("/itinerary/sync", response_model=SyncOut)
def sync(body: SyncIn, session: Session = Depends(get_session)):
    results: list[SyncResultOut] = []
    for item in body.items:
        existing = session.scalar(
            select(Itinerary).where(Itinerary.guest_id == body.guest_id, Itinerary.client_id == item.clientId)
        )
        if not existing:
            session.add(
                Itinerary(
                    guest_id=body.guest_id,
                    client_id=item.clientId,
                    day_number=item.dayNumber,
                    site_slug=item.siteSlug,
                    notes=item.notes,
                    updated_at=datetime.now(timezone.utc),
                    rev=item.rev or 1,
                )
            )
            results.append(SyncResultOut(clientId=item.clientId, status="saved", rev=item.rev or 1))
            continue
        if existing.rev > item.rev:
            results.append(SyncResultOut(clientId=item.clientId, status="conflict", rev=existing.rev))
            continue
        existing.day_number = item.dayNumber
        existing.site_slug = item.siteSlug
        existing.notes = item.notes
        existing.rev = item.rev + 1
        existing.updated_at = datetime.now(timezone.utc)
        results.append(SyncResultOut(clientId=item.clientId, status="saved", rev=existing.rev))
    session.commit()
    stored = list(session.scalars(select(Itinerary).where(Itinerary.guest_id == body.guest_id)).all())
    return SyncOut(
        results=results,
        items=[
            ItineraryItemIn(
                clientId=row.client_id,
                dayNumber=row.day_number,
                siteSlug=row.site_slug,
                notes=row.notes,
                updatedAt=row.updated_at.isoformat(),
                rev=row.rev,
            )
            for row in stored
        ],
    )
