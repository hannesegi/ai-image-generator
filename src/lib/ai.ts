// AI service layer — handles prompt enhancement, quality scoring, and NSFW detection.
// Works in demo mode when API keys are missing.

const DEMO_MODE =
  !process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === "";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL || "qwen/qwen3-coder:free";

// --- Quality scoring (Jev AI stub / demo) ---

export function scoreQuality(prompt: string): number {
  // Heuristic scoring based on prompt characteristics
  let score = 0.5;

  // Length bonus (longer, more descriptive prompts tend to be better)
  const wordCount = prompt.split(/\s+/).length;
  if (wordCount > 10) score += 0.05;
  if (wordCount > 20) score += 0.05;
  if (wordCount > 30) score += 0.05;
  if (wordCount > 50) score += 0.05;

  // Quality keywords bonus
  const qualityKeywords = [
    "detailed",
    "ultra",
    "8k",
    "4k",
    "masterpiece",
    "professional",
    "high quality",
    "sharp",
    "cinematic",
    "dramatic",
    "volumetric",
    "ray tracing",
    "octane",
    "unreal engine",
    "trending",
    "artstation",
    "award",
    "museum",
    "hdr",
    "resolution",
  ];
  const lowerPrompt = prompt.toLowerCase();
  const matchCount = qualityKeywords.filter((kw) =>
    lowerPrompt.includes(kw)
  ).length;
  score += Math.min(matchCount * 0.03, 0.2);

  // Style specificity bonus
  const styleKeywords = [
    "lighting",
    "composition",
    "depth of field",
    "bokeh",
    "f/1.4",
    "f/2.8",
    "golden hour",
    "blue hour",
    "backlit",
    "rim light",
    "studio light",
    "natural light",
  ];
  const styleMatchCount = styleKeywords.filter((kw) =>
    lowerPrompt.includes(kw)
  ).length;
  score += Math.min(styleMatchCount * 0.02, 0.1);

  // Clamp to 0-1 range
  return Math.round(Math.min(Math.max(score, 0), 1) * 100) / 100;
}

// --- Style classification ---

export function classifyStyle(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  const styleIndicators: Record<string, string[]> = {
    Photorealistic: [
      "photograph",
      "photo",
      "camera",
      "canon",
      "nikon",
      "sony",
      "hasselblad",
      "lens",
      "f/",
      "dslr",
      "realistic",
      "photorealistic",
    ],
    Anime: [
      "anime",
      "manga",
      "cel shading",
      "cel-shading",
      "lineart",
      "kawaii",
      "chibi",
      "magical girl",
    ],
    "Oil Painting": [
      "oil painting",
      "impasto",
      "canvas",
      "brushstroke",
      "traditional art",
      "fine art",
      "oil on canvas",
    ],
    "3D Render": [
      "3d",
      "render",
      "octane",
      "unreal engine",
      "blender",
      "c4d",
      "ray tracing",
      "vray",
    ],
    Watercolor: [
      "watercolor",
      "watercolour",
      "wet-on-wet",
      "pigment",
      "aquarelle",
    ],
    "Pixel Art": [
      "pixel art",
      "pixel",
      "16-bit",
      "8-bit",
      "retro",
      "sprite",
      "gameboy",
    ],
    "Digital Art": [
      "digital art",
      "digital painting",
      "digital illustration",
      "cg",
      "cgi",
    ],
    "Concept Art": [
      "concept art",
      "concept design",
      "industrial design",
      "vehicle design",
    ],
    "Comic Book": [
      "comic",
      "halftone",
      "bold outline",
      "speech bubble",
      "graphic novel",
      "marvel",
      "dc",
    ],
    "Pencil Sketch": [
      "pencil",
      "sketch",
      "drawing",
      "cross-hatching",
      "graphite",
      "charcoal",
    ],
  };

  let bestStyle = "Digital Art";
  let bestScore = 0;

  for (const [style, keywords] of Object.entries(styleIndicators)) {
    const matchCount = keywords.filter((kw) => lowerPrompt.includes(kw)).length;
    if (matchCount > bestScore) {
      bestScore = matchCount;
      bestStyle = style;
    }
  }

  return bestStyle;
}

// --- NSFW detection ---

export function detectNSFW(prompt: string): boolean {
  const nsfwKeywords = [
    "nsfw",
    "nude",
    "naked",
    "explicit",
    "pornographic",
    "sexual",
    "erotic",
    "xxx",
    "hentai",
    "lewd",
  ];
  const lowerPrompt = prompt.toLowerCase();
  return nsfwKeywords.some((kw) => lowerPrompt.includes(kw));
}

// --- Prompt enhancement via OpenRouter ---

async function callOpenRouter(systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://pixelforge-ai.vercel.app",
      "X-Title": "PixelForge AI",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} — ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";
  // Strip any <think>...</think> blocks that some models include
  return content.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}

