import Link from "next/link";
import Image from "next/image";
import { getAllListings } from "@/lib/store";
import CatalogSection from "@/components/CatalogSection";
import { PO_BENEFITS } from "@/components/POBenefits";

export const dynamic = "force-dynamic";

export default async function Home() {
  const listings = await getAllListings();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-black via-black to-[#0c1f08] text-white">
        {/* decorative glow orbs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-1/3 h-96 w-96 rounded-full bg-accent-dark/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold text-black shadow-[0_0_24px_-4px_var(--accent)]">
              Katalog Pre Order Omo
            </span>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
              Cari Unit <span className="text-accent">Omo</span> Pre Order,
              <br />
              lebih cepat dapatnya,
              <br />
              banyak benefitnya.
            </h1>
            <p className="max-w-xl text-white/70">
              Semua listing dari penjual PO Omo ada di sini — tipe, warna,
              dan dealer lengkap. Klik PO yang kamu mau lalu chat via
              WhatsApp untuk lanjut proses.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#katalog"
                className="rounded-full bg-accent px-5 py-3 text-sm font-bold text-black transition hover:bg-accent-dark"
              >
                Lihat Katalog
              </Link>
              <Link
                href="/jual"
                className="rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                Jual PO Kamu
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 rounded-full bg-accent/35 blur-[80px]" />
            <div className="absolute inset-8 rounded-full bg-accent/25 blur-2xl" />
            <Image
              src="/omoway/aurora-green-hero.png"
              alt="Omo Aurora Green"
              width={1839}
              height={1473}
              className="relative w-full scale-125 drop-shadow-[0_0_45px_rgba(163,230,53,0.55)]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-8">
            <span className="w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent-soft-text">
              Benefit PO
            </span>
            <h2 className="mt-3 text-2xl font-bold">
              Ambil alih PO, dapat lebih banyak dari beli baru di dealer
            </h2>
            <p className="mt-1 text-sm text-black/60">
              Karena statusnya PO (Pre Order) yang diambil alih, PO ini
              punya benefit tambahan yang tidak didapat kalau beli PO baru
              langsung di dealer.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PO_BENEFITS.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3 rounded-2xl border border-line bg-neutral-50 p-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-black">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.415l-7.09 7.09a1 1 0 01-1.414 0L4.296 9.89a1 1 0 111.414-1.414l3.09 3.09 6.383-6.383a1 1 0 011.521.106z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <p className="text-sm font-medium text-black/80">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CatalogSection listings={listings} />
    </div>
  );
}
