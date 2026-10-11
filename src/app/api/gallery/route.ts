import { getGalleryItems, addGalleryItem } from "@/lib/data";
import { NextRequest } from "next/server";

export async function GET() {
  const items = getGalleryItems();
  return Response.json(items);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, style, qualityScore, gradient, negativePrompt, tags } = body;

    if (!prompt || !style) {
      return Response.json(
        { error: "prompt and style are required." },
        { status: 400 }
      );
    }

    const gradients = [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
      "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    ];

    const newItem = addGalleryItem({
      prompt,
      style,
      qualityScore: qualityScore || 0.8,
      gradient: gradient || gradients[Math.floor(Math.random() * gradients.length)],
      negativePrompt: negativePrompt || "",
      createdAt: new Date().toISOString().split("T")[0],
      tags: tags || [],
    });

    return Response.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Gallery API error:", error);
    return Response.json(
      { error: "Failed to create gallery item." },
      { status: 500 }
    );
  }
}
