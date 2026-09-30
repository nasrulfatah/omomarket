"use client";

import Link from "next/link";
import { useRef } from "react";

export default function Navbar() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleCariPartsClick = () => {
    const searchInput = document.querySelector('input[placeholder="Ketik nama produk..."]') as HTMLInputElement;
    if (searchInput) {
      const headerHeight = 80;
      const padding = 40;
      const elementPosition = searchInput.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight - padding,
        behavior: 'smooth'
      });
      setTimeout(() => searchInput.focus(), 500);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-sm font-bold text-white">
            -O-
          </span>
          <span className="hidden sm:inline text-lg font-bold tracking-tight">
            Omo<span className="text-black">market</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium sm:gap-4">
          <Link
            href="/catalog"
            className="rounded-full px-3 py-2 text-black/80 hover:bg-black/5 hover:text-black"
          >
            Unit Motor
          </Link>
          <Link
            href="/accessories"
            className="rounded-full px-3 py-2 text-black/80 hover:bg-black/5 hover:text-black"
          >
            Aksesoris
          </Link>
          <button
            onClick={handleCariPartsClick}
            className="rounded-full border border-black/15 px-3 py-2 text-black/80 hover:bg-black/5 hover:text-black transition cursor-pointer"
          >
            Cari Aksesoris
          </button>
        </nav>
      </div>
    </header>
  );
}
