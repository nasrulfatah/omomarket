import Link from "next/link";

export default function RequestPOSuccessPage() {
  const whatsappLink =
    "https://wa.me/6289611117575?text=Halo%20Omomarket%2C%20saya%20baru%20saja%20mengirim%20Request%20PO%20di%20Omomarket.%20Mohon%20bantu%20carikan%20ya.%20Terima%20kasih!";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
          <svg
            className="h-8 w-8 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold">Request PO Anda Berhasil Terkirim!</h1>
        <p className="mt-4 text-lg text-black/70">
          Terimakasih sudah mengirim Request PO di Omomarket. Tim kami akan mencarikan
          PO yang sesuai dan menghubungi Anda via WhatsApp begitu ada yang cocok.
        </p>

        <div className="mt-8 space-y-3">
          <p className="text-sm text-black/60">
            Jika ingin ngobrol langsung soal PO yang kamu cari, Anda bisa menghubungi admin
            kami melalui WhatsApp:
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white transition hover:bg-[#20BA5A]"
          >
            <svg className="h-5 w-5" fill="white" viewBox="0 0 24 24">
              <path d="M17.6915026,13.4744748 C17.4788064,13.3688035 16.2126844,12.7368421 16.0272231,12.6701581 C15.8417618,12.6034742 15.7128169,12.5702381 15.5274651,12.7906985 C15.3421133,13.0111589 14.880718,13.5500605 14.7228014,13.7041284 C14.565885,13.8581963 14.4088378,13.8645705 14.1961416,13.7589024 C13.2745911,13.2788321 12.08659,12.7171481 11.1274006,11.8962254 C10.3748898,11.2493569 9.82461807,10.4502161 9.66697886,9.52604706 C9.60979104,9.19018146 9.70872121,8.92117662 9.97788349,8.72069819 C10.1868139,8.57784288 10.4324599,8.38192908 10.6437266,8.14138346 C10.8549932,7.90083784 10.9343168,7.6958938 10.8676327,7.46381929 C10.8009486,7.23174478 10.3448285,5.96509869 10.1651204,5.50637197 C9.98975464,5.08187851 9.81099264,5.15201313 9.68211309,5.15201313 C9.55623639,5.15201313 9.42732863,5.15201313 9.29840816,5.15201313 C9.17248601,5.15201313 8.97263791,5.20563469 8.78708662,5.42608102 C8.60153534,5.64652736 8.07351022,6.27848638 8.07351022,7.54513627 C8.07351022,8.81178617 8.80776818,10.0355215 8.91348159,10.1895893 C9.01919501,10.3436572 10.3448285,12.8297869 12.5823644,13.8834217 C13.1224828,14.1271715 13.5426984,14.2747648 13.8621879,14.3632017 C14.4049895,14.5328609 14.9090843,14.5008896 15.3012426,14.4389452 C15.7350773,14.3677853 16.6240988,13.8891314 16.8033975,13.3580305 C16.9826962,12.8269296 16.9826962,12.3870635 16.9160121,12.2788321 C16.8493281,12.1706007 16.7203833,12.1143191 16.5056034,12.0074646 L17.6915026,13.4744748 Z M12,2 C6.47715,2 2,6.47715 2,12 C2,17.52285 6.47715,22 12,22 C17.52285,22 22,17.52285 22,12 C22,6.47715 17.52285,2 12,2 Z" />
            </svg>
            Hubungi Admin via WhatsApp
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full border border-black/20 px-5 py-3 font-semibold text-black transition hover:bg-black/5"
          >
            Kembali ke Katalog
          </Link>
          <Link
            href="/request-po"
            className="rounded-full bg-accent px-5 py-3 font-semibold text-black transition hover:bg-accent-dark"
          >
            Kirim Request Lain
          </Link>
        </div>
      </div>

      <div className="mt-16 rounded-2xl border border-line bg-neutral-50 p-8">
        <h2 className="font-semibold">Apa yang akan terjadi selanjutnya?</h2>
        <ul className="mt-4 space-y-3 text-sm text-black/70">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
              1
            </span>
            <span>Tim Omomarket akan mencatat preferensi PO yang Anda cari</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
              2
            </span>
            <span>Kami akan mencocokkan dengan listing PO yang sudah ada maupun yang baru masuk</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
              3
            </span>
            <span>Begitu ada PO yang cocok, Omomarket akan menghubungi Anda via WhatsApp</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
              4
            </span>
            <span>Proses transaksi selanjutnya diserahkan kepada Anda dan penjual</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
