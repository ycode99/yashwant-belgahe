import type { NextConfig } from "next";

const config = (): NextConfig => {
  return {
    output: "export",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  };
};

export default config;