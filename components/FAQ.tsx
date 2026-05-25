"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "Most chatbots and automations ship in 5-10 days. Full websites or AI integrations take 2-4 weeks. We'll give you an exact timeline before any work starts.",
  },
  {
    q: "Do you provide hosting?",
    a: "We deploy to free tiers (Vercel, Netlify, Railway) when it makes sense, or to your own infrastructure if you prefer. You always own the keys.",
  },
  {
    q: "Who pays for AI API costs?",
    a: "You provide your own API key (OpenAI, Anthropic, Google). The cost is typically €5-30/month for small businesses. You control it, you pay it.",
  },
  {
    q: "What if something breaks later?",
    a: "Every project includes a 30-day fix-it guarantee. Beyond that, we offer monthly maintenance contracts (from €30/month) or pay-per-fix support.",
  },
  {
    q: "Do you work in English and Spanish?",
    a: "Yes. All communication, documentation and code comments can be in either language. We're based in Madrid.",
  },
  {
    q: "Can my team take over the code after delivery?",
    a: "Absolutely. Code is clean, documented and follows industry conventions. We hand off the repo, deploy access and a 30-min walkthrough call.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-[#c8a86e] text-sm tracking-widest uppercase mb-4">Questions</p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e2]">Frequently asked</h2>
      </motion.div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <motion.div
            key={faq.q}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-[#1f1f2e] bg-[#11111a]/60 overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#0a0a0f]/40 transition-colors"
            >
              <span className="font-serif text-lg text-[#f5f0e2]">{faq.q}</span>
              <ChevronDown
                className={`text-[#c8a86e] flex-shrink-0 ml-4 transition-transform ${
                  open === i ? "rotate-180" : ""
                }`}
                size={20}
              />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-gray-400 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
