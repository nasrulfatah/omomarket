import { NextRequest, NextResponse } from "next/server";
import { appendToSheetTab } from "@/lib/google";
import { formatRupiah } from "@/lib/types";

const REQUEST_SHEET_NAME = "Request PO";
const REQUEST_SHEET_HEADER = [
  "Timestamp",
  "Nama",
  "No WhatsApp",
  "Tipe Diminati",
  "Warna Diminati",
  "Dealer Diminati",
  "Budget Maksimal",
  "Catatan",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, noWa, tipe, warna, dealer, budgetMax, catatan } = body;

    if (!nama || !noWa) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("id-ID");
    const values = [
      [
        timestamp,
        nama,
        noWa,
        tipe || "Semua Tipe",
        warna || "Semua Warna",
        dealer || "Semua Dealer",
        budgetMax ? formatRupiah(budgetMax) : "-",
        catatan || "-",
      ],
    ];

    await appendToSheetTab(REQUEST_SHEET_NAME, values, REQUEST_SHEET_HEADER);

    return NextResponse.json(
      {
        success: true,
        message: "Request PO berhasil dikirim ke admin",
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Error in request-po API:", errorMsg, error);
    return NextResponse.json(
      { error: errorMsg || "Gagal mengirim request. Silahkan coba lagi." },
      { status: 500 }
    );
  }
}
