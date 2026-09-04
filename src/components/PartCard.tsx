"use client";

import { useState } from "react";
import Image from "next/image";
import { Part, formatRupiah } from "@/lib/types";

interface PartCardProps {
  part: Part;
}

export default function PartCard({ part }: PartCardProps) {
  const images = part.gambar.split(",").map((url) => url.trim()).filter(Boolean);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentImage = images[currentImageIndex] || "/placeholder.jpg";
  const hasMultipleImages = images.length > 1;

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-white overflow-hidden hover:shadow-lg transition">
      {/* Image Gallery */}
      <div className="relative w-full aspect-square bg-neutral-100 overflow-hidden group">
        <img
          src={currentImage}
          alt={part.nama}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
        />

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
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
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
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

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-black">
            {part.kategori}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-black line-clamp-2">{part.nama}</h3>

        <p className="mt-1 text-sm text-black/70 line-clamp-2">{part.deskripsi}</p>

        <div className="mt-auto space-y-3 pt-4">
          <div className="text-lg font-bold text-accent">{formatRupiah(part.harga)}</div>

          <a
            href={part.shopeeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-orange-500 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Beli Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}
