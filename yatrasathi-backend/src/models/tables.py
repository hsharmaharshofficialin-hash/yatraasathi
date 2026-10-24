from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from src.db import Base


class Site(Base):
    __tablename__ = "sites"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    slug: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    name_en: Mapped[str] = mapped_column("name_en", Text, nullable=False)
    name_hi: Mapped[str] = mapped_column("name_hi", Text, nullable=False)
    summary_en: Mapped[str] = mapped_column(Text, nullable=False)
    summary_hi: Mapped[str] = mapped_column(Text, nullable=False)
    narrative_en: Mapped[str] = mapped_column(Text, nullable=False)
    narrative_hi: Mapped[str] = mapped_column(Text, nullable=False)
    lat: Mapped[float] = mapped_column(Float, nullable=False)
    lng: Mapped[float] = mapped_column(Float, nullable=False)
    city: Mapped[str] = mapped_column(Text, nullable=False)
    area_en: Mapped[str] = mapped_column(Text, nullable=False)
    area_hi: Mapped[str] = mapped_column(Text, nullable=False)
    unesco: Mapped[bool] = mapped_column(Boolean, default=False)
    unesco_ref: Mapped[str | None] = mapped_column(Text, nullable=True)
    image_url: Mapped[str] = mapped_column(Text, nullable=False)
    image_credit: Mapped[str] = mapped_column(Text, nullable=False)
    day_hint: Mapped[int] = mapped_column(Integer, default=1)


class Source(Base):
    __tablename__ = "sources"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    code: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    publisher: Mapped[str] = mapped_column(Text, nullable=False)
    url: Mapped[str | None] = mapped_column(Text, nullable=True)
    verified_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    verifier: Mapped[str] = mapped_column(Text, nullable=False)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)


class EtiquetteFact(Base):
    __tablename__ = "etiquette_facts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    site_slug: Mapped[str] = mapped_column(Text, nullable=False)
    field: Mapped[str] = mapped_column(Text, nullable=False)
    value_en: Mapped[str] = mapped_column(Text, nullable=False)
    value_hi: Mapped[str] = mapped_column(Text, nullable=False)
    source_code: Mapped[str | None] = mapped_column(Text, nullable=True)
    verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    status: Mapped[str] = mapped_column(Text, nullable=False)


class KnowledgeFact(Base):
    __tablename__ = "knowledge_facts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    site_slug: Mapped[str | None] = mapped_column(Text, nullable=True)
    claim_en: Mapped[str] = mapped_column(Text, nullable=False)
    claim_hi: Mapped[str] = mapped_column(Text, nullable=False)
    source_code: Mapped[str | None] = mapped_column(Text, nullable=True)
    verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    status: Mapped[str] = mapped_column(Text, nullable=False)
    tags: Mapped[str] = mapped_column(Text, default="")


class Itinerary(Base):
    __tablename__ = "itineraries"
    __table_args__ = (UniqueConstraint("guest_id", "client_id", name="itineraries_guest_client"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    guest_id: Mapped[str] = mapped_column(Text, nullable=False)
    client_id: Mapped[str] = mapped_column(Text, nullable=False)
    day_number: Mapped[int] = mapped_column(Integer, nullable=False)
    site_slug: Mapped[str | None] = mapped_column(Text, nullable=True)
    notes: Mapped[str] = mapped_column(Text, default="")
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    rev: Mapped[int] = mapped_column(Integer, default=1)


class Changelog(Base):
    __tablename__ = "changelog"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    site_slug: Mapped[str | None] = mapped_column(Text, nullable=True)
    field: Mapped[str | None] = mapped_column(Text, nullable=True)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    lang: Mapped[str] = mapped_column(Text, default="en")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    status: Mapped[str] = mapped_column(Text, default="public")
