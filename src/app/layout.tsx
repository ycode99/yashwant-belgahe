import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { Navbar1 } from "@/components/layout/navbar1";
import { Footer16 } from "@/components/layout/footer16";
import { Banner4 } from "@/components/layout/banner4";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yashwant Belgahe",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Banner4 />
        <Navbar1 />
        {children}
        <Footer16 />
        
        
      </body>
    </html>
  );
}
