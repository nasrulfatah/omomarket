import { NextRequest, NextResponse } from "next/server";
import { appendToSheetTab } from "@/lib/google";

export async function POST(request: NextRequest) {
  try {
    const { products } = await request.json();

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "Products array adalah required dan tidak boleh kosong" },
        { status: 400 }
      );
    }

    // Append ke 'Accessories' tab
    await appendToSheetTab("Accessories", products);

    return NextResponse.json({
      success: true,
      message: `Berhasil menambahkan ${products.length} produk ke Accessories`,
      count: products.length,
    });
  } catch (error) {
    console.error("Error batch adding products:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan produk: " + String(error) },
      { status: 500 }
    );
  }
}
