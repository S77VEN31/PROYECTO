import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "encrypted-tbn0.gstatic.com",
      "wp-cdn.typhur.com",
    ],
  },
};

export default nextConfig;
