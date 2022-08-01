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
  crossOrigin: 'anonymous'
}

module.exports = withBundleAnalyzer(nextConfig);
