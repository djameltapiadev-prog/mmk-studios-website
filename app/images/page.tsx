"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Loader2, Download, Wand2, X } from "lucide-react";

const STYLES = [
  { key: "default", label: "Default" },
  { key: "photorealistic, hyperdetailed", label: "Photorealistic" },
  { key: "cinematic film still, dramatic lighting", label: "Cinematic" },
  { key: "minimal flat illustration", label: "Minimal" },
  { key: "watercolor painting", label: "Watercolor" },
  { key: "anime, studio ghibli style", label: "Anime" },
  { key: "3d render, octane render", label: "3D render" },
  { key: "neon cyberpunk, futuristic", label: "Cyberpunk" },
  { key: "vintage retro 80s", label: "Retro 80s" },
];

const ASPECT_RATIOS = [
  { key: "1:1", label: "Square" },
  { key: "16:9", label: "Landscape" },
  { key: "9:16", label: "Portrait" },
  { key: "4:3", label: "Classic" },
];

type Result = {
  urls: string[];
  finalPrompt: string;
  originalPrompt: string;
  enhanced: boolean;
};

export default function ImagesPage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("default");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [enhance, setEnhance] = useState(true);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    const text = prompt.trim();
    if (!text || loading) return;
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, style, aspectRatio, enhance, count }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Image error");
      setResult({
        urls: data.urls,
        finalPrompt: data.finalPrompt,
        originalPrompt: data.originalPrompt,
        enhanced: data.enhanced,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 pt-12 pb-6">
        <p className="text-[#c8a86e] text-sm tracking-widest uppercase text-center mb-4">Live demo</p>
        <h1 className="font-serif text-4xl md:text-5xl text-[#f5f0e2] text-center mb-4">
          AI Image Generator
        </h1>
        <p className="text-center text-gray-400 max-w-xl mx-auto">
          Powered by FLUX.1 schnell + Gemini prompt enhancement. Generate 1 or 4 variants.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-[#1f1f2e] bg-[#11111a]/80 backdrop-blur-sm p-6 space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Describe the image</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='e.g. "A modern luxury restaurant interior with warm golden lighting"'
              rows={3}
              className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#1f1f2e] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c8a86e]/60 resize-none"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Aspect ratio</label>
              <div className="flex flex-wrap gap-2">
                {ASPECT_RATIOS.map((a) => (
                  <button
                    key={a.key}
                    onClick={() => setAspectRatio(a.key)}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                      aspectRatio === a.key
                        ? "bg-[#c8a86e] text-[#0a0a0f] font-semibold"
                        : "bg-[#0a0a0f] border border-[#1f1f2e] text-gray-300 hover:border-[#c8a86e]/40"
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Variants</label>
              <div className="flex gap-2">
                {[1, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
                      count === n
                        ? "bg-[#c8a86e] text-[#0a0a0f] font-semibold"
                        : "bg-[#0a0a0f] border border-[#1f1f2e] text-gray-300 hover:border-[#c8a86e]/40"
                    }`}
                  >
                    {n} {n === 1 ? "image" : "images"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">AI prompt enhancement</label>
              <button
                onClick={() => setEnhance(!enhance)}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-md border transition-colors ${
                  enhance
                    ? "bg-[#c8a86e]/10 border-[#c8a86e]/40 text-[#c8a86e]"
                    : "bg-[#0a0a0f] border-[#1f1f2e] text-gray-300"
                }`}
              >
                <span className="flex items-center gap-2 text-sm">
                  <Wand2 size={16} />
                  {enhance ? "Enhanced" : "Raw"}
                </span>
                <span className="text-xs">{enhance ? "ON" : "OFF"}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Style</label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setStyle(s.key)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    style === s.key
                      ? "bg-[#c8a86e] text-[#0a0a0f] font-semibold"
                      : "bg-[#0a0a0f] border border-[#1f1f2e] text-gray-300 hover:border-[#c8a86e]/40"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            className="w-full py-4 bg-[#c8a86e] text-[#0a0a0f] font-semibold rounded-lg hover:bg-[#a88a4e] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Generating {count === 4 ? "4 variants" : "image"}... (5-20s)
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate {count === 4 ? "4 variants" : "image"}
              </>
            )}
          </button>

          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        {result && (
          <div className="mt-8 space-y-4">
            {result.enhanced && (
              <div className="px-4 py-3 bg-[#c8a86e]/5 border border-[#c8a86e]/20 rounded-lg">
                <p className="text-xs text-[#c8a86e] mb-1 flex items-center gap-1">
                  <Wand2 size={12} /> Enhanced by Gemini:
                </p>
                <p className="text-sm text-gray-300">{result.finalPrompt}</p>
              </div>
            )}

            <div className={`grid gap-3 ${result.urls.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
              {result.urls.map((url, i) => (
                <div
                  key={i}
                  onClick={() => setExpanded(url)}
                  className="group relative rounded-xl border border-[#1f1f2e] bg-[#11111a] overflow-hidden cursor-pointer hover:border-[#c8a86e]/40 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Variant ${i + 1}`} className="w-full h-auto block" />
                  <div className="absolute inset-0 bg-[#0a0a0f]/0 group-hover:bg-[#0a0a0f]/40 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold">
                      Click to expand
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 text-center">
              Your prompt: {result.originalPrompt}
            </p>
          </div>
        )}

        {expanded && (
          <div
            onClick={() => setExpanded(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <button
              onClick={() => setExpanded(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X size={20} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={expanded}
              alt="Expanded"
              className="max-h-[90vh] max-w-[90vw] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <a
              href={expanded}
              download="mmk-generated.png"
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 px-5 py-3 bg-[#c8a86e] text-[#0a0a0f] font-semibold rounded-md hover:bg-[#a88a4e] transition-colors flex items-center gap-2"
            >
              <Download size={18} />
              Download
            </a>
          </div>
        )}

        <p className="text-center text-xs text-gray-500 mt-6">
          Powered by FLUX.1 schnell via Hugging Face. Images not stored.
        </p>
      </section>

      <Footer />
    </>
  );
}
