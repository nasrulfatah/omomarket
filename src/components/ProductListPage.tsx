import Link from "next/link";
import { Part } from "@/lib/types";
import PartCard from "./PartCard";

interface ProductListPageProps {
  title: string;
  items: Part[];
}

export default function ProductListPage({ title, items }: ProductListPageProps) {
  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-12 lg:py-8">
          <Link
            href="/"
            aria-label="Kembali"
            className="inline-flex items-center gap-1 text-sm font-semibold text-black/60 hover:text-black transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <h1 className="mt-4 text-xl font-extrabold leading-tight text-black sm:text-2xl lg:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-black/60">{items.length} produk</p>

          {items.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {items.map((part) => (
                <PartCard key={part.id} part={part} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-black/60">Tidak ada produk yang cocok</p>
          )}
        </div>
      </section>
    </div>
  );
}
