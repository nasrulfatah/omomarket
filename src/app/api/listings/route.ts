import { NextRequest, NextResponse } from "next/server";
import { addListing, getAllListings } from "@/lib/store";
import {
  TIPE_OPTIONS,
  WARNA_OPTIONS,
  HARGA_OPTIONS,
  type OmowayTipe,
  type OmowayWarna,
} from "@/lib/types";

export async function GET() {
  const listings = await getAllListings();
  return NextResponse.json({ listings });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nama, noWa, noPO, tipe, warna, dealer, hargaModal } = body ?? {};

  if (
    typeof nama !== "string" ||
    !nama.trim() ||
    typeof noWa !== "string" ||
    !noWa.trim() ||
    typeof noPO !== "string" ||
    !noPO.trim() ||
    typeof dealer !== "string" ||
    !dealer.trim() ||
    !TIPE_OPTIONS.includes(tipe as OmowayTipe) ||
    !WARNA_OPTIONS.includes(warna as OmowayWarna) ||
    typeof hargaModal !== "number" ||
    !Number.isFinite(hargaModal) ||
    !HARGA_OPTIONS[tipe as OmowayTipe]?.includes(hargaModal)
  ) {
    return NextResponse.json(
      { error: "Data tidak lengkap atau tidak valid." },
      { status: 400 }
    );
  }

  const listing = await addListing({
    nama: nama.trim(),
    noWa: noWa.trim(),
    noPO: noPO.trim(),
    tipe,
    warna,
    dealer: dealer.trim(),
    hargaModal,
  });

  return NextResponse.json({ listing }, { status: 201 });
}
