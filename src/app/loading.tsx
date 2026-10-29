import ProductGridSkeleton from "@/components/ProductGridSkeleton";

// Ditampilkan Next.js saat halaman sedang mengambil data (misal dari Google Sheet)
export default function Loading() {
  return <ProductGridSkeleton />;
}
