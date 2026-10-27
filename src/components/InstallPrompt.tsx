"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "installPromptDismissed";
// Penanda bahwa aplikasi pernah dibuka dari layar utama (sudah terpasang)
const INSTALLED_KEY = "webappInstalled";

// Tanggal lokal hari ini (YYYY-MM-DD). Banner yang ditutup hari ini tidak muncul lagi, besoknya muncul lagi.
const todayKey = () => new Date().toLocaleDateString("en-CA");

// Banner sticky di bawah untuk install aplikasi di HP (khusus layar kecil)
export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    // Dibuka dari ikon layar utama: tandai sudah terpasang, lalu jangan tampilkan banner lagi
    if (isStandalone) {
      try {
        localStorage.setItem(INSTALLED_KEY, "1");
      } catch {}
      return;
    }

    try {
      if (localStorage.getItem(INSTALLED_KEY) === "1") return;
      if (localStorage.getItem(DISMISS_KEY) === todayKey()) return;
    } catch {}

    // iOS Safari tidak punya tombol install, jadi tampilkan petunjuk manual
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);
    if (ios) setVisible(true);

    // Android/Chrome: tampilkan tombol Install saat browser siap menawarkan install
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, todayKey());
    } catch {}
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    dismiss();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line/70 bg-white px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:hidden">
      <div className="flex items-center gap-3">
        <img src="/icons/icon-192.png" alt="" className="h-11 w-11 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-black">Install Omomarket</p>
          <p className="text-xs text-black/60">
            {isIOS
              ? "Tap Bagikan lalu pilih Tambah ke Layar Utama"
              : "Akses katalog lebih cepat dari layar utama HP"}
          </p>
        </div>
        {!isIOS && deferred && (
          <button
            onClick={install}
            className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-bold text-black transition hover:bg-accent-dark"
          >
            Install
          </button>
        )}
        <button
          onClick={dismiss}
          aria-label="Tutup"
          className="shrink-0 rounded-full p-1.5 text-lg leading-none text-black/50 hover:bg-black/5"
        >
          ×
        </button>
      </div>
    </div>
  );
}
