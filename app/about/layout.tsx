import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — MMK Studios",
  description: "MMK Studios is a small studio building AI tools for businesses that want to move fast without compromising quality. AI-native, human-driven.",
  openGraph: {
    title: "About — MMK Studios",
    description: "AI-native, human-driven. Built for shipping.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
