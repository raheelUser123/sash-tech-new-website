// @ts-check

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    return [
      { source: "/case-studies/:path*", destination: "/work", permanent: true },
      { source: "/insights/:path*", destination: "/work", permanent: true },
      { source: "/partners", destination: "/about", permanent: true },
      { source: "/contact/schedule", destination: "/contact", permanent: true },
      { source: "/services/shopify-development", destination: "/services/web-design-technical-seo", permanent: true },
      { source: "/services/conversion-rate-optimization", destination: "/services/web-design-technical-seo", permanent: true },
      { source: "/services/ecommerce-marketing", destination: "/services/digital-marketing-paid-acquisition", permanent: true },
      { source: "/services/white-label-shopify", destination: "/services", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  // `npm run dev` uses Turbopack; this empty entry lets it start alongside the webpack hook below
  // (production builds run `next build --webpack`).
  turbopack: {},
  webpack(config, { isServer, dev }) {
    if (isServer && !dev) {
      // Avoid export resolution failures for next/og with Hostinger's SWC WASM fallback.
      config.optimization.concatenateModules = false;
    }
    return config;
  },
};

export default nextConfig;
