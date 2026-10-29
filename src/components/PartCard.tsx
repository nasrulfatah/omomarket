"use client";

import { useState } from "react";
import { Part, formatRupiah } from "@/lib/types";

interface PartCardProps {
  part: Part;
  // Kartu di baris pertama dimuat duluan (preload), sisanya lazy load
  priority?: boolean;
}

// CDN Shopee menyajikan WebP berukuran kecil (±21 KB, dibanding ±58 KB JPEG asli) lewat sufiks ini
const SHOPEE_THUMB_SUFFIX = "@resize_w450_nl.webp";

const toThumbnail = (src: string) =>
  src.includes("susercontent.com") && !src.endsWith(".webp") ? src + SHOPEE_THUMB_SUFFIX : src;

type TagKey = "new" | "recommended" | "hot";

const TAG_STYLES: Record<TagKey, string> = {
  new: "bg-amber-400 text-black",
  recommended: "bg-green-500 text-white",
  hot: "bg-red-500 text-white",
};

const SPARKLE_PATH = "M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z";
const STAR_PATH = "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z";
const FLAME_PATH = "M12 2c.5 3.2 3 4.8 3 8.2A3.5 3.5 0 0 1 12 13.7a3.5 3.5 0 0 1-3.5-3.5c0-1 .3-1.9.8-2.7C10 9 11 9.6 11.6 10.4 11.4 7.2 11.3 4.8 12 2z";

const TAG_ICON_PATHS: Record<TagKey, string> = {
  new: SPARKLE_PATH,
  recommended: STAR_PATH,
  hot: FLAME_PATH,
};

const TAG_LABELS: Record<TagKey, string> = {
  new: "New",
  recommended: "Recommended",
  hot: "Hot",
};

export default function PartCard({ part, priority = false }: PartCardProps) {
  const images = (part.gambar || "").split(",").map((url) => url.trim()).filter(Boolean);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  const currentImage = images[currentImageIndex] || "/placeholder.jpg";
  const hasMultipleImages = images.length > 1;
  const isCurrentImageFailed = failedImages.has(currentImageIndex);
  const isNew = Date.now() - new Date(part.createdAt).getTime() < 14 * 24 * 60 * 60 * 1000;
  const tags: TagKey[] = [
    ...(isNew ? (["new"] as TagKey[]) : []),
    ...(part.recommended ? (["recommended"] as TagKey[]) : []),
    ...(part.hot ? (["hot"] as TagKey[]) : []),
  ];

  // Catat klik "Beli" untuk menentukan produk Hot. Tidak menunda pindah ke Shopee.
  const handleBeliClick = () => {
    fetch("/api/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama: part.nama }),
      keepalive: true,
    }).catch(() => {});
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageError = () => {
    setFailedImages((prev) => new Set([...prev, currentImageIndex]));
  };

  return (
    <div className="relative flex flex-col rounded-2xl border border-line/70 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg">
      {/* Image Gallery */}
      <div className="relative w-full aspect-square bg-white overflow-hidden group">
        {isCurrentImageFailed ? (
          <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </div>
        ) : (
          <>
            {/* Skeleton tampil sampai gambar aktif selesai dimuat */}
            {loadedSrc !== currentImage && (
              <div className="absolute inset-0 bg-neutral-200 motion-safe:animate-pulse" />
            )}
            <img
              ref={(el) => {
                // Gambar yang sudah ada di cache tidak memicu onLoad, jadi dicek manual
                if (el?.complete && el.naturalWidth > 0) setLoadedSrc(currentImage);
              }}
              src={toThumbnail(currentImage)}
              alt={part.nama}
              className="absolute inset-0 w-full h-full object-cover"
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              onLoad={() => setLoadedSrc(currentImage)}
              onError={handleImageError}
            />
          </>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent" />

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute z-10 left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute z-10 right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Indicators */}
        {hasMultipleImages && (
          <div className="absolute z-10 bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition ${
                  idx === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Tags: New, Recommended, Hot */}
        {tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide shadow-sm ${TAG_STYLES[tag]}`}
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={TAG_ICON_PATHS[tag]} />
                </svg>
                {TAG_LABELS[tag]}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-[15px] font-semibold leading-snug text-black line-clamp-2">{part.nama}</h3>

        <p className="mt-1.5 text-sm leading-relaxed text-black/55 line-clamp-2">{part.deskripsi}</p>

        <div className="mt-auto space-y-3 pt-4">
          <div className="text-base font-extrabold tracking-tight text-black">{formatRupiah(part.harga)}</div>

          <a
            href={part.shopeeLink}
            onClick={handleBeliClick}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 block w-full rounded-full bg-accent px-4 py-2.5 text-center text-sm font-bold text-black transition hover:bg-accent-dark"
          >
            Beli
          </a>
        </div>
      </div>

      {/* Seluruh area card membuka link Shopee. Tombol di atas (z-10) tetap bisa diklik sendiri. */}
      <a
        href={part.shopeeLink}
        onClick={handleBeliClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={part.nama}
        className="absolute inset-0 z-0"
      />
    </div>
  );
}
