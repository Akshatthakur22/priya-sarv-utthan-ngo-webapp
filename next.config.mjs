/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'calcuzy.app',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Enable modern image formats
    deviceSizes: [72, 128, 256, 512, 1024], // Optimize for displayed dimensions
  },
  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },
  swcMinify: true, // Use SWC for faster builds and modern JavaScript
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Set long cache lifetimes for static assets
          },
        ],
      },
    ];
  },
};

export default nextConfig;