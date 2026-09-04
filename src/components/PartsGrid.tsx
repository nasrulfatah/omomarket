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
      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-line/50 p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-black/50 mb-2">Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as PartCategory | "all")}
              className="w-full px-3.5 py-2 rounded-lg border border-line bg-white text-black text-sm font-medium cursor-pointer hover:border-black/20 focus:outline-none focus:ring-2 focus:ring-accent/40 transition"
            >
              <option value="all">Semua Kategori</option>
              {PARTS_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-semibold text-black/50 mb-3">Rentang Harga</label>
            <div className="space-y-4">
              {/* Track visualization */}
              <div className="relative h-2 bg-line/40 rounded-full">
                {/* Filled range */}
                <div
                  className="absolute h-full bg-accent rounded-full"
                  style={{
                    left: `${((minPrice - prices.min) / (prices.max - prices.min)) * 100}%`,
                    right: `${100 - ((maxPrice - prices.min) / (prices.max - prices.min)) * 100}%`
                  }}
                />
              </div>

              {/* Sliders (overlaid exactly) */}
              <div className="relative -mt-3 h-8">
                {/* Min slider - FIRST (lower in stacking) */}
                <input
                  type="range"
                  min={prices.min}
                  max={prices.max}
                  step="1"
                  value={minPrice}
                  onChange={(e) => {
                    const newMin = Number(e.target.value);
                    if (newMin <= maxPrice) setMinPrice(newMin);
                  }}
                  className="absolute w-full h-8 top-0 bg-transparent rounded-full cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:border-none"
                  style={{ zIndex: 3 }}
                />

                {/* Max slider - SECOND (higher in stacking, but sits on top due to pointerEvents) */}
                <input
                  type="range"
                  min={prices.min}
                  max={prices.max}
                  step="1"
                  value={maxPrice}
                  onChange={(e) => {
                    const newMax = Number(e.target.value);
                    if (newMax >= minPrice) setMaxPrice(newMax);
                  }}
                  className="absolute w-full h-8 top-0 bg-transparent rounded-full cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:border-none"
                  style={{ zIndex: 4 }}
                />
              </div>

              {/* Price display */}
              <div className="flex justify-between text-sm font-semibold text-black/70">
                <span>{formatRupiah(minPrice)}</span>
                <span>{formatRupiah(maxPrice)}</span>
              </div>
            </div>
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
