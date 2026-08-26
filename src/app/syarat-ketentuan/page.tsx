export const metadata = {
  title: "Syarat & Ketentuan — Omomarket",
};

export default function SyaratKetentuanPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold">Syarat &amp; Ketentuan</h1>
      <p className="mt-2 text-black/60">
        Berlaku untuk seluruh penjual dan calon pembeli yang menggunakan
        platform Omomarket.
      </p>

      <div className="mt-8 flex flex-col gap-8">
        <section>
          <h2 className="text-lg font-bold">1. Penambahan Harga di Katalog</h2>
          <p className="mt-2 text-black/70">
            Omomarket bertindak sebagai perantara antara penjual PO Pre
            Order Omo dan calon pembeli. Untuk setiap PO yang dilisting,
            terdapat penambahan harga sebagai komisi perantara platform.
            Penambahan harga ini akan otomatis ditambahkan pada harga yang
            ditampilkan di katalog, sedangkan harga yang kamu terima tetap
            sesuai dengan harga yang kamu tetapkan saat listing.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">
            2. Harga Jual PO &amp; Peluang Terjual
          </h2>
          <p className="mt-2 text-black/70">
            Harga Jual PO adalah harga yang kamu tetapkan untuk menggantikan
            uang PO yang sudah kamu bayarkan ke dealer. Semakin murah harga
            yang kamu pilih, semakin besar peluang POmu cepat terjual.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">3. Kerahasiaan Nomor PO</h2>
          <p className="mt-2 text-black/70">
            Nomor PO yang diinput penjual hanya ditampilkan sebagian (1 digit
            di depan, sisanya disensor) pada katalog dan halaman detail publik,
            untuk menjaga keamanan data transaksi. Nomor PO lengkap hanya
            akan dikonfirmasi oleh admin Omomarket kepada pembeli yang serius
            melalui WhatsApp.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">4. Tanggung Jawab Penjual</h2>
          <p className="mt-2 text-black/70">
            Penjual bertanggung jawab atas kebenaran data PO yang
            dilistingkan (tipe, warna, dealer, dan nomor PO). Omomarket
            berhak menurunkan listing yang terindikasi tidak valid atau
            menyesatkan.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold">5. Proses Transaksi</h2>
          <p className="mt-2 text-black/70">
            Seluruh proses tanya-jawab dan transaksi dilakukan melalui
            WhatsApp resmi Omomarket. Omomarket tidak bertanggung jawab atas
            transaksi yang dilakukan di luar jalur resmi ini.
          </p>
        </section>
      </div>
    </div>
  );
}
