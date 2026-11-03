import Link from "next/link";
import { PARTS_CATEGORIES, categoryToSlug } from "@/lib/types";
import { CATEGORY_ICONS, CategoryIcon, cardClass } from "@/components/CategoryCardsGrid";

// Placeholder halaman Aksesoris: judul, pencarian, banner, kategori, carousel, lalu grid produk.
// Susunannya meniru src/app/accessories/page.tsx supaya tidak ada yang bergeser saat data masuk.
// Judul, pencarian, dan kotak kategori bersifat statis sehingga langsung tampil.
const PLACEHOLDER = "bg-neutral-200 motion-safe:animate-pulse";

function CardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line/70 bg-white shadow-sm">
      <div className={`aspect-square w-full ${PLACEHOLDER}`} />
      <div className="flex flex-col gap-2 p-3">
        <div className={`h-4 w-4/5 rounded ${PLACEHOLDER}`} />
        <div className={`h-4 w-3/5 rounded ${PLACEHOLDER}`} />
        <div className={`mt-2 h-5 w-2/5 rounded ${PLACEHOLDER}`} />
        <div className="mt-1 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-bold text-black">
          Beli
        </div>
      </div>
    </div>
  );
}

export default function AccessoriesSkeleton() {
  return (
    <div className="bg-white" role="status" aria-busy="true">
      <span className="sr-only">Memuat produk...</span>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-12 lg:py-8">
        {/* Judul halaman (statis, tidak perlu skeleton) */}
        <div className="mb-5">
          <h1 className="text-xl font-extrabold leading-tight text-black sm:text-2xl lg:text-3xl">
            Omo Recommended Accessories
          </h1>
        </div>

        {/* Pencarian (statis, tampil langsung tanpa skeleton) */}
        <div className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="text"
              name="q"
              placeholder="Ketik nama produk..."
              readOnly
              className="w-full rounded-xl border border-line/70 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-black placeholder:text-black/40"
            />
          </div>
          <button
            type="button"
            className="rounded-xl bg-accent px-5 text-sm font-bold text-black"
          >
            Cari
          </button>
        </div>

        {/* Banner carousel */}
        <div className={`mb-10 aspect-[16/5] w-full rounded-2xl ${PLACEHOLDER}`} />

        {/* Kategori (statis, tampil langsung tanpa skeleton) */}
        <div className="mb-10 grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
          {PARTS_CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/search?kategori=${categoryToSlug(category)}`}
              prefetch={false}
              className={cardClass}
            >
              <div className="flex flex-col items-center gap-1.5 text-center sm:gap-2">
                <CategoryIcon icon={CATEGORY_ICONS[category]} label={category} />
                <h3 className="text-[11px] font-semibold text-black sm:text-sm">{category}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Carousel per kategori */}
        <div className="mb-10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-black">Populer</h3>
            <Link
              href="/search?kategori=popular"
              prefetch={false}
              className="text-xs font-semibold text-accent-soft-text"
            >
              Lihat Semua
            </Link>
          </div>
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
