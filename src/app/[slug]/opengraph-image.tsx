import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { getListingByIndex } from "@/lib/store";
import {
  formatRupiah,
  getHargaJual,
  WARNA_TO_IMAGE_FILE,
} from "@/lib/types";

export const alt = "Omo Pre Order — Omomarket";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function parseProductSlug(slug: string) {
  const parts = slug.split("-");
  if (parts.length < 3) return null;

  const id = parts[parts.length - 1];
  const warnaAbbr = parts[parts.length - 2];
  const tipeSlug = parts.slice(0, -2).join("-");

  return { tipeSlug, warnaAbbr, id };
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parseProductSlug(slug);

  if (!parsed) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000",
            color: "#ffffff",
            fontFamily: "sans-serif",
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          Omomarket
        </div>
      ),
      { ...size }
    );
  }

  const { id } = parsed;
  const listing = await getListingByIndex(id);

  if (!listing) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000",
            color: "#ffffff",
            fontFamily: "sans-serif",
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          Omomarket
        </div>
      ),
      { ...size }
    );
  }

  const hargaJual = getHargaJual(listing);
  const imageFile = WARNA_TO_IMAGE_FILE[listing.warna];
  const imageBuffer = readFileSync(
    join(process.cwd(), `public/omoway/colors-og/${imageFile}.jpg`)
  );
  const imageSrc = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Product image as background */}
        <img
          src={imageSrc}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 1,
          }}
        />

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Info overlay - bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "48px 64px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            zIndex: 10,
          }}
        >
          {/* Tipe & Warna */}
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 18,
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            <span>{listing.tipe}</span>
            <span style={{ color: "#a3e635" }}>•</span>
            <span style={{ color: "#a3e635" }}>{listing.warna}</span>
          </div>

          {/* Harga - Main info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                fontSize: 16,
                color: "#9ca3af",
              }}
            >
              Harga PO
            </div>
            <div
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: "#a3e635",
              }}
            >
              {formatRupiah(hargaJual)}
            </div>
          </div>
        </div>

        {/* Omomarket badge - top left */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            backgroundColor: "#a3e635",
            color: "#000000",
            padding: "8px 16px",
            borderRadius: "9999px",
            fontSize: 14,
            fontWeight: 700,
            zIndex: 10,
          }}
        >
          Omomarket
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
