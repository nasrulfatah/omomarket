import type { Metadata } from "next";
import { getAllListings } from "@/lib/store";
import HomeContent from "@/components/HomeContent";

export const dynamic = "force-dynamic";

// Tetap memakai judul dan deskripsi lama (tidak ikut OG_TITLE / OG_DESCRIPTION)
const CATALOG_TITLE = "Omomarket — Marketplace Pre Order Omo";
const CATALOG_DESCRIPTION =
  "Katalog Pre Order Omo — listing PO, lihat katalog, dan chat langsung via WhatsApp.";

export const metadata: Metadata = {
  openGraph: {
    title: CATALOG_TITLE,
    description: CATALOG_DESCRIPTION,
    siteName: "Omomarket",
    locale: "id_ID",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: CATALOG_TITLE,
    description: CATALOG_DESCRIPTION,
  },
};

export default async function CatalogPage() {
  const listings = await getAllListings();

  return <HomeContent listings={listings} />;
}
