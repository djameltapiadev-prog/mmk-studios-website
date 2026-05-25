"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Code, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // For real integration: hook this to Formspree.
    // Replace YOUR_FORM_ID in the URL with your real one.
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="text-[#c8a86e] text-sm tracking-widest uppercase mb-4">Contact</p>
        <h1 className="font-serif text-5xl md:text-6xl text-[#f5f0e2] leading-tight mb-6">
          Let&apos;s build something
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Tell us about your idea, your problem, or your bot. We reply within 24h on weekdays.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-[2fr_1fr] gap-8">
          <form
            onSubmit={submit}
            className="rounded-2xl border border-[#1f1f2e] bg-[#11111a] p-8 space-y-5"
          >
            <div>
              <label className="block text-sm text-gray-400 mb-2">Your name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#1f1f2e] rounded-lg text-white focus:outline-none focus:border-[#c8a86e]/60"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#1f1f2e] rounded-lg text-white focus:outline-none focus:border-[#c8a86e]/60"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Tell us about your project</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#1f1f2e] rounded-lg text-white focus:outline-none focus:border-[#c8a86e]/60 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 bg-[#c8a86e] text-[#0a0a0f] font-semibold rounded-lg hover:bg-[#a88a4e] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
            >
              {status === "sending" && <Loader2 className="animate-spin" size={18} />}
              {status === "idle" && "Send message"}
              {status === "sending" && "Sending..."}
              {status === "sent" && "Message sent!"}
              {status === "error" && "Try again"}
            </button>

            {status === "sent" && (
              <p className="text-green-400 text-sm text-center">
                Thanks. We&apos;ll get back to you within 24h.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm text-center">
                Something went wrong. Email us directly at djameltapia.dev@gmail.com
              </p>
            )}
          </form>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[#1f1f2e] bg-[#11111a] p-6">
              <div className="flex items-start gap-3 mb-4">
                <Mail className="text-[#c8a86e] mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">djameltapia.dev@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-[#c8a86e] mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white">Madrid, Spain</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Code className="text-[#c8a86e] mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-400">Code</p>
                  <a
                    href="https://github.com/djameltapiadev-prog"
                    target="_blank"
                    rel="noopener"
                    className="text-white hover:text-[#c8a86e]"
                  >
                    github.com/djameltapiadev-prog
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#c8a86e]/30 bg-[#c8a86e]/5 p-6">
              <h3 className="font-serif text-lg text-[#c8a86e] mb-2">Response time</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Replies within 24h on weekdays.
                Free 30-min consultation before any project starts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
