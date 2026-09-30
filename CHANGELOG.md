# Changelog

Semua perubahan penting pada project ini dicatat di file ini, supaya mudah melacak dan revert ke versi tertentu.

Format: `## [versi] - tanggal` diikuti ringkasan perubahan dan commit hash terkait.

## [1.2.0] - 2026-09-30
- Ubah halaman Home menjadi sama persis seperti halaman Parts (hanya menampilkan Parts section).
- Hapus HomeContent (Katalog Pre-Order section) dari halaman Home.
- Home page sekarang fokus 100% pada Parts: banner carousel, kategori filter, search, & grid produk.
- Katalog Pre-Order tetap accessible via navbar "Katalog" link.
- Hasil: Homepage cleaner dan fokus, tidak ada duplikasi content dengan halaman /catalog.

## [1.1.0] - 2026-09-30
- Buat halaman Home sebagai gabungan antara halaman Parts & halaman Katalog.
- Parts section ditampilkan paling atas (dengan banner carousel, kategori filter, grid produk).
- Katalog section ditampilkan di bawah (hero section + product listing pre-order).
- User bisa lihat kedua konten (parts & katalog pre-order) dalam satu halaman utama tanpa perlu navigasi terpisah.
- Hasil: Home page lebih komprehensif menampilkan semua offering (parts recommendations + pre-order katalog).

## [1.0.0] - 2026-09-26
- Improve Shopee scraping untuk handle redirect ke mobile/desktop version.
- Add fallback untuk manual image URL input jika scraping gagal.
- Add info box untuk guide user ketika scraping error.
- Tambahin image URL input field yang muncul saat scraping gagal.
- User bisa manual paste image URL dari Shopee atau sumber lain sebagai fallback.
- User bisa remove gambar yang sudah dipilih dengan klik tombol X.
- Hasil: Fitur scraping lebih robust & user-friendly dengan fallback manual input.

## [0.9.9] - 2026-09-26
- Ubah struktur form input produk parts - Shopee Link jadi mandatory & field pertama.
- Nama Produk, Harga, Deskripsi berubah menjadi optional (auto-fill dari scraping).
- Enhance API /api/scrape-shopee untuk extract: nama produk, harga, deskripsi dari Shopee.
- Update handleScrapeShopee untuk auto-fill form fields jika kosong dari hasil scraping.
- Update validasi form - hanya Shopee Link & Gambar yang mandatory.
- Reorder form fields: Shopee Link → Nama → Harga → Kategori → Deskripsi.
- Add helper text di form untuk explain auto-fill fields.
- Hasil: User workflow lebih simpel - cukup input Shopee link, sisanya auto-fill otomatis.

## [0.9.8] - 2026-09-26
- Tambahkan fitur scraping gambar dari Shopee link menggunakan Cheerio library.
- Buat API route `/api/scrape-shopee` untuk extract gambar dari halaman Shopee.
- Buat UI form halaman `/admin/parts/add` untuk input produk parts baru.
- Buat component `AddPartsForm` dengan fitur:
  - Input nama, harga, kategori, deskripsi, Shopee link
  - Button "Scrape Gambar dari Shopee" untuk extract gambar otomatis
  - Preview gambar dengan pilihan multiple images
  - Submit form untuk save ke Google Sheets
- Buat API route `/api/add-parts` untuk save produk ke Google Sheets.
- Hasil: User bisa input produk baru via UI dengan scraping gambar otomatis dari Shopee.

## [0.9.7] - 2026-09-26
- Ubah layout input Minimum & Maksimum menjadi sebaris di mobile view.
- Ubah grid dari `grid-cols-1 sm:grid-cols-2` menjadi `grid-cols-2` untuk konsisten di semua breakpoints.
- Hasil: Input harga Minimum & Maksimum tampil horizontal (sebaris) di tampilan mobile.

## [0.9.6] - 2026-09-26
- Tambahkan format titik ribuan (thousand separator) pada input Minimum & Maksimum.
- Create formatPrice function untuk format number dengan regex: `/\B(?=(\d{3})+(?!\d))/g` → titik.
- Create parsePrice function untuk remove titik dan convert string kembali ke number.
- Ubah input type dari "number" menjadi "text" dan apply formatPrice pada value display.
- Hasil: Harga di input box tampil dengan format "120.000" dan "2.500.000" untuk better readability.

## [0.9.5] - 2026-09-26
- Tambahkan spasi antara "Rp" dan angka di input Minimum & Maksimum.
- Ubah "Rp" menjadi "Rp " (dengan trailing space) dan increase padding dari `pl-7` menjadi `pl-8`.
- Hasil: Spacing lebih baik antara prefix "Rp" dan input number.

