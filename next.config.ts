import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const config = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER || process.env.NODE_ENV === "development";
  const basePath = isDev ? "" : (process.env.NEXT_PUBLIC_BASE_PATH ?? "/yashwant-belgahe");

  return {
    output: "export",
    basePath,
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  };
};

export default config;