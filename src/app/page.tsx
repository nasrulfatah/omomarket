import { getAllParts } from "@/lib/store";
import CategoryBannerCarousel from "@/components/CategoryBannerCarousel";
import PartsPageClient from "@/components/PartsPageClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allParts = await getAllParts();

  return (
    <div>
      {/* Accessories Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
          {/* Page Title */}
          <div className="mb-5">
            <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent-soft-text">
              Katalog Accessories
            </span>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight text-black sm:text-3xl lg:text-4xl">
              Omo Recommended Accessories
            </h1>
            <p className="mt-2 text-sm text-black/60 sm:text-base">
              Rekomendasi parts & aksesoris dari Omoriders lain
            </p>
          </div>

          {/* Banner Carousel */}
          <CategoryBannerCarousel parts={allParts} />

          {/* Category Cards + Filtered Products */}
          <PartsPageClient parts={allParts} />
        </div>
      </section>
    </div>
  );
}
