import { getSite } from "@/lib/site-query";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const site = await getSite(slug);
  if (!site) return Response.json({ error: "unknown site" }, { status: 404 });
  return Response.json({ site });
}
