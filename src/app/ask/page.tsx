import { AskPanel } from "@/components/AskPanel";
import CityAsk from "@/components/CityAsk";

export default async function AskPage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const sp = await searchParams;
  const city = typeof sp?.city === "string" ? sp.city : "";
  return city ? <CityAsk slug={city} /> : <AskPanel />;
}
