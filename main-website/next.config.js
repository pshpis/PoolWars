/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/whitepaper/general',
        permanent: true,
      },
      {
        source: '/whitepaper',
        destination: '/whitepaper/general',
        permanent: true,
      }

    ]
  }
}

module.exports = nextConfig
