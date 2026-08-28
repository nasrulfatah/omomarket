import { ImageResponse } from "next/og";

export const alt = "Omomarket — Marketplace Pre Order Omo";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 75% 50%, rgba(163,230,53,0.35), rgba(0,0,0,0) 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 88,
              height: 88,
              borderRadius: 20,
              backgroundColor: "#000000",
              border: "3px solid #a3e635",
              color: "#a3e635",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            -O-
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            Omomarket
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Cari Unit <span style={{ color: "#a3e635", margin: "0 12px" }}>Omo</span> Pre Order
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,255,255,0.65)",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Katalog PO Omo — tipe, warna, dealer lengkap
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
