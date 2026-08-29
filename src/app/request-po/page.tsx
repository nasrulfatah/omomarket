import RequestPOForm from "./RequestPOForm";

export default function RequestPOPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold">Request PO Omo Kamu</h1>
      <p className="mt-2 text-sm text-black/60">
        Belum nemu PO yang kamu cari di katalog? Isi form ini, sebutkan
        tipe, warna, dealer, dan budget yang kamu mau. Nanti Omomarket akan
        carikan dan hubungi kamu via WhatsApp begitu ada PO yang cocok.
      </p>

      <div className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <RequestPOForm />
      </div>
    </div>
  );
}
