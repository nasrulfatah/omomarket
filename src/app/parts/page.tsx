import { getAllParts } from "@/lib/store";
import CategoryBannerCarousel from "@/components/CategoryBannerCarousel";
import PartsPageClient from "@/components/PartsPageClient";

export const dynamic = "force-dynamic";

export default async function PartsPage() {
  const allParts = await getAllParts();

  return (
    <div>
      {/* Hero Section */}
      <section className="border-b border-line bg-gradient-to-br from-accent/5 via-white to-blue-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-bold text-black sm:text-3xl">Omo Recommended Parts</h1>
          <p className="mt-1.5 text-sm text-black/60">
            Aksesori & suku cadang berkualitas untuk motor listrik Omoway Anda
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
          {/* Banner Carousel */}
          <CategoryBannerCarousel parts={allParts} />

          {/* Category Cards + Filtered Products */}
          <PartsPageClient parts={allParts} />
        </div>
      </section>
    </div>
  );
}
