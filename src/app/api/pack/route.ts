import { knowledgePackPayload } from "@/lib/pramaan";
import { ETIQUETTE, SITES } from "@/data/jaipur-sites";
import { PHRASES } from "@/data/phrases";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    ...knowledgePackPayload(),
    sites: SITES,
    etiquette: ETIQUETTE,
    phrases: PHRASES,
    generatedAt: new Date().toISOString(),
  });
}
