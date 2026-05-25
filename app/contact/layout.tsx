import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — MMK Studios",
  description: "Get in touch with MMK Studios. Free 30-min consultation. We reply within 24h on weekdays. Based in Madrid, Spain.",
  openGraph: {
    title: "Contact — MMK Studios",
    description: "Free consultation. Reply within 24h.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
