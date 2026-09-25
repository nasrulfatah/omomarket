import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(request: NextRequest) {
  try {
    const { shopeeUrl } = await request.json();

    if (!shopeeUrl || typeof shopeeUrl !== "string") {
      return NextResponse.json(
        { error: "shopeeUrl diperlukan" },
        { status: 400 }
      );
    }

    // Validate Shopee URL
    if (!shopeeUrl.includes("shopee.co.id")) {
      return NextResponse.json(
        { error: "URL harus dari shopee.co.id" },
        { status: 400 }
      );
    }

    // Fetch halaman Shopee dengan User-Agent untuk avoid blocking
    const response = await fetch(shopeeUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Gagal fetch halaman Shopee" },
        { status: 500 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract gambar dari Shopee product page
    // Shopee menyimpan gambar di dalam <div> dengan class yang berisi gambar product
    const images: string[] = [];

    // Try multiple selectors untuk robustness
    // Shopee image selectors (bisa berubah jika Shopee ubah struktur)
    $("img").each((_, elem) => {
      const src = $(elem).attr("src") || "";
      const dataSrc = $(elem).attr("data-src") || "";
      const srcSet = $(elem).attr("srcset") || "";

      // Filter gambar yang likely gambar produk
      if (src && (src.includes("minio") || src.includes("cf.shopee"))) {
        if (!images.includes(src)) images.push(src);
      }
      if (dataSrc && (dataSrc.includes("minio") || dataSrc.includes("cf.shopee"))) {
        if (!images.includes(dataSrc)) images.push(dataSrc);
      }

      // Parse srcset untuk multiple resolutions
      if (srcSet) {
        const urls = srcSet.split(",").map((s) => s.split(" ")[0].trim());
        urls.forEach((url) => {
          if (
            url &&
            !images.includes(url) &&
            (url.includes("minio") || url.includes("cf.shopee"))
          ) {
            images.push(url);
          }
        });
      }
    });

    if (images.length === 0) {
      return NextResponse.json(
        { error: "Tidak menemukan gambar di halaman Shopee" },
        { status: 404 }
      );
    }

    // Return 5 gambar pertama saja (buat performance)
    const limitedImages = images.slice(0, 5);

    return NextResponse.json({
      success: true,
      images: limitedImages,
      count: limitedImages.length,
    });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { error: "Terjadi error saat scraping: " + String(error) },
      { status: 500 }
    );
  }
}
