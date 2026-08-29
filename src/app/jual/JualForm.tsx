"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TIPE_OPTIONS,
  WARNA_OPTIONS,
  DEALER_OPTIONS,
  HARGA_OPTIONS,
  getSharingFee,
  formatRupiah,
  type OmowayTipe,
  type OmowayWarna,
  type OmowayDealer,
} from "@/lib/types";

export default function JualForm() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [noWa, setNoWa] = useState("");
  const [noPO, setNoPO] = useState("");
  const [tipe, setTipe] = useState<OmowayTipe>(TIPE_OPTIONS[0]);
  const [warna, setWarna] = useState<OmowayWarna>(WARNA_OPTIONS[0]);
  const [dealer, setDealer] = useState<OmowayDealer>(DEALER_OPTIONS[0]);
  const [hargaModal, setHargaModal] = useState<number | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const hargaOptions = HARGA_OPTIONS[tipe];

  function handleTipeChange(next: OmowayTipe) {
    setTipe(next);
    if (hargaModal !== "" && !HARGA_OPTIONS[next].includes(hargaModal)) {
      setHargaModal("");
    }
  }

  const hargaModalNum = typeof hargaModal === "number" ? hargaModal : 0;
  const sharingFee = getSharingFee(tipe);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!nama.trim() || !noWa.trim() || !noPO.trim() || !dealer.trim() || hargaModalNum <= 0) {
      setError("Mohon lengkapi semua kolom dengan benar.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/jual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          noWa,
          noPO,
          tipe,
          warna,
          dealer,
          hargaModal: hargaModalNum,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Gagal menyimpan listing.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/jual/success`);
        router.refresh();
      }, 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Nama Penjual">
          <input
            required
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama lengkap"
            className="input"
          />
        </Field>

        <Field label="Nomor WhatsApp Penjual">
          <input
            required
            inputMode="numeric"
            value={noWa}
            onChange={(e) => setNoWa(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="08xxxxxxxxxx"
            className="input"
          />
        </Field>

        <Field label="Nomor PO">
          <input
            required
            inputMode="numeric"
            value={noPO}
            onChange={(e) => setNoPO(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="Contoh: 1111"
            className="input"
          />
        </Field>

        <Field label="Dealer">
          <select
            value={dealer}
            onChange={(e) => setDealer(e.target.value as OmowayDealer)}
            className="input"
          >
            {DEALER_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Tipe Unit">
          <select
            value={tipe}
            onChange={(e) => handleTipeChange(e.target.value as OmowayTipe)}
            className="input"
          >
            {TIPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Warna">
          <select
            value={warna}
            onChange={(e) => setWarna(e.target.value as OmowayWarna)}
            className="input"
          >
            {WARNA_OPTIONS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Lepas Berapa?" className="sm:col-span-2">
          <select
            required
            value={hargaModal}
            onChange={(e) => setHargaModal(e.target.value ? Number(e.target.value) : "")}
            className="input"
          >
            <option value="">Pilih harga</option>
            {hargaOptions.map((h) => (
              <option key={h} value={h}>
                {formatRupiah(h)}
              </option>
            ))}
          </select>
          <span className="text-xs font-normal text-black/50">
            Harga yg kamu set utk menggantikan uang PO 3 juta. Semakin murah
            harga, semakin besar peluang terjual.
          </span>
        </Field>
      </div>

      {hargaModalNum > 0 && (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-line bg-neutral-50 p-4 text-sm">
            <p className="flex justify-between">
              <span className="text-black/60">Deposit PO 3jt</span>
              <span className="font-medium">{formatRupiah(3000000)}</span>
            </p>
            <div className="my-2 border-t border-line" />
            <p className="flex justify-between">
              <span className="text-black/60">Harga Takeover sbg pengganti</span>
              <span className="font-medium">{formatRupiah(hargaModalNum)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-black/60">Sharing Fee Omomarket</span>
              <span className="font-medium text-red-600">-{formatRupiah(sharingFee)}</span>
            </p>
            <div className="my-2 border-t border-line" />
            <p className="flex justify-between font-semibold">
              <span>Uang yang kamu terima</span>
              <span>{formatRupiah(hargaModalNum - sharingFee)}</span>
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-4 text-xs text-blue-900">
            <p className="font-semibold mb-1">💡 Catatan harga katalog</p>
            <p>
              Harga yang tampil di katalog akan sesuai dengan yang kamu masukkan di sini. Akan
              ada potongan biaya Sharing Fee untuk Omomarket sebagai perantara, yaitu{" "}
              {formatRupiah(500000)} untuk tipe Smart & Smart Long, dan {formatRupiah(1000000)}{" "}
              untuk tipe Balance & Balance Pilot — untuk PO {tipe} ini, sharing fee-nya{" "}
              {formatRupiah(sharingFee)}.
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}
      {success && (
        <p className="rounded-lg bg-accent/20 px-4 py-3 text-sm font-medium text-black">
          Listing berhasil dibuat! Mengarahkan ke halaman detail...
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-accent px-6 py-4 text-base font-bold text-black transition hover:bg-accent-dark disabled:opacity-60"
      >
        {submitting ? "Menyimpan..." : "Listing PO Sekarang"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm font-medium ${className ?? ""}`}>
      {label}
      {children}
    </label>
  );
}
