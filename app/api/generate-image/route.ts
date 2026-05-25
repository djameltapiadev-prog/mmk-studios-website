import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const HF_MODEL = "black-forest-labs/FLUX.1-schnell";

const ASPECT_RATIOS: Record<string, { width: number; height: number }> = {
  "1:1": { width: 1024, height: 1024 },
  "16:9": { width: 1344, height: 768 },
  "9:16": { width: 768, height: 1344 },
  "4:3": { width: 1152, height: 896 },
  "3:4": { width: 896, height: 1152 },
};

const NEGATIVE_PROMPT =
  "blurry, low quality, distorted, deformed, watermark, signature, low resolution, ugly, mutated, oversaturated, bad anatomy, extra fingers, plastic skin, fake looking";

async function enhancePrompt(originalPrompt: string): Promise<string> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) return originalPrompt;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: `You are a prompt engineer for image generation models like FLUX and Qwen-Image.
Take the user's short prompt and rewrite it as a detailed, vivid description optimized for AI image generation.

Rules:
- Output ONLY the enhanced prompt, no quotes, no commentary, no explanation
- 50-120 words max
- Add concrete visual details: lighting, camera angle, mood, materials, textures, composition
- Match the style/tone the user implied
- Keep the core subject identical
- Do NOT add unrelated elements

User's prompt: "${originalPrompt}"

Enhanced prompt:`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 300,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const enhanced = response.text?.trim() ?? "";
    return enhanced || originalPrompt;
  } catch (e) {
    console.warn("Prompt enhancement failed, using original:", e);
    return originalPrompt;
  }
}

async function generateOne(token: string, prompt: string, width: number, height: number, seed: number): Promise<string> {
  const hfResponse = await fetch(
    `https://router.huggingface.co/hf-inference/models/${HF_MODEL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "image/png",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          num_inference_steps: 4,
          guidance_scale: 0,
          width,
          height,
          seed,
        },
      }),
    }
  );

  if (!hfResponse.ok) {
    const text = await hfResponse.text();
    throw new Error(`HF API error ${hfResponse.status}: ${text.slice(0, 400)}`);
  }

  const arrayBuffer = await hfResponse.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return `data:image/png;base64,${base64}`;
}

export async function POST(request: Request) {
  try {
    const { prompt, style, aspectRatio = "1:1", enhance = false, count = 1 } = await request.json();
    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Missing prompt" }, { status: 400 });
    }

    const token = process.env.HF_TOKEN;
    if (!token) {
      return Response.json(
        { error: "Server not configured (HF_TOKEN missing)" },
        { status: 500 }
      );
    }

    const dimensions = ASPECT_RATIOS[aspectRatio] || ASPECT_RATIOS["1:1"];

    let basePrompt = prompt.trim();
    if (style && style !== "default") {
      basePrompt = `${basePrompt}. Style: ${style}.`;
    }

    const finalPrompt = enhance ? await enhancePrompt(basePrompt) : basePrompt;

    const n = Math.max(1, Math.min(4, Number(count) || 1));
    const seeds = Array.from({ length: n }, () => Math.floor(Math.random() * 1_000_000));

    const urls = await Promise.all(
      seeds.map((s) => generateOne(token, finalPrompt, dimensions.width, dimensions.height, s))
    );

    return Response.json({
      urls,
      finalPrompt,
      originalPrompt: prompt,
      enhanced: enhance && finalPrompt !== basePrompt,
      model: HF_MODEL,
      dimensions,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Image API error:", msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
