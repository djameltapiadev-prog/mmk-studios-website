import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat — MMK Studios",
  description: "Try our live AI chat demo: streaming responses, voice input/output, PDF document Q&A. Same tech we integrate into client products.",
  openGraph: {
    title: "AI Chat — MMK Studios",
    description: "Streaming · Voice in/out · PDF upload",
  },
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
