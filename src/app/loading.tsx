import AccessoriesSkeleton from "@/components/AccessoriesSkeleton";
import { getCategoryOrder } from "@/lib/store";

// Ditampilkan saat halaman utama (Aksesoris) sedang mengambil data dari Google Sheet.
// Urutan kategori diambil dari cache supaya sama dengan halaman setelah data masuk.
export default async function Loading() {
  const categoryOrder = await getCategoryOrder().catch(() => undefined);
  return <AccessoriesSkeleton categoryOrder={categoryOrder} />;
}
