/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath: process.env.NODE_ENV === 'production' ? '/janstrozyk.de' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/janstrozyk.de/' : '',
};

module.exports = nextConfig;