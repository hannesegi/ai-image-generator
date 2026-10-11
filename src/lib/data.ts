// Pre-loaded prompt templates and gallery items

export interface PromptTemplate {
  id: string;
  name: string;
  style: string;
  description: string;
  basePrompt: string;
  qualityBoosters: string[];
  negativePrompt: string;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  prompt: string;
  style: string;
  qualityScore: number;
  gradient: string;
  negativePrompt: string;
  createdAt: string;
  tags: string[];
}

export const STYLE_OPTIONS = [
  "Photorealistic",
  "Anime",
  "Oil Painting",
  "3D Render",
  "Watercolor",
  "Pixel Art",
  "Digital Art",
  "Concept Art",
  "Comic Book",
  "Pencil Sketch",
] as const;

export const promptTemplates: PromptTemplate[] = [
  {
    id: "tpl-001",
    name: "Cinematic Portrait",
    style: "Photorealistic",
    description: "High-end cinematic portrait with dramatic lighting",
    basePrompt:
      "portrait of {subject}, cinematic lighting, shallow depth of field, golden hour, shot on Canon EOS R5, 85mm f/1.4",
    qualityBoosters: [
      "8k resolution",
      "ultra detailed",
      "professional photography",
      "award winning",
      "masterpiece",
    ],
    negativePrompt:
      "blurry, low quality, deformed, disfigured, bad anatomy, extra limbs, watermark, text",
    tags: ["portrait", "cinematic", "photography"],
  },
  {
    id: "tpl-002",
    name: "Anime Character",
    style: "Anime",
    description: "Vibrant anime character illustration in modern style",
    basePrompt:
      "{subject}, anime style, vibrant colors, dynamic pose, detailed eyes, cel shading, clean lineart",
    qualityBoosters: [
      "best quality",
      "highly detailed",
      "masterpiece",
      "vivid colors",
      "sharp focus",
    ],
    negativePrompt:
      "low quality, worst quality, blurry, bad anatomy, extra fingers, mutated hands, poorly drawn",
    tags: ["anime", "character", "illustration"],
  },
  {
    id: "tpl-003",
    name: "Fantasy Landscape",
    style: "Oil Painting",
    description: "Epic fantasy landscape with oil painting texture",
    basePrompt:
      "epic fantasy landscape of {subject}, oil painting style, dramatic sky, volumetric lighting, rich textures, impasto technique",
    qualityBoosters: [
      "museum quality",
      "ultra detailed",
      "4k",
      "trending on artstation",
      "masterwork",
    ],
    negativePrompt:
      "flat colors, digital artifacts, blurry, low resolution, amateur, poorly composed",
    tags: ["landscape", "fantasy", "oil painting"],
  },
  {
    id: "tpl-004",
    name: "Sci-Fi Environment",
    style: "3D Render",
    description: "Futuristic sci-fi environment with volumetric lighting",
    basePrompt:
      "futuristic {subject}, sci-fi environment, volumetric fog, neon accents, octane render, unreal engine 5, ray tracing",
    qualityBoosters: [
      "photorealistic rendering",
      "8k",
      "ultra detailed",
      "cinematic composition",
      "HDR",
    ],
    negativePrompt:
      "low poly, flat shading, noisy, grainy, blurry, artifacts, distorted geometry",
    tags: ["sci-fi", "3d", "environment"],
  },
  {
    id: "tpl-005",
    name: "Botanical Study",
    style: "Watercolor",
    description: "Delicate watercolor botanical illustration",
    basePrompt:
      "watercolor botanical illustration of {subject}, delicate brushstrokes, natural pigments, white background, scientific accuracy",
    qualityBoosters: [
      "museum quality",
      "fine art",
      "highly detailed",
      "elegant",
      "professional illustration",
    ],
    negativePrompt:
      "oversaturated, muddy colors, digital look, harsh edges, messy, sloppy",
    tags: ["botanical", "watercolor", "nature"],
  },
  {
    id: "tpl-006",
    name: "Retro Game Sprite",
    style: "Pixel Art",
    description: "16-bit era inspired pixel art character or scene",
    basePrompt:
      "{subject}, pixel art style, 16-bit era, limited color palette, clean pixels, retro gaming aesthetic, sprite sheet quality",
    qualityBoosters: [
      "crisp pixels",
      "well-defined sprites",
      "classic gaming",
      "nostalgic",
      "polished",
    ],
    negativePrompt:
      "anti-aliased, blurry, modern 3d, realistic, smooth gradients, photographic",
    tags: ["pixel art", "retro", "gaming"],
  },
  {
    id: "tpl-007",
    name: "Dark Fantasy Character",
    style: "Digital Art",
    description: "Dark fantasy character with intricate armor and moody atmosphere",
    basePrompt:
      "dark fantasy {subject}, intricate armor design, moody atmosphere, dramatic shadows, gothic architecture background, mystical energy",
    qualityBoosters: [
      "trending on artstation",
      "ultra detailed",
      "sharp focus",
      "professional digital art",
      "4k",
    ],
    negativePrompt:
      "bright colors, cartoonish, low effort, poorly drawn, bad proportions, amateur",
    tags: ["dark fantasy", "character", "digital art"],
  },
  {
    id: "tpl-008",
    name: "Vehicle Concept",
    style: "Concept Art",
    description: "Sleek vehicle concept design with professional presentation",
    basePrompt:
      "concept art of {subject} vehicle, sleek design, multiple angles, clean presentation, automotive design, studio lighting",
    qualityBoosters: [
      "industrial design",
      "professional concept",
      "highly detailed",
      "sharp rendering",
      "portfolio quality",
    ],
    negativePrompt:
      "rough sketch, messy, low detail, distorted proportions, unrealistic mechanics, blurry",
    tags: ["concept art", "vehicle", "design"],
  },
  {
    id: "tpl-009",
    name: "Superhero Panel",
    style: "Comic Book",
    description: "Dynamic superhero comic book panel with bold colors",
    basePrompt:
      "{subject} superhero, comic book style, bold outlines, dynamic action pose, halftone dots, speech bubble ready, Marvel/DC inspired",
    qualityBoosters: [
      "professional comic art",
      "vivid colors",
      "clean inking",
      "dynamic composition",
      "cover quality",
    ],
    negativePrompt:
      "photorealistic, 3d render, anime, blurry, faded colors, weak linework",
    tags: ["comic book", "superhero", "action"],
  },
  {
    id: "tpl-010",
    name: "Architectural Sketch",
    style: "Pencil Sketch",
    description: "Detailed architectural pencil sketch with precise linework",
    basePrompt:
      "detailed pencil sketch of {subject} architecture, precise linework, cross-hatching, perspective drawing, architectural rendering",
    qualityBoosters: [
      "highly detailed",
      "professional draftsmanship",
      "fine art",
      "museum quality",
      "precise geometry",
    ],
    negativePrompt:
      "colored, digital, blurry, messy, inaccurate perspective, sloppy lines",
    tags: ["architecture", "sketch", "pencil"],
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-001",
    prompt:
      "A majestic dragon perched atop a crystalline mountain peak, scales shimmering with iridescent blues and purples, volumetric clouds swirling below, dramatic sunset lighting, ultra detailed, 8k resolution, trending on artstation",
    style: "Digital Art",
    qualityScore: 0.94,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    negativePrompt:
      "low quality, blurry, bad anatomy, extra limbs, watermark",
    createdAt: "2025-01-15",
    tags: ["dragon", "fantasy", "landscape"],
  },
  {
    id: "gal-002",
    prompt:
      "Cyberpunk street market at night, neon signs in Japanese, rain-slicked pavement reflecting pink and cyan lights, crowded with diverse characters, octane render, cinematic composition, ray tracing",
    style: "3D Render",
    qualityScore: 0.91,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    negativePrompt:
      "flat lighting, empty scene, low detail, distorted text",
    createdAt: "2025-01-18",
    tags: ["cyberpunk", "street", "neon"],
  },
  {
    id: "gal-003",
    prompt:
      "Portrait of an elderly craftsman in his workshop, warm window light illuminating wood shavings in the air, shallow depth of field, shot on Hasselblad, 85mm, f/1.4, golden hour warmth",
    style: "Photorealistic",
    qualityScore: 0.96,
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    negativePrompt:
      "blurry, overexposed, bad composition, watermark, text overlay",
    createdAt: "2025-01-20",
    tags: ["portrait", "craftsman", "warm"],
  },
  {
    id: "gal-004",
    prompt:
      "Magical girl transformation sequence, vibrant sakura petals, flowing ribbons of light, detailed eyes with star reflections, dynamic pose, cel shading, clean lineart, best quality",
    style: "Anime",
    qualityScore: 0.89,
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    negativePrompt:
      "low quality, bad anatomy, extra fingers, poorly drawn face",
    createdAt: "2025-01-22",
    tags: ["anime", "magical girl", "transformation"],
  },
  {
    id: "gal-005",
    prompt:
      "Ancient underwater temple ruins, bioluminescent coral growing on stone pillars, shafts of light penetrating deep blue water, schools of exotic fish, oil painting style, impasto technique, museum quality",
    style: "Oil Painting",
    qualityScore: 0.93,
    gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    negativePrompt:
      "flat colors, digital look, modern elements, blurry, poorly composed",
    createdAt: "2025-01-25",
    tags: ["underwater", "temple", "ruins"],
  },
  {
    id: "gal-006",
    prompt:
      "Retro space station interior, 16-bit pixel art style, detailed control panels with blinking lights, astronaut character sprite, limited color palette, clean pixel edges, nostalgic gaming aesthetic",
    style: "Pixel Art",
    qualityScore: 0.87,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    negativePrompt:
      "anti-aliased, blurry, realistic, 3d render, smooth gradients",
    createdAt: "2025-01-28",
    tags: ["pixel art", "space", "retro"],
  },
  {
    id: "gal-007",
    prompt:
      "Enchanted forest watercolor scene, morning mist between ancient oaks, delicate wildflowers in foreground, soft natural pigments, wet-on-wet technique, ethereal atmosphere, botanical accuracy",
    style: "Watercolor",
    qualityScore: 0.92,
    gradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
    negativePrompt:
      "harsh edges, oversaturated, digital look, muddy colors",
    createdAt: "2025-02-01",
    tags: ["forest", "watercolor", "nature"],
  },
  {
    id: "gal-008",
    prompt:
      "Futuristic mech warrior standing in a desolate battlefield, battle-scarred armor with glowing energy cores, dust and debris particles, dramatic low-angle shot, concept art style, professional rendering",
    style: "Concept Art",
    qualityScore: 0.95,
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    negativePrompt:
      "rough sketch, messy, low detail, amateur, distorted proportions",
    createdAt: "2025-02-05",
    tags: ["mech", "warrior", "concept art"],
  },
];

