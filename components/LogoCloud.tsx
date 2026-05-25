"use client";

import { motion } from "framer-motion";

const LOGOS = [
  "TechFlow",
  "Nordica",
  "Veridian",
  "Stellar Co.",
  "Lumen Labs",
  "Atlas Group",
  "Quantum Bay",
  "Helix.io",
];

export default function LogoCloud() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm tracking-widest uppercase text-gray-500 mb-10"
      >
        Trusted by teams at
      </motion.p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {LOGOS.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="font-serif text-2xl text-gray-400 hover:text-[#c8a86e] transition-colors cursor-default"
          >
            {name}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
