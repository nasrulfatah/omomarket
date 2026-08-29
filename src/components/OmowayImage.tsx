import Image from "next/image";
import { WARNA_TO_IMAGE_FILE, type OmowayWarna } from "@/lib/types";

export default function OmowayImage({
  warna,
  className,
  showLabel = true,
}: {
  warna: OmowayWarna;
  className?: string;
  showLabel?: boolean;
}) {
  const imageFile = WARNA_TO_IMAGE_FILE[warna];

  return (
    <div className="relative h-full w-full">
      <Image
        src={`/omoway/colors/${imageFile}.jpg`}
        alt={`Omo ${warna}`}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover object-center"
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
