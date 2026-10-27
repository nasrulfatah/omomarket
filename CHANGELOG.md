# Changelog

Semua perubahan penting pada project ini dicatat di file ini, supaya mudah melacak dan revert ke versi tertentu.

Format: `## [versi] - tanggal` diikuti ringkasan perubahan dan commit hash terkait.

## [1.4.36] - 2026-10-28
- Banner install tidak muncul lagi di browser Android/Chrome setelah aplikasi pernah dibuka dari layar utama (penanda `webappInstalled` di localStorage). Di iPhone/Safari belum tercakup, karena penyimpanan aplikasi layar utama terpisah dari Safari.

## [1.4.35] - 2026-10-28
- Banner install aplikasi yang ditutup sekarang muncul lagi keesokan harinya (sebelumnya tidak pernah muncul lagi).

## [1.4.34] - 2026-10-28
- Perbaikan tag Hot: penghitungan klik membaca kolom Timestamp, bukan kolom Nama, sehingga produk yang sudah diklik belum pernah ditandai Hot.

## [1.4.33] - 2026-10-28
- Banner carousel bisa di-swipe di HP: swipe ke kiri pindah ke banner berikutnya, swipe ke kanan ke banner sebelumnya (minimal 40px).

## [1.4.32] - 2026-10-28
- Ditambahkan web app manifest (`src/app/manifest.ts`), ikon 192 dan 512 (`public/icons/`), dan service worker minimal (`public/sw.js`) agar aplikasi bisa di-install.
- Banner sticky di bawah khusus HP untuk install aplikasi: tombol "Install" di Android/Chrome, dan petunjuk "Tambah ke Layar Utama" di iPhone. Bisa ditutup dan tidak muncul lagi setelahnya. Tidak muncul jika aplikasi sudah terpasang.

## [1.4.31] - 2026-10-28
- Tombol panah carousel banner disembunyikan di layar kecil (di bawah 640px). Sebelumnya tombol kanan keluar sedikit dari layar HP dan memunculkan scrollbar horizontal saat di-scroll.

## [1.4.30] - 2026-10-28
- Judul dan deskripsi Open Graph serta Twitter Card diubah menjadi "Omomarket — Pusatnya Racun Omo" dan "Pusat Racun Omo: Rekomendasi aksesoris, modifikasi & part Omo terlengkap." (`src/lib/seo.ts`). Berlaku untuk semua halaman, termasuk halaman produk.
- Halaman /catalog tetap memakai judul dan deskripsi lama.

## [1.4.29] - 2026-10-28
- Klik di area mana pun pada card produk membuka link Shopee (di tab baru). Tombol panah, dot gambar, dan tombol "Beli" tetap berfungsi sendiri.

## [1.4.28] - 2026-10-28
- Warna label New diubah menjadi kuning agak oranye (amber).
- Warna label Recommended diubah menjadi hijau.

## [1.4.27] - 2026-10-28
- Gambar Open Graph dan Twitter Card untuk semua halaman diganti dengan banner "Pusatnya Racun Omo" (`src/app/opengraph-image.png` dan `src/app/twitter-image.png`).
- Gambar OG yang dibuat otomatis per halaman (root, `produk/[id]`, dan `[slug]`) dihapus, sehingga semua halaman memakai gambar yang sama.

## [1.4.26] - 2026-10-27
- Label "Baru" pada produk diganti menjadi "New" (biru, ikon sparkle).
- Tag baru "Recommended" (kuning, ikon bintang): dibaca dari kolom "Recommended" (kolom I) di sheet Accessories. Nilai Ya/Yes/TRUE/1/X menandai produk.
- Tag baru "Hot" (merah, ikon api): 20 produk dengan klik "Beli" terbanyak. Setiap klik dicatat ke tab "Klik" lewat `POST /api/track-click`.

## [1.4.25] - 2026-10-26
- Link "Aksesoris" di navbar sekarang mengarah ke homepage (`/`), bukan `/accessories`.

## [1.4.24] - 2026-10-26
- Chip Aksesoris / Modifikasi / Sparepart di banner WhatsApp sekarang tampil juga di mobile (ukuran diperkecil).

