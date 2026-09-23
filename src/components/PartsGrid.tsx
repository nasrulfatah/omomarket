"use client";

import { useState, useMemo, useEffect, useRef } from "react";
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
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);
  const minInputRef = useRef<HTMLInputElement>(null);
  const maxInputRef = useRef<HTMLInputElement>(null);

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

  const handleSliderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only auto-detect which thumb to prioritize when NOT actively dragging
    if (activeThumb !== null) return;

    if (!minInputRef.current || !maxInputRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

    // Determine which thumb is closer to mouse position
    const minPercent = ((minPrice - prices.min) / (prices.max - prices.min)) * 100;
    const maxPercent = ((maxPrice - prices.min) / (prices.max - prices.min)) * 100;

    const minDistance = Math.abs(percent - minPercent);
    const maxDistance = Math.abs(percent - maxPercent);

    // Disable pointer-events on the farther thumb to prevent capturing mouse events
    if (minDistance < maxDistance) {
      // Min is closer, enable min, disable max
      minInputRef.current.style.pointerEvents = 'auto';
      maxInputRef.current.style.pointerEvents = 'none';
      minInputRef.current.style.zIndex = '50';
      maxInputRef.current.style.zIndex = '30';
    } else {
      // Max is closer, enable max, disable min
      maxInputRef.current.style.pointerEvents = 'auto';
      minInputRef.current.style.pointerEvents = 'none';
      maxInputRef.current.style.zIndex = '50';
      minInputRef.current.style.zIndex = '30';
    }
  };


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
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-semibold text-black">Kategori</h3>
          <button
            onClick={() => setSelectedCategory("all")}
            className="text-xs font-medium text-accent hover:text-accent/80 transition"
          >
            Reset
          </button>
        </div>
        <div
          style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex flex-nowrap gap-1.5 sm:gap-2 pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0"
        >
          <button
            onClick={() => setSelectedCategory("all")}
            className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm transition whitespace-nowrap ${
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
              className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm transition whitespace-nowrap ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          {/* Interactive Price Range Slider */}
          <div className="space-y-2 pt-2">
            <div
              className="relative h-8 flex items-center"
              onMouseMove={handleSliderMouseMove}
              onMouseLeave={() => {
                setActiveThumb(null);
                if (minInputRef.current && maxInputRef.current) {
                  minInputRef.current.style.zIndex = '';
                  maxInputRef.current.style.zIndex = '';
                  minInputRef.current.style.pointerEvents = '';
                  maxInputRef.current.style.pointerEvents = '';
                }
              }}
            >
              {/* Track background */}
              <div className="absolute w-full h-2 bg-line/20 rounded-full pointer-events-none" />

              {/* Filled range track */}
              <div
                className="absolute h-2 bg-accent rounded-full pointer-events-none"
                style={{
                  left: `${((minPrice - prices.min) / (prices.max - prices.min)) * 100}%`,
                  right: `${100 - ((maxPrice - prices.min) / (prices.max - prices.min)) * 100}%`
                }}
              />

              {/* Min range input */}
              <input
                ref={minInputRef}
                type="range"
                min={prices.min}
                max={prices.max}
                step="1"
                value={minPrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val <= maxPrice) setMinPrice(val);
                }}
                onPointerDown={() => setActiveThumb('min')}
                onPointerUp={() => setActiveThumb(null)}
                className={`absolute w-full h-8 top-0 pointer-events-auto appearance-none bg-transparent cursor-pointer transition-all ${
                  activeThumb === 'min' ? 'z-50' : 'z-40'
                } [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none`}
              />

              {/* Max range input */}
              <input
                ref={maxInputRef}
                type="range"
                min={prices.min}
                max={prices.max}
                step="1"
                value={maxPrice}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= minPrice) setMaxPrice(val);
                }}
                onPointerDown={() => setActiveThumb('max')}
                onPointerUp={() => setActiveThumb(null)}
                className={`absolute w-full h-8 top-0 pointer-events-auto appearance-none bg-transparent cursor-pointer transition-all ${
                  activeThumb === 'max' ? 'z-50' : 'z-30'
                } [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none`}
              />
            </div>

            {/* Price range labels */}
            <div className="flex items-center justify-between text-xs text-black/50 mt-2">
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
        <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
