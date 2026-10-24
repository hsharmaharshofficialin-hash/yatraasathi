from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from src.db import get_session
from src.schemas.api import AskIn, AskOut
from src.services import llm, pramaan

router = APIRouter()


@router.post("/ask")
def ask(body: AskIn, session: Session = Depends(get_session)):
    result = pramaan.answer(session, body.question, body.lang, body.site_slug)
    tagged = llm.try_openai(f"Question: {body.question}\nLang: {body.lang}\nSite: {body.site_slug}")
    if tagged:
        result = AskOut(
            segments=tagged,
            sources=result.sources,
            engine="openai",
            mode="pramaan",
            lang=result.lang,
            abstained=all(seg.status == "unknown" for seg in tagged),
        )
    if not body.stream:
        return result

    def gen():
        yield result.model_dump_json() + "\n"

    return StreamingResponse(gen(), media_type="application/x-ndjson")
