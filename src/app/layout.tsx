import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PixelForge AI — AI Image Prompt Generator & Manager",
  description:
    "Create optimized image generation prompts for Stable Diffusion, DALL-E, and Midjourney. AI-powered prompt engineering, templates, and gallery.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
          <p>PixelForge AI — AI-Powered Image Prompt Engineering</p>
        </footer>
      </body>
    </html>
  );
}
