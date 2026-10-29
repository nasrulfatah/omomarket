// Placeholder kartu produk saat data sedang dimuat. Bentuknya meniru PartCard supaya tata letak tidak bergeser.
const CARD_COUNT = 8;

export default function ProductGridSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6" role="status" aria-busy="true">
      <span className="sr-only">Memuat produk...</span>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-2xl border border-line/70 bg-white shadow-sm"
          >
            <div className="aspect-square w-full bg-neutral-200 motion-safe:animate-pulse" />
            <div className="flex flex-col gap-2 p-3">
              <div className="h-4 w-4/5 rounded bg-neutral-200 motion-safe:animate-pulse" />
              <div className="h-4 w-3/5 rounded bg-neutral-200 motion-safe:animate-pulse" />
              <div className="mt-2 h-5 w-2/5 rounded bg-neutral-200 motion-safe:animate-pulse" />
              <div className="mt-1 h-9 w-full rounded-full bg-neutral-200 motion-safe:animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
