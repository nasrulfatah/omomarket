"use client";

import { PARTS_CATEGORIES, PartCategory } from "@/lib/types";
import { useRouter } from "next/navigation";

interface CategoryCardsGridProps {
  onCategorySelect?: (category: PartCategory) => void;
}

const CATEGORY_ICONS: Record<PartCategory, string> = {
  "Battery": "🔋",
  "Charger & Cable": "🔌",
  "Tires & Wheels": "🏍️",
  "Lights & Electrical": "💡",
  "Interior Accessories": "🎨",
  "Exterior Accessories": "🛡️",
  "Maintenance & Tools": "🔧",
  "Covers & Protection": "🏠",
  "Spare Parts": "⚙️",
  "Cleaning & Care": "🧹",
};

export default function CategoryCardsGrid({ onCategorySelect }: CategoryCardsGridProps) {
  const router = useRouter();

  const handleCategoryClick = (category: PartCategory) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
    // Scroll to filter section
    const filterElement = document.getElementById('kategori-filter');
    if (filterElement) {
      filterElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black">Telusuri Kategori</h2>
        <p className="mt-2 text-sm text-black/60">Pilih kategori untuk melihat parts berkualitas</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {PARTS_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="group relative overflow-hidden rounded-lg border-2 border-transparent bg-gradient-to-br from-gray-50 to-white p-4 transition-all duration-300 hover:border-accent hover:shadow-lg hover:from-accent/5 hover:to-accent/10"
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="text-3xl transition-transform group-hover:scale-110">
                {CATEGORY_ICONS[category]}
              </div>
              <h3 className="text-xs font-semibold text-black group-hover:text-accent transition-colors sm:text-sm">
                {category}
              </h3>
            </div>

            {/* Hover effect border */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
}
