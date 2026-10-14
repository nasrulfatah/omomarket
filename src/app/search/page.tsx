import { getAllParts } from "@/lib/store";
import ProductListPage from "@/components/ProductListPage";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const allParts = await getAllParts();
  const items = query
    ? allParts.filter((p) => p.nama.toLowerCase().includes(query.toLowerCase()))
    : [];

  return <ProductListPage title={query ? `Hasil pencarian "${query}"` : "Pencarian"} items={items} />;
}
