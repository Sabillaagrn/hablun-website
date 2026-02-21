/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // WAJIB untuk shared hosting

  images: {
    unoptimized: true, // supaya tidak butuh Image Optimization server
  },

  eslint: {
    ignoreDuringBuilds: true, // supaya tidak gagal build karena lint
  },

  typescript: {
    ignoreBuildErrors: false, // tetap strict (ubah ke true kalau error TS)
  },
};

export default nextConfig;