"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

type Project = {
  name: string;
  category: string;
  description: string;
  techs: string[];
  github: string;
};

const PROJECTS: Project[] = [
  {
    name: "Crypto Price Monitor",
    category: "Bot / Automation",
    description:
      "Real-time cryptocurrency monitor that polls CoinGecko API and pushes Telegram alerts when prices cross configurable thresholds. Reusable monitor-detect-notify pattern.",
    techs: ["Python", "Telegram API", "REST", "Git"],
    github: "https://github.com/djameltapiadev-prog/precios-cripto",
  },
  {
    name: "AI Invoice Reader",
    category: "Document AI",
    description:
      "Production-ready tool that extracts structured data from PDF invoices using AI vision, stores results in SQLite and exports to Excel. Multilingual support.",
    techs: ["Python", "Gemini Vision", "SQLite", "openpyxl"],
    github: "https://github.com/djameltapiadev-prog/invoice-reader",
  },
  {
    name: "Financial Analyzer",
    category: "Data + AI",
    description:
      "AI-powered financial analyzer for small businesses. Categorizes expenses, generates interactive dashboards and produces AI advisory reports with cost-cutting recommendations.",
    techs: ["Python", "Pandas", "Plotly", "Gemini"],
    github: "https://github.com/djameltapiadev-prog/financial-analyzer",
  },
  {
    name: "AI Website Builder",
    category: "Web / AI",
    description:
      "Generates complete multi-page responsive websites with industry templates, SEO and animations from a single business description. Streamlit interface with Gemini backend.",
    techs: ["Python", "Streamlit", "Gemini", "Tailwind"],
    github: "https://github.com/djameltapiadev-prog/ai-landing-generator",
  },
];

export default function Portfolio() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-[#c8a86e] text-sm tracking-widest uppercase mb-4">Recent work</p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e2]">
          Open-source <span className="text-[#c8a86e]">portfolio</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Every project here is public, working and inspectable. The code speaks louder than promises.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.github}
            target="_blank"
            rel="noopener"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative block p-8 rounded-2xl border border-[#1f1f2e] bg-[#11111a]/80 backdrop-blur-sm hover:border-[#c8a86e]/40 hover:translate-y-[-4px] transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs tracking-widest uppercase text-[#c8a86e]">
                {p.category}
              </span>
              <div className="flex items-center gap-2 text-gray-400 group-hover:text-[#c8a86e] transition-colors">
                <Github size={16} />
                <ExternalLink size={14} />
              </div>
            </div>
            <h3 className="font-serif text-2xl text-[#f5f0e2] mb-3">{p.name}</h3>
            <p className="text-gray-400 leading-relaxed mb-5">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.techs.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs rounded-md bg-[#0a0a0f] border border-[#1f1f2e] text-gray-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
