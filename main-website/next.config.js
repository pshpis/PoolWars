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
      }

    ]
  }
}

module.exports = withBundleAnalyzer(nextConfig);
