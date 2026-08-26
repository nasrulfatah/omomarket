"use client";

import { useState } from "react";
import Link from "next/link";
import CatalogFilter from "./CatalogFilter";
import ListingCard from "./ListingCard";
import { type Listing, type OmowayTipe, type OmowayWarna, type OmowayDealer } from "@/lib/types";

export default function CatalogSection({ listings }: { listings: Listing[] }) {
  const [filters, setFilters] = useState<{
    tipe?: OmowayTipe;
    warna?: OmowayWarna;
    dealer?: OmowayDealer;
  }>({});

  const filteredListings = listings.filter((listing) => {
    if (filters.tipe && listing.tipe !== filters.tipe) return false;
    if (filters.warna && listing.warna !== filters.warna) return false;
    if (filters.dealer && listing.dealer !== filters.dealer) return false;
    return true;
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <section id="katalog" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Katalog PO</h2>
        <p className="text-sm text-black/60">
          {filteredListings.length} PO tersedia dari para penjual.
        </p>
      </div>

      <CatalogFilter onFilterChange={handleFilterChange} />

      {filteredListings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-neutral-50 p-12 text-center">
          <p className="text-black/60">
            Belum ada listing yang sesuai dengan filter. Coba ubah filter atau jadi penjual pertama?
          </p>
          <Link
            href="/jual"
            className="mt-4 inline-block rounded-full bg-accent px-5 py-3 text-sm font-bold text-black hover:bg-accent-dark"
          >
            Listing PO Sekarang
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </section>
  );
}
