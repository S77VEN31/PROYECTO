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
  transpilePackages: ["colori-platform-shared"],
  experimental: {
    esmExternals: false,
  },
  webpack: (config) => {
    // Handle the shared module properly
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    // Ensure proper handling of CommonJS modules
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
};

export default nextConfig;
