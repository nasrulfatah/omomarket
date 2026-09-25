# Changelog

Semua perubahan penting pada project ini dicatat di file ini, supaya mudah melacak dan revert ke versi tertentu.

Format: `## [versi] - tanggal` diikuti ringkasan perubahan dan commit hash terkait.

## [0.3.0] - 2026-09-25
- Tambah 4 kategori parts baru berdasarkan analisis daftar produk Shopee: "Helm & Riding Gear", "Gadget Mount", "Bags & Storage", "License Plate".
- Tambah ikon 3D (CC0, 3dicons.co) untuk Gadget Mount, Bags & Storage, License Plate di `public/icons/categories/`.
- "Helm & Riding Gear" pakai emoji ⛑️ sebagai fallback karena tidak ada ikon helm yang cocok di katalog 3dicons.co gratis.
- `CategoryCardsGrid` sekarang mendukung campuran icon file (webp) dan emoji lewat komponen `CategoryIcon`.

## [0.2.0] - 2026-09-25
- Baseline pencatatan versi dimulai dari sini. Versi sebelumnya (redesign halaman /parts, banner carousel, 3D icons kategori, halaman /catalog, dst) tidak tercatat per-versi karena dilakukan sebelum praktik ini diterapkan.
