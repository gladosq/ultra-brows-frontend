/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: [
      "localhost"
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**.example.com"
      }
    ]
  }
}

module.exports = nextConfig;
