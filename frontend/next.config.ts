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
    // Remove any external handling for the shared module
    // Let webpack process it normally

    // Handle Node.js modules that don't work in the browser
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      os: false,
      stream: false,
      util: false,
    };

    // Ensure proper handling of ES modules and CommonJS
    config.module.rules.push({
      test: /\.m?js$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
};

export default nextConfig;
