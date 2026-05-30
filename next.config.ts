import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Static export can't use the default Image Optimization loader; serve images as-is.
  images: { unoptimized: true },
};

export default nextConfig;