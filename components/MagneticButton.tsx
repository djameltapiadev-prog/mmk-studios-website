"use client";

import { useRef, useState, MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
};

/**
 * A button that subtly translates toward the user's cursor when hovered.
 * Used for primary CTAs to add tactile / "alive" feel.
 */
export default function MagneticButton({
  href,
  children,
  className = "",
  strength = 0.4,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  }

  function onLeave() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.span
      style={{ display: "inline-block" }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={className}
      >
        {children}
      </Link>
    </motion.span>
  );
}
