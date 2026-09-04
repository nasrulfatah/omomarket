import { randomUUID } from "crypto";
import { getSheetData, getPartsSheetData } from "./google";
import type { Listing, Part, PartCategory } from "./types";

export async function getAllListings(): Promise<Listing[]> {
  try {
    const rows = await getSheetData();

    const listings: Listing[] = rows
      .map((row, index) => {
        const [timestamp, nama, noWa, noPO, tipe, warna, dealer, hargaStr, status, verifiedStr] = row;

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
  const [timestamp, nama, noWa, noPO, tipe, warna, dealer, hargaStr, status, verifiedStr] = row;

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

export async function getAllParts(): Promise<Part[]> {
  try {
    const rows = await getPartsSheetData();

    const parts: Part[] = rows
      .map((row, index) => {
        const [nama, hargaStr, kategori, deskripsi, gambar, shopeeLink, status, createdAt] = row;

        return {
          index,
          part: {
            id: randomUUID(),
            nama: nama || "",
            harga: parseInt(hargaStr?.replace(/[^\d]/g, "") || "0") || 0,
            kategori: (kategori || "") as PartCategory,
            deskripsi: deskripsi || "",
            gambar: gambar || "",
            shopeeLink: shopeeLink || "",
            createdAt: createdAt || new Date().toISOString(),
          },
        };
      })
      .filter(({ part }) => part.nama)
      .sort((a, b) => b.index - a.index)
      .map(({ part }) => part);

    return parts;
  } catch {
    return [];
  }
}
