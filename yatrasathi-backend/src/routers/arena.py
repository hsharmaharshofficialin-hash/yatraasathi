from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.db import get_session
from src.schemas.api import ArenaIn, ArenaOut, UnsupportedOut
from src.services import pramaan

router = APIRouter()


@router.post("/arena", response_model=ArenaOut)
def arena(body: ArenaIn, session: Session = Depends(get_session)):
    grounded = pramaan.answer(session, body.question, body.lang, body.site_slug)
    plain = pramaan.plain_answer(session, body.question, body.lang, body.site_slug)
    verified = {seg.text for seg in grounded.segments if seg.status == "verified"}
    unsupported = [
        UnsupportedOut(text=seg.text, reason=seg.reason or "Not supported by the knowledge pack.")
        for seg in plain.segments
        if seg.text not in verified
    ]
    return ArenaOut(
        question=body.question,
        lang=body.lang,
        plain=plain,
        pramaan=grounded,
        unsupported=unsupported,
    )
