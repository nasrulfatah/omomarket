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

    const isCdnUrl = (url: string) => {
      return url && url.includes("http") && (
        url.includes("minio") ||
        url.includes("shopee") ||
        url.includes("cf.shopee") ||
        url.includes("oss.") ||
        url.includes("cdn")
      );
    };

    // Strategy 1: Find all img tags dengan data dari Shopee CDN
    $("img").each((_, elem) => {
      const src = $(elem).attr("src") || "";
      const dataSrc = $(elem).attr("data-src") || "";
      const srcSet = $(elem).attr("srcset") || "";
      const dataLazy = $(elem).attr("data-lazy") || "";
      const dataXlazy = $(elem).attr("data-xlazy") || "";

      // Check src attribute
      if (isCdnUrl(src) && !imageUrls.has(src)) {
        imageUrls.add(src);
        images.push(src);
      }

      // Check data-src attribute (lazy loading)
      if (isCdnUrl(dataSrc) && !imageUrls.has(dataSrc)) {
        imageUrls.add(dataSrc);
        images.push(dataSrc);
      }

      // Check data-lazy attribute
      if (isCdnUrl(dataLazy) && !imageUrls.has(dataLazy)) {
        imageUrls.add(dataLazy);
        images.push(dataLazy);
      }

      // Check data-xlazy attribute
      if (isCdnUrl(dataXlazy) && !imageUrls.has(dataXlazy)) {
        imageUrls.add(dataXlazy);
        images.push(dataXlazy);
      }

      // Parse srcset
      if (srcSet) {
        const urls = srcSet.split(",").map((s) => s.split(" ")[0].trim());
        urls.forEach((url) => {
          if (isCdnUrl(url) && !imageUrls.has(url)) {
            imageUrls.add(url);
            images.push(url);
          }
        });
      }
    });

    // Strategy 2: Look for images in picture elements
    $("picture").each((_, elem) => {
      $(elem).find("source").each((_, source) => {
        const srcSet = $(source).attr("srcset") || "";
        if (srcSet) {
          const urls = srcSet.split(",").map((s) => s.split(" ")[0].trim());
          urls.forEach((url) => {
            if (isCdnUrl(url) && !imageUrls.has(url)) {
              imageUrls.add(url);
              images.push(url);
            }
          });
        }
      });
    });

    // Strategy 3: Look for noscript tags (sometimes used for fallback images)
    $("noscript").each((_, elem) => {
      const content = $(elem).html() || "";
      const noscriptHtml = $.load(content);
      noscriptHtml("img").each((_, img) => {
        const src = noscriptHtml(img).attr("src") || "";
        if (isCdnUrl(src) && !imageUrls.has(src)) {
          imageUrls.add(src);
          images.push(src);
        }
      });
    });

    // Extract nama produk dari multiple selector (Shopee structure bisa berubah)
    let nama = "";
    const nameSelectors = [
      "h1",
      "[data-testid='pdp-product-title']",
      ".product-title",
      ".shopee-product-name",
      "[itemprop='name']",
      ".qaNwyQp",  // Shopee dynamic class (observed)
      ".PJXr--",   // Another Shopee class
      "h1 span",
      ".shopee--6f7VF",  // More Shopee dynamic classes
    ];

    for (const selector of nameSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        const text = element.text().trim();
        if (text.length > 10 && text.length < 200) {  // Reasonable length for product name
          nama = text;
          break;
        }
      }
    }

    // Extract harga (format Rp)
    let harga = 0;
    const priceSelectors = [
      "[data-testid='pdp-price']",
      "[data-testid='pdp-price-current']",
      ".product-price",
      ".shopee-price",
      "[itemprop='price']",
      ".QPUY--",  // Shopee dynamic class for price
      ".YqFZvj",  // Another price class
      "span.qaNwyQp",  // Price in span
    ];

    for (const selector of priceSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        const priceText = elements.first().text();
        // Extract angka dari format Rp X.XXX.XXX
        const match = priceText.replace(/\D/g, "");
        if (match && parseInt(match, 10) > 1000) {  // Reasonable price (at least 1k)
          harga = parseInt(match, 10);
          break;
        }
      }
    }

    // Also try to extract from JSON-LD structured data if available
    if (harga === 0) {
      const jsonLdScripts = $('script[type="application/ld+json"]');
      jsonLdScripts.each((_, elem) => {
        try {
          const data = JSON.parse($(elem).html() || "");
          if (data.offers && data.offers[0] && data.offers[0].price) {
            harga = parseInt(data.offers[0].price, 10);
          }
        } catch (e) {
          // Ignore JSON-LD parsing errors
        }
      });
    }

    // Extract deskripsi
    let deskripsi = "";
    const descSelectors = [
      "[data-testid='pdp-product-description']",
      ".product-description",
      ".shopee-description",
      "[itemprop='description']",
      ".shopee--J4v7Q",  // Shopee description class
    ];

    for (const selector of descSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        const text = element.text().trim().substring(0, 500);  // Max 500 chars
        if (text.length > 10) {
          deskripsi = text;
          break;
        }
      }
    }

    // Return 5 gambar pertama (bisa kosong)
    const limitedImages = images.slice(0, 5);
    const hasImages = limitedImages.length > 0;
    const hasData = nama || harga > 0 || deskripsi;

    // Log untuk debugging
    console.log("Scrape result:", {
      url: response.url,
      hasImages,
      imageCount: limitedImages.length,
      hasNama: !!nama,
      hasHarga: harga > 0,
      hasDeskripsi: !!deskripsi,
    });

    return NextResponse.json({
      success: hasImages || hasData, // true jika ada gambar atau data
      images: limitedImages,
      count: limitedImages.length,
      nama: nama || "",
      harga: harga || 0,
      deskripsi: deskripsi || "",
      message: hasImages
        ? `Berhasil scrape ${limitedImages.length} gambar${hasData ? " + data produk" : ""}`
        : hasData
        ? "Data produk berhasil di-extract tapi gambar tidak ditemukan"
        : "Tidak bisa extract data dari link ini. Coba link Shopee desktop yang berbeda.",
    });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { error: "Terjadi error saat scraping: " + String(error) },
      { status: 500 }
    );
  }
}
