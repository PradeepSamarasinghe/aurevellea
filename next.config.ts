import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Turbopack is disabled for production builds to avoid a known panic with
  // Tailwind 4 CSS processing. The dev server (`npm run dev`) uses Turbopack.
  // Remove this comment and the experimental.turbopack flag if the panic is
  // resolved in a future Next.js or Turbopack release.
};

export default nextConfig;
