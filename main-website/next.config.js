/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/whitepaper',
        destination: '/whitepaper/general',
        permanent: true,
      },
      {
        source: '/advert_link',
        destination: 'https://t.me/PoolWarsAnnouncements',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/pages/_app.js",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  crossOrigin: 'anonymous'
}

module.exports = withBundleAnalyzer(nextConfig);
