"use client";

import { motion } from "framer-motion";

const STACK = [
  { name: "Next.js", url: "https://nextjs.org" },
  { name: "Vercel", url: "https://vercel.com" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com" },
  { name: "Meta Llama", url: "https://www.llama.com" },
  { name: "Groq", url: "https://groq.com" },
  { name: "Hugging Face", url: "https://huggingface.co" },
  { name: "Google Gemini", url: "https://ai.google.dev" },
  { name: "FLUX.1", url: "https://blackforestlabs.ai" },
];

export default function TechStack() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm tracking-widest uppercase text-gray-500 mb-10"
      >
        Powered by industry-leading tech
      </motion.p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
        {STACK.map((t, i) => (
          <motion.a
            key={t.name}
            href={t.url}
            target="_blank"
            rel="noopener"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ opacity: 1, y: -2 }}
            className="font-serif text-xl text-gray-400 hover:text-[#c8a86e] transition-colors"
          >
            {t.name}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
