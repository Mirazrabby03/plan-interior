import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static files: every page is prerendered and the site needs no server.
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
