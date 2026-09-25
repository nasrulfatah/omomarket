# Changelog

Semua perubahan penting pada project ini dicatat di file ini, supaya mudah melacak dan revert ke versi tertentu.

Format: `## [versi] - tanggal` diikuti ringkasan perubahan dan commit hash terkait.

## [0.9.1] - 2026-09-26
- Update scroll positioning untuk "Cari Parts" button agar kategori grid tertutup oleh header.
- Gunakan XPath untuk mencari "Telusuri Kategori" section dan scroll ke posisi top-nya dikurangi header height (80px).
- Hasil: Ketika user klik "Cari Parts", halaman scroll hingga kategori grid tidak terlihat, hanya search box yang visible di bawah header.

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
