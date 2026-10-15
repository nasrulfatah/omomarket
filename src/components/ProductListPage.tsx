import Link from "next/link";
import { Part, PARTS_CATEGORIES, categoryToSlug } from "@/lib/types";
import PartCard from "./PartCard";
import CategoryChipRow from "./CategoryChipRow";

interface ProductListPageProps {
  title: string;
  subtitle?: string;
  items: Part[];
  query: string;
  kategori: string;
}

const CATEGORY_OPTIONS = [
  { label: "Semua", slug: "" },
  { label: "Populer", slug: "popular" },
  ...PARTS_CATEGORIES.map((c) => ({ label: c, slug: categoryToSlug(c) })),
];

const buildSearchHref = (query: string, kategori: string) => {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (kategori) params.set("kategori", kategori);
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
};

export default function ProductListPage({ title, subtitle, items, query, kategori }: ProductListPageProps) {
  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-12 lg:py-8">
          <Link
            href="/"
            aria-label="Kembali"
            className="inline-flex items-center gap-1 text-sm font-semibold text-black/60 hover:text-black transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <h1 className="mt-4 text-xl font-extrabold leading-tight text-black sm:text-2xl lg:text-3xl">
            {title}
          </h1>
          {subtitle && <p className="mt-1 text-sm text-black/60">{subtitle}</p>}

          <form action="/search" role="search" className="mt-5 flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Ketik nama produk..."
              className="w-full px-4 py-2.5 border border-line/50 rounded-lg text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 transition placeholder:text-black/40"
            />
            <button
              type="submit"
              className="rounded-lg bg-accent px-5 text-sm font-bold text-black transition hover:bg-accent-dark"
            >
              Cari
            </button>
          </form>

          <CategoryChipRow
            options={CATEGORY_OPTIONS.map((opt) => ({
              key: opt.slug || "all",
              label: opt.label,
              href: buildSearchHref(query, opt.slug),
              active: opt.slug === kategori,
            }))}
          />

          <p className="mt-5 text-sm text-black/60">{items.length} produk</p>

          {items.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {items.map((part) => (
                <PartCard key={part.id} part={part} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-black/60">Tidak ada produk yang cocok</p>
          )}
        </div>
      </section>
    </div>
  );
}
