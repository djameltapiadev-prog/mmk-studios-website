import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Generator — MMK Studios",
  description: "Generate custom AI imagery with FLUX.1 schnell. Multiple aspect ratios, style presets, prompt enhancement and 4-variant generation.",
  openGraph: {
    title: "AI Image Generator — MMK Studios",
    description: "Generate up to 4 image variants per prompt with style controls.",
  },
};

export default function ImagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
