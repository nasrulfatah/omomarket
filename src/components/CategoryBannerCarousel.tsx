"use client";

import { useState, useEffect } from "react";
import { Part, PartCategory } from "@/lib/types";

interface PromoConfig {
  category: PartCategory;
  tag: string;
  bgGradient: string;
  discount: string;
}

const PROMO_CONFIG: PromoConfig[] = [
  {
    category: "Baterai",
    tag: "#BATTERYPROMO",
    bgGradient: "from-blue-400 via-blue-500 to-blue-600",
    discount: "600rb",
  },
  {
    category: "Charger & Kabel",
    tag: "#CHARGERPROMO",
    bgGradient: "from-yellow-400 via-yellow-500 to-amber-600",
    discount: "500rb",
  },
  {
    category: "Ban & Velg",
    tag: "#TIRESALE",
    bgGradient: "from-red-400 via-red-500 to-red-600",
    discount: "1.2juta",
  },
];

interface CategoryBannerCarouselProps {
  parts: Part[];
}

export default function CategoryBannerCarousel({ parts }: CategoryBannerCarouselProps) {
  const slides = PROMO_CONFIG.map((promo) => {
    const matchingPart = parts.find((p) => p.kategori.includes(promo.category));
    return matchingPart ? { ...promo, part: matchingPart } : null;
  }).filter((s): s is PromoConfig & { part: Part } => s !== null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showChevrons, setShowChevrons] = useState(false);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, slides.length]);

  if (slides.length === 0) return null;

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setAutoPlay(true);
  };

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(true);
  };

  const slide = slides[currentIndex];
  const image = slide.part.gambar.split(",")[0]?.trim();

  return (
    <div className="mb-10">
      <div
        className="relative rounded-2xl shadow-lg"
        onMouseEnter={() => setShowChevrons(true)}
        onMouseLeave={() => setShowChevrons(false)}
      >
        {/* Main Carousel Slide - Fixed aspect ratio across all screens */}
        <div className={`relative aspect-[16/5] rounded-2xl bg-gradient-to-br ${slide.bgGradient} overflow-hidden`}>
          {/* Decorative gradient circles for visual interest */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          {/* Content Container */}
          <div className="relative h-full flex items-center px-4 sm:px-8 lg:px-12 pb-3 sm:pb-0 z-10">
            {/* Left Content */}
            <div className="flex-1 text-white">
              {/* Tag Badge */}
              <div className="inline-block bg-white/25 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold mb-1 sm:mb-4">
                {slide.tag}
              </div>

              {/* Main Title */}
              <h2 className="text-sm sm:text-3xl lg:text-5xl font-bold mb-1 sm:mb-4 leading-tight line-clamp-1">
                {slide.part.nama}
              </h2>

              {/* Subtitle + Discount */}
              <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 sm:px-6 py-0.5 sm:py-4 inline-block">
                <p className="text-[8px] sm:text-base font-medium text-white/90 mb-0 sm:mb-1 leading-tight">
                  Diskon s.d.
                </p>
                <p className="text-xs sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {slide.discount}
                </p>
              </div>
            </div>

            {/* Right Product Image */}
            <div className="hidden sm:flex flex-1 items-center justify-end h-full py-4">
              <img
                src={image}
                alt={slide.part.nama}
                className="max-h-full max-w-[85%] object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>

          {/* Dots Indicator - Inside banner at bottom */}
          {slides.length > 1 && (
            <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 z-10 flex justify-center gap-1 sm:gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'bg-accent w-5 sm:w-8' : 'bg-gray-300 w-1.5 sm:w-2.5 hover:bg-accent/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {slides.length > 1 && (
          <>
            {/* Left Navigation Button - Layered on top, half outside banner */}
            <button
              onClick={handlePrev}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white hover:bg-white/95 rounded-full p-3 transition-all duration-300 shadow-xl ${
                showChevrons ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
              }`}
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Navigation Button - Layered on top, half outside banner */}
            <button
              onClick={handleNext}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 bg-white hover:bg-white/95 rounded-full p-3 transition-all duration-300 shadow-xl ${
                showChevrons ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
              }`}
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
