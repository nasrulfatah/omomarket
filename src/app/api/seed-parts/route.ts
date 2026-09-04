import { appendToSheetTab } from "@/lib/google";

const DEMO_PARTS = [
  // Battery & Charging
  ["Baterai Omoway Smart OEM", "2500000", "Battery", "Baterai original Omoway untuk Smart, kapasitas penuh 3kWh", "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500,https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],
  ["Charger Fast 2000W", "1800000", "Charger & Cable", "Charger cepat 2000W dengan koneksi CCS, garansi 2 tahun", "https://images.unsplash.com/photo-1609042231871-c85da92d965d?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],
  ["Kabel Charging USB-C 2m", "250000", "Charger & Cable", "Kabel charging USB-C berkualitas tinggi, tahan lama", "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],

  // Tires & Wheels
  ["Ban Tubeless 80/90-10", "450000", "Tires & Wheels", "Ban tubeless premium untuk Omoway, grip maksimal", "https://images.unsplash.com/photo-1581092165334-29ee6ff7d25b?w=500,https://images.unsplash.com/photo-1564584476635-52e6fcfb5c87?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],
  ["Rim Alloy 10 inch", "1200000", "Tires & Wheels", "Rim alloy original Omoway, desain sporty", "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],

  // Lights & Electrical
  ["Lampu LED Depan", "350000", "Lights & Electrical", "Lampu LED depan 30W, terang dan hemat energi", "https://images.unsplash.com/photo-1565636192335-14375d30ee94?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],
  ["Lampu LED Belakang", "280000", "Lights & Electrical", "Lampu LED belakang brake light dengan sensor", "https://images.unsplash.com/photo-1606969064388-287337ed8678?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],

  // Interior
  ["Seat Cover Original", "450000", "Interior Accessories", "Sarung jok kulit sintetis premium, tahan lama", "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],
  ["Footrest Karet", "150000", "Interior Accessories", "Alas kaki karet anti slip, nyaman & stabil", "https://images.unsplash.com/photo-1581092161995-8e066a9e9ba9?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],

  // Exterior
  ["Body Panel Set", "1500000", "Exterior Accessories", "Panel body full set warna original, mudah dipasang", "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500,https://images.unsplash.com/photo-1581092165334-29ee6ff7d25b?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],
  ["Spakbor Depan", "350000", "Exterior Accessories", "Spakbor depan plastik berkualitas, warna hitam", "https://images.unsplash.com/photo-1566023967268-de824a73b5c0?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],
  ["Handle Grip", "180000", "Exterior Accessories", "Handle grip ergonomis dengan tekstur anti slip", "https://images.unsplash.com/photo-1577621642247-583ec73f88f3?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],

  // Maintenance & Tools
  ["Toolkit Lengkap", "450000", "Maintenance & Tools", "Toolkit lengkap dengan 25 tools untuk maintenance", "https://images.unsplash.com/photo-1565958011504-98e6b92dc869?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],
  ["Aki Charge Controller", "2200000", "Maintenance & Tools", "BMS original untuk monitoring & charging baterai", "https://images.unsplash.com/photo-1581092165334-29ee6ff7d25b?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],

  // Covers & Protection
  ["Helm Omo Official", "550000", "Covers & Protection", "Helm resmi Omoway dengan desain elegan", "https://images.unsplash.com/photo-1578486838291-dcdf467f5ac9?w=500,https://images.unsplash.com/photo-1578486838291-dcdf467f5ac9?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],
  ["Sarung Motor Waterproof", "280000", "Covers & Protection", "Sarung motor tahan air UV, perlindungan maksimal", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],
  ["Pelindung Aki", "120000", "Covers & Protection", "Pelindung aki dari debu dan kelembaban", "https://images.unsplash.com/photo-1565636192335-14375d30ee94?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],

  // Cleaning & Care
  ["Pembersih Motor Electric", "185000", "Cleaning & Care", "Pembersih khusus motor listrik, aman untuk elektronik", "https://images.unsplash.com/photo-1581092165334-29ee6ff7d25b?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],
  ["Poles Bodi", "145000", "Cleaning & Care", "Poles bodi finishing glossy protection layer", "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=500", "https://shopee.co.id/demo", "Publish", "2026-09-04"],
];

export async function POST() {
  try {
    // First ensure the sheet tab exists
    const headerRow = ["Nama", "Harga", "Kategori", "Deskripsi", "Gambar", "Shopee Link", "Status", "Created At"];

    // Append demo data
    await appendToSheetTab("Parts", DEMO_PARTS, headerRow);

    return Response.json(
      { success: true, count: DEMO_PARTS.length, message: "Demo parts berhasil ditambahkan!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error seeding parts:", error);
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
