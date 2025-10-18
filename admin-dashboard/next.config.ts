import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    externalDir: true,
  },
  transpilePackages: ['lucide-react'],
};

export default nextConfig;