// In-memory stores for CRUD operations
let templatesStore = [...promptTemplates];
let galleryStore = [...galleryItems];

export function getTemplates() {
  return templatesStore;
}

export function addTemplate(template: Omit<PromptTemplate, "id">) {
  const newTemplate = {
    ...template,
    id: `tpl-${String(templatesStore.length + 1).padStart(3, "0")}`,
  };
  templatesStore.push(newTemplate);
  return newTemplate;
}

export function getGalleryItems() {
  return galleryStore;
}

export function addGalleryItem(item: Omit<GalleryItem, "id">) {
  const newItem = {
    ...item,
    id: `gal-${String(galleryStore.length + 1).padStart(3, "0")}`,
  };
  galleryStore.push(newItem);
  return newItem;
}

export function getStats() {
  const totalPrompts = galleryStore.length;
  const avgScore =
    totalPrompts > 0
      ? galleryStore.reduce((sum, item) => sum + item.qualityScore, 0) /
        totalPrompts
      : 0;

  const styleDistribution: Record<string, number> = {};
  galleryStore.forEach((item) => {
    styleDistribution[item.style] = (styleDistribution[item.style] || 0) + 1;
  });

  const totalTokensEstimate = galleryStore.reduce(
    (sum, item) => sum + Math.round(item.prompt.split(/\s+/).length * 1.3),
    0
  );

  return {
    totalPrompts,
    averageQualityScore: Math.round(avgScore * 100) / 100,
    styleDistribution,
    totalTokensEstimate,
    templatesCount: templatesStore.length,
    topStyles: Object.entries(styleDistribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([style, count]) => ({ style, count })),
  };
}
