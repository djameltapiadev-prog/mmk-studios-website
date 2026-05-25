"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/chat", label: "AI Chat" },
    { href: "/images", label: "Image Gen" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#1f1f2e]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#c8a86e] flex items-center justify-center">
            <span className="text-[#c8a86e] font-serif text-lg font-bold">M</span>
          </div>
          <div className="leading-tight">
            <div className="font-serif text-xl text-[#f5f0e2]">MMK</div>
            <div className="text-[10px] tracking-[0.3em] text-[#c8a86e]">STUDIOS</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-300 hover:text-[#c8a86e] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm px-5 py-2 bg-[#c8a86e] text-[#0a0a0f] font-medium rounded-md hover:bg-[#a88a4e] transition-colors"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#c8a86e]"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#1f1f2e] bg-[#11111a]">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-[#c8a86e]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="text-center px-5 py-2 bg-[#c8a86e] text-[#0a0a0f] font-medium rounded-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
