/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(self)",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.razorpay.com https://checkout.razorpay.com https://vitals.vercel-insights.com https://www.google-analytics.com https://www.googletagmanager.com",
      "frame-src https://api.razorpay.com https://checkout.razorpay.com https://www.google.com https://maps.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

// Performance optimizations
const cacheHeaders = [
  {
    source: "/api/donation/receipt/:id",
    headers: [
      { key: "Cache-Control", value: "public, max-age=3600, immutable" },
    ],
  },
  {
    source: "/api/(.*)",
    headers: [
      { key: "Cache-Control", value: "no-store, must-revalidate" },
    ],
  },
  {
    source: "/(.*\\.(?:jpg|jpeg|gif|png|webp|avif|svg|ico|woff|woff2|ttf|eot)$)",
    headers: [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ],
  },
  {
    source: "/:path*",
    headers: securityHeaders,
  },
];

const nextConfig = {
  reactStrictMode: true,
  
  // Optimizations for Core Web Vitals
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "priyasarvutthan.org",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [72, 128, 256, 512, 1024],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Optimize images aggressively
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    // AVIF support for modern browsers
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Turbopack configuration for Next.js 16
  // Turbopack is the default bundler now and handles optimization automatically
  turbopack: {
    // Turbopack will automatically optimize builds
    // No additional configuration needed for most projects
  },

  async headers() {
    return cacheHeaders;
  },

  // Experimental optimizations
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
    ],
  },
};

export default nextConfig;
