"""PACK & GO and JUST LANDED tables

Revision ID: 002_pack_go_just_landed
Revises: 001_initial
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "002_pack_go_just_landed"
down_revision = "001_initial"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "partners",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("slug", sa.String(80), nullable=False, unique=True),
        sa.Column("kind", sa.String(24), nullable=False),
        sa.Column("name", sa.String(120), nullable=False),
        sa.Column("city", sa.String(60), nullable=False, server_default="Jaipur"),
        sa.Column("languages", sa.String(120), nullable=False, server_default=""),
        sa.Column("blurb", postgresql.JSONB, nullable=False, server_default=sa.text("'{}'::jsonb")),
        sa.Column("price_inr", sa.Integer, nullable=False),
        sa.Column("unit", sa.String(16), nullable=False),
        sa.Column("is_demo", sa.Boolean, nullable=False, server_default=sa.true()),
        sa.Column("available_now", sa.Boolean, nullable=False, server_default=sa.true()),
        sa.Column("lat", sa.Float),
        sa.Column("lng", sa.Float),
    )
    op.create_table(
        "trip_plans",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("guest_id", sa.String(64), nullable=False, index=True),
        sa.Column("arrival_date", sa.Date, nullable=False),
        sa.Column("city", sa.String(60), nullable=False),
        sa.Column("days", sa.Integer, nullable=False),
        sa.Column("group_size", sa.Integer, nullable=False),
        sa.Column("interests", postgresql.JSONB, nullable=False, server_default=sa.text("'[]'::jsonb")),
        sa.Column("lang", sa.String(8), nullable=False, server_default="en"),
        sa.Column("items", postgresql.JSONB, nullable=False, server_default=sa.text("'[]'::jsonb")),
        sa.Column("total_inr", sa.Integer, nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
    )
    op.create_table(
        "bookings",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("guest_id", sa.String(64), nullable=False, index=True),
        sa.Column("kind", sa.String(12), nullable=False),
        sa.Column("plan_id", sa.String(32), sa.ForeignKey("trip_plans.id", ondelete="CASCADE")),
        sa.Column("partner_id", sa.Integer, sa.ForeignKey("partners.id", ondelete="SET NULL")),
        sa.Column("status", sa.String(12), nullable=False, server_default="requested"),
        sa.Column("quote_inr", sa.Integer, nullable=False, server_default="0"),
        sa.Column("note", sa.String(300), nullable=False, server_default=""),
        sa.Column("lat", sa.Float),
        sa.Column("lng", sa.Float),
        sa.Column("lang", sa.String(8), nullable=False, server_default="en"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
    )
    # Row Level Security on, no policies: blocks Supabase's public API, not this backend.
    for table in ("partners", "trip_plans", "bookings"):
        op.execute(f"ALTER TABLE {table} ENABLE ROW LEVEL SECURITY")


def downgrade():
    op.drop_table("bookings")
    op.drop_table("trip_plans")
    op.drop_table("partners")