import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — MMK Studios",
  description: "Simple, honest pricing for AI chatbots, websites and automations. Starter from €90, Studio €450, Enterprise from €2,500. One-time setup fees.",
  openGraph: {
    title: "Pricing — MMK Studios",
    description: "From €90 to €5,000+. One-time setup fees. No hidden costs.",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
