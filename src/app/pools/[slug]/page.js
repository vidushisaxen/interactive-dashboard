import { notFound } from "next/navigation";
import PoolDetailsScreen from "@/components/PoolDetailsScreen";
import { POOLS, getPoolBySlug } from "@/components/dashboard-data";

export function generateStaticParams() {
  return POOLS.map((pool) => ({
    slug: pool.slug,
  }));
}

export default async function PoolDetailsPage({ params }) {
  const { slug } = await params;
  const pool = getPoolBySlug(slug);

  if (!pool) {
    notFound();
  }

  return <PoolDetailsScreen pool={pool} />;
}
