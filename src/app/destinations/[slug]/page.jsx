import { notFound } from "next/navigation";
import DestinationPage from "@/components/DestinationPage";
import { DESTS } from "@/data/destinations";

export default async function Page({ params }) {
  const { slug } = await params;
  const dest = DESTS.find((d) => d.s === slug);
  if (!dest) notFound();
  return <DestinationPage dest={dest} />;
}
