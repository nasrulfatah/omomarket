import Link from "next/link";
import { PARTS_CATEGORIES, PartCategory, categoryToSlug } from "@/lib/types";

// Icon path (3D render) or a raw emoji string when no matching 3D icon exists
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
  "Helm & Riding Gear": "/icons/categories/helm-riding-gear.webp",
  "Gadget Mount": "/icons/categories/gadget-mount.webp",
  "Bags & Storage": "/icons/categories/bags-storage.webp",
  "License Plate": "/icons/categories/license-plate.webp",
};

const cardClass =
  "group relative overflow-hidden rounded-xl border-2 border-transparent bg-gray-50 p-3 sm:p-4 transition-all duration-300 hover:border-accent/50 hover:bg-accent/5";

function CategoryIcon({ icon, label }: { icon: string; label: string }) {
  const isImage = icon.startsWith("/");
  if (isImage) {
    return (
      <img
        src={icon}
        alt={label}
        className="h-8 w-8 object-contain mix-blend-multiply transition-transform group-hover:scale-110 sm:h-10 sm:w-10"
      />
    );
  }
  return (
    <span className="text-2xl leading-none transition-transform group-hover:scale-110 sm:text-3xl">
      {icon}
    </span>
  );
}

export default function CategoryCardsGrid() {
  return (
    <div className="mb-10">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
        <Link href="/search" className={cardClass}>
          <div className="flex flex-col items-center gap-1.5 text-center sm:gap-2">
            <img
              src="/icons/categories/all.webp"
              alt="Semua"
              className="h-8 w-8 object-contain mix-blend-multiply transition-transform group-hover:scale-110 sm:h-10 sm:w-10"
            />
            <h3 className="text-[11px] font-semibold text-black sm:text-sm">Semua</h3>
          </div>
        </Link>

        {PARTS_CATEGORIES.map((category) => (
          <Link key={category} href={`/search?kategori=${categoryToSlug(category)}`} className={cardClass}>
            <div className="flex flex-col items-center gap-1.5 text-center sm:gap-2">
              <CategoryIcon icon={CATEGORY_ICONS[category]} label={category} />
              <h3 className="text-[11px] font-semibold text-black sm:text-sm">{category}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
