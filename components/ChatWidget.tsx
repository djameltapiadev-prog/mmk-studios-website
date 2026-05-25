"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Show after small delay on first visit
    const t = setTimeout(() => setMounted(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Don't show on /chat page itself
  if (pathname === "/chat" || !mounted) return null;

  return (
    <>
      {/* Tooltip / quick panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-80 rounded-2xl border border-[#c8a86e]/30 bg-[#0a0a0f]/95 backdrop-blur-lg shadow-2xl shadow-black/50 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-[#c8a86e] font-semibold">MMK Assistant</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-white"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Hi! Ask me anything about MMK Studios — services, pricing, timelines.
              Or just say hi.
            </p>
            <Link
              href="/chat"
              className="block w-full text-center py-2.5 bg-[#c8a86e] text-[#0a0a0f] font-semibold rounded-md hover:bg-[#a88a4e] transition-colors"
            >
              Open full chat →
            </Link>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Streaming · Voice · PDF upload
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#c8a86e] text-[#0a0a0f] shadow-2xl shadow-[#c8a86e]/30 hover:bg-[#a88a4e] transition-colors flex items-center justify-center group"
      >
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#c8a86e]/40 animate-ping" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0a0a0f] border-2 border-[#c8a86e] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            </span>
          </>
        )}
        <span className="relative">
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </span>
      </motion.button>
    </>
  );
}
