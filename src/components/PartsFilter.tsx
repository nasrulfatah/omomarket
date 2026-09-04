"use client";

import { useState, useMemo } from "react";
import { Part, PartCategory } from "@/lib/types";

interface PartsFilterProps {
  parts: Part[];
  categories: readonly PartCategory[];
}

export default function PartsFilter({ parts, categories }: PartsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<PartCategory | "all">("all");
  const [maxPrice, setMaxPrice] = useState<number>(10_000_000);

  const prices = useMemo(() => {
    const sortedPrices = parts.map((p) => p.harga).sort((a, b) => a - b);
    return {
      min: sortedPrices[0] || 0,
      max: sortedPrices[sortedPrices.length - 1] || 10_000_000,
    };
  }, [parts]);

  const filteredParts = useMemo(() => {
    return parts.filter((part) => {
      const categoryMatch = selectedCategory === "all" || part.kategori === selectedCategory;
      const priceMatch = part.harga <= maxPrice;
      return categoryMatch && priceMatch;
    });
  }, [parts, selectedCategory, maxPrice]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-black mb-3">Kategori</label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`block w-full text-left px-3 py-2 rounded text-sm transition ${
                selectedCategory === "all"
                  ? "bg-accent text-black font-semibold"
                  : "bg-neutral-100 text-black hover:bg-neutral-200"
              }`}
            >
              Semua Kategori
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`block w-full text-left px-3 py-2 rounded text-sm transition ${
                  selectedCategory === cat
                    ? "bg-accent text-black font-semibold"
                    : "bg-neutral-100 text-black hover:bg-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-black/50">
            {filteredParts.length} produk
          </p>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-semibold text-black mb-3">Rentang Harga</label>
          <div className="space-y-4">
            <input
              type="range"
              min={prices.min}
              max={prices.max}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-line rounded accent-accent cursor-pointer"
            />
            <div className="text-sm text-black/70">
              <p>Max: Rp {maxPrice.toLocaleString("id-ID")}</p>
              <p className="text-xs text-black/50">dari Rp {prices.max.toLocaleString("id-ID")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
