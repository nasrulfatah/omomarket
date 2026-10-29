"use client";

import { useState } from "react";
import Link from "next/link";
import { Part, PARTS_CATEGORIES, categoryToSlug } from "@/lib/types";
import PartCard from "./PartCard";

interface CategoryCarouselsProps {
  parts: Part[];
  selectedCategory: string | "all";
}

export default function CategoryCarousels({ parts, selectedCategory }: CategoryCarouselsProps) {
  // Only show carousels ketika selectedCategory adalah "all"
  if (selectedCategory !== "all") {
    return null;
  }

  // Group products by kategori
  const productsByCategory = PARTS_CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = parts.filter((p) => p.kategori.includes(category));
      return acc;
    },
    {} as Record<string, Part[]>
  );

  // Sort kategori dengan "Populer" (top products) di depan
  const sortedCategories = [
    "popular", // Populer (top 8 products)
    ...PARTS_CATEGORIES,
  ].filter((cat) => {
    if (cat === "popular") return parts.length > 0;
    return productsByCategory[cat as string]?.length > 0;
  });

  const handlePrevClick = (e: React.MouseEvent, carouselId: string) => {
    e.preventDefault();
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      carousel.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleNextClick = (e: React.MouseEvent, carouselId: string) => {
    e.preventDefault();
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      carousel.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8">
      {sortedCategories.map((category) => {
        let categoryProducts: Part[] = [];
        let displayName: string = "";

        if (category === "popular") {
          // Populer: top 8 produk terbaru
          categoryProducts = parts
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 8);
          displayName = "Populer";
        } else {
          categoryProducts = productsByCategory[category as string];
          displayName = category as string;
        }

        if (categoryProducts.length === 0) return null;

        const carouselId = `carousel-${category}`;

        return (
          <div key={category} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-black">{displayName}</h3>
              <Link
                href={`/search?kategori=${category === "popular" ? "popular" : categoryToSlug(category as string)}`}
                className="text-xs font-semibold text-accent-soft-text hover:text-black transition"
              >
                Lihat Semua
              </Link>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              <div
                id={carouselId}
                className="flex gap-3 overflow-x-auto scroll-smooth pb-2 hide-scrollbar"
              >
                {categoryProducts.map((product, index) => (
                  <div key={product.id} className="flex-shrink-0 w-[200px]">
                    <PartCard part={product} priority={index < 2} />
                  </div>
                ))}
              </div>

              {/* Carousel Controls - hanya tampil jika produk > 6 */}
              {categoryProducts.length > 6 && (
                <>
                  <button
                    onClick={(e) => handlePrevClick(e, carouselId)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-white/80 hover:bg-white text-black rounded-full w-7 h-7 flex items-center justify-center shadow-sm transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => handleNextClick(e, carouselId)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-white/80 hover:bg-white text-black rounded-full w-7 h-7 flex items-center justify-center shadow-sm transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
