"use client";

import { useState, useEffect } from "react";

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  discount: string;
  bgColor: string;
  image: string;
  tag: string;
  dateRange: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 1,
    title: "Harga terbaik!",
    subtitle: "Battery Premium",
    price: "Rp450.000",
    discount: "Diskon hingga 20%",
    bgColor: "from-blue-500 to-blue-600",
    image: "🔋",
    tag: "#BATTERYPROMO",
    dateRange: "20-22 Oct",
  },
  {
    id: 2,
    title: "Penawaran spesial!",
    subtitle: "Charger & Cable Set",
    price: "Rp280.000",
    discount: "Diskon hingga 25%",
    bgColor: "from-yellow-400 to-yellow-500",
    image: "🔌",
    tag: "#CHARGERPROMO",
    dateRange: "20-22 Oct",
  },
  {
    id: 3,
    title: "Flash Sale!",
    subtitle: "Tires & Wheels",
    price: "Rp1.200.000",
    discount: "Diskon hingga 15%",
    bgColor: "from-red-500 to-red-600",
    image: "🛞",
    tag: "#TIRESALE",
    dateRange: "20-22 Oct",
  },
];

export default function CategoryBannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000); // Change every 5 seconds

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
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        {/* Main Carousel Slide */}
        <div className={`relative h-56 sm:h-72 lg:h-80 bg-gradient-to-r ${slide.bgColor} flex items-center justify-between px-6 sm:px-8 lg:px-12 py-8`}>
          {/* Left Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 transition-all shadow-lg"
            aria-label="Previous"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Content Section */}
          <div className="flex-1 z-10 text-white">
            {/* Tag */}
            <div className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
              {slide.tag}
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              {slide.title}
            </h2>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-semibold mb-4 opacity-95">
              {slide.subtitle}
            </p>

            {/* Price */}
            <div className="mb-4">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                {slide.price}
              </p>
              <p className="text-sm sm:text-base opacity-90 mt-1">
                {slide.discount}
              </p>
            </div>

            {/* Date */}
            <p className="text-xs sm:text-sm opacity-80">
              {slide.dateRange}
            </p>
          </div>

          {/* Image Section */}
          <div className="hidden sm:flex flex-1 items-center justify-end">
            <div className="text-9xl sm:text-8xl lg:text-9xl opacity-80">
              {slide.image}
            </div>
          </div>

          {/* Right Navigation */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 transition-all shadow-lg"
            aria-label="Next"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {BANNER_SLIDES.map((_, idx) => (
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
