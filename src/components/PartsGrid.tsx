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
      {/* Filter Section */}
      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-black">Kategori</h3>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-xs text-accent hover:text-accent/70 font-semibold"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === "all"
                  ? "bg-accent text-black"
                  : "bg-line/50 text-black hover:bg-line"
              }`}
            >
              Semua
            </button>
            {PARTS_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-accent text-black"
                    : "bg-line/50 text-black hover:bg-line"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-black">Rentang Harga</h3>
            {(minPrice !== prices.min || maxPrice !== prices.max) && (
              <button
                onClick={() => {
                  setMinPrice(prices.min);
                  setMaxPrice(prices.max);
                }}
                className="text-xs text-accent hover:text-accent/70 font-semibold"
              >
                Reset
              </button>
            )}
          </div>

          {/* Dual Slider */}
          <div className="space-y-4">
            {/* Sliders */}
            <div className="relative pt-2 pb-1">
              {/* Background track */}
              <div className="absolute top-5 w-full h-2 bg-line/40 rounded-full pointer-events-none" />

              {/* Filled track */}
              <div
                className="absolute top-5 h-2 bg-accent rounded-full pointer-events-none"
                style={{
                  left: `${((minPrice - prices.min) / (prices.max - prices.min)) * 100}%`,
                  right: `${100 - ((maxPrice - prices.min) / (prices.max - prices.min)) * 100}%`
                }}
              />

              {/* Min slider */}
              <input
                type="range"
                min={prices.min}
                max={prices.max}
                value={minPrice}
                onChange={(e) => {
                  const newMin = Number(e.target.value);
                  if (newMin <= maxPrice) setMinPrice(newMin);
                }}
                className="absolute w-full top-0 h-4 bg-transparent rounded-full cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0"
                style={{ zIndex: minPrice > prices.max - (prices.max - prices.min) / 2 ? 5 : 3 }}
              />

              {/* Max slider */}
              <input
                type="range"
                min={prices.min}
                max={prices.max}
                value={maxPrice}
                onChange={(e) => {
                  const newMax = Number(e.target.value);
                  if (newMax >= minPrice) setMaxPrice(newMax);
                }}
                className="absolute w-full top-0 h-4 bg-transparent rounded-full cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0"
                style={{ zIndex: maxPrice > prices.max - (prices.max - prices.min) / 2 ? 5 : 4 }}
              />
            </div>

            {/* Price Display */}
            <div className="flex items-center justify-between bg-line/20 rounded-lg p-3">
              <div>
                <div className="text-xs text-black/60">Minimum</div>
                <div className="text-lg font-bold text-black">{formatRupiah(minPrice)}</div>
              </div>
              <div className="text-black/30">—</div>
              <div className="text-right">
                <div className="text-xs text-black/60">Maximum</div>
                <div className="text-lg font-bold text-black">{formatRupiah(maxPrice)}</div>
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
