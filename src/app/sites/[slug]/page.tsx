import { SiteDetail } from "@/components/SiteDetail";

export default async function SitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SiteDetail slug={slug} />;
}
