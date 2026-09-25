"use client";

import { useState, useEffect } from "react";
import { PARTS_CATEGORIES, PartCategory } from "@/lib/types";

const CATEGORY_ICONS: Record<PartCategory, string> = {
  "Battery": "🔋",
  "Charger & Cable": "🔌",
  "Tires & Wheels": "🛞",
  "Lights & Electrical": "💡",
  "Interior Accessories": "🎨",
  "Exterior Accessories": "🛡️",
  "Maintenance & Tools": "🔧",
  "Covers & Protection": "🏠",
  "Spare Parts": "⚙️",
  "Cleaning & Care": "🧹",
};

const BANNER_COLORS = [
  "from-blue-500 to-blue-600",
  "from-purple-500 to-purple-600",
  "from-pink-500 to-pink-600",
  "from-green-500 to-green-600",
  "from-orange-500 to-orange-600",
];

export default function CategoryBannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const visibleItems = 3;
  const itemsPerPage = PARTS_CATEGORIES.length;
  const totalSlides = Math.ceil(itemsPerPage / visibleItems);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [autoPlay, totalSlides]);

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const startIndex = currentIndex * visibleItems;
  const visibleCategories = PARTS_CATEGORIES.slice(startIndex, startIndex + visibleItems);

  return (
    <div className="mb-12 relative">
      <div className="relative overflow-hidden rounded-xl">
        {/* Main Carousel Container */}
        <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-r from-gray-100 to-gray-200">
          <div className="flex h-full items-stretch gap-3 sm:gap-4">
            {visibleCategories.map((category, idx) => {
              const colorClass = BANNER_COLORS[(startIndex + idx) % BANNER_COLORS.length];
              return (
                <div
                  key={category}
                  className="flex-1 bg-gradient-to-br ${colorClass} rounded-lg p-6 sm:p-8 text-white flex flex-col justify-between transform transition-transform duration-500 hover:scale-105 cursor-pointer"
                  style={{
                    backgroundImage: `linear-gradient(135deg, var(--color-start) 0%, var(--color-end) 100%)`,
                  }}
                >
                  {/* Custom inline styles for gradient */}
                  <div
                    className={`flex-1 flex flex-col justify-between bg-gradient-to-br ${colorClass} rounded-lg p-6 sm:p-8 text-white transform transition-transform duration-500 hover:scale-105 cursor-pointer`}
                  >
                    <div>
                      <div className="text-4xl sm:text-5xl mb-3">{CATEGORY_ICONS[category]}</div>
                      <h3 className="text-lg sm:text-xl font-bold">{category}</h3>
                    </div>
                    <p className="text-sm opacity-90">Jelajahi sekarang →</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 transition-all shadow-lg"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 transition-all shadow-lg"
            aria-label="Next"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAutoPlay(false);
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? "bg-accent w-8" : "bg-gray-300 w-2 hover:bg-accent/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
