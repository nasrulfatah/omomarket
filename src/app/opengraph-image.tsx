import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Omomarket — Marketplace Pre Order Omo";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const imageBuffer = readFileSync(
    join(process.cwd(), "public/omoway/aurora-green-og.png")
  );
  const imageSrc = `data:image/png;base64,${imageBuffer.toString("base64")}`;

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
            "radial-gradient(circle at 78% 55%, rgba(163,230,53,0.35), rgba(0,0,0,0) 60%)",
          fontFamily: "sans-serif",
          padding: "0 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 640,
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              backgroundColor: "#a3e635",
              color: "#000000",
              fontSize: 20,
              fontWeight: 800,
              padding: "8px 18px",
              borderRadius: 999,
            }}
          >
            Katalog Pre Order Omo
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#ffffff",
            }}
          >
            <span>Cari Unit&nbsp;</span>
            <span style={{ color: "#a3e635" }}>Omo&nbsp;</span>
            <span>Pre Order, lebih cepat dapatnya, banyak benefitnya.</span>
          </div>
        </div>
        <img src={imageSrc} width={560} height={449} />
      </div>
    ),
    {
      ...size,
    }
  );
}
