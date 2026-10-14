import { getAllParts } from "@/lib/store";
import ProductListPage from "@/components/ProductListPage";

export const dynamic = "force-dynamic";

export default async function PopularPage() {
  const allParts = await getAllParts();
  const items = [...allParts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return <ProductListPage title="Populer" items={items} />;
}
