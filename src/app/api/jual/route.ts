import { NextRequest, NextResponse } from "next/server";
import { appendToSheet } from "@/lib/google";
import { formatRupiah } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { nama, noWa, noPO, tipe, warna, dealer, hargaModal } = body;

    // Validate required fields
    if (!nama || !noWa || !noPO || !tipe || !warna || !dealer || !hargaModal) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Append to Google Sheets with Draft status
    const timestamp = new Date().toLocaleString("id-ID");
    const values = [
      [
        timestamp,
        nama,
        noWa,
        noPO,
        tipe,
        warna,
        dealer,
        formatRupiah(hargaModal),
        "Draft",
      ],
    ];

    await appendToSheet(values);

    return NextResponse.json(
      {
        success: true,
        message: "Listing berhasil disimpan dan dikirim ke admin",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in jual API:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan listing. Silahkan coba lagi." },
      { status: 500 }
    );
  }
}
