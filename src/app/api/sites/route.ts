import { listSites } from "@/lib/site-query";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lng = url.searchParams.get("lng");
  const radius = url.searchParams.get("radius");
  const sites = await listSites(
    lat ? Number(lat) : undefined,
    lng ? Number(lng) : undefined,
    radius ? Number(radius) : undefined,
  );
  return Response.json({ sites });
}
