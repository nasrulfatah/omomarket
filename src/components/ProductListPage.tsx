import Link from "next/link";
import { Part, PARTS_CATEGORIES, categoryToSlug } from "@/lib/types";
import PartCard from "./PartCard";

interface ProductListPageProps {
  title: string;
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

export default function ProductListPage({ title, items, query, kategori }: ProductListPageProps) {
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

          <form action="/search" role="search" className="mt-5 flex gap-2">
            {kategori && <input type="hidden" name="kategori" value={kategori} />}
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

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORY_OPTIONS.map((opt) => {
              const active = opt.slug === kategori;
              return (
                <Link
                  key={opt.slug || "all"}
                  href={buildSearchHref(query, opt.slug)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    active ? "bg-accent text-black" : "bg-neutral-100 text-black/70 hover:bg-neutral-200"
                  }`}
                >
                  {opt.label}
                </Link>
              );
            })}
          </div>

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
