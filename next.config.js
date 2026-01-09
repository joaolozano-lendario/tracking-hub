/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removido output: export para suportar API routes
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
