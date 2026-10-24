from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from src.config import get_settings
from src.routers import arena, ask, changelog, itinerary, sites
from src.schemas.api import HealthOut
from src.services.overpass import nearby

settings = get_settings()
origins = [item.strip() for item in settings.FRONTEND_ORIGIN.split(",") if item.strip()]

app = FastAPI(
    title="YatraSathi API",
    version="1.0.0",
    description="Honest travel companion backend. /docs is the contract. No developer-edited JSON payloads.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sites.router)
app.include_router(ask.router)
app.include_router(arena.router)
app.include_router(itinerary.router)
app.include_router(changelog.router)


@app.get("/health", response_model=HealthOut)
def health():
    from fastapi import HTTPException

    try:
        from src.db import get_engine

        with get_engine().connect() as conn:
            conn.execute(text("select 1"))
        return HealthOut(ok=True)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/services")
def services(lat: float, lng: float):
    return nearby(lat, lng)


@app.get("/pack")
def pack():
    from src.data.jaipur_sites import ETIQUETTE, KNOWLEDGE, SITES, SOURCES

    return {"facts": KNOWLEDGE, "sources": SOURCES, "sites": SITES, "etiquette": ETIQUETTE}


from src.packgo import router as packgo_router
app.include_router(packgo_router)
