import Link from "next/link";
import OmowayImage from "./OmowayImage";
import VerifiedBadge from "./VerifiedBadge";
import {
  censorPO,
  formatRupiah,
  getHargaJual,
  isPioneer,
  warnaToHex,
  type Listing,
} from "@/lib/types";

export default function ListingCard({ listing }: { listing: Listing }) {
  const hargaJual = getHargaJual(listing);
  const pioneer = isPioneer(listing.noPO);

  const isSold = listing.status === "Sold";

  return (
    <Link
      href={`/produk/${listing.id}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:border-accent hover:shadow-xl hover:shadow-black/5 ${
        isSold ? "opacity-70" : ""
      }`}
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden">
        <OmowayImage warna={listing.warna} className="h-full w-full" showLabel={false} />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${warnaToHex(listing.warna)} 0%, transparent 100%)`,
          }}
        />
        {isSold && (
          <>
            <div className="absolute inset-0 bg-gray-400 opacity-20" />
            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform -rotate-12">
              SOLD
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-line p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-soft-text">
              {listing.tipe}
            </span>
            {pioneer && (
              <span className="rounded-full bg-black px-2.5 py-1 text-xs font-bold text-yellow-400">
                PIONEER
              </span>
            )}
          </div>
          <span
            className="inline-block rounded-full px-2.5 py-1 text-xs font-semibold text-white"
            style={{
              backgroundColor: warnaToHex(listing.warna),
              opacity: 0.9,
            }}
          >
            {listing.warna}
          </span>
        </div>
        <p className="text-sm text-black/70">
          Dealer: <span className="font-medium text-black">{listing.dealer}</span>
        </p>
        <p className="flex items-center gap-1.5 text-sm text-black/70">
          No. PO: <span className="font-mono font-medium text-black">{censorPO(listing.noPO)}</span>
          {listing.verified && <VerifiedBadge />}
        </p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <p className="text-lg font-bold text-black">{formatRupiah(hargaJual)}</p>
          <span className="text-sm font-semibold text-black underline decoration-accent decoration-2 underline-offset-4 group-hover:text-black">
            Detail →
          </span>
        </div>
      </div>
    </Link>
  );
}
