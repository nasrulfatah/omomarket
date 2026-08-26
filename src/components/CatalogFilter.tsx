"use client";

import { TIPE_OPTIONS, WARNA_OPTIONS, DEALER_OPTIONS, type OmowayTipe, type OmowayWarna, type OmowayDealer } from "@/lib/types";

export default function CatalogFilter({
  onFilterChange,
}: {
  onFilterChange: (filters: { tipe?: OmowayTipe; warna?: OmowayWarna; dealer?: OmowayDealer }) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 py-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-black/70">Tipe</label>
        <select
          onChange={(e) => onFilterChange({ tipe: (e.target.value || undefined) as OmowayTipe })}
          className="rounded-lg border border-line px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">Semua Tipe</option>
          {TIPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-black/70">Warna</label>
        <select
          onChange={(e) => onFilterChange({ warna: (e.target.value || undefined) as OmowayWarna })}
          className="rounded-lg border border-line px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">Semua Warna</option>
          {WARNA_OPTIONS.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-black/70">Dealer</label>
        <select
          onChange={(e) => onFilterChange({ dealer: (e.target.value || undefined) as OmowayDealer })}
          className="rounded-lg border border-line px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">Semua Dealer</option>
          {DEALER_OPTIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
