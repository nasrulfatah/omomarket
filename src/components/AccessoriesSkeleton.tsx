// Placeholder halaman Aksesoris: judul, pencarian, banner, kategori, carousel, lalu grid produk.
// Susunannya meniru src/app/accessories/page.tsx supaya tidak ada yang bergeser saat data masuk.
const PLACEHOLDER = "bg-neutral-200 motion-safe:animate-pulse";

function CardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line/70 bg-white shadow-sm">
      <div className={`aspect-square w-full ${PLACEHOLDER}`} />
      <div className="flex flex-col gap-2 p-3">
        <div className={`h-4 w-4/5 rounded ${PLACEHOLDER}`} />
        <div className={`h-4 w-3/5 rounded ${PLACEHOLDER}`} />
        <div className={`mt-2 h-5 w-2/5 rounded ${PLACEHOLDER}`} />
        <div className={`mt-1 h-9 w-full rounded-full ${PLACEHOLDER}`} />
      </div>
    </div>
  );
}

export default function AccessoriesSkeleton() {
  return (
    <div className="bg-white" role="status" aria-busy="true">
      <span className="sr-only">Memuat produk...</span>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-12 lg:py-8">
        {/* Judul halaman */}
        <div className="mb-5">
          <div className={`h-7 w-3/4 rounded sm:w-96 lg:h-9 ${PLACEHOLDER}`} />
        </div>

        {/* Pencarian */}
        <div className="mb-6 flex gap-2">
          <div className={`h-10 flex-1 rounded-xl ${PLACEHOLDER}`} />
          <div className={`h-10 w-20 rounded-xl ${PLACEHOLDER}`} />
        </div>

        {/* Banner carousel */}
        <div className={`mb-10 aspect-[16/5] w-full rounded-2xl ${PLACEHOLDER}`} />

        {/* Kategori */}
        <div className="mb-10 grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 rounded-2xl border border-line/70 bg-white p-3"
            >
              <div className={`h-8 w-8 rounded-full sm:h-10 sm:w-10 ${PLACEHOLDER}`} />
              <div className={`h-3 w-4/5 rounded ${PLACEHOLDER}`} />
            </div>
          ))}
        </div>

        {/* Carousel per kategori */}
        <div className="mb-10 space-y-3">
          <div className={`h-5 w-40 rounded ${PLACEHOLDER}`} />
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-[200px] flex-shrink-0">
                <CardSkeleton />
              </div>
            ))}
          </div>
        </div>

        {/* Jumlah produk dan grid */}
        <div className="space-y-6 border-t border-line/30 pt-6">
          <div className={`h-4 w-24 rounded ${PLACEHOLDER}`} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