## [1.4.23] - 2026-10-26
- Kotak "Diskon s.d." di banner kategori diganti menjadi "Harga" dengan harga produk yang tampil di slide (dari data produk, bukan angka diskon tetap).

## [1.4.22] - 2026-10-25
- Banner Channel WhatsApp dipercantik: gradien gelap ke hijau Omo, cincin hijau di belakang motor, dan watermark logo WhatsApp.
- Ditambahkan logo WhatsApp di badge, tombol "Gabung Sekarang", dan ikon di latar.
- Informasi ditambah: deskripsi channel dan tiga kategori (Aksesoris, Modifikasi, Sparepart) di layar sedang ke atas.

## [1.4.21] - 2026-10-25
- Banner pertama di carousel kategori sekarang berisi undangan ke Channel WhatsApp "Racun Omo" (update aksesoris, modifikasi, dan sparepart untuk Omoway). Latar gelap dengan aksen hijau Omo dan foto Omoway Aurora Green. Klik banner membuka https://whatsapp.com/channel/0029VbDVLsY9sBIGIpFeQi0X di tab baru.
- Dots navigasi dipindah keluar dari area link agar klik dot tidak membuka WhatsApp.

## [1.4.20] - 2026-10-25
- Judul produk di banner kategori sekarang bisa tampil sampai 2 baris (sebelumnya dipotong jadi 1 baris).

## [1.4.19] - 2026-10-25
- Halaman /accessories disamakan dengan homepage: judul, badge, dan subjudul dihapus. Banner dirender lewat PartsPageClient seperti di homepage, sehingga banner tidak tampil dua kali.

## [1.4.18] - 2026-10-24
- Banner kategori di homepage: latar belakang kini memakai gambar produk yang diperbesar dan di-blur, dengan overlay gelap. Gradien warna hanya dipakai jika tidak ada gambar.
- Gambar produk di banner dibuat lebih kecil di mobile (40% lebar) dan ditampilkan juga di layar kecil, sebelumnya tersembunyi.

## [1.4.17] - 2026-10-20
- Produk di sheet Accessories hanya tampil di web jika statusnya Publish. Status lain (Draft, kosong, dll.) disembunyikan dari homepage, /search, dan /accessories.

## [1.4.16] - 2026-10-18
- Ikon Aksesoris Interior diganti menjadi siluet jok motor.
- Harga (harga terendah) dan gambar produk di Sheets diperbarui dari OMOWAY_Shopee_Database.xlsx. Link pendek tidak diubah.
- Posisi homepage diubah: search box sekarang di atas banner promo.
- Sheets disinkronkan dengan daftar OMOWAY Perks: 72 baris duplikat dihapus sehingga tiap produk unik, dan 12 produk baru ditambahkan (Stopper Dashboard, Cover Port Charger V1, Ceramic Spray Coating (Sonax), Matte Shampoo, Matte Protection, Ultra Matte Treatment, Handle Rem JRP & KYTA, Gear Oil, Tas Depan Jok INZTA & Motowolf, Bar Extender Stang). Harga masih 0.
- Multikategori diterapkan ke 58 baris di Sheets untuk produk yang cocok di dua kategori (misalnya tas charger, smart plug, intercom, screen protector, blower).

