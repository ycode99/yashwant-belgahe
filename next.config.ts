import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const config = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER || process.env.NODE_ENV === "development";

  return {
    output: "export",
    basePath: isDev ? "" : "/yashwant-belgahe",
    images: {
      unoptimized: true,
    },
  };
};

export default config;