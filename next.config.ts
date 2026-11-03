import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Halaman /accessories sudah dihapus, isinya sama dengan halaman utama
    return [
      {
        source: "/accessories",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
