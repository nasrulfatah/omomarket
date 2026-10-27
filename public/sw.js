// Service worker minimal. Dibutuhkan agar browser menganggap aplikasi bisa di-install.
// Tidak ada caching, sehingga harga dan produk selalu diambil langsung dari server.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