## [1.4.15] - 2026-10-16
- Kategori "Lights & Electrical" diganti menjadi "Lights & Sounds", dan kategori baru "Electronics" ditambahkan.
- Produk di Sheets yang sebelumnya "Lights & Electrical" (intercom dan smart plug) dipindah ke "Electronics".
- Urutan chip filter kategori di halaman /search mengikuti urutan menu kategori homepage. Semua dan Populer tetap di depan. Logika urutan dipindah ke `src/lib/categoryOrder.ts`.
- Urutan kartu kategori di homepage sekarang mengikuti jumlah produk terbanyak, dihitung dinamis. "Lainnya" selalu di urutan terakhir.
- Kategori "Covers & Protection" diganti menjadi "Cover & Protection" (termasuk 26 baris di Sheets).
- Ikon Apparel diganti menjadi jaket motor, ikon Aksesoris Interior menjadi kursi, dan ikon Aksesoris Eksterior menjadi top box.
- Ikon kategori Aksesoris Eksterior, Covers & Protection, dan Cleaning & Care diganti dengan SVG khusus.
- Ikon kategori Ban & Velg, Spare Parts, dan Phone Holder diganti dengan SVG khusus.
- Ikon kategori Bracket & Crashbar dan Apparel diganti dengan SVG khusus (rangka crashbar dan jaket).
- Nama kategori diganti ke Bahasa Indonesia: Baterai, Charger & Kabel, Ban & Velg, Lampu & Klakson, Elektronik, Aksesoris Interior, Aksesoris Eksterior, Bracket & Crashbar, Perkakas & Alat Servis, Covers & Protection, Spare Parts, Cleaning & Care, Helm & Riding Gear, Apparel, Phone Holder, Tas & Box, Plat & Dudukan, Lainnya. Data di Sheets (70 baris) ikut diperbarui.
- Kategori "Others" ditambahkan. Kartu "Semua" di menu kategori homepage dihapus.
- Kategori baru "Apparel" ditambahkan (belum ada produk; ikon sementara memakai ikon Helm & Riding Gear).
- Kategori baru "Bracket & Crashbar" ditambahkan. Produk bracket yang sudah ada (10 baris di Sheets) diberi kategori ini sekaligus dengan Exterior Accessories.
- Ikon kategori Electronics memakai SVG colokan (`public/icons/categories/electronics.svg`) menggantikan emoji sementara.
- Satu produk sekarang bisa punya beberapa kategori. Di Sheets disimpan dipisah koma, dan form admin memakai checkbox.
- Filter kategori, carousel, dan hasil pencarian mencocokkan produk yang memiliki kategori tersebut.

## [1.4.14] - 2026-10-15
- Halaman kategori dan hasil pencarian digabung menjadi satu halaman `/search`, dengan parameter `kategori` (slug atau `popular`) dan `q` yang bisa dipakai bersamaan.
- Hapus route `/categories/[slug]` dan `/popular`; link "Lihat Semua" sekarang mengarah ke `/search?kategori=...`.
- Halaman `/search` punya search box dan chip filter kategori (Semua, Populer, dan tiap kategori), kata kunci tetap terbawa saat berpindah filter kategori, dan mencari dari search box mereset filter kategori ke Semua.
- Search box dibuat pill dengan ikon kaca pembesar dan tombol "Cari" di dalamnya, di homepage dan halaman /search.
- Kartu kategori di homepage langsung membuka `/search?kategori=...` (atau `/search` untuk Semua), tidak lagi memfilter di halaman homepage. Chip kategori tampil dalam satu baris yang bisa di-scroll horizontal, dengan tombol panah di desktop yang muncul saat hover dan otomatis hilang di ujung kiri atau kanan.

## [1.4.13] - 2026-10-15
- Search bar dibungkus form: Enter membuka halaman `/search?q=...` dengan daftar produk yang cocok.
- Overlay pencarian punya link "Lihat semua hasil" ke halaman yang sama.
- Panah carousel dan tombol kembali memakai chevron SVG.

## [1.4.12] - 2026-10-15
- Tambahkan CTA "Lihat Semua" di header setiap carousel kategori (termasuk Populer).
- Tambahkan halaman `/popular` (8 produk terbaru) dan `/categories/[slug]` (semua produk dalam satu kategori, slug kebab-case seperti `/categories/cleaning-care`).
- Hilangkan subtitle di header Homepage dan kecilkan judul menjadi 24px di desktop.

## [1.4.11] - 2026-10-15
- Lebar card di carousel kategori dinaikkan dari 160px menjadi 200px.
- Padding samping di desktop (lg ke atas) ditambah menjadi 48px pada halaman Homepage dan Accessories, supaya konten tidak mepet tepi layar.

## [1.4.10] - 2026-10-14
- Area foto product card dibuat putih dengan `object-cover` dan gradien tipis di bagian bawah, supaya transisi ke teks lebih mulus.- Tambahkan foto untuk Ultimate Compound (Meguiars) dan Wax Polish (Nanotech) di folder `public/products/`, dan kolom `gambar` di Sheets diisi path-nya.

