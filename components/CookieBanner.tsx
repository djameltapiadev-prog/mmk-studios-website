"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "mmk_cookie_consent_v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      // Small delay so the banner doesn't flash on initial load
      const t = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-6 md:bottom-6 z-50"
        >
          <div className="max-w-3xl mx-auto rounded-2xl border border-[#c8a86e]/30 bg-[#0a0a0f]/95 backdrop-blur-lg shadow-2xl shadow-black/50 p-5 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex-1">
                <h3 className="font-serif text-lg text-[#f5f0e2] mb-2">We respect your data</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  This site uses only essential cookies required for its operation. No tracking, no ads.
                  Read our{" "}
                  <Link href="/privacy" className="text-[#c8a86e] hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  for details.
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={reject}
                  className="px-4 py-2 text-sm border border-[#1f1f2e] text-gray-300 rounded-md hover:border-[#c8a86e]/40 hover:text-[#c8a86e] transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={accept}
                  className="px-5 py-2 text-sm bg-[#c8a86e] text-[#0a0a0f] font-semibold rounded-md hover:bg-[#a88a4e] transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
