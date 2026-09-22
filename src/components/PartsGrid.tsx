"use client";

import { useState, useMemo, useEffect } from "react";
import { Part, PartCategory, PARTS_CATEGORIES, formatRupiah } from "@/lib/types";
import PartCard from "./PartCard";

interface PartsGridProps {
  parts: Part[];
}

export default function PartsGrid({ parts }: PartsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<PartCategory | "all">("all");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const prices = useMemo(() => {
    const sortedPrices = parts.map((p) => p.harga).sort((a, b) => a - b);
    return {
      min: sortedPrices[0] || 0,
      max: sortedPrices[sortedPrices.length - 1] || 0,
    };
  }, [parts]);

  useEffect(() => {
    setMinPrice(prices.min);
    setMaxPrice(prices.max);
  }, [prices.min, prices.max]);

  const filteredParts = useMemo(() => {
    return parts.filter((part) => {
      const categoryMatch = selectedCategory === "all" || part.kategori === selectedCategory;
      const priceMatch = part.harga >= minPrice && part.harga <= maxPrice;
      return categoryMatch && priceMatch;
    });
  }, [parts, selectedCategory, minPrice, maxPrice]);

  return (
    <div className="space-y-6">
      {/* Category Filter - Horizontal Pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-black">Kategori</h3>
          <button
            onClick={() => setSelectedCategory("all")}
            className="text-xs font-medium text-accent hover:text-accent/80 transition"
          >
            Reset
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2.5 rounded-full font-medium text-sm transition ${
              selectedCategory === "all"
                ? "bg-accent text-white"
                : "bg-black/5 text-black hover:bg-black/10"
            }`}
          >
            Semua
          </button>
          {PARTS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-full font-medium text-sm transition whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-accent text-white"
                  : "bg-black/5 text-black hover:bg-black/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter - Collapsible on Mobile */}
      <div className="space-y-3 border-t border-line/30 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-black">Rentang Harga</h3>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden text-xs font-medium text-accent hover:text-accent/80 transition"
          >
            {isFilterOpen ? "Tutup" : "Buka"}
          </button>
        </div>

        <div className={`space-y-4 ${!isFilterOpen && "hidden lg:block"}`}>
          {/* Price Input Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-black/60 mb-2 font-medium">Minimum</label>
              <div className="flex items-center gap-1">
                <span className="text-xs text-black/50">Rp</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val <= maxPrice) setMinPrice(Math.max(val, prices.min));
                  }}
                  className="flex-1 px-3 py-2.5 border border-line/50 rounded-lg text-sm font-semibold text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-black/60 mb-2 font-medium">Maksimum</label>
              <div className="flex items-center gap-1">
                <span className="text-xs text-black/50">Rp</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= minPrice) setMaxPrice(Math.min(val, prices.max));
                  }}
                  className="flex-1 px-3 py-2.5 border border-line/50 rounded-lg text-sm font-semibold text-black bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 transition"
                />
              </div>
            </div>
          </div>

          {/* Price Range Visualization */}
          <div className="space-y-2 pt-1">
            <div className="relative h-2 bg-line/20 rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-accent transition-all"
                style={{
                  left: `${((minPrice - prices.min) / (prices.max - prices.min)) * 100}%`,
                  right: `${100 - ((maxPrice - prices.min) / (prices.max - prices.min)) * 100}%`
                }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-black/50">
              <span>{formatRupiah(prices.min)}</span>
              <span>{formatRupiah(prices.max)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Count */}
      <div className="flex items-center justify-between border-t border-line/30 pt-6">
        <p className="text-sm text-black/60">
          Menampilkan <span className="font-semibold text-black">{filteredParts.length}</span> produk
        </p>
      </div>

      {/* Parts Grid */}
      {filteredParts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredParts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-black/60">Tidak ada produk yang sesuai dengan filter Anda</p>
        </div>
      )}
    </div>
  );
}
