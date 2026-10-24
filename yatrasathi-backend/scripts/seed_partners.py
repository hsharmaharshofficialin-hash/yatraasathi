"""Adds clearly-labelled DEMO partners. Safe to run again. Run from the yatrasathi-backend folder."""
import json
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from sqlalchemy import text  # noqa: E402

from src.packgo import engine  # noqa: E402

AIRPORT, AMBER, OLD_CITY, CIVIL, MALVIYA = (26.8242, 75.8122), (26.9855, 75.8513), (26.9239, 75.8267), (26.9124, 75.7873), (26.8553, 75.8140)

PARTNERS = [
    ("heritage-guide", "guide", "Demo Heritage Guide", "en,hi,de,fr", 1800, "per_day", True, AMBER,
     "Walks you through Amber Fort and the old city, with a source for every story."),
    ("night-guide", "guide", "Demo Night Walk Guide", "en,hi,ru,ja", 2000, "per_day", False, OLD_CITY,
     "Evening walks through the old city. Not available right now."),
    ("multilingual-guide", "guide", "Demo Multilingual Guide", "en,zh,ja", 2200, "per_day", True, OLD_CITY,
     "Guided day in English, Chinese or Japanese."),
    ("airport-pickup", "transport", "Demo Airport Pickup", "en,hi,ru", 900, "per_trip", True, AIRPORT,
     "Meet-and-greet and a ride from Jaipur airport to your stay."),
    ("day-driver", "transport", "Demo Day Driver", "en,hi,ne", 3200, "per_day", True, CIVIL,
     "A car and driver for the day."),
    ("photographer", "photographer", "Demo Travel Photographer", "en,hi,ja,zh", 2500, "per_day", True, MALVIYA,
     "A photographer for your day at the forts."),
    ("food-walk", "experience", "Demo Street Food Walk", "en,hi", 1200, "per_person", True, OLD_CITY,
     "An evening food walk through the old market lanes."),
    ("block-printing", "experience", "Demo Block-Printing Workshop", "en,hi,fr", 1500, "per_person", True, MALVIYA,
     "Learn hand block printing, a Rajasthani craft."),
]

SQL = text(
    "INSERT INTO partners (slug, kind, name, city, languages, blurb, price_inr, unit, is_demo, available_now, lat, lng) "
    "VALUES (:slug, :kind, :name, 'Jaipur', :langs, CAST(:blurb AS jsonb), :price, :unit, true, :avail, :lat, :lng) "
    "ON CONFLICT (slug) DO UPDATE SET kind = EXCLUDED.kind, name = EXCLUDED.name, languages = EXCLUDED.languages, "
    "blurb = EXCLUDED.blurb, price_inr = EXCLUDED.price_inr, unit = EXCLUDED.unit, "
    "available_now = EXCLUDED.available_now, lat = EXCLUDED.lat, lng = EXCLUDED.lng"
)

with engine().begin() as c:
    for slug, kind, name, langs, price, unit, avail, (lat, lng), blurb in PARTNERS:
        c.execute(SQL, {"slug": slug, "kind": kind, "name": name, "langs": langs,
                        "blurb": json.dumps({"en": blurb}), "price": price, "unit": unit,
                        "avail": avail, "lat": lat, "lng": lng})
print(f"Seeded {len(PARTNERS)} demo partners")