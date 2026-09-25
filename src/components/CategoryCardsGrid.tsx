"use client";

import { PARTS_CATEGORIES, PartCategory } from "@/lib/types";

interface CategoryCardsGridProps {
  selectedCategory: PartCategory | "all";
  onSelectCategory: (category: PartCategory | "all") => void;
}

const CATEGORY_ICONS: Record<PartCategory, string> = {
  "Battery": "/icons/categories/battery.webp",
  "Charger & Cable": "/icons/categories/charger-cable.webp",
  "Tires & Wheels": "/icons/categories/tires-wheels.webp",
  "Lights & Electrical": "/icons/categories/lights-electrical.webp",
  "Interior Accessories": "/icons/categories/interior-accessories.webp",
  "Exterior Accessories": "/icons/categories/exterior-accessories.webp",
  "Maintenance & Tools": "/icons/categories/maintenance-tools.webp",
  "Covers & Protection": "/icons/categories/covers-protection.webp",
  "Spare Parts": "/icons/categories/spare-parts.webp",
  "Cleaning & Care": "/icons/categories/cleaning-care.webp",
};

export default function CategoryCardsGrid({ selectedCategory, onSelectCategory }: CategoryCardsGridProps) {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold text-black sm:text-2xl">Telusuri Kategori</h2>
          <p className="mt-1 text-sm text-black/60">Pilih kategori untuk melihat parts berkualitas</p>
        </div>
        {selectedCategory !== "all" && (
          <button
            onClick={() => onSelectCategory("all")}
            className="text-xs font-semibold text-accent hover:text-accent/80 transition whitespace-nowrap"
          >
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
        <button
          onClick={() => onSelectCategory("all")}
          className={`group relative overflow-hidden rounded-xl border-2 p-3 sm:p-4 transition-all duration-300 ${
            selectedCategory === "all"
              ? "border-accent bg-accent/10 shadow-md"
              : "border-transparent bg-gray-50 hover:border-accent/50 hover:bg-accent/5"
          }`}
        >
          <div className="flex flex-col items-center gap-1.5 text-center sm:gap-2">
            <img
              src="/icons/categories/all.webp"
              alt="Semua"
              className="h-8 w-8 object-contain mix-blend-multiply transition-transform group-hover:scale-110 sm:h-10 sm:w-10"
            />
            <h3 className={`text-[11px] font-semibold sm:text-sm ${selectedCategory === "all" ? "text-accent" : "text-black"}`}>
              Semua
            </h3>
          </div>
        </button>

        {PARTS_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`group relative overflow-hidden rounded-xl border-2 p-3 sm:p-4 transition-all duration-300 ${
              selectedCategory === category
                ? "border-accent bg-accent/10 shadow-md"
                : "border-transparent bg-gray-50 hover:border-accent/50 hover:bg-accent/5"
            }`}
          >
            <div className="flex flex-col items-center gap-1.5 text-center sm:gap-2">
              <img
                src={CATEGORY_ICONS[category]}
                alt={category}
                className="h-8 w-8 object-contain mix-blend-multiply transition-transform group-hover:scale-110 sm:h-10 sm:w-10"
              />
              <h3 className={`text-[11px] font-semibold sm:text-sm ${selectedCategory === category ? "text-accent" : "text-black"}`}>
                {category}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
