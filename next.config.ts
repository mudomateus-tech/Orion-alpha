import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  reactStrictMode: true,

  turbopack: {
    root: __dirname,
  },

  images: {
    remotePatterns: [],
  },

  allowedDevOrigins: [
    "192.168.100.187"
  ],

};

export default nextConfig;