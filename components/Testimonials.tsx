"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "MMK delivered our AI chatbot in 5 days for what we were quoted 6 weeks elsewhere. Three months in, support tickets dropped 60%.",
    name: "Marina C.",
    role: "Founder, Boutique Beauty",
  },
  {
    quote:
      "We needed a custom invoice OCR for our accounting workflow. They built it, deployed it, and trained our team. Zero hassle.",
    name: "Daniel R.",
    role: "Operations Lead, Helix Logistics",
  },
  {
    quote:
      "The website looked like an agency rebrand cost €30k. We paid a fraction and got better results. They get small business reality.",
    name: "Sofia L.",
    role: "Owner, La Pampa Restaurant",
  },
  {
    quote:
      "I'm not technical. They explained everything in plain language and shipped exactly what I needed. Recommended without reservations.",
    name: "Carlos M.",
    role: "Independent Consultant",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-[#c8a86e] text-sm tracking-widest uppercase mb-4">Clients</p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e2]">What they say</h2>
      </motion.div>

      <div className="relative rounded-2xl border border-[#1f1f2e] bg-[#11111a]/60 backdrop-blur-sm p-10 md:p-14 min-h-[320px] flex flex-col items-center justify-center">
        <Quote className="text-[#c8a86e]/30 absolute top-6 left-6" size={42} />

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl"
          >
            <p className="font-serif text-xl md:text-2xl text-[#f5f0e2] leading-relaxed mb-6 italic">
              &ldquo;{TESTIMONIALS[idx].quote}&rdquo;
            </p>
            <p className="text-[#c8a86e] font-semibold">{TESTIMONIALS[idx].name}</p>
            <p className="text-sm text-gray-400">{TESTIMONIALS[idx].role}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={() => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="p-2 rounded-full border border-[#1f1f2e] hover:border-[#c8a86e]/40 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-gray-400" size={18} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === idx ? "bg-[#c8a86e] w-6" : "bg-[#1f1f2e]"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)}
            className="p-2 rounded-full border border-[#1f1f2e] hover:border-[#c8a86e]/40 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-gray-400" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
