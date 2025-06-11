import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure for static export (GitHub Pages)
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
  // Base path for GitHub Pages (will be set via environment variable)
  basePath: process.env.GITHUB_ACTIONS ? '/vibes' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/vibes/' : '',
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
