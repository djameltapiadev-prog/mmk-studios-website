import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import TechStack from "@/components/TechStack";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import { MessageSquare, Image as ImageIcon, Zap, Shield, Code, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center relative">
        <Reveal direction="fade">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-[#c8a86e]/30 bg-[#c8a86e]/5 text-[#c8a86e] text-xs tracking-widest uppercase">
            AI Solutions for Modern Business
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <h1 className="font-serif text-5xl md:text-7xl text-[#f5f0e2] leading-tight mb-8 max-w-4xl mx-auto">
            Custom AI tools, <span className="text-[#c8a86e]">built for your business</span>
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Chatbots, image generation, and intelligent automations.
            From idea to production in days, not months. We build, you ship.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              href="/chat"
              className="inline-block px-8 py-4 bg-[#c8a86e] text-[#0a0a0f] font-semibold rounded-md hover:bg-[#a88a4e] transition-colors"
            >
              Try AI Chat now
            </MagneticButton>
            <MagneticButton
              href="/contact"
              className="inline-block px-8 py-4 border border-[#c8a86e] text-[#c8a86e] font-semibold rounded-md hover:bg-[#c8a86e]/10 transition-colors"
            >
              Book a consultation
            </MagneticButton>
          </div>
        </Reveal>
      </section>

      <TechStack />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-[#c8a86e] text-sm tracking-widest uppercase mb-4">What we build</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e2]">Three pillars, infinite possibilities</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: MessageSquare, title: "AI Chatbots", desc: "Conversational AI that understands your business context. Customer support, lead capture, FAQ — running 24/7.", href: "/chat" },
            { icon: ImageIcon, title: "Image Generation", desc: "On-demand AI imagery for marketing, products, social. Custom-tuned for your brand aesthetic.", href: "/images" },
            { icon: Zap, title: "Smart Automations", desc: "Connect your tools, eliminate manual work. From email triage to inventory sync, end-to-end pipelines.", href: "/contact" },
          ].map((feat, idx) => (
            <Reveal key={feat.title} delay={idx * 0.1} direction="up">
              <Link
                href={feat.href}
                className="group block p-8 rounded-xl border border-[#1f1f2e] bg-[#11111a]/80 backdrop-blur-sm hover:border-[#c8a86e]/40 hover:translate-y-[-4px] transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-[#c8a86e]/10 flex items-center justify-center mb-5 group-hover:bg-[#c8a86e]/20 group-hover:scale-110 transition-all">
                  <feat.icon className="text-[#c8a86e]" size={22} />
                </div>
                <h3 className="font-serif text-2xl text-[#f5f0e2] mb-3">{feat.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
                <p className="text-[#c8a86e] text-sm mt-5 group-hover:translate-x-1 transition-transform inline-block">Explore →</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Portfolio />

      <Process />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-[#c8a86e] text-sm tracking-widest uppercase mb-4">Why MMK</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e2]">Built for shipping, not for hype</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Shield, title: "Secrets handled right", desc: "Your API keys never leak. Environment-based config, audited workflows." },
            { icon: Code, title: "Clean, documented code", desc: "Hand-off ready. Your team can extend it. No vendor lock-in." },
            { icon: Sparkles, title: "AI-native, human-driven", desc: "We use AI to ship faster, but every detail is reviewed by a human." },
          ].map((p, idx) => (
            <Reveal key={p.title} delay={idx * 0.1}>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full border border-[#c8a86e]/40 flex items-center justify-center mx-auto mb-5">
                  <p.icon className="text-[#c8a86e]" size={24} />
                </div>
                <h3 className="font-serif text-xl text-[#f5f0e2] mb-3">{p.title}</h3>
                <p className="text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FAQ />

      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <Reveal>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e2] mb-6">
            Ready to <span className="text-[#c8a86e]">automate the boring</span>?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Tell us your problem. We&apos;ll show you what AI can do about it. Free consultation.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <MagneticButton
            href="/contact"
            className="inline-block px-8 py-4 bg-[#c8a86e] text-[#0a0a0f] font-semibold rounded-md hover:bg-[#a88a4e] transition-colors"
          >
            Start the conversation
          </MagneticButton>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
