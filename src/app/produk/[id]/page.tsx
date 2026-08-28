import Link from "next/link";
import { notFound } from "next/navigation";
import { getListingById } from "@/lib/store";
import OmowayImage from "@/components/OmowayImage";
import POBenefits from "@/components/POBenefits";
import {
  censorPO,
  formatRupiah,
  getHargaJual,
  getSharingFee,
  isPioneer,
  warnaToHex,
  type OmowayWarna,
} from "@/lib/types";

const ADMIN_WA = "6289611117575";

export default async function ProdukDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) notFound();

  const hargaJual = getHargaJual(listing);
  const sharingFee = getSharingFee(listing.tipe);
  const pioneer = isPioneer(listing.noPO);
  const isSold = listing.status === "Sold";

  const waText = encodeURIComponent(
    `Halo Omomarket, saya mau tanya unit Omo PO berikut:\n\n` +
      `Tipe: ${listing.tipe}\n` +
      `Warna: ${listing.warna}\n` +
      `Dealer: ${listing.dealer}\n` +
      `Harga: ${formatRupiah(hargaJual)}\n\n` +
      `Apakah unit ini masih tersedia?`
  );
  const waLink = `https://wa.me/${ADMIN_WA}?text=${waText}`;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        <Link href="/" className="text-sm font-medium text-black/60 hover:text-black">
          ← Kembali ke katalog
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex items-center justify-center rounded-2xl border border-line bg-white p-4">
          <div className="w-72 relative h-96 overflow-hidden rounded-lg">
            <OmowayImage warna={listing.warna} className="w-full" showLabel={false} />
            {isSold && (
              <div className="absolute inset-0 bg-gray-400 opacity-20 rounded-lg" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {isSold && (
                <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                  SOLD
                </span>
              )}
              {pioneer && (
                <span className="rounded-full bg-black px-3 py-1 text-xs font-bold text-yellow-400">
                  PIONEER
                </span>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-extrabold">
              Omo {listing.tipe} — {listing.warna}
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-line p-5 text-sm">
            <div>
              <p className="text-black/50">Tipe</p>
              <span className="inline-block rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-soft-text">
                {listing.tipe}
              </span>
            </div>
            <div>
              <p className="text-black/50">Warna</p>
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
            <div>
              <p className="text-black/50">Dealer</p>
              <p className="font-semibold">{listing.dealer}</p>
            </div>
            <div>
              <p className="text-black/50">No. PO</p>
              <p className="font-mono font-semibold">{censorPO(listing.noPO)}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-neutral-50 p-5">
            <p className="text-sm text-black/50">Harga PO</p>
            <p className="text-3xl font-extrabold">{formatRupiah(hargaJual)}</p>
          </div>

          <POBenefits />
        </div>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-line bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6">
          {isSold ? (
            <div className="rounded-full bg-gray-100 px-6 py-4 text-center">
              <p className="text-base font-bold text-gray-600">PO ini sudah terjual</p>
            </div>
          ) : (
            <>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-center text-base font-bold text-black transition hover:bg-accent-dark"
              >
                Saya Minat!
              </a>
              <p className="mt-2 text-center text-xs text-black/50">
                Nomor PO lengkap akan dikonfirmasi oleh admin saat proses berlangsung.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
