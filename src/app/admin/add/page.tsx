import AddPartsForm from "@/components/AddPartsForm";

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Tambah Produk Parts & Aksesoris</h1>
          <p className="mt-2 text-sm text-black/60">
            Input data produk parts & aksesoris baru. Anda bisa scrape gambar langsung dari Shopee link.
          </p>
        </div>
        <AddPartsForm />
      </div>
    </div>
  );
}
