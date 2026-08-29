"use client";

import { useState } from "react";
import {
  TIPE_OPTIONS,
  WARNA_OPTIONS,
  DEALER_OPTIONS,
  formatRupiah,
  type OmowayTipe,
  type OmowayWarna,
  type OmowayDealer,
} from "@/lib/types";

export default function RequestPOForm() {
  const [nama, setNama] = useState("");
  const [noWa, setNoWa] = useState("");
  const [tipe, setTipe] = useState<OmowayTipe | "">("");
  const [warna, setWarna] = useState<OmowayWarna | "">("");
  const [dealer, setDealer] = useState<OmowayDealer | "">("");
  const [budgetMax, setBudgetMax] = useState<number | "">("");
  const [catatan, setCatatan] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const budgetMaxNum = typeof budgetMax === "number" ? budgetMax : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!nama.trim() || !noWa.trim()) {
      setError("Mohon lengkapi nama dan nomor WhatsApp kamu.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/request-po", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          noWa,
          tipe,
          warna,
          dealer,
          budgetMax: budgetMaxNum,
          catatan,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Gagal mengirim request.");
      }

      setSuccess(true);
      setNama("");
      setNoWa("");
      setTipe("");
      setWarna("");
      setDealer("");
      setBudgetMax("");
      setCatatan("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Nama Kamu">
          <input
            required
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama lengkap"
            className="input"
          />
        </Field>

        <Field label="Nomor WhatsApp Kamu">
          <input
            required
            inputMode="numeric"
            value={noWa}
            onChange={(e) => setNoWa(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="08xxxxxxxxxx"
            className="input"
          />
        </Field>

        <Field label="Tipe yang Dicari">
          <select
            value={tipe}
            onChange={(e) => setTipe(e.target.value as OmowayTipe | "")}
            className="input"
          >
            <option value="">Semua Tipe</option>
            {TIPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Warna yang Dicari">
          <select
            value={warna}
            onChange={(e) => setWarna(e.target.value as OmowayWarna | "")}
            className="input"
          >
            <option value="">Semua Warna</option>
            {WARNA_OPTIONS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Dealer yang Dicari" className="sm:col-span-2">
          <select
            value={dealer}
            onChange={(e) => setDealer(e.target.value as OmowayDealer | "")}
            className="input"
          >
            <option value="">Semua Dealer</option>
            {DEALER_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Budget Maksimal (opsional)" className="sm:col-span-2">
          <input
            inputMode="numeric"
            value={budgetMax === "" ? "" : budgetMax}
            onChange={(e) => {
              const digits = e.target.value.replace(/[^0-9]/g, "");
              setBudgetMax(digits ? Number(digits) : "");
            }}
            placeholder="Contoh: 4000000"
            className="input"
          />
          {budgetMaxNum > 0 && (
            <span className="text-xs font-normal text-black/50">
              {formatRupiah(budgetMaxNum)}
            </span>
          )}
        </Field>

        <Field label="Catatan Tambahan (opsional)" className="sm:col-span-2">
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="Misal: cari No. PO di bawah 2000, atau ada preferensi lain"
            rows={3}
            className="input resize-none"
          />
        </Field>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}
      {success && (
        <p className="rounded-lg bg-accent/20 px-4 py-3 text-sm font-medium text-black">
          Request kamu berhasil dikirim! Omomarket akan menghubungi kamu via WhatsApp
          begitu ada PO yang cocok.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-accent px-6 py-4 text-base font-bold text-black transition hover:bg-accent-dark disabled:opacity-60"
      >
        {submitting ? "Mengirim..." : "Kirim Request PO"}
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
