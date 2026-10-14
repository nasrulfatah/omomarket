"use client";

import { useState } from "react";
import Link from "next/link";
import { Part, PartCategory, formatRupiah } from "@/lib/types";
import CategoryCardsGrid from "./CategoryCardsGrid";
import PartsGrid from "./PartsGrid";

interface PartsPageClientProps {
  parts: Part[];
}

const MAX_SEARCH_RESULTS = 20;

export default function PartsPageClient({ parts }: PartsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<PartCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const query = searchQuery.trim().toLowerCase();
  const searchResults = query
    ? parts.filter((part) => part.nama.toLowerCase().includes(query))
    : [];

  const closeSearch = () => setSearchQuery("");

  return (
    <>
      <form action="/search" role="search" className="relative mb-10">
        <input
          type="text"
          name="q"
          placeholder="Ketik nama produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeSearch();
          }}
          className="w-full px-4 py-2.5 border border-line/50 rounded-lg text-sm font-medium text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 transition placeholder:text-black/40"
        />

        {query && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-lg border border-line/50 bg-white shadow-xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-line/30 bg-white px-4 py-3">
              <p className="text-sm text-black/60">
                <span className="font-semibold text-black">{searchResults.length}</span> hasil untuk &quot;{searchQuery}&quot;
              </p>
              <button
                type="button"
                onClick={closeSearch}
                className="text-xs font-semibold text-accent hover:text-accent/80 transition"
              >
                Tutup
              </button>
            </div>

            {searchResults.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-black/60">Tidak ada produk yang cocok</p>
            ) : (
              <ul className="divide-y divide-line/30">
                {searchResults.slice(0, MAX_SEARCH_RESULTS).map((part) => {
                  const image = (part.gambar || "").split(",")[0]?.trim();
                  return (
                    <li key={part.id}>
                      <a
                        href={part.shopeeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition"
                      >
                        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-neutral-100">
                          {image && <img src={image} alt="" className="h-full w-full object-cover" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-black">{part.nama}</p>
                          <p className="text-xs text-black/50">{part.kategori}</p>
                        </div>
                        <p className="flex-shrink-0 text-sm font-bold text-accent">{formatRupiah(part.harga)}</p>
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
            {searchResults.length > 0 && (
              <Link
                href={`/search?q=${encodeURIComponent(searchQuery.trim())}`}
                className="block border-t border-line/30 px-4 py-3 text-center text-sm font-semibold text-accent-soft-text hover:text-black transition"
              >
                Lihat semua hasil
              </Link>
            )}
          </div>
        )}
      </form>

      <CategoryCardsGrid selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <PartsGrid parts={parts} selectedCategory={selectedCategory} searchQuery={searchQuery} />
    </>
  );
}
