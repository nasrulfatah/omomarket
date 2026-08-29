export type OmowayTipe = "Smart" | "Smart Long" | "Balance" | "Balance Pilot";

export const TIPE_OPTIONS: OmowayTipe[] = [
  "Smart",
  "Smart Long",
  "Balance",
  "Balance Pilot",
];

export const WARNA_OPTIONS = [
  "Meteorite Grey",
  "Morning Sun Gold",
  "Lunar White",
  "Turquoise Green",
  "Aurora Green",
  "Liquid Silver",
] as const;

export type OmowayWarna = (typeof WARNA_OPTIONS)[number];

// Nama file JPG produk (di public/omoway/colors/) untuk tiap warna.
export const WARNA_TO_IMAGE_FILE: Record<OmowayWarna, string> = {
  "Aurora Green": "aurora-green",
  "Liquid Silver": "liquid-silver",
  "Meteorite Grey": "meteorite-grey",
  "Turquoise Green": "turquoise-green",
  "Lunar White": "lunar-white",
  "Morning Sun Gold": "morning-sun-gold",
};

export const DEALER_OPTIONS = [
  "Depok",
  "Jakarta Barat",
  "Jakarta Timur",
  "Bekasi",
  "Tangerang Selatan",
  "Tangerang Kota",
  "Cikarang",
  "Bogor",
  "Karawang",
  "Sukabumi",
  "Bandung",
  "Garut",
  "Semarang",
  "Yogyakarta",
  "Surakarta",
  "Madiun",
  "Tulungagung",
  "Blitar",
  "Mojokerto",
  "Surabaya",
  "Malang",
  "Banyuwangi",
  "Denpasar",
] as const;

export type OmowayDealer = (typeof DEALER_OPTIONS)[number];

// Harga jual PO yang bisa dipilih penjual, berbeda per tipe PO.
export const HARGA_OPTIONS: Record<OmowayTipe, number[]> = {
  Smart: [2_000_000, 2_500_000, 3_000_000, 3_500_000, 4_000_000, 4_500_000, 5_000_000, 6_000_000],
  "Smart Long": [2_000_000, 2_500_000, 3_000_000, 3_500_000, 4_000_000, 4_500_000, 5_000_000, 6_000_000],
  Balance: [3_000_000, 4_000_000, 5_000_000, 6_000_000, 7_000_000, 8_000_000],
  "Balance Pilot": [3_000_000, 4_000_000, 5_000_000, 6_000_000, 7_000_000, 8_000_000],
};

export interface Listing {
  id: string;
  nama: string;
  noWa: string;
  noPO: string;
  tipe: OmowayTipe;
  warna: OmowayWarna;
  dealer: string;
  hargaModal: number;
  screenshotPO?: string;
  status?: "Draft" | "Publish" | "Live" | "Sold";
  verified?: boolean;
  createdAt: string;
}

export function getSharingFee(tipe: OmowayTipe): number {
  if (tipe === "Smart" || tipe === "Smart Long") return 500_000;
  if (tipe === "Balance" || tipe === "Balance Pilot") return 1_000_000;
  return 0;
}

// Harga yang tampil di katalog sama persis dengan harga yang dimasukkan
// penjual. Sharing fee adalah potongan komisi Omomarket sebagai
// perantara, diambil dari harga tersebut — bukan ditambahkan ke harga
// yang dilihat pembeli.
export function getHargaJual(listing: Pick<Listing, "tipe" | "hargaModal">): number {
  return listing.hargaModal;
}

export function censorPO(noPO: string): string {
  const trimmed = noPO.trim();
  if (trimmed.length === 0) return "-";
  const first = trimmed[0];
  return first + "*".repeat(trimmed.length - 1);
}

export function isPioneer(noPO: string): boolean {
  const num = Number(noPO.trim());
  return Number.isFinite(num) && num > 0 && num < 2000;
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function warnaToHex(warna: OmowayWarna): string {
  switch (warna) {
    case "Meteorite Grey":
      return "#3a3d42";
    case "Morning Sun Gold":
      return "#d6a83e";
    case "Lunar White":
      return "#f2f2f0";
    case "Turquoise Green":
      return "#1f9e8f";
    case "Aurora Green":
      return "#84cc16";
    case "Liquid Silver":
      return "#b8bcc0";
    default:
      return "#cccccc";
  }
}
