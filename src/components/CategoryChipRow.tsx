"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface ChipOption {
  key: string;
  label: string;
  href: string;
  active: boolean;
}

export default function CategoryChipRow({ options }: { options: ChipOption[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 2);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (distance: number) => {
    ref.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  const arrowClass =
    "absolute top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md border border-line/60 bg-white text-black shadow-md opacity-0 transition group-hover:opacity-100 lg:flex";

  return (
    <div className="group relative mt-4">
      <div
        ref={ref}
        className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {options.map((opt) => (
          <Link
            key={opt.key}
            href={opt.href}
            className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              opt.active ? "bg-accent text-black" : "bg-neutral-100 text-black/70 hover:bg-neutral-200"
            }`}
          >
            {opt.label}
          </Link>
        ))}
      </div>

      {canLeft && (
        <button
          type="button"
          aria-label="Geser ke kiri"
          onClick={() => scrollBy(-240)}
          className={`${arrowClass} left-0 -translate-x-1/2`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {canRight && (
        <button
          type="button"
          aria-label="Geser ke kanan"
          onClick={() => scrollBy(240)}
          className={`${arrowClass} right-0 translate-x-1/2`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
