"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import FAQ from "@/components/FAQ";
import { Check, Star } from "lucide-react";

const TIERS = [
  {
    name: "Starter",
    price: "€90",
    blurb: "For testing an idea or small one-off automation",
    features: [
      "1 page or 1 bot",
      "AI chatbot OR image generator",
      "Up to 5 commands or features",
      "Basic SEO setup",
      "Email support during build",
      "3-day delivery",
      "1 revision",
    ],
    cta: "Get started",
    href: "/contact",
    highlighted: false,
  },
  {
    name: "Studio",
    price: "€450",
    blurb: "The sweet spot. Most clients pick this.",
    features: [
      "4-page full website",
      "AI chatbot WITH image generator",
      "Streaming responses, multi-language",
      "Database (lead capture, history)",
      "Full SEO + Open Graph + sitemap",
      "Mobile-first responsive",
      "Working contact form (Formspree)",
      "Deploy to your domain",
      "7-day delivery",
      "3 revisions + 30-day fix-it warranty",
    ],
    cta: "Start project",
    href: "/contact",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "From €2.500",
    blurb: "Custom SaaS, multi-tenant, advanced integrations",
    features: [
      "Custom-scoped: any scale",
      "Multi-page or full SaaS dashboard",
      "User authentication (Clerk/Auth0)",
      "Stripe payments + subscriptions",
      "Custom integrations (CRM, ERP, etc.)",
      "Custom AI training/fine-tuning",
      "Admin dashboard with analytics",
      "Priority Slack channel during build",
      "Custom SLA + monthly maintenance",
    ],
    cta: "Book a call",
    href: "/contact",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <Reveal direction="fade">
          <p className="text-[#c8a86e] text-sm tracking-widest uppercase mb-4">Pricing</p>
        </Reveal>
        <Reveal direction="up" delay={0.1}>
          <h1 className="font-serif text-5xl md:text-6xl text-[#f5f0e2] mb-6">
            Simple, <span className="text-[#c8a86e]">honest pricing</span>
          </h1>
        </Reveal>
        <Reveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            One-time setup fees. You own everything we build. Maintenance optional.
          </p>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier, idx) => (
            <Reveal key={tier.name} delay={idx * 0.1} direction="up">
              <div
                className={`relative h-full p-8 rounded-2xl border transition-all ${
                  tier.highlighted
                    ? "border-[#c8a86e] bg-gradient-to-b from-[#c8a86e]/10 to-[#11111a]/80 shadow-2xl shadow-[#c8a86e]/10 scale-[1.02]"
                    : "border-[#1f1f2e] bg-[#11111a]/80 hover:border-[#c8a86e]/40"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#c8a86e] text-[#0a0a0f] text-xs font-semibold tracking-wide uppercase rounded-full flex items-center gap-1">
                    <Star size={12} fill="currentColor" />
                    Most popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-serif text-2xl text-[#f5f0e2] mb-2">{tier.name}</h3>
                  <p className="text-gray-400 text-sm">{tier.blurb}</p>
                </div>

                <div className="mb-8">
                  <div className="font-serif text-5xl text-[#c8a86e]">{tier.price}</div>
                  <p className="text-xs text-gray-500 mt-1">one-time fee, VAT excl.</p>
                </div>

                <ul className="space-y-3 mb-10">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="text-[#c8a86e] flex-shrink-0 mt-0.5" size={16} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  href={tier.href}
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                    tier.highlighted
                      ? "bg-[#c8a86e] text-[#0a0a0f] hover:bg-[#a88a4e]"
                      : "border border-[#c8a86e] text-[#c8a86e] hover:bg-[#c8a86e]/10"
                  }`}
                >
                  {tier.cta}
                </MagneticButton>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="text-center text-sm text-gray-500 mt-12 max-w-2xl mx-auto">
            All prices are one-time setup fees. AI API costs (~€5-30/month) are billed separately to your own OpenAI / Anthropic / Google account. You always own the code and the data.
          </p>
        </Reveal>
      </section>

      <FAQ />

      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <Reveal>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e2] mb-6">
            Still not sure which plan?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Free 30-min call. We&apos;ll listen to your problem and tell you honestly what fits — even if it&apos;s &ldquo;don&apos;t hire us yet&rdquo;.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <MagneticButton
            href="/contact"
            className="inline-block px-8 py-4 bg-[#c8a86e] text-[#0a0a0f] font-semibold rounded-md hover:bg-[#a88a4e] transition-colors"
          >
            Book free consultation
          </MagneticButton>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
