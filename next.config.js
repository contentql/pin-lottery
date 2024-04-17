/** @type {import('next').NextConfig} */

const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand({ parsed: { ...process.env } })

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development', // Remove console.log in production
  },
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
        hostname: 'r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-4569e4e5d557441e896fc4fbf32626f3.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pin-lottery.vercel.app',
      },
    ],
  },
}

module.exports = nextConfig
