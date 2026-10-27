import { NextRequest, NextResponse } from "next/server";
import { appendToSheetTab } from "@/lib/google";

const CLICK_SHEET_NAME = "Klik";
const CLICK_SHEET_HEADER = ["Timestamp", "Nama"];

// Mencatat satu klik tombol "Beli" untuk menentukan produk Hot
export async function POST(request: NextRequest) {
  try {
    const { nama } = await request.json();

    if (typeof nama !== "string" || !nama.trim() || nama.length > 200) {
      return NextResponse.json({ error: "Nama produk tidak valid" }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString("id-ID");
    await appendToSheetTab(CLICK_SHEET_NAME, [[timestamp, nama.trim()]], CLICK_SHEET_HEADER);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Error in track-click API:", errorMsg, error);
    return NextResponse.json({ error: "Gagal mencatat klik" }, { status: 500 });
  }
}
