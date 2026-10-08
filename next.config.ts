import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */

  reactStrictMode: false,
  devIndicators: false,
  allowedDevOrigins: ["*.space-z.ai"],
};

export default nextConfig;
