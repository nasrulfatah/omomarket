import { getAllParts } from "@/lib/store";
import PartsPageClient from "@/components/PartsPageClient";

export const dynamic = "force-dynamic";

export default async function AccessoriesPage() {
  const allParts = await getAllParts();

  return (
    <div>
      {/* Accessories Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-12 lg:py-8">
          {/* Page Title */}
          <div className="mb-5">
            <h1 className="text-xl font-extrabold leading-tight text-black sm:text-2xl lg:text-3xl">
              Omo Recommended Accessories
            </h1>
          </div>

          {/* Category Cards + Filtered Products */}
          <PartsPageClient parts={allParts} />
        </div>
      </section>
    </div>
  );
}
