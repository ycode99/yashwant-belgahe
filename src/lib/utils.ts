import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolves static image URLs with basePath prefix for GitHub Pages deployment
 */
export function getImageUrl(src: string): string {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  const basePath =
    process.env.NODE_ENV === "production"
      ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "/yashwant-belgahe")
      : "";
  return src.startsWith("/") ? `${basePath}${src}` : `${basePath}/${src}`;
}
