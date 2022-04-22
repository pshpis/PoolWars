/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/whitepaper',
        destination: '/whitepaper/general',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
