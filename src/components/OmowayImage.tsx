import Image from "next/image";
import { type OmowayWarna } from "@/lib/types";

const warnaToImageFile: Record<OmowayWarna, string> = {
  "Aurora Green": "aurora-green",
  "Liquid Silver": "liquid-silver",
  "Meteorite Grey": "meteorite-grey",
  "Turquoise Green": "turquoise-green",
  "Lunar White": "lunar-white",
  "Morning Sun Gold": "morning-sun-gold",
};

export default function OmowayImage({
  warna,
  className,
  showLabel = true,
}: {
  warna: OmowayWarna;
  className?: string;
  showLabel?: boolean;
}) {
  const imageFile = warnaToImageFile[warna];

  return (
    <div className="relative h-full w-full">
      <Image
        src={`/omoway/colors/${imageFile}.jpg`}
        alt={`Omo ${warna}`}
        width={930}
        height={620}
        className={className ? `${className} object-cover object-center` : "h-full w-full object-cover object-center"}
        priority
      />
      {showLabel && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent py-3 text-center">
          <p className="text-xs text-white/80">Omo • {warna}</p>
        </div>
      )}
    </div>
  );
}
