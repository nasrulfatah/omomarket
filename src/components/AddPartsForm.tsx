"use client";

import { useState } from "react";
import { PartCategory, PARTS_CATEGORIES } from "@/lib/types";

export default function AddPartsForm() {
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    kategori: "Battery" as PartCategory,
    deskripsi: "",
    shopeeLink: "",
    gambar: "",
  });

  const [scrapedImages, setScrapedImages] = useState<string[]>([]);
  const [isScraped, setIsScraped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleScrapeShopee = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!formData.shopeeLink) {
      setError("Masukkan Shopee link terlebih dahulu");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/scrape-shopee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopeeUrl: formData.shopeeLink }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Gagal scrape gambar");
        setIsLoading(false);
        return;
      }

      setScrapedImages(data.images || []);
      setIsScraped(true);

      // Auto-fill fields jika kosong
      setFormData((prev) => ({
        ...prev,
        nama: prev.nama || data.nama || "",
        harga: prev.harga || (data.harga > 0 ? data.harga.toString() : ""),
        deskripsi: prev.deskripsi || data.deskripsi || "",
      }));

      setSuccess(`Berhasil scrape ${data.count} gambar (${data.nama ? "nama" : ""}${data.harga ? ", harga" : ""}${data.deskripsi ? ", deskripsi" : ""} auto-fill)`);
    } catch (err) {
      setError("Error: " + String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectImage = (image: string) => {
    const currentImages = formData.gambar ? formData.gambar.split(",") : [];
    if (currentImages.includes(image)) {
      const updated = currentImages.filter((img) => img !== image);
      setFormData((prev) => ({
        ...prev,
        gambar: updated.join(","),
      }));
    } else {
      currentImages.push(image);
      setFormData((prev) => ({
        ...prev,
        gambar: currentImages.join(","),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation - hanya Shopee Link dan Gambar yang wajib
    if (!formData.shopeeLink) {
      setError("Shopee link diperlukan");
      return;
    }
    if (!formData.gambar) {
      setError("Pilih minimal 1 gambar");
      return;
    }
    // Nama produk diperlukan jika tidak auto-fill dari scraping
    if (!formData.nama) {
      setError("Nama produk diperlukan (atau bisa auto-fill via scraping)");
      return;
    }

    setIsLoading(true);

    try {
      // Create current date in ISO format
      const createdAt = new Date().toISOString().split("T")[0];

      // Prepare data untuk Google Sheets
      const partsData = [
        [
          formData.nama,
          formData.harga,
          formData.kategori,
          formData.deskripsi,
          formData.gambar,
          formData.shopeeLink,
          "Publish",
          createdAt,
        ],
      ];

      const response = await fetch("/api/add-parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parts: partsData }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Gagal menambah produk");
        setIsLoading(false);
        return;
      }

      setSuccess("Produk berhasil ditambahkan!");
      // Reset form
      setFormData({
        nama: "",
        harga: "",
        kategori: "Battery",
        deskripsi: "",
        shopeeLink: "",
        gambar: "",
      });
      setScrapedImages([]);
      setIsScraped(false);
    } catch (err) {
      setError("Error: " + String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const selectedImages = formData.gambar ? formData.gambar.split(",") : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error & Success Messages */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
      {success && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4">
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      {/* Shopee Link & Scrape - PERTAMA */}
      <div className="space-y-3">
        <div>
          <label htmlFor="shopeeLink" className="block text-sm font-medium text-black mb-2">
            Shopee Link * <span className="text-xs text-black/50">(wajib, untuk scraping data)</span>
          </label>
          <input
            type="url"
            id="shopeeLink"
            name="shopeeLink"
            value={formData.shopeeLink}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-line/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            placeholder="https://shopee.co.id/..."
          />
        </div>
        <button
          type="button"
          onClick={handleScrapeShopee}
          disabled={isLoading || !formData.shopeeLink}
          className="w-full px-4 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? "Scraping..." : "Scrape Gambar dari Shopee"}
        </button>
      </div>

      {/* Nama Produk - auto-fill dari scraping */}
      <div>
        <label htmlFor="nama" className="block text-sm font-medium text-black mb-2">
          Nama Produk <span className="text-xs text-black/50">(auto-fill dari scraping)</span>
        </label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={formData.nama}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-line/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
          placeholder="Contoh: Baterai Omoway Smart OEM"
        />
      </div>

      {/* Harga - auto-fill dari scraping */}
      <div>
        <label htmlFor="harga" className="block text-sm font-medium text-black mb-2">
          Harga (Rp) <span className="text-xs text-black/50">(auto-fill dari scraping)</span>
        </label>
        <input
          type="number"
          id="harga"
          name="harga"
          value={formData.harga}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-line/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
          placeholder="2500000"
        />
      </div>

      {/* Kategori */}
      <div>
        <label htmlFor="kategori" className="block text-sm font-medium text-black mb-2">
          Kategori *
        </label>
        <select
          id="kategori"
          name="kategori"
          value={formData.kategori}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-line/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
        >
          {PARTS_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Deskripsi - auto-fill dari scraping */}
      <div>
        <label htmlFor="deskripsi" className="block text-sm font-medium text-black mb-2">
          Deskripsi <span className="text-xs text-black/50">(auto-fill dari scraping)</span>
        </label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-2 border border-line/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
          placeholder="Deskripsi produk..."
        />
      </div>

      {/* Scraped Images Preview */}
      {isScraped && scrapedImages.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-black">
            Pilih gambar ({selectedImages.length} dipilih):
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {scrapedImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectImage(img)}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                  selectedImages.includes(img)
                    ? "border-accent bg-accent/10"
                    : "border-line/30 hover:border-accent/50"
                }`}
              >
                <img
                  src={img}
                  alt={`Gambar ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='12' text-anchor='middle' dy='.3em' fill='%23999'%3EError%3C/text%3E%3C/svg%3E";
                  }}
                />
                {selectedImages.includes(img) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-accent/20">
                    <span className="text-2xl">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isLoading ? "Menyimpan..." : "Tambah Produk"}
      </button>
    </form>
  );
}
