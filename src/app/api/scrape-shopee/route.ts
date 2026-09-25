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

    // Fetch halaman Shopee dengan User-Agent & follow redirect
    const response = await fetch(shopeeUrl, {
      method: "GET",
      redirect: "follow", // Follow redirect (301, 302, etc)
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "id-ID,id;q=0.9",
        "Accept-Encoding": "gzip, deflate",
        "DNT": "1",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Gagal fetch halaman Shopee (${response.status})` },
        { status: 500 }
      );
    }

    let html = await response.text();

    // Check if redirected to mobile version, try desktop version instead
    if (html.includes("__mobile__=1") || response.url.includes("__mobile__=1")) {
      const desktopUrl = response.url.replace("__mobile__=1&", "").replace("&__mobile__=1", "");
      try {
        const desktopResponse = await fetch(desktopUrl, {
          method: "GET",
          redirect: "follow",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept":
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "id-ID,id;q=0.9",
            "Accept-Encoding": "gzip, deflate",
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
          },
        });
        if (desktopResponse.ok) {
          html = await desktopResponse.text();
        }
      } catch (err) {
        // Fallback ke mobile HTML jika desktop fetch gagal
        console.log("Desktop fetch failed, using mobile HTML");
      }
    }

    const $ = cheerio.load(html);

    // Extract gambar dengan multiple strategy
    const images: string[] = [];
    const imageUrls = new Set<string>();

    // Strategy 1: Find all img tags dengan data dari minio/shopee CDN
    $("img").each((_, elem) => {
      const src = $(elem).attr("src") || "";
      const dataSrc = $(elem).attr("data-src") || "";
      const srcSet = $(elem).attr("srcset") || "";

      // Check src attribute
      if (src && (src.includes("minio") || src.includes("shopee") || src.includes("cf.shopee"))) {
        if (!imageUrls.has(src) && src.startsWith("http")) {
          imageUrls.add(src);
          images.push(src);
        }
      }

      // Check data-src attribute
      if (dataSrc && (dataSrc.includes("minio") || dataSrc.includes("shopee") || dataSrc.includes("cf.shopee"))) {
        if (!imageUrls.has(dataSrc) && dataSrc.startsWith("http")) {
          imageUrls.add(dataSrc);
          images.push(dataSrc);
        }
      }

      // Parse srcset
      if (srcSet) {
        const urls = srcSet.split(",").map((s) => s.split(" ")[0].trim());
        urls.forEach((url) => {
          if (
            url &&
            !imageUrls.has(url) &&
            (url.includes("minio") || url.includes("shopee") || url.includes("cf.shopee")) &&
            url.startsWith("http")
          ) {
            imageUrls.add(url);
            images.push(url);
          }
        });
      }
    });

    // Strategy 2: Look for images in picture elements
    $("picture source").each((_, elem) => {
      const srcSet = $(elem).attr("srcset") || "";
      if (srcSet) {
        const url = srcSet.split(",")[0].split(" ")[0].trim();
        if (
          url &&
          !imageUrls.has(url) &&
          (url.includes("minio") || url.includes("shopee") || url.includes("cf.shopee")) &&
          url.startsWith("http")
        ) {
          imageUrls.add(url);
          images.push(url);
        }
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
