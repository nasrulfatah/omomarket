import { randomUUID } from "crypto";
import { getSheetData } from "./google";
import type { Listing } from "./types";

export async function getAllListings(): Promise<Listing[]> {
  try {
    const rows = await getSheetData();

    const listings: Listing[] = rows
      .map((row, index) => {
        const [timestamp, nama, noWa, noPO, tipe, warna, dealer, hargaStr, status] = row;

        return {
          id: `${noPO}-${index}`,
          nama: nama || "",
          noWa: noWa || "",
          noPO: noPO || "",
          tipe: tipe || "",
          warna: warna || "",
          dealer: dealer || "",
          hargaModal: parseInt(hargaStr?.replace(/[^\d]/g, "") || "0") || 0,
          status: status || "Draft",
          createdAt: timestamp || new Date().toISOString(),
        };
      })
      .filter((l) => l.status !== "Draft")
      .sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return listings;
  } catch {
    return [];
  }
}

export async function getListingById(id: string): Promise<Listing | undefined> {
  const all = await getAllListings();
  return all.find((l) => l.id === id);
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
