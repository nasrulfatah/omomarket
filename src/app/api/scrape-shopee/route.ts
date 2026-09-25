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

    // Extract gambar
    const images: string[] = [];
    $("img").each((_, elem) => {
      const src = $(elem).attr("src") || "";
      const dataSrc = $(elem).attr("data-src") || "";
      const srcSet = $(elem).attr("srcset") || "";

      if (src && (src.includes("minio") || src.includes("cf.shopee"))) {
        if (!images.includes(src)) images.push(src);
      }
      if (dataSrc && (dataSrc.includes("minio") || dataSrc.includes("cf.shopee"))) {
        if (!images.includes(dataSrc)) images.push(dataSrc);
      }

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

    // Extract nama produk dari multiple selector (Shopee structure bisa berubah)
    let nama = "";
    // Try common Shopee product name selectors
    const nameSelectors = [
      "h1",
      "[data-testid='pdp-product-title']",
      ".product-title",
      ".shopee-product-name",
    ];

    for (const selector of nameSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        nama = element.text().trim();
        if (nama.length > 0) break;
      }
    }

    // Extract harga (format Rp)
    let harga = 0;
    const priceSelectors = [
      "[data-testid='pdp-price']",
      ".product-price",
      ".shopee-price",
      "span:contains('Rp')",
    ];

    for (const selector of priceSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        const priceText = elements.first().text();
        // Extract angka dari format Rp X.XXX.XXX
        const match = priceText.replace(/\D/g, "");
        if (match) {
          harga = parseInt(match, 10);
          if (harga > 0) break;
        }
      }
    }

    // Extract deskripsi
    let deskripsi = "";
    const descSelectors = [
      "[data-testid='pdp-product-description']",
      ".product-description",
      ".shopee-description",
    ];

    for (const selector of descSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        deskripsi = element.text().trim();
        if (deskripsi.length > 0) break;
      }
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: "Tidak menemukan gambar di halaman Shopee" },
        { status: 404 }
      );
    }

    // Return 5 gambar pertama
    const limitedImages = images.slice(0, 5);

    return NextResponse.json({
      success: true,
      images: limitedImages,
      count: limitedImages.length,
      nama: nama || "",
      harga: harga || 0,
      deskripsi: deskripsi || "",
    });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { error: "Terjadi error saat scraping: " + String(error) },
      { status: 500 }
    );
  }
}
