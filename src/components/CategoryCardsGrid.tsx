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

function CategoryCard({
  icon,
  label,
  isSelected,
  onClick,
}: {
  icon: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl p-3 text-center transition-all duration-300 ease-out sm:p-4 ${
        isSelected
          ? "bg-gradient-to-b from-accent/10 to-white shadow-[0_4px_20px_-6px_rgba(163,230,53,0.5)] ring-1 ring-accent/50"
          : "bg-white shadow-sm ring-1 ring-black/5 hover:-translate-y-0.5 hover:shadow-md hover:ring-black/10"
      }`}
    >
      {/* Selected checkmark badge */}
      {isSelected && (
        <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent shadow-sm sm:h-5 sm:w-5">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-2.5 w-2.5 text-black sm:h-3 sm:w-3">
            <path
              fillRule="evenodd"
              d="M16.704 5.29a1 1 0 010 1.415l-7.09 7.09a1 1 0 01-1.414 0L4.296 9.89a1 1 0 111.414-1.414l3.09 3.09 6.383-6.383a1 1 0 011.521.106z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}

      <div className="flex flex-col items-center gap-1.5 sm:gap-2">
        <img
          src={icon}
          alt={label}
          className={`h-8 w-8 object-contain mix-blend-multiply transition-transform duration-300 ease-out sm:h-10 sm:w-10 ${
            isSelected ? "scale-110" : "group-hover:scale-110"
          }`}
        />
        <h3
          className={`text-[11px] font-semibold leading-tight transition-colors sm:text-sm ${
            isSelected ? "text-accent-dark" : "text-black/80 group-hover:text-black"
          }`}
        >
          {label}
        </h3>
      </div>
    </button>
  );
}

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
            className="text-xs font-semibold text-accent-dark hover:text-accent-dark/80 transition whitespace-nowrap"
          >
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 sm:gap-3">
        <CategoryCard
          icon="/icons/categories/all.webp"
          label="Semua"
          isSelected={selectedCategory === "all"}
          onClick={() => onSelectCategory("all")}
        />

        {PARTS_CATEGORIES.map((category) => (
          <CategoryCard
            key={category}
            icon={CATEGORY_ICONS[category]}
            label={category}
            isSelected={selectedCategory === category}
            onClick={() => onSelectCategory(category)}
          />
        ))}
      </div>
    </div>
  );
}
