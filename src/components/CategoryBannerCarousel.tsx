"use client";

import { useState, useEffect } from "react";

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  discount: string;
  bgGradient: string;
  tag: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 1,
    title: "Battery Premium",
    subtitle: "Diskon s.d.",
    discount: "600rb",
    bgGradient: "from-blue-400 via-blue-500 to-blue-600",
    tag: "#BATTERYPROMO",
  },
  {
    id: 2,
    title: "Charger & Cable",
    subtitle: "Diskon s.d.",
    discount: "500rb",
    bgGradient: "from-yellow-400 via-yellow-500 to-amber-600",
    tag: "#CHARGERPROMO",
  },
  {
    id: 3,
    title: "Tires & Wheels",
    subtitle: "Diskon s.d.",
    discount: "1.2juta",
    bgGradient: "from-red-400 via-red-500 to-red-600",
    tag: "#TIRESALE",
  },
];

export default function CategoryBannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showChevrons, setShowChevrons] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    setAutoPlay(true);
  };

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
    setAutoPlay(true);
  };

  const slide = BANNER_SLIDES[currentIndex];

  return (
    <div className="mb-12">
      <div
        className="relative rounded-2xl shadow-lg"
        onMouseEnter={() => setShowChevrons(true)}
        onMouseLeave={() => setShowChevrons(false)}
      >
        {/* Main Carousel Slide - Fixed aspect ratio across all screens */}
        <div className={`relative aspect-[16/7] rounded-2xl bg-gradient-to-br ${slide.bgGradient} overflow-hidden`}>
          {/* Decorative gradient circles for visual interest */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          {/* Content Container */}
          <div className="relative h-full flex items-center px-4 sm:px-8 lg:px-12 z-10">
            {/* Left Content */}
            <div className="flex-1 text-white">
              {/* Tag Badge */}
              <div className="inline-block bg-white/25 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold mb-1.5 sm:mb-4">
                {slide.tag}
              </div>

              {/* Main Title */}
              <h2 className="text-base sm:text-3xl lg:text-5xl font-bold mb-1 sm:mb-4 leading-tight">
                {slide.title}
              </h2>

              {/* Subtitle + Discount */}
              <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 sm:px-6 py-1 sm:py-4 inline-block">
                <p className="text-[9px] sm:text-base font-medium text-white/90 mb-0 sm:mb-1">
                  {slide.subtitle}
                </p>
                <p className="text-sm sm:text-3xl lg:text-4xl font-bold text-white">
                  {slide.discount}
                </p>
              </div>
            </div>

            {/* Right Decorative Area */}
            <div className="hidden sm:block flex-1 relative">
              {/* Geometric shapes for visual design */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 space-y-4">
                <div className="w-20 h-20 lg:w-32 lg:h-32 rounded-lg bg-white/15 backdrop-blur-sm"></div>
                <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-lg bg-white/10 backdrop-blur-sm ml-8"></div>
              </div>
            </div>
          </div>

          {/* Dots Indicator - Inside banner at bottom */}
          <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 z-10 flex justify-center gap-1 sm:gap-2">
            {BANNER_SLIDES.map((_, idx) => (
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
        </div>

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
      </div>
    </div>
  );
}
