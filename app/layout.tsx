import type { Metadata } from "next";
import "./globals.css";
import ParticlesBg from "@/components/ParticlesBg";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "MMK Studios — AI Solutions for Modern Businesses",
  description: "Custom AI chatbots, image generation and intelligent automations built for your business. From idea to production in days, not months.",
  openGraph: {
    title: "MMK Studios — AI Solutions for Modern Businesses",
    description: "Custom AI chatbots, image generation and intelligent automations built for your business.",
    type: "website",
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
        <CookieBanner />
      </body>
    </html>
  );
}