## [0.9.4] - 2026-09-26
- Ubah "Rp" dari text terpisah menjadi prefix default di dalam input box Minimum & Maksimum.
- Gunakan `position: absolute` dengan `left-3 top-1/2 transform -translate-y-1/2` untuk position "Rp" di dalam box.
- Add `pl-7` (left padding) pada input untuk membuat ruang bagi "Rp" prefix.
- Hasil: Layout lebih compact dan "Rp" langsung ada di dalam input field.

## [0.9.3] - 2026-09-26
- Revert layout kolom Minimum & Maksimum ke vertical (1 kolom) di mobile untuk menghindari tumpang tindih.
- Gunakan `grid-cols-1 sm:grid-cols-2` agar responsive: 1 kolom di mobile, 2 kolom di tablet/desktop.
- Hasil: Layout lebih clean dan input field tidak saling tumpang tindih di mobile view yang narrow.

## [0.9.2] - 2026-09-26
- Sembunyikan logo text ("Omo marketplace") pada mobile view, hanya tampilkan logo icon ("-O-").
- Gunakan responsive class `hidden sm:inline` pada logo text span untuk hide di mobile dan show di sm breakpoint ke atas.
- Hasil: Header mobile lebih compact dan fokus pada logo icon saja.

## [0.9.1] - 2026-09-26
- Update scroll positioning untuk "Cari Parts" button agar kategori grid tertutup dan search box terlihat penuh.
- Scroll ke posisi search input dikurangi header height (80px) dan padding (40px) untuk proper spacing.
- Hasil: Ketika user klik "Cari Parts", halaman scroll hingga kategori grid tertutup oleh header, search box terlihat penuh dengan auto-focus.

## [0.9.0] - 2026-09-26
- Hilangkan label "Cari Produk" dari search input di halaman /parts.
- Ubah CTA "Request PO" di navbar menjadi "Cari Parts" (button dengan onClick handler).
- Ketika "Cari Parts" diklik, page scroll smooth ke search input dan cursor langsung aktif di input.
- Navbar menjadi Client Component untuk support onClick event handler.

## [0.8.0] - 2026-09-25
- Tambahkan fitur pencarian real-time untuk produk parts di halaman /parts.
- Input pencarian "Cari Produk" ditempatkan di atas filter "Rentang Harga".
- Pencarian berdasarkan nama produk (case-insensitive), kombinasi dengan filter kategori dan harga.
- UI mengikuti design existing dengan styling yang konsisten.

## [0.7.0] - 2026-09-25
- Ubah teks deskripsi di halaman /parts dari "Aksesori & suku cadang berkualitas untuk motor listrik Omoway Anda" menjadi "Rekomendasi parts & aksesoris dari Omoriders lain".

## [0.6.0] - 2026-09-25
- Ubah ukuran font heading "Omo Recommended Parts" di halaman /parts agar fit dalam 1 baris di mobile view.
- Mobile: text-2xl, Sm: text-3xl, Lg: text-4xl (responsive typography).

## [0.5.0] - 2026-09-25
- Update icon kategori "Bags & Storage" dengan 3D icon tas baru dari IconScout (tas berwarna biru & putih).

## [0.4.0] - 2026-09-25
- Ganti icon emoji ⛑️ untuk kategori "Helm & Riding Gear" dengan 3D icon dari IconScout (helm-riding-gear.webp).
- Icon 3D helmet tersedia dalam format WebP untuk konsistensi dengan icon kategori lainnya.

## [0.3.0] - 2026-09-25
- Tambah 4 kategori parts baru berdasarkan analisis daftar produk Shopee: "Helm & Riding Gear", "Gadget Mount", "Bags & Storage", "License Plate".
- Tambah ikon 3D (CC0, 3dicons.co) untuk Gadget Mount, Bags & Storage, License Plate di `public/icons/categories/`.
- "Helm & Riding Gear" pakai emoji ⛑️ sebagai fallback karena tidak ada ikon helm yang cocok di katalog 3dicons.co gratis.
- `CategoryCardsGrid` sekarang mendukung campuran icon file (webp) dan emoji lewat komponen `CategoryIcon`.

## [0.2.0] - 2026-09-25
- Baseline pencatatan versi dimulai dari sini. Versi sebelumnya (redesign halaman /parts, banner carousel, 3D icons kategori, halaman /catalog, dst) tidak tercatat per-versi karena dilakukan sebelum praktik ini diterapkan.
