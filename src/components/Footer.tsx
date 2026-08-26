export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-black/60 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} <span className="font-semibold text-black">Omomarket</span>.
            Platform matching PO Omo antara penjual dan calon pembeli.
          </p>
          <p>
            Pertanyaan? Chat{" "}
            <a
              href="https://wa.me/6289611117575"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-black underline decoration-accent decoration-2 underline-offset-4"
            >
              WhatsApp Admin
            </a>
          </p>
        </div>
        <p className="mt-4 text-xs text-black/40">
          Omomarket adalah platform independen dan tidak terafiliasi dengan Omo/Omoway.
        </p>
      </div>
    </footer>
  );
}
