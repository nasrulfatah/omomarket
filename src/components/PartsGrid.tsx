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
      <div className="rounded-lg border border-line bg-white p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category Dropdown */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-black/70 mb-2.5 uppercase tracking-wider">
              Kategori
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as PartCategory | "all")}
              className="w-full px-4 py-3 rounded-lg border border-line bg-white text-black text-sm font-medium cursor-pointer appearance-none hover:border-black/40 focus:border-accent focus:outline-none transition pr-10 bg-[url('data:image/svg+xml;utf8,<svg fill=\"black\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>')] bg-no-repeat bg-right-4 bg-center"
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
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-black/70 mb-2.5 uppercase tracking-wider">
              Harga Max
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="range"
                min={prices.min}
                max={prices.max}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="flex-1 h-2 bg-line rounded accent-accent cursor-pointer"
              />
              <div className="text-right shrink-0 min-w-32">
                <p className="text-sm font-bold text-black">{formatRupiah(maxPrice)}</p>
                <p className="text-xs text-black/50 mt-0.5">dari {formatRupiah(prices.max)}</p>
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