## [1.4.9] - 2026-10-14
- Restyle product card mengikuti tema Omoway: tombol "Beli" memakai accent lime dengan teks hitam, badge "Baru" memakai accent-soft, dan badge oranye dihapus.
- Harga dibuat tebal hitam (sebelumnya lime, kontras rendah), judul dan deskripsi diberi tipografi dan jarak yang lebih rapi, dan border serta shadow card lebih halus.

## [1.4.8] - 2026-10-14
- Hapus badge kategori dari product card di homepage dan accessories (badge "Baru" tetap ada).

## [1.4.7] - 2026-10-14
- Sederhanakan header halaman: hapus badge "Katalog Accessories", heading "Telusuri Kategori", dan subtitle petunjuk kategori.
- Pindahkan search bar ke bawah judul, di atas grid kategori.
- Search bar sekarang menampilkan overlay hasil pencarian langsung saat diketik (maks 20 hasil, bisa ditutup dengan tombol "Tutup" atau Escape).

## [1.4.6] - 2026-10-07
- Shorten CTA button text dari "Beli Sekarang" menjadi "Beli" di semua product cards.
- Membuat button lebih compact dan konsisten di mobile view.
- Hasil: UI lebih clean, button tidak overflow di tampilan sempit.

## [1.4.5] - 2026-10-01
- Tambahkan component `CategoryCarousels.tsx` untuk display produk dalam carousel per kategori.
- Kategori-kategori ditampilkan dalam horizontal scrollable carousel dengan navigation buttons (← →) untuk kategori dengan >6 produk.
- "Populer" section tampil paling atas menampilkan 8 produk terbaru (sorted by createdAt).
- Component terintegrasi ke halaman Accessories & Homepage di bagian PartsGrid, positioned di bawah search box dan di atas filter "Rentang Harga".
- Carousel hanya tampil saat selectedCategory === "all" (kategori default/semua produk).
- Setiap product card dalam carousel menampilkan: nama produk, deskripsi, harga, kategori badge, dan tombol "Beli Sekarang".
- Scrollbar tersembunyi dengan CSS (hide-scrollbar class) untuk UI yang lebih clean.
- Hasil: Homepage & Accessories page sekarang menampilkan product carousels grouped by category, meningkatkan product discovery dan user engagement.

