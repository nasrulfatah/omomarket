import { getAllParts } from "@/lib/store";
import PartsGrid from "@/components/PartsGrid";

export const dynamic = "force-dynamic";

export default async function PartsPage() {
  const allParts = await getAllParts();

  return (
    <div>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-black">Rekomendasi Parts Omoway</h1>
            <p className="mt-2 text-sm text-black/60">
              Aksesori dan suku cadang berkualitas untuk motor listrik Omoway Anda
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <PartsGrid parts={allParts} />
        </div>
      </section>
    </div>
  );
}
