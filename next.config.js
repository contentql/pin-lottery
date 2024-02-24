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
        hostname: 'payload-in-next-production.up.railway.app', //TODO: update accordingly
      },
    ],
  },
};

module.exports = nextConfig;
