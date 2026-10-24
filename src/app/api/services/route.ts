export const dynamic = "force-dynamic";

type OsmElement = {
  id: number;
  lat?: number;
  lon?: number;
  tags?: Record<string, string>;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lat = Number(url.searchParams.get("lat"));
  const lng = Number(url.searchParams.get("lng"));
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return Response.json({ error: "lat and lng required" }, { status: 400 });
  }
  const query = `[out:json][timeout:12];
(
  node["amenity"="toilets"](around:900,${lat},${lng});
  node["amenity"="drinking_water"](around:900,${lat},${lng});
  node["amenity"="hospital"](around:1600,${lat},${lng});
  node["amenity"="clinic"](around:1600,${lat},${lng});
  node["amenity"="police"](around:1600,${lat},${lng});
);
out body 25;`;
  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
      body: `data=${encodeURIComponent(query)}`,
      signal: AbortSignal.timeout(14000),
    });
    if (!res.ok) {
      return Response.json({ services: [], unknown: true, reason: "Overpass did not answer." });
    }
    const data = (await res.json()) as { elements?: OsmElement[] };
    const services = (data.elements || [])
      .filter((el) => el.lat && el.lon)
      .map((el) => ({
        id: el.id,
        lat: el.lat,
        lng: el.lon,
        kind: el.tags?.amenity || "unknown",
        name: el.tags?.name || null,
      }));
    return Response.json({
      services,
      source: "OpenStreetMap Overpass API",
      note: "Volunteer-mapped. Completeness unknown. Not a safety rating.",
    });
  } catch {
    return Response.json({ services: [], unknown: true, reason: "Overpass timed out or was unreachable." });
  }
}
