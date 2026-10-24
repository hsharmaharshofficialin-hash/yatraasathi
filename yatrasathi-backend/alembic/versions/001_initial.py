"""initial tables

Revision ID: 001_initial
Revises:
Create Date: 2026-04-08
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "001_initial"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "sites",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("slug", sa.Text(), nullable=False, unique=True),
        sa.Column("name_en", sa.Text(), nullable=False),
        sa.Column("name_hi", sa.Text(), nullable=False),
        sa.Column("summary_en", sa.Text(), nullable=False),
        sa.Column("summary_hi", sa.Text(), nullable=False),
        sa.Column("narrative_en", sa.Text(), nullable=False),
        sa.Column("narrative_hi", sa.Text(), nullable=False),
        sa.Column("lat", sa.Float(), nullable=False),
        sa.Column("lng", sa.Float(), nullable=False),
        sa.Column("city", sa.Text(), nullable=False),
        sa.Column("area_en", sa.Text(), nullable=False),
        sa.Column("area_hi", sa.Text(), nullable=False),
        sa.Column("unesco", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("unesco_ref", sa.Text(), nullable=True),
        sa.Column("image_url", sa.Text(), nullable=False),
        sa.Column("image_credit", sa.Text(), nullable=False),
        sa.Column("day_hint", sa.Integer(), nullable=False, server_default="1"),
    )
    op.create_table(
        "sources",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("code", sa.Text(), nullable=False, unique=True),
        sa.Column("title", sa.Text(), nullable=False),
        sa.Column("publisher", sa.Text(), nullable=False),
        sa.Column("url", sa.Text(), nullable=True),
        sa.Column("verified_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("verifier", sa.Text(), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
    )
    op.create_table(
        "etiquette_facts",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("site_slug", sa.Text(), nullable=False),
        sa.Column("field", sa.Text(), nullable=False),
        sa.Column("value_en", sa.Text(), nullable=False),
        sa.Column("value_hi", sa.Text(), nullable=False),
        sa.Column("source_code", sa.Text(), nullable=True),
        sa.Column("verified_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("status", sa.Text(), nullable=False),
    )
    op.create_table(
        "knowledge_facts",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("site_slug", sa.Text(), nullable=True),
        sa.Column("claim_en", sa.Text(), nullable=False),
        sa.Column("claim_hi", sa.Text(), nullable=False),
        sa.Column("source_code", sa.Text(), nullable=True),
        sa.Column("verified_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("status", sa.Text(), nullable=False),
        sa.Column("tags", sa.Text(), nullable=False, server_default=""),
    )
    op.create_table(
        "itineraries",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("guest_id", sa.Text(), nullable=False),
        sa.Column("client_id", sa.Text(), nullable=False),
        sa.Column("day_number", sa.Integer(), nullable=False),
        sa.Column("site_slug", sa.Text(), nullable=True),
        sa.Column("notes", sa.Text(), nullable=False, server_default=""),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("rev", sa.Integer(), nullable=False, server_default="1"),
        sa.UniqueConstraint("guest_id", "client_id", name="itineraries_guest_client"),
    )
    op.create_table(
        "changelog",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("site_slug", sa.Text(), nullable=True),
        sa.Column("field", sa.Text(), nullable=True),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("lang", sa.Text(), nullable=False, server_default="en"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("status", sa.Text(), nullable=False, server_default="public"),
    )


def downgrade() -> None:
    op.drop_table("changelog")
    op.drop_table("itineraries")
    op.drop_table("knowledge_facts")
    op.drop_table("etiquette_facts")
    op.drop_table("sources")
    op.drop_table("sites")
