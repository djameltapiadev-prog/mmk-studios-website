"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Discovery call",
    desc: "Free 30-min conversation to understand your problem, scope and budget. No commitment.",
  },
  {
    number: "02",
    title: "Proposal & timeline",
    desc: "Written scope, fixed price, milestone timeline. You approve before any work begins.",
  },
  {
    number: "03",
    title: "Build & iterate",
    desc: "We build in short cycles with regular check-ins. You see progress and steer the direction.",
  },
  {
    number: "04",
    title: "Launch & handoff",
    desc: "Deployed to your servers, documented for your team, with a 30-day fix-it guarantee.",
  },
];

export default function Process() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-[#c8a86e] text-sm tracking-widest uppercase mb-4">Our process</p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e2]">
          From idea to launch in <span className="text-[#c8a86e]">4 steps</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8a86e]/30 to-transparent" />
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative"
          >
            <div className="w-16 h-16 rounded-full bg-[#0a0a0f] border-2 border-[#c8a86e] flex items-center justify-center mx-auto mb-5 relative z-10">
              <span className="font-serif text-xl text-[#c8a86e]">{step.number}</span>
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl text-[#f5f0e2] mb-3">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
