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
      {/* Modern Filter Bar */}
      <div className="bg-white p-6 rounded-xl border border-line/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Category Dropdown */}
          <div>
            <p className="text-xs font-semibold text-black/60 mb-3 uppercase tracking-widest">Kategori</p>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as PartCategory | "all")}
              className="w-full px-4 py-2.5 rounded-lg border border-line bg-white text-black text-sm font-medium cursor-pointer hover:border-black/30 focus:outline-none focus:ring-2 focus:ring-accent/30 transition"
            >
              <option value="all">Semua Kategori</option>
              {PARTS_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range - Dual Slider */}
          <div>
            <p className="text-xs font-semibold text-black/60 mb-4 uppercase tracking-widest">Rentang Harga</p>
            <div className="space-y-4">
              {/* Dual Range Sliders */}
              <div className="relative">
                <input
                  type="range"
                  min={prices.min}
                  max={prices.max}
                  value={minPrice}
                  onChange={(e) => {
                    const newMin = Number(e.target.value);
                    if (newMin <= maxPrice) setMinPrice(newMin);
                  }}
                  className="absolute w-full h-2 bg-transparent rounded-full accent-accent cursor-pointer appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0"
                  style={{ zIndex: minPrice > prices.max - (prices.max - prices.min) / 2 ? 5 : 3 }}
                />
                <input
                  type="range"
                  min={prices.min}
                  max={prices.max}
                  value={maxPrice}
                  onChange={(e) => {
                    const newMax = Number(e.target.value);
                    if (newMax >= minPrice) setMaxPrice(newMax);
                  }}
                  className="absolute w-full h-2 bg-line rounded-full accent-accent cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0"
                  style={{ zIndex: maxPrice > prices.max - (prices.max - prices.min) / 2 ? 5 : 4 }}
                />
              </div>

              {/* Price Values Below Slider */}
              <div className="flex justify-between pt-2">
                <div>
                  <p className="text-sm font-semibold text-black">{formatRupiah(minPrice)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-black">{formatRupiah(maxPrice)}</p>
                </div>
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
