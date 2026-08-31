import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { getListingByIndex } from "@/lib/store";
import {
  censorPO,
  formatRupiah,
  getHargaJual,
  isPioneer,
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
  const pioneer = isPioneer(listing.noPO);
  const isSold = listing.status === "Sold";
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
          justifyContent: "space-between",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 78% 55%, rgba(163,230,53,0.30), rgba(0,0,0,0) 60%)",
          fontFamily: "sans-serif",
          padding: "0 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 560,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {isSold && (
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  backgroundColor: "#dc2626",
                  color: "#ffffff",
                  fontSize: 20,
                  fontWeight: 800,
                  padding: "8px 18px",
                  borderRadius: 999,
                }}
              >
                SOLD
              </div>
            )}
            {pioneer && (
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  backgroundColor: "#000000",
                  border: "2px solid #facc15",
                  color: "#facc15",
                  fontSize: 20,
                  fontWeight: 800,
                  padding: "8px 18px",
                  borderRadius: 999,
                }}
              >
                PIONEER
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 46,
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#ffffff",
            }}
          >
            Omo {listing.tipe} — {listing.warna}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.6)" }}>
            {listing.dealer} • No. PO {censorPO(listing.noPO)}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 12,
            }}
          >
            <span style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,0.5)" }}>
              Harga PO
            </span>
            <span style={{ display: "flex", fontSize: 44, fontWeight: 800, color: "#a3e635" }}>
              {formatRupiah(hargaJual)}
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 540,
            height: 432,
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: "#ffffff",
          }}
        >
          <img src={imageSrc} width={540} height={432} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
