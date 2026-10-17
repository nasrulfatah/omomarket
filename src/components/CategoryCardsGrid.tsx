import Link from "next/link";
import { PartCategory, categoryToSlug } from "@/lib/types";

// Icon path (3D render) or a raw emoji string when no matching 3D icon exists
const CATEGORY_ICONS: Record<PartCategory, string> = {
  "Baterai": "/icons/categories/battery.webp",
  "Charger & Kabel": "/icons/categories/charger-cable.webp",
  "Ban & Velg": "/icons/categories/tires-wheels.svg",
  "Lampu & Klakson": "/icons/categories/lights-electrical.webp",
  "Elektronik": "/icons/categories/electronics.svg",
  "Aksesoris Interior": "/icons/categories/interior-accessories.svg",
  "Aksesoris Eksterior": "/icons/categories/exterior-accessories.svg",
  "Bracket & Crashbar": "/icons/categories/bracket-crashbar.svg",
  "Perkakas & Alat Servis": "/icons/categories/maintenance-tools.webp",
  "Cover & Protection": "/icons/categories/covers-protection.svg",
  "Spare Parts": "/icons/categories/spare-parts.svg",
  "Cleaning & Care": "/icons/categories/cleaning-care.svg",
  "Helm & Riding Gear": "/icons/categories/helm-riding-gear.webp",
  "Apparel": "/icons/categories/apparel.svg",
  "Phone Holder": "/icons/categories/phone-holder.svg",
  "Tas & Box": "/icons/categories/bags-storage.webp",
  "Plat & Dudukan": "/icons/categories/license-plate.webp",
  "Lainnya": "/icons/categories/all.webp",
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

export default function CategoryCardsGrid({ ordered }: { ordered: PartCategory[] }) {
  return (
    <div className="mb-10">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
        {ordered.map((category) => (
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
