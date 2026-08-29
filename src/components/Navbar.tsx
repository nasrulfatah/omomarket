import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-sm font-bold text-white">
            -O-
          </span>
          <span className="text-lg font-bold tracking-tight">
            Omo<span className="text-black">market</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium sm:gap-4">
          <Link
            href="/"
            className="rounded-full px-3 py-2 text-black/80 hover:bg-black/5 hover:text-black"
          >
            Katalog
          </Link>
          <Link
            href="/syarat-ketentuan"
            className="hidden rounded-full px-3 py-2 text-black/80 hover:bg-black/5 hover:text-black sm:inline-block"
          >
            S&amp;K
          </Link>
          <Link
            href="/request-po"
            className="rounded-full border border-black/15 px-3 py-2 text-black/80 hover:bg-black/5 hover:text-black"
          >
            Request PO
          </Link>
          <Link
            href="/jual"
            className="rounded-full bg-accent px-4 py-2 font-semibold text-black transition hover:bg-accent-dark"
          >
            Jual PO
          </Link>
        </nav>
      </div>
    </header>
  );
}
