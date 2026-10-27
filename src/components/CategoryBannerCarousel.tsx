"use client";

import { useState, useEffect, useRef, type TouchEvent } from "react";
import { Part, PartCategory, formatRupiah } from "@/lib/types";

interface PromoConfig {
  category: PartCategory;
  tag: string;
  bgGradient: string;
}

const PROMO_CONFIG: PromoConfig[] = [
  {
    category: "Baterai",
    tag: "#BATTERYPROMO",
    bgGradient: "from-blue-400 via-blue-500 to-blue-600",
  },
  {
    category: "Charger & Kabel",
    tag: "#CHARGERPROMO",
    bgGradient: "from-yellow-400 via-yellow-500 to-amber-600",
  },
  {
    category: "Ban & Velg",
    tag: "#TIRESALE",
    bgGradient: "from-red-400 via-red-500 to-red-600",
  },
];

const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VbDVLsY9sBIGIpFeQi0X";
const WHATSAPP_MOTOR_IMAGE = "/omoway/aurora-green-transparent.png";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

type Slide =
  | { kind: "whatsapp" }
  | (PromoConfig & { kind: "product"; part: Part });

interface CategoryBannerCarouselProps {
  parts: Part[];
}

export default function CategoryBannerCarousel({ parts }: CategoryBannerCarouselProps) {
  const productSlides = PROMO_CONFIG.map((promo): Slide | null => {
    const matchingPart = parts.find((p) => p.kategori.includes(promo.category));
    return matchingPart ? { ...promo, kind: "product", part: matchingPart } : null;
  }).filter((s): s is Slide => s !== null);

  // Slide WhatsApp Channel selalu di paling depan
  const slides: Slide[] = [{ kind: "whatsapp" }, ...productSlides];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showChevrons, setShowChevrons] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, slides.length]);

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

  // Swipe kiri: slide berikutnya. Swipe kanan: slide sebelumnya.
  const SWIPE_MIN_DISTANCE = 40;
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_MIN_DISTANCE || slides.length <= 1) return;
    if (dx < 0) handleNext();
    else handlePrev();
  };

  const slide = slides[currentIndex];
  const isWhatsApp = slide.kind === "whatsapp";
  const image = slide.kind === "product" ? slide.part.gambar.split(",")[0]?.trim() : undefined;

  const slideBackground = isWhatsApp
    ? "bg-[#0b0f0a]"
    : image
      ? "bg-gray-200"
      : `bg-gradient-to-br ${slide.bgGradient}`;

  const slideBox = (
    <div className={`relative aspect-[16/5] rounded-2xl overflow-hidden ${slideBackground}`}>
      {image && (
        <>
          {/* Background blur: gambar produk diperbesar dan di-blur berat */}
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-125 blur-xl"
          />
          {/* Blur makin kecil mendekati gambar produk (mask radial di sisi kanan) */}
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-125 blur-[3px]"
            style={{
              maskImage: "radial-gradient(circle at 80% 50%, black 0%, transparent 55%)",
              WebkitMaskImage: "radial-gradient(circle at 80% 50%, black 0%, transparent 55%)",
            }}
          />
          {/* Overlay gelap netral agar banner lebih gelap */}
          <div className="absolute inset-0 bg-black/35" />
        </>
      )}

      {isWhatsApp && (
        <>
          {/* Gradien gelap ke hijau Omo */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(120deg, #0b0f0a 0%, #111a07 50%, #2b4308 100%)" }}
          />
          {/* Glow lime khas Omo di sisi motor */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(circle at 76% 50%, rgba(163,230,53,0.45), transparent 55%)" }}
          />
          {/* Watermark logo WhatsApp */}
          <WhatsAppIcon className="absolute -left-10 -bottom-16 w-56 h-56 text-accent/10" />
        </>
      )}

      {/* Decorative gradient circles for visual interest */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      {/* Content Container */}
      <div className="relative h-full flex items-center px-4 sm:px-8 lg:px-12 pb-3 sm:pb-0 z-10">
        {/* Left Content */}
        <div className="flex-1 min-w-0 text-white">
          {isWhatsApp ? (
            <div className="flex items-center gap-1.5 sm:gap-3 mb-1 sm:mb-4">
              <span className="flex shrink-0 items-center justify-center w-4 h-4 sm:w-8 sm:h-8 rounded-full bg-accent text-black">
                <WhatsAppIcon className="w-2.5 h-2.5 sm:w-5 sm:h-5" />
              </span>
              <span className="text-[9px] sm:text-sm font-bold uppercase tracking-wider text-accent">
                Channel WhatsApp
              </span>
            </div>
          ) : (
            /* Tag Badge */
            <div className="inline-block bg-white/25 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold mb-1 sm:mb-4">
              {slide.tag}
            </div>
          )}

          {/* Main Title */}
          <h2
            className={`text-sm sm:text-3xl lg:text-5xl font-bold mb-1 sm:mb-3 leading-tight line-clamp-2 ${
              isWhatsApp ? "text-white" : ""
            }`}
          >
            {isWhatsApp ? "Racun Omo" : slide.part.nama}
          </h2>

          {isWhatsApp ? (
            <>
              <p className="hidden sm:block mb-4 max-w-md text-sm lg:text-lg text-white/80">
                Update aksesoris, modifikasi & sparepart yang paling cocok untuk motor Omoway.
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-1 sm:mb-5">
                {["Aksesoris", "Modifikasi", "Sparepart"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-accent/40 bg-accent/10 px-1.5 sm:px-3 py-px sm:py-1 text-[7px] sm:text-xs lg:text-sm font-semibold text-accent"
                  >
                    {label}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl bg-accent px-2 sm:px-6 py-0.5 sm:py-3 text-[9px] sm:text-base font-bold text-black shadow-lg shadow-accent/30">
                <WhatsAppIcon className="w-2.5 h-2.5 sm:w-5 sm:h-5" />
                Gabung Sekarang
              </span>
            </>
          ) : (
            /* Price */
            <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 sm:px-6 py-0.5 sm:py-4 inline-block">
              <p className="text-[8px] sm:text-base font-medium text-white/90 mb-0 sm:mb-1 leading-tight">
                Harga
              </p>
              <p className="text-xs sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                {formatRupiah(slide.part.harga)}
              </p>
            </div>
          )}
        </div>

        {/* Right Product Image */}
        <div className="flex w-[40%] sm:w-auto sm:flex-1 shrink-0 items-center justify-end h-full py-2 sm:py-4">
          {isWhatsApp && (
            <div className="relative flex h-full w-full items-center justify-center">
              {/* Cincin hijau di belakang motor */}
              <div className="absolute w-[85%] aspect-square rounded-full border border-accent/30 bg-accent/10 blur-[1px]" />
              <img
                src={WHATSAPP_MOTOR_IMAGE}
                alt="Omoway Aurora Green"
                className="relative max-h-full max-w-[90%] object-contain drop-shadow-[0_0_28px_rgba(163,230,53,0.55)]"
              />
            </div>
          )}
          {image && (
            <img
              src={image}
              alt={slide.kind === "product" ? slide.part.nama : ""}
              className="max-h-full max-w-[85%] object-contain rounded-lg sm:rounded-xl shadow-2xl"
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-6">
      <div
        className="relative rounded-2xl shadow-lg"
        onMouseEnter={() => setShowChevrons(true)}
        onMouseLeave={() => setShowChevrons(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Carousel Slide - Fixed aspect ratio across all screens */}
        {isWhatsApp ? (
          <a
            href={WHATSAPP_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Gabung Channel WhatsApp Racun Omo"
            className="block"
          >
            {slideBox}
          </a>
        ) : (
          slideBox
        )}

        {/* Dots Indicator - Inside banner at bottom, di luar link agar klik dot tidak membuka WhatsApp */}
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

        {slides.length > 1 && (
          <>
            {/* Left Navigation Button - Layered on top, half outside banner */}
            <button
              onClick={handlePrev}
              className={`hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white hover:bg-white/95 rounded-full p-3 transition-all duration-300 shadow-xl ${
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
              className={`hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 bg-white hover:bg-white/95 rounded-full p-3 transition-all duration-300 shadow-xl ${
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
