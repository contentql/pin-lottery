/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'pin-lottery-production.up.railway.app',
      },
      {
        protocol: 'https',
        hostname: '649f07b28a7583914dfd1580a91610df.r2.cloudflarestorage.com',
      },
    ],
  },
}

module.exports = nextConfig
