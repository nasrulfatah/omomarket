import { getAllParts } from "@/lib/store";
import { PARTS_CATEGORIES, categoryToSlug, Part } from "@/lib/types";
import ProductListPage from "@/components/ProductListPage";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string }>;
}) {
  const { q = "", kategori = "" } = await searchParams;
  const query = q.trim();
  const allParts = await getAllParts();

  let items: Part[] = allParts;
  let categoryTitle = "";

  if (kategori === "popular") {
    categoryTitle = "Populer";
    items = [...allParts]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8);
  } else if (kategori) {
    const category = PARTS_CATEGORIES.find((c) => categoryToSlug(c) === kategori);
    categoryTitle = category ?? "";
    items = category ? allParts.filter((p) => p.kategori === category) : [];
  }

  if (query) {
    items = items.filter((p) => p.nama.toLowerCase().includes(query.toLowerCase()));
  }

  const title = [categoryTitle, query ? `"${query}"` : ""].filter(Boolean).join(" · ") || "Semua Produk";

  return <ProductListPage title={title} items={items} query={query} kategori={kategori} />;
}
