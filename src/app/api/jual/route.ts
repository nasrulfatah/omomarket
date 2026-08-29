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

    // Append to Google Sheets — auto-published, not yet verified by admin
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
        "Publish",
        "No",
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
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Error in jual API:", errorMsg, error);
    return NextResponse.json(
      { error: errorMsg || "Gagal menyimpan listing. Silahkan coba lagi." },
      { status: 500 }
    );
  }
}
