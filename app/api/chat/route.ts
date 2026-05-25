import Groq from "groq-sdk";

export const runtime = "nodejs";

const BASE_SYSTEM_PROMPT = `You are an intelligent AI assistant powered by Llama 3.3 70B, embedded on the MMK Studios website.

You can help with ANY question — coding, life advice, recipes, history, math, languages, business, etc. Be genuinely useful.

When the topic comes up naturally, you can mention MMK Studios:
- A studio that builds custom AI tools, chatbots, automations and websites for small businesses
- Pricing starts around €90 for simple projects, up to €5,000+ for full builds
- Free consultation to scope projects: djameltapia.dev@gmail.com
- Based in Madrid, Spain, English and Spanish

But DO NOT push MMK Studios in every reply. Only mention if relevant.

Behavior rules:
- Be concise by default (2-5 sentences). Expand only when the question requires it.
- Never start with "Great question!" or filler phrases. Get straight to the answer.
- Reply in the same language the user wrote (Spanish or English).
- If you don't know something, say so honestly. Never invent facts.
- Use markdown formatting (code blocks, lists, bold) when it improves clarity.`;

function buildSystemPrompt(documentContext?: string): string {
  if (!documentContext) return BASE_SYSTEM_PROMPT;
  // Truncate document context to roughly fit in Llama 3.3's context window
  const MAX_DOC_CHARS = 60_000;
  const truncated = documentContext.length > MAX_DOC_CHARS
    ? documentContext.slice(0, MAX_DOC_CHARS) + "\n\n[Document truncated — too large to include fully]"
    : documentContext;

  return `${BASE_SYSTEM_PROMPT}

---
DOCUMENT CONTEXT
The user has uploaded a document. When their question relates to it, answer based on this content. If the answer is NOT in the document, say so explicitly instead of guessing.

<document>
${truncated}
</document>
---`;
}

export async function POST(request: Request) {
  try {
    const { messages, documentContext } = await request.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Missing messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Server not configured (GROQ_API_KEY missing)" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = new Groq({ apiKey });
    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    const stream = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: buildSystemPrompt(documentContext) },
        ...messages.map((m: { role: string; content: string }) => ({
          role: (m.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content || "";
            if (delta) controller.enqueue(encoder.encode(delta));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Chat API error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