export async function enhancePrompt(
  basicPrompt: string,
  style?: string
): Promise<{
  enhancedPrompt: string;
  negativePrompt: string;
  qualityScore: number;
  style: string;
  isNSFW: boolean;
  demoMode: boolean;
}> {
  const detectedStyle = style || classifyStyle(basicPrompt);
  const isNSFW = detectNSFW(basicPrompt);

  if (isNSFW) {
    return {
      enhancedPrompt: "",
      negativePrompt: "",
      qualityScore: 0,
      style: detectedStyle,
      isNSFW: true,
      demoMode: DEMO_MODE,
    };
  }

  if (DEMO_MODE) {
    // Demo mode: generate a deterministic enhanced prompt
    const enhancedPrompt = generateDemoEnhancement(basicPrompt, detectedStyle);
    const negativePrompt = generateDemoNegativePrompt(detectedStyle);
    const qualityScore = scoreQuality(enhancedPrompt);

    return {
      enhancedPrompt,
      negativePrompt,
      qualityScore,
      style: detectedStyle,
      isNSFW: false,
      demoMode: true,
    };
  }

  // Live mode: use OpenRouter
  try {
    const systemPrompt = `You are an expert AI image prompt engineer. Your job is to take a basic idea and expand it into a detailed, high-quality prompt optimized for AI image generation (Stable Diffusion, DALL-E, Midjourney).

Rules:
1. Output ONLY the enhanced prompt text, nothing else — no labels, no explanations, no markdown.
2. Add specific details: lighting, composition, camera angle, atmosphere, textures, colors.
3. Include quality boosters appropriate for the style.
4. Keep the core idea intact while making it more vivid and detailed.
5. Target style: ${detectedStyle}
6. Keep it under 100 words.`;

    const enhancedPrompt = await callOpenRouter(systemPrompt, basicPrompt);

    const negSystemPrompt = `You are an expert at writing negative prompts for AI image generation. Given an image prompt, generate a concise negative prompt listing things to avoid. Output ONLY the negative prompt text — no labels, no explanations. Keep it under 40 words.`;

    const negativePrompt = await callOpenRouter(
      negSystemPrompt,
      `Generate a negative prompt for this image prompt: "${enhancedPrompt}"`
    );

    const qualityScore = scoreQuality(enhancedPrompt);

    return {
      enhancedPrompt,
      negativePrompt,
      qualityScore,
      style: detectedStyle,
      isNSFW: false,
      demoMode: false,
    };
  } catch (error) {
    console.error("OpenRouter API error, falling back to demo mode:", error);
    const enhancedPrompt = generateDemoEnhancement(basicPrompt, detectedStyle);
    const negativePrompt = generateDemoNegativePrompt(detectedStyle);
    const qualityScore = scoreQuality(enhancedPrompt);

    return {
      enhancedPrompt,
      negativePrompt,
      qualityScore,
      style: detectedStyle,
      isNSFW: false,
      demoMode: true,
    };
  }
}

// --- Demo mode helpers ---

function generateDemoEnhancement(prompt: string, style: string): string {
  const styleEnhancements: Record<string, string> = {
    Photorealistic:
      ", cinematic lighting, shallow depth of field, shot on Canon EOS R5, 85mm f/1.4, golden hour, ultra detailed, 8k resolution, professional photography, award-winning composition",
    Anime:
      ", anime style, vibrant colors, dynamic pose, detailed eyes with reflections, cel shading, clean lineart, best quality, highly detailed, masterpiece, vivid color palette",
    "Oil Painting":
      ", oil painting style, rich impasto technique, dramatic chiaroscuro lighting, canvas texture visible, museum quality, masterwork, ultra detailed brushstrokes, classical composition",
    "3D Render":
      ", octane render, unreal engine 5, volumetric lighting, ray tracing, photorealistic materials, HDR, 8k resolution, cinematic composition, studio lighting setup",
    Watercolor:
      ", watercolor technique, delicate washes, soft natural pigments, wet-on-wet blending, white paper showing through, botanical accuracy, museum quality, ethereal atmosphere",
    "Pixel Art":
      ", pixel art style, 16-bit era aesthetic, limited color palette, clean crisp pixels, retro gaming feel, well-defined sprites, nostalgic, polished pixel work",
    "Digital Art":
      ", digital painting, trending on artstation, ultra detailed, sharp focus, professional digital art, vibrant lighting, 4k resolution, masterpiece quality",
    "Concept Art":
      ", concept art style, professional presentation, multiple viewing angles implied, clean rendering, industrial design quality, portfolio-ready, highly detailed, sharp focus",
    "Comic Book":
      ", comic book style, bold outlines, dynamic composition, halftone dot shading, vivid saturated colors, professional inking, cover art quality, dramatic perspective",
    "Pencil Sketch":
      ", detailed pencil drawing, precise cross-hatching, tonal gradation, graphite on textured paper, architectural precision, fine art quality, museum-grade draftsmanship",
  };

  const enhancement = styleEnhancements[style] || styleEnhancements["Digital Art"];
  return prompt.trim() + enhancement;
}

function generateDemoNegativePrompt(style: string): string {
  const negatives: Record<string, string> = {
    Photorealistic:
      "blurry, low quality, deformed, disfigured, bad anatomy, extra limbs, watermark, text, oversaturated, underexposed",
    Anime:
      "low quality, worst quality, blurry, bad anatomy, extra fingers, mutated hands, poorly drawn face, deformed, ugly",
    "Oil Painting":
      "flat colors, digital artifacts, blurry, low resolution, amateur, poorly composed, modern elements, photographic",
    "3D Render":
      "low poly, flat shading, noisy, grainy, blurry, artifacts, distorted geometry, wireframe visible, untextured",
    Watercolor:
      "harsh edges, oversaturated, digital look, muddy colors, sloppy, messy, thick paint, opaque washes",
    "Pixel Art":
      "anti-aliased, blurry, modern 3d, realistic, smooth gradients, photographic, high resolution, vector art",
    "Digital Art":
      "low quality, blurry, bad anatomy, extra limbs, watermark, text, deformed, amateur, poorly drawn",
    "Concept Art":
      "rough sketch, messy, low detail, amateur, distorted proportions, unrealistic mechanics, blurry, unfinished",
    "Comic Book":
      "photorealistic, 3d render, anime style, blurry, faded colors, weak linework, inconsistent style, sketchy",
    "Pencil Sketch":
      "colored, digital, blurry, messy, inaccurate perspective, sloppy lines, smudged, low contrast, faded",
  };

  return negatives[style] || negatives["Digital Art"];
}
