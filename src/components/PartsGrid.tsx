"use client";

import { useState, useMemo, useEffect } from "react";
import { Part, PartCategory, PARTS_CATEGORIES, formatRupiah } from "@/lib/types";
import PartCard from "./PartCard";

interface PartsGridProps {
  parts: Part[];
}

export default function PartsGrid({ parts }: PartsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<PartCategory | "all">("all");
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const prices = useMemo(() => {
    const sortedPrices = parts.map((p) => p.harga).sort((a, b) => a - b);
    return {
      min: sortedPrices[0] || 0,
      max: sortedPrices[sortedPrices.length - 1] || 0,
    };
  }, [parts]);

  useEffect(() => {
    setMaxPrice(prices.max);
  }, [prices.max]);

  const filteredParts = useMemo(() => {
    return parts.filter((part) => {
      const categoryMatch = selectedCategory === "all" || part.kategori === selectedCategory;
      const priceMatch = part.harga <= maxPrice;
      return categoryMatch && priceMatch;
    });
  }, [parts, selectedCategory, maxPrice]);

  return (
    <div className="space-y-6">
      {/* Modern Filter Bar */}
      <div className="rounded-lg border border-line bg-neutral-50 p-4 space-y-4">
        {/* Categories - Horizontal Scroll */}
        <div>
          <p className="text-xs font-semibold text-black/60 mb-2 uppercase tracking-wide">Kategori</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === "all"
                  ? "bg-accent text-black"
                  : "bg-white border border-line text-black hover:bg-neutral-100"
              }`}
            >
              Semua
            </button>
            {PARTS_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-accent text-black"
                    : "bg-white border border-line text-black hover:bg-neutral-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range - Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div>
            <p className="text-xs font-semibold text-black/60 mb-2 uppercase tracking-wide">Harga Max</p>
            <input
              type="range"
              min={prices.min}
              max={prices.max}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-line rounded accent-accent cursor-pointer"
            />
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-black">{formatRupiah(maxPrice)}</p>
            <p className="text-xs text-black/50">dari {formatRupiah(prices.max)}</p>
          </div>
        </div>
      </div>

      {/* Product Count */}
      <p className="text-sm text-black/60">
        Menampilkan <span className="font-semibold text-black">{filteredParts.length}</span> produk
      </p>

      {/* Parts Grid */}
      {filteredParts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredParts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-black/60">Tidak ada produk yang sesuai dengan filter Anda</p>
        </div>
      )}
    </div>
  );
}
