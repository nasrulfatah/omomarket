import { ImageResponse } from "next/og";

export const alt = "Omomarket — Marketplace Pre Order Omo";
export const size = {
  width: 1200,
  height: 872,
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
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 85% 30%, rgba(163,230,53,0.30), rgba(0,0,0,0) 55%)",
          fontFamily: "sans-serif",
          padding: "0 96px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            backgroundColor: "#a3e635",
            color: "#000000",
            fontSize: 24,
            fontWeight: 800,
            padding: "10px 22px",
            borderRadius: 999,
            marginBottom: 32,
          }}
        >
          Katalog Pre Order Omo
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#ffffff",
            maxWidth: 980,
          }}
        >
          <span>Cari Unit&nbsp;</span>
          <span style={{ color: "#a3e635" }}>Omo&nbsp;</span>
          <span>Pre Order, lebih cepat dapatnya, banyak benefitnya.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "rgba(255,255,255,0.7)",
            marginTop: 32,
            maxWidth: 900,
          }}
        >
          Semua listing dari penjual PO Omo ada di sini — tipe, warna, dan dealer lengkap.
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 44 }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "#a3e635",
              color: "#000000",
              fontSize: 26,
              fontWeight: 800,
              padding: "18px 36px",
              borderRadius: 999,
            }}
          >
            Lihat Katalog
          </div>
          <div
            style={{
              display: "flex",
              border: "2px solid rgba(255,255,255,0.3)",
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 800,
              padding: "18px 36px",
              borderRadius: 999,
            }}
          >
            Jual PO Kamu
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
