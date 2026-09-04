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
            <div className="space-y-3">
              {/* Dual Range Sliders - Separate container */}
              <div>
                {/* Background track container */}
                <div className="relative pt-2 pb-8">
                  {/* Static background track */}
                  <div className="absolute top-2 w-full h-2 bg-line/40 rounded-full pointer-events-none" />

                  {/* Filled track (selected range) */}
                  <div
                    className="absolute top-2 h-2 bg-accent rounded-full pointer-events-none"
                    style={{
                      left: `${((minPrice - prices.min) / (prices.max - prices.min)) * 100}%`,
                      right: `${100 - ((maxPrice - prices.min) / (prices.max - prices.min)) * 100}%`
                    }}
                  />
                </div>

                {/* Sliders container - overlaid */}
                <div className="relative -mt-6 px-0.5">
                  {/* Min slider - on top for easy dragging */}
                  <input
                    type="range"
                    min={prices.min}
                    max={prices.max}
                    value={minPrice}
                    onChange={(e) => {
                      const newMin = Number(e.target.value);
                      if (newMin <= maxPrice) setMinPrice(newMin);
                    }}
                    className="absolute w-full h-2 bg-transparent rounded-full cursor-pointer appearance-none pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:border-0"
                    style={{ zIndex: minPrice > prices.max - (prices.max - prices.min) / 2 ? 6 : 5 }}
                  />

                  {/* Max slider - behind, less intrusive */}
                  <input
                    type="range"
                    min={prices.min}
                    max={prices.max}
                    value={maxPrice}
                    onChange={(e) => {
                      const newMax = Number(e.target.value);
                      if (newMax >= minPrice) setMaxPrice(newMax);
                    }}
                    className="absolute w-full h-2 bg-transparent rounded-full cursor-pointer appearance-none pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing [&::-moz-range-thumb]:border-0"
                    style={{ zIndex: maxPrice > prices.max - (prices.max - prices.min) / 2 ? 5 : 4 }}
                  />
                </div>
              </div>

              {/* Price Values */}
              <div className="flex justify-between text-sm font-semibold text-black/70 px-0.5">
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
