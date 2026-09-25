import { getAllParts } from "@/lib/store";
import CategoryBannerCarousel from "@/components/CategoryBannerCarousel";
import PartsPageClient from "@/components/PartsPageClient";

export const dynamic = "force-dynamic";

export default async function PartsPage() {
  const allParts = await getAllParts();

  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
          {/* Page Title */}
          <div className="mb-4">
            <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent-soft-text">
              Omo Recommended Parts
            </span>
            <p className="mt-2 text-sm text-black/60">
              Aksesori & suku cadang berkualitas untuk motor listrik Omoway Anda
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
