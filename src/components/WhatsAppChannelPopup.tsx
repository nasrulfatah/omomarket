"use client";

import { useEffect, useState } from "react";

const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VbDVLsY9sBIGIpFeQi0X";
// Penanda sudah klik CTA "Gabung": popup tidak pernah muncul lagi
const JOINED_KEY = "waChannelJoined";
// Waktu terakhir popup ditutup (×): muncul lagi setelah 1 hari
const DISMISS_KEY = "waChannelPopupDismissedAt";
const RESET_MS = 24 * 60 * 60 * 1000;

interface Props {
  onOpenChange: (open: boolean) => void;
}

// Popup sticky ajakan follow Channel WhatsApp. Muncul setiap awal sesi (buka halaman).
// Ditutup (×) → muncul lagi setelah 1 hari. Klik CTA "Gabung" → tidak muncul lagi.
export default function WhatsAppChannelPopup({ onOpenChange }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(JOINED_KEY) === "1") return;
      const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
      if (dismissedAt && Date.now() - dismissedAt < RESET_MS) return;
    } catch {}

    setVisible(true);
    onOpenChange(true);
  }, [onOpenChange]);

  const hide = () => {
    setVisible(false);
    onOpenChange(false);
  };

  const close = () => {
    hide();
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
  };

  const join = () => {
    hide();
    try {
      localStorage.setItem(JOINED_KEY, "1");
    } catch {}
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line/70 bg-white px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-96 sm:rounded-2xl sm:border">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-black">Channel Racun Omoway</p>
          <p className="text-xs text-black/60">Update aksesoris & part Omo terbaru</p>
        </div>
        <a
          href={WHATSAPP_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={join}
          className="shrink-0 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1ebe5a]"
        >
          Follow
        </a>
        <button
          onClick={close}
          aria-label="Tutup"
          className="shrink-0 rounded-full p-1.5 text-lg leading-none text-black/50 hover:bg-black/5"
        >
          ×
        </button>
      </div>
    </div>
  );
}
