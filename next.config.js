/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Custom domain (hexa.hacktoolkit.com) serves from root, no basePath needed
  basePath: '',
  trailingSlash: true,
}

module.exports = nextConfig