## [1.4.4] - 2026-10-01
- Scrape & insert 72 produk dari OMOWAY Perks website (https://msha.ke/piet.omoway) ke Google Sheets tab 'Accessories'.
- Create `/api/batch-add-products` endpoint untuk batch insert multiple products ke Google Sheets.
- Semua produk di-kategorisasi sesuai kategori yang ada (Bags & Storage, Interior Accessories, Lights & Electrical, Covers & Protection, Exterior Accessories, Helm & Riding Gear, Gadget Mount, License Plate, Cleaning & Care, Maintenance & Tools, Spare Parts).
- Setiap produk include: Nama, Kategori, Deskripsi, Shopee Link.
- Harga & gambar kosong (user dapat update manual di Google Sheets atau via form aplikasi).
- Hasil: 72 produk OMOWAY perks berhasil ditambahkan ke Accessories listing di aplikasi.

## [1.4.3] - 2026-10-01
- Update Google Sheets tab reference dari 'Parts' menjadi 'Accessories'.
- Fungsi `getPartsSheetData()` sekarang read dari tab 'Accessories' di range A2:H.
- Update error message di console dari "Error reading Parts sheet" menjadi "Error reading Accessories sheet".
- Hasil: Accessories listing sekarang terhubung ke tab 'Accessories' di Google Sheets.

## [1.4.2] - 2026-10-01
- Improve Shopee scraping untuk auto-fill nama, harga, deskripsi produk (bukan hanya gambar).
- Ubah button text dari "Scrape Gambar dari Shopee" menjadi "Scrape Data dari Shopee" untuk lebih jelas.
- Enhance API `/api/scrape-shopee`:
  - Return success: true/false berdasarkan apakah ada gambar atau data yang berhasil di-extract
  - Tetap return nama, harga, deskripsi bahkan jika gambar tidak ditemukan
  - Add lebih banyak selectors untuk extract nama, harga, deskripsi (support lebih banyak Shopee HTML structure)
  - Add JSON-LD structured data parsing untuk harga
  - Improve image extraction dengan support lazy-load attributes (data-lazy, data-xlazy)
  - Add noscript tag parsing untuk image fallback
- Update AddPartsForm.tsx:
  - Auto-fill form fields (nama, harga, deskripsi) dari hasil scraping bahkan jika gambar gagal
  - Improve error messages dengan message dari API
  - Only set isScraped=true jika ada gambar (untuk display image picker)
- Tambah fallback manual image URL input ketika scraping gagal
- Hasil: Fitur scraping lebih robust - auto-fill data meskipun gambar tidak bisa di-extract dari Shopee, user dapat manual input gambar URL sebagai fallback.

## [1.4.1] - 2026-09-30
- Rename route dari `/admin/parts/add` menjadi `/admin/add` untuk path yang lebih ringkas.
- Update page title menjadi "Tambah Produk Parts & Aksesoris" untuk lebih deskriptif.
- Update description menjadi menjelaskan scraping dari Shopee link.
- Delete folder lama `/admin/parts`.
- Hasil: Admin route lebih clean, title lebih descriptive.

## [1.4.0] - 2026-09-30
- Rename route dari `/parts-accessories` menjadi `/accessories` untuk path yang lebih ringkas.
- Update navbar link href dari `/parts-accessories` ke `/accessories`.
- Update badge dari "Katalog Accessories" menjadi "Katalog Aksesoris" (Bahasa Indonesia).
- Update title dari "Omo Recommended Accessories" menjadi "Omo Recommended Aksesoris" (Bahasa Indonesia).
- Delete folder lama `/parts-accessories`.
- Hasil: Route lebih clean dan ringkas, label fully Bahasa Indonesia.

## [1.3.2] - 2026-09-30
- Update navbar labels menjadi Bahasa Indonesia untuk konsistensi.
- Ubah navbar link label dari "Accessories" menjadi "Aksesoris".
- Ubah CTA button dari "Cari Parts" menjadi "Cari Aksesoris".
- Hasil: Navbar sekarang fully dalam Bahasa Indonesia (Unit Motor, Aksesoris, Cari Aksesoris).

## [1.3.1] - 2026-09-30
- Update homepage title & badge untuk konsistensi dengan perubahan route v1.3.0.
- Ubah homepage badge dari "Katalog Parts" menjadi "Katalog Accessories".
- Ubah homepage title dari "Omo Recommended Parts" menjadi "Omo Recommended Accessories".
- Hasil: Homepage sekarang konsisten dengan halaman `/parts-accessories`.

## [1.3.0] - 2026-09-30
- Rename route `/parts` menjadi `/parts-accessories` untuk lebih spesifik.
- Ubah title halaman dari "Omo Recommended Parts" menjadi "Omo Recommended Accessories".
- Update navbar link dari "Parts" menjadi "Accessories" dengan href `/parts-accessories`.
- Ubah badge dari "Katalog Parts" menjadi "Katalog Accessories".
- Hasil: Lebih jelas bahwa halaman ini untuk melihat rekomendasi accessories (bukan parts saja).

## [1.2.2] - 2026-09-30
- Ubah footer description dari "Platform matching PO Omo antara penjual dan calon pembeli" menjadi "Platform marketplace unofficial untuk jual beli unit Omoway, Parts & Aksesoris".
- Hapus copyright year display (© 2026) dari footer.
- Hasil: Footer lebih deskriptif menunjukkan offering lengkap (unit motor + parts + aksesoris).

## [1.2.1] - 2026-09-30
- Ubah label navbar dari "Katalog" menjadi "Unit Motor" untuk lebih deskriptif.
- Hasil: Menu bar lebih jelas dan user-friendly, menunjukkan bahwa section adalah untuk melihat daftar unit motor.

## [1.2.0] - 2026-09-30
- Ubah halaman Home menjadi sama persis seperti halaman Parts (hanya menampilkan Parts section).
- Hapus HomeContent (Katalog Pre-Order section) dari halaman Home.
- Home page sekarang fokus 100% pada Parts: banner carousel, kategori filter, search, & grid produk.
- Katalog Pre-Order tetap accessible via navbar "Katalog" link (sekarang "Unit Motor").
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
