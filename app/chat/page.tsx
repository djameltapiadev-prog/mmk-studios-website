"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Send, Bot, User as UserIcon, Loader2,
  Mic, Volume2, VolumeX, Plus, FileText, X,
} from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

type SpeechResult = {
  0: { transcript: string };
  isFinal: boolean;
};

type SpeechResultEvent = {
  resultIndex: number;
  results: ArrayLike<SpeechResult>;
};

type WebSpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

const SILENCE_TIMEOUT_MS = 3000;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);

  const [pdfName, setPdfName] = useState<string | null>(null);
  const [pdfText, setPdfText] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<WebSpeechRecognition | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finalTranscriptRef = useRef<string>("");
  const autoSendRef = useRef<boolean>(false);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, streaming]);

  // Auto-resize textarea as content grows
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const newHeight = Math.min(el.scrollHeight, 200);
    el.style.height = `${newHeight}px`;
  }, [input]);

  const speakText = useCallback((text: string) => {
    if (!voiceOn || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const userLang = navigator.language?.startsWith("es") ? "es-ES" : "en-US";
    u.lang = userLang;
    u.rate = 1.0;
    u.pitch = 1.0;
    window.speechSynthesis.speak(u);
  }, [voiceOn]);

  function toggleListening() {
    if (listening) {
      autoSendRef.current = false;
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      recognitionRef.current?.stop();
      return;
    }
    const W = window as unknown as { SpeechRecognition?: new () => WebSpeechRecognition; webkitSpeechRecognition?: new () => WebSpeechRecognition };
    const SR = W.SpeechRecognition || W.webkitSpeechRecognition;
    if (!SR) {
      setError("Voice input not supported in this browser. Try Chrome or Edge.");
      return;
    }

    finalTranscriptRef.current = "";
    autoSendRef.current = false;

    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = navigator.language?.startsWith("es") ? "es-ES" : "en-US";

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        if (result.isFinal) {
          finalTranscriptRef.current += transcript + " ";
        } else {
          interim += transcript;
        }
      }
      const combined = (finalTranscriptRef.current + interim).trim();
      setInput(combined);

      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(() => {
        autoSendRef.current = true;
        recognitionRef.current?.stop();
      }, SILENCE_TIMEOUT_MS);
    };

    recognition.onerror = (event) => {
      if (event.error !== "aborted" && event.error !== "no-speech") {
        setError(`Voice error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      setListening(false);

      if (autoSendRef.current && finalTranscriptRef.current.trim()) {
        autoSendRef.current = false;
        setTimeout(() => send(), 50);
      }
    };

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }

  async function handlePdfUpload(file: File) {
    setPdfLoading(true);
    setError(null);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc =
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items
          .map((item) => (item as { str?: string }).str || "")
          .join(" ");
        fullText += `\n[Page ${i}]\n${text}\n`;
      }

      setPdfName(file.name);
      setPdfText(fullText);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Loaded **${file.name}** (${pdf.numPages} pages, ${fullText.length.toLocaleString()} characters). Now ask me anything about this document.`,
        },
      ]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Could not read PDF";
      setError(msg);
    } finally {
      setPdfLoading(false);
    }
  }

  function clearPdf() {
    setPdfName(null);
    setPdfText(null);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
          documentContext: pdfText,
        }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({ error: "Stream error" }));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setLoading(false);
      setStreaming(true);
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        acc += chunk;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { ...copy[copy.length - 1], content: acc };
          return copy;
        });
      }

      speakText(acc);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      setMessages(next);
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  }

  const suggestions = [
    "Build me a landing page outline for a bakery",
    "Write a Python script that scrapes prices",
    "Explain transformers like I'm 12",
    "Suggest 5 names for an AI tools studio",
  ];

  return (
    <>
      <Navbar />

      {/* Hero / empty state — radial glow background */}
      {!hasMessages && (
        <div className="relative min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-6">
          {/* Radial glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[800px] h-[600px] rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(circle, rgba(200,168,110,0.18) 0%, rgba(200,168,110,0.06) 40%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative z-10 text-center max-w-3xl w-full">
            <h1 className="font-serif text-5xl md:text-6xl text-[#f5f0e2] mb-4">
              How can we <span className="text-[#c8a86e]">help you today?</span>
            </h1>
            <p className="text-gray-400 mb-12">
              Ask anything · Upload a PDF · Or use your voice
            </p>

            <ChatBar
              input={input}
              setInput={setInput}
              loading={loading}
              streaming={streaming}
              listening={listening}
              voiceOn={voiceOn}
              setVoiceOn={setVoiceOn}
              pdfName={pdfName}
              pdfLoading={pdfLoading}
              clearPdf={clearPdf}
              fileInputRef={fileInputRef}
              textareaRef={textareaRef}
              onSend={send}
              onToggleListening={toggleListening}
              onPdfChange={(file) => handlePdfUpload(file)}
              error={error}
              compact={false}
            />

            <div className="flex flex-wrap gap-2 justify-center mt-8">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="px-4 py-2 text-sm rounded-full border border-[#1f1f2e] bg-[#11111a]/60 text-gray-300 hover:border-[#c8a86e]/40 hover:text-[#c8a86e] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Conversation view */}
      {hasMessages && (
        <div className="max-w-3xl mx-auto px-6 pt-8 pb-40">
          <div ref={scrollRef} className="space-y-8">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-9 h-9 rounded-full bg-[#c8a86e]/15 border border-[#c8a86e]/30 flex items-center justify-center flex-shrink-0">
                    <Bot className="text-[#c8a86e]" size={18} />
                  </div>
                )}
                <div
                  className={`max-w-[85%] px-5 py-3.5 rounded-3xl leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#c8a86e] text-[#0a0a0f]"
                      : "bg-[#11111a]/80 border border-[#1f1f2e] text-gray-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap">
                    {m.content}
                    {streaming && i === messages.length - 1 && m.role === "assistant" && (
                      <span className="inline-block w-2 h-4 bg-[#c8a86e] ml-1 animate-pulse align-text-bottom" />
                    )}
                  </p>
                </div>
                {m.role === "user" && (
                  <div className="w-9 h-9 rounded-full bg-[#1f1f2e] flex items-center justify-center flex-shrink-0">
                    <UserIcon className="text-gray-400" size={18} />
                  </div>
                )}
              </div>
            ))}

            {(loading || pdfLoading) && (
              <div className="flex gap-4 justify-start">
                <div className="w-9 h-9 rounded-full bg-[#c8a86e]/15 border border-[#c8a86e]/30 flex items-center justify-center flex-shrink-0">
                  <Bot className="text-[#c8a86e]" size={18} />
                </div>
                <div className="bg-[#11111a]/80 border border-[#1f1f2e] px-5 py-3.5 rounded-3xl">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Loader2 className="text-[#c8a86e] animate-spin" size={16} />
                    {pdfLoading ? "Reading PDF..." : "Thinking..."}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fixed bottom chat bar when in conversation */}
          <div className="fixed bottom-0 left-0 right-0 z-30 pb-6 pointer-events-none">
            <div className="max-w-3xl mx-auto px-6 pointer-events-auto">
              <div className="absolute inset-x-0 -top-24 h-32 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent pointer-events-none" />
              <ChatBar
                input={input}
                setInput={setInput}
                loading={loading}
                streaming={streaming}
                listening={listening}
                voiceOn={voiceOn}
                setVoiceOn={setVoiceOn}
                pdfName={pdfName}
                pdfLoading={pdfLoading}
                clearPdf={clearPdf}
                fileInputRef={fileInputRef}
                textareaRef={textareaRef}
                onSend={send}
                onToggleListening={toggleListening}
                onPdfChange={(file) => handlePdfUpload(file)}
                error={error}
                compact
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

type BarProps = {
  input: string;
  setInput: (s: string) => void;
  loading: boolean;
  streaming: boolean;
  listening: boolean;
  voiceOn: boolean;
  setVoiceOn: (b: boolean) => void;
  pdfName: string | null;
  pdfLoading: boolean;
  clearPdf: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onSend: () => void;
  onToggleListening: () => void;
  onPdfChange: (file: File) => void;
  error: string | null;
  compact: boolean;
};

function ChatBar({
  input, setInput, loading, streaming, listening, voiceOn, setVoiceOn,
  pdfName, pdfLoading, clearPdf, fileInputRef, textareaRef, onSend, onToggleListening, onPdfChange, error, compact,
}: BarProps) {
  return (
    <div className="relative">
      {/* PDF chip above bar */}
      {pdfName && (
        <div className="mb-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c8a86e]/10 border border-[#c8a86e]/30 text-sm text-[#c8a86e]">
          <FileText size={14} />
          <span className="font-medium truncate max-w-[200px]">{pdfName}</span>
          <button onClick={clearPdf} className="hover:text-white" aria-label="Remove PDF">
            <X size={14} />
          </button>
        </div>
      )}

      {error && (
        <div className="mb-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="relative rounded-3xl border border-[#1f1f2e] bg-[#11111a]/90 backdrop-blur-md shadow-2xl shadow-black/40 overflow-hidden">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onPdfChange(file);
            if (e.target) e.target.value = "";
          }}
          className="hidden"
        />

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder={pdfName ? "Ask about the PDF..." : "Ask anything..."}
          disabled={loading || streaming}
          rows={1}
          className={`block w-full resize-none bg-transparent text-white placeholder:text-gray-500 focus:outline-none disabled:opacity-50 leading-relaxed ${
            compact ? "px-5 pt-3 pb-1 text-base" : "px-6 pt-5 pb-2 text-lg"
          }`}
          style={{ maxHeight: "200px" }}
        />

        <div className={`flex items-center justify-between gap-2 ${compact ? "px-3 pb-3" : "px-4 pb-4"}`}>
          <div className="flex items-center gap-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={pdfLoading}
              title="Upload PDF"
              className="p-2 rounded-full text-gray-400 hover:text-[#c8a86e] hover:bg-[#c8a86e]/10 transition-colors disabled:opacity-50"
              aria-label="Upload PDF"
            >
              <Plus size={18} />
            </button>

            <button
              onClick={onToggleListening}
              disabled={loading || streaming}
              title={listening ? "Stop listening" : "Voice input"}
              className={`p-2 rounded-full transition-colors ${
                listening
                  ? "bg-[#c8a86e]/15 text-[#c8a86e] animate-pulse"
                  : "text-gray-400 hover:text-[#c8a86e] hover:bg-[#c8a86e]/10"
              }`}
              aria-label="Voice input"
            >
              <Mic size={18} />
            </button>

            <button
              onClick={() => {
                setVoiceOn(!voiceOn);
                if (voiceOn && typeof window !== "undefined") window.speechSynthesis?.cancel();
              }}
              title={voiceOn ? "Voice responses ON" : "Voice responses OFF"}
              className={`p-2 rounded-full transition-colors ${
                voiceOn
                  ? "bg-[#c8a86e]/15 text-[#c8a86e]"
                  : "text-gray-400 hover:text-[#c8a86e] hover:bg-[#c8a86e]/10"
              }`}
              aria-label="Toggle voice responses"
            >
              {voiceOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>

          <button
            onClick={onSend}
            disabled={loading || streaming || !input.trim()}
            className="p-2.5 rounded-full bg-[#c8a86e] text-[#0a0a0f] hover:bg-[#a88a4e] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Send"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
