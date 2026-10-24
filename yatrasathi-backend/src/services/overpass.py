import httpx


def nearby(lat: float, lng: float) -> dict:
    query = f"""[out:json][timeout:12];
(
  node["amenity"="toilets"](around:900,{lat},{lng});
  node["amenity"="drinking_water"](around:900,{lat},{lng});
  node["amenity"="hospital"](around:1600,{lat},{lng});
  node["amenity"="police"](around:1600,{lat},{lng});
);
out body 25;"""
    try:
        res = httpx.post(
            "https://overpass-api.de/api/interpreter",
            data={"data": query},
            timeout=14,
        )
        res.raise_for_status()
        elements = res.json().get("elements") or []
        services = [
            {
                "id": el.get("id"),
                "lat": el.get("lat"),
                "lng": el.get("lon"),
                "kind": (el.get("tags") or {}).get("amenity", "unknown"),
                "name": (el.get("tags") or {}).get("name"),
            }
            for el in elements
            if el.get("lat") and el.get("lon")
        ]
        return {"services": services, "source": "OpenStreetMap Overpass API", "unknown": False}
    except Exception:
        return {"services": [], "unknown": True, "reason": "Overpass did not answer."}
