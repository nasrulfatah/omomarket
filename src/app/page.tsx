import { getAllListings, getAllParts } from "@/lib/store";
import HomeContent from "@/components/HomeContent";
import CategoryBannerCarousel from "@/components/CategoryBannerCarousel";
import PartsPageClient from "@/components/PartsPageClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const listings = await getAllListings();
  const allParts = await getAllParts();

  return (
    <div>
      {/* Parts Section - di atas */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
          {/* Page Title */}
          <div className="mb-5">
            <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent-soft-text">
              Katalog Parts
            </span>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight text-black sm:text-3xl lg:text-4xl">
              Omo Recommended Parts
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

      {/* Katalog Section - di bawah */}
      <HomeContent listings={listings} />
    </div>
  );
}
