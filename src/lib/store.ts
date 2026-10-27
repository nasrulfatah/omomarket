import { randomUUID } from "crypto";
import { getSheetData, getPartsSheetData, getClickRows } from "./google";
import type { Listing, Part, PartCategory } from "./types";

export async function getAllListings(): Promise<Listing[]> {
  try {
    const rows = await getSheetData();

    const listings: Listing[] = rows
      .map((row, index) => {
        const [timestamp, nama, noWa, noPO, tipe, warna, dealer, hargaStr, status, verifiedStr, statusUnit] = row;

        return {
          index,
          listing: {
            id: `${noPO}-${index}`,
            nama: nama || "",
            noWa: noWa || "",
            noPO: noPO || "",
            tipe: tipe || "",
            warna: warna || "",
            dealer: dealer || "",
            hargaModal: parseInt(hargaStr?.replace(/[^\d]/g, "") || "0") || 0,
            status: status || "Draft",
            statusUnit: (statusUnit || "New") as "New" | "Ready Stock" | "Second" | undefined,
            verified: (verifiedStr || "").trim().toLowerCase() === "yes",
            createdAt: timestamp || new Date().toISOString(),
          },
        };
      })
      .filter(({ listing }) => listing.status !== "Draft")
      // Rows are appended to the Sheet in chronological order (oldest
      // first), so sorting by row index descending gives newest-first.
      // The timestamp column is a locale-formatted display string
      // ("26/8/2026, 23.16.30") that `new Date()` can't reliably parse,
      // so row order is the trustworthy signal here.
      .sort((a, b) => b.index - a.index)
      .map(({ listing }) => listing);

    return listings;
  } catch {
    return [];
  }
}

export async function getListingById(id: string): Promise<Listing | undefined> {
  const all = await getAllListings();
  return all.find((l) => l.id === id);
}

// Get listing by row index (from slug: "/tipe-warna-index")
export async function getListingByIndex(index: string): Promise<Listing | undefined> {
  const rows = await getSheetData();
  const rowIndex = parseInt(index);

  if (isNaN(rowIndex) || rowIndex < 0 || rowIndex >= rows.length) {
    return undefined;
  }

  const row = rows[rowIndex];
  const [timestamp, nama, noWa, noPO, tipe, warna, dealer, hargaStr, status, verifiedStr, statusUnit] = row;

  if ((status || "Draft") === "Draft") {
    return undefined;
  }

  return {
    id: `${noPO}-${rowIndex}`,
    nama: nama || "",
    noWa: noWa || "",
    noPO: noPO || "",
    tipe: tipe || "",
    warna: warna || "",
    dealer: dealer || "",
    hargaModal: parseInt(hargaStr?.replace(/[^\d]/g, "") || "0") || 0,
    status: status || "Draft",
    statusUnit: (statusUnit || "New") as "New" | "Ready Stock" | "Second" | undefined,
    verified: (verifiedStr || "").trim().toLowerCase() === "yes",
    createdAt: timestamp || new Date().toISOString(),
  };
}

export async function addListing(
  input: Omit<Listing, "id" | "createdAt">
): Promise<Listing> {
  const listing: Listing = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  return listing;
}

// Nilai di kolom "Recommended" yang dianggap ya (tidak peka huruf besar/kecil)
const RECOMMENDED_VALUES = /^(ya|yes|true|1|x|✓)$/i;
const HOT_PRODUCT_COUNT = 20;

// 20 produk dengan jumlah klik "Beli" terbanyak, dicocokkan lewat nama produk
async function getHotProductNames(): Promise<Set<string>> {
  const rows = await getClickRows();
  const counts = new Map<string, number>();

  for (const [nama] of rows) {
    const key = (nama || "").trim().toLowerCase();
    if (key) counts.set(key, (counts.get(key) || 0) + 1);
  }

  return new Set(
    [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, HOT_PRODUCT_COUNT)
      .map(([key]) => key)
  );
}

export async function getAllParts(): Promise<Part[]> {
  try {
    const rows = await getPartsSheetData();

    const parts: Part[] = rows
      .map((row, index) => {
        const [nama, hargaStr, kategori, deskripsi, gambar, shopeeLink, status, createdAt, recommended] = row;

        return {
          index,
          part: {
            id: randomUUID(),
            nama: nama || "",
            harga: parseInt(hargaStr?.replace(/[^\d]/g, "") || "0") || 0,
            kategori: (kategori || "")
              .split(",")
              .map((c: string) => c.trim())
              .filter(Boolean) as PartCategory[],
            deskripsi: deskripsi || "",
            gambar: gambar || "",
            shopeeLink: shopeeLink || "",
            createdAt: createdAt || new Date().toISOString(),
            recommended: RECOMMENDED_VALUES.test((recommended || "").trim()),
            hot: false,
          },
        };
      })
      .filter(({ part }) => part.nama)
      // Hanya produk berstatus Publish yang tampil di web. Status lain
      // (Draft, kosong, dll.) disembunyikan.
      .filter(({ index }) => (rows[index]?.[6] || "").trim().toLowerCase() === "publish")
      .sort((a, b) => b.index - a.index)
      .map(({ part }) => part);

    const hotNames = await getHotProductNames();
    return parts.map((part) => ({
      ...part,
      hot: hotNames.has(part.nama.trim().toLowerCase()),
    }));
  } catch {
    return [];
  }
}
