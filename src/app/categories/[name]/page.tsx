import { notFound } from "next/navigation";
import { getAllParts } from "@/lib/store";
import { PARTS_CATEGORIES, categoryToSlug } from "@/lib/types";
import ProductListPage from "@/components/ProductListPage";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const category = PARTS_CATEGORIES.find((c) => categoryToSlug(c) === name);
  if (!category) notFound();

  const allParts = await getAllParts();
  const items = allParts.filter((p) => p.kategori === category);

  return <ProductListPage title={category} items={items} />;
}
