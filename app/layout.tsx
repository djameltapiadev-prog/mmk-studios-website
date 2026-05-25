import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import ParticlesBg from "@/components/ParticlesBg";
import CookieBanner from "@/components/CookieBanner";
import ChatWidget from "@/components/ChatWidget";

const SITE_URL = "https://mmk-studios-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MMK Studios — AI Solutions for Modern Businesses",
    template: "%s",
  },
  description: "Custom AI chatbots, image generation and intelligent automations built for your business. From idea to production in days, not months.",
  keywords: ["AI chatbot", "AI website", "automation", "Next.js", "Llama", "FLUX", "MMK Studios", "Madrid", "Spain"],
  authors: [{ name: "Djamel Tapia" }],
  creator: "MMK Studios",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "MMK Studios",
    title: "MMK Studios — AI Solutions for Modern Businesses",
    description: "Custom AI chatbots, image generation and intelligent automations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MMK Studios — AI Solutions for Modern Businesses",
    description: "Custom AI chatbots, image generation and intelligent automations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-white">
        <ParticlesBg />
        {children}
        <ChatWidget />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
