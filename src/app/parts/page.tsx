import { getAllParts } from "@/lib/store";
import PartsGrid from "@/components/PartsGrid";
import CategoryCardsGrid from "@/components/CategoryCardsGrid";
import CategoryBannerCarousel from "@/components/CategoryBannerCarousel";

export const dynamic = "force-dynamic";

export default async function PartsPage() {
  const allParts = await getAllParts();

  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-line bg-gradient-to-br from-accent/5 via-white to-blue-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black md:text-5xl">Omo Recommended Parts</h1>
            <p className="mt-4 text-base text-black/70">
              Temukan aksesori dan suku cadang berkualitas tinggi untuk motor listrik Omoway Anda
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
          {/* Banner Carousel */}
          <CategoryBannerCarousel />

          {/* Category Cards Grid */}
          <CategoryCardsGrid />

          {/* Filter & Products */}
          <PartsGrid parts={allParts} />
        </div>
      </section>
    </div>
  );
}
