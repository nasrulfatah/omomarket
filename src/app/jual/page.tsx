import Link from "next/link";
import JualForm from "./JualForm";

export default function JualPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold">Listing PO Omo Kamu</h1>
      <p className="mt-2 text-sm text-black/60">
        Isi data PO yang ingin kamu jual. Setelah tersimpan, POmu langsung
        tampil di katalog. Calon pembeli akan menghubungi Omomarket via WhatsApp,
        dan jika ada yang deal, Omomarket akan menghubungkan dengan kamu.
        Dengan mengirim listing ini, kamu menyetujui{" "}
        <Link
          href="/syarat-ketentuan"
          className="font-semibold underline decoration-accent decoration-2 underline-offset-2"
        >
          Syarat &amp; Ketentuan
        </Link>{" "}
        Omomarket, termasuk penambahan Sharing Fee pada harga tampil.
      </p>

      <div className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <JualForm />
      </div>
    </div>
  );
}
