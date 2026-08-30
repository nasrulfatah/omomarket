import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getListingByIndex } from "@/lib/store";
import OmowayImage from "@/components/OmowayImage";
import POBenefits from "@/components/POBenefits";
import VerifiedBadge from "@/components/VerifiedBadge";
import {
  censorPO,
  formatRupiah,
  getHargaJual,
  isPioneer,
  warnaToHex,
  type OmowayWarna,
  WARNA_TO_ABBR,
} from "@/lib/types";

const ADMIN_WA = "6289611117575";

// Parse slug format: "tipe-warna-abbr-id" (e.g., "smart-long-tg-500")
// Returns { tipeSlug, warnaAbbr, id } or null if invalid
function parseProductSlug(slug: string) {
  const parts = slug.split("-");
  if (parts.length < 3) return null;

  const id = parts[parts.length - 1];
  const warnaAbbr = parts[parts.length - 2];
  const tipeSlug = parts.slice(0, -2).join("-");

  return { tipeSlug, warnaAbbr, id };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Handle old format /produk/[id] by redirecting
  if (slug === "produk") {
    notFound();
  }

  const parsed = parseProductSlug(slug);
  if (!parsed) notFound();

  const { tipeSlug, warnaAbbr, id } = parsed;

  // Try to find the listing by row index
  const listing = await getListingByIndex(id);

  if (!listing) notFound();

  // Verify the slug matches the listing's tipe and warna
  const listingTipeSlug = listing.tipe.toLowerCase().replace(/\s+/g, "-");
  const listingWarnaAbbr = WARNA_TO_ABBR[listing.warna];

  if (tipeSlug !== listingTipeSlug || warnaAbbr !== listingWarnaAbbr) {
    notFound();
  }

  const hargaJual = getHargaJual(listing);
  const pioneer = isPioneer(listing.noPO);
  const isSold = listing.status === "Sold";

  const productUrl = `https://omomarket.shop/${slug}`;
  const waText = encodeURIComponent(
    `Halo Omomarket, saya mau tanya unit Omo PO berikut:\n\n` +
      `Tipe: ${listing.tipe}\n` +
      `Warna: ${listing.warna}\n` +
      `Dealer: ${listing.dealer}\n` +
      `No. PO: ${censorPO(listing.noPO)}\n` +
      `Harga: ${formatRupiah(hargaJual)}\n` +
      `Link: ${productUrl}\n\n` +
      `Apakah unit ini masih tersedia?`
  );
  const waLink = `https://wa.me/${ADMIN_WA}?text=${waText}`;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        <Link href="/" className="text-sm font-medium text-black/60 hover:text-black">
          ← Kembali ke katalog
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="flex items-center justify-center rounded-2xl border border-line bg-white p-4 overflow-hidden lg:p-8 lg:col-span-7">
            <div className="w-full relative h-80 lg:h-auto aspect-[5/3]">
              <OmowayImage warna={listing.warna} className="w-full" showLabel={false} />
              {isSold && (
                <div className="absolute inset-0 bg-gray-400 opacity-20 rounded-lg" />
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-black">
                  {listing.tipe}
                </span>
                {pioneer && (
                  <span className="inline-block rounded-full border border-yellow-400 px-3 py-1 text-xs font-semibold text-yellow-600">
                    PIONEER
                  </span>
                )}
                {isSold && (
                  <span className="inline-block rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                    SOLD
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-black">
                Omo {listing.tipe} <br />
                <span style={{ color: warnaToHex(listing.warna) }}>
                  {listing.warna}
                </span>
              </h1>

              <div className="mt-6 space-y-2">
                <p className="text-black/70">
                  <span className="font-medium">Dealer:</span> {listing.dealer}
                </p>
                {listing.verified && (
                  <p className="flex items-center gap-2 text-black/70">
                    <VerifiedBadge className="h-5 w-5" />
                    <span className="font-medium">Terverifikasi Omomarket</span>
                  </p>
                )}
                <p className="text-black/70">
                  <span className="font-medium">No. PO:</span> {censorPO(listing.noPO)}
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-line bg-neutral-50 p-4">
                <p className="text-sm text-black/60">Harga PO</p>
                <p className="text-3xl font-bold text-black">
                  {formatRupiah(hargaJual)}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-bold text-white transition hover:bg-[#20BA5A]"
                >
                  <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24">
                    <path d="M17.6915026,13.4744748 C17.4788064,13.3688035 16.2126844,12.7368421 16.0272231,12.6701581 C15.8417618,12.6034742 15.7128169,12.5702381 15.5274651,12.7906985 C15.3421133,13.0111589 14.880718,13.5500605 14.7228014,13.7041284 C14.565885,13.8581963 14.4088378,13.8645705 14.1961416,13.7589024 C13.2745911,13.2788321 12.08659,12.7171481 11.1274006,11.8962254 C10.3748898,11.2493569 9.82461807,10.4502161 9.66697886,9.52604706 C9.60979104,9.19018146 9.70872121,8.92117662 9.97788349,8.72069819 C10.1868139,8.57784288 10.4324599,8.38192908 10.6437266,8.14138346 C10.8549932,7.90083784 10.9343168,7.6958938 10.8676327,7.46381929 C10.8009486,7.23174478 10.3448285,5.96509869 10.1651204,5.50637197 C9.98975464,5.08187851 9.81099264,5.15201313 9.68211309,5.15201313 C9.55623639,5.15201313 9.42732863,5.15201313 9.29840816,5.15201313 C9.17248601,5.15201313 8.97263791,5.20563469 8.78708662,5.42608102 C8.60153534,5.64652736 8.07351022,6.27848638 8.07351022,7.54513627 C8.07351022,8.81178617 8.80776818,10.0355215 8.91348159,10.1895893 C9.01919501,10.3436572 10.3448285,12.8297869 12.5823644,13.8834217 C13.1224828,14.1271715 13.5426984,14.2747648 13.8621879,14.3632017 C14.4049895,14.5328609 14.9090843,14.5008896 15.3012426,14.4389452 C15.7350773,14.3677853 16.6240988,13.8891314 16.8033975,13.3580305 C16.9826962,12.8269296 16.9826962,12.3870635 16.9160121,12.2788321 C16.8493281,12.1706007 16.7203833,12.1143191 16.5056034,12.0074646 L17.6915026,13.4744748 Z M12,2 C6.47715,2 2,6.47715 2,12 C2,17.52285 6.47715,22 12,22 C17.52285,22 22,17.52285 22,12 C22,6.47715 17.52285,2 12,2 Z" />
                  </svg>
                  Tanya via WhatsApp
                </a>
              </div>
            </div>

            <POBenefits />
          </div>
        </div>
      </div>
    </div>
  );
}
