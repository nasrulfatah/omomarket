import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { getListingById } from "@/lib/store";
import {
  censorPO,
  formatRupiah,
  getHargaJual,
  isPioneer,
  WARNA_TO_IMAGE_FILE,
  WARNA_TO_ABBR,
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
  const listing = await getListingById(id);

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
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {pioneer && (
              <div
                style={{
                  borderRadius: "9999px",
                  border: "2px solid #facc15",
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 4,
                  paddingBottom: 4,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#ca8a04",
                }}
              >
                PIONEER
              </div>
            )}
            {isSold && (
              <div
                style={{
                  borderRadius: "9999px",
                  backgroundColor: "#dc2626",
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 4,
                  paddingBottom: 4,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                SOLD
              </div>
            )}
          </div>

          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <span>Omo {listing.tipe} —</span>
            <span style={{ color: "#a3e635" }}>{listing.warna}</span>
          </div>

          <div
            style={{
              fontSize: 14,
              color: "#9ca3af",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div>{listing.dealer}</div>
            <div>No. PO {censorPO(listing.noPO)}</div>
          </div>

          <div
            style={{
              fontSize: 14,
              color: "#6b7280",
              marginTop: 8,
            }}
          >
            Harga PO
          </div>

          <div
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "#a3e635",
            }}
          >
            {formatRupiah(hargaJual)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
