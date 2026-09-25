import { appendToSheetTab } from "@/lib/google";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { parts } = await request.json();

    if (!parts || !Array.isArray(parts) || parts.length === 0) {
      return NextResponse.json(
        { error: "Data parts diperlukan" },
        { status: 400 }
      );
    }

    // Validate structure
    for (const part of parts) {
      if (!Array.isArray(part) || part.length < 8) {
        return NextResponse.json(
          { error: "Struktur data parts tidak valid" },
          { status: 400 }
        );
      }
    }

    const headerRow = [
      "Nama",
      "Harga",
      "Kategori",
      "Deskripsi",
      "Gambar",
      "Shopee Link",
      "Status",
      "Created At",
    ];

    // Append to Google Sheets
    await appendToSheetTab("Parts", parts, headerRow);

    return NextResponse.json(
      {
        success: true,
        count: parts.length,
        message: "Produk berhasil ditambahkan ke Google Sheets",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding parts:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
