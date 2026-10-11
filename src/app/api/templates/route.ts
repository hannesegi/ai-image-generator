import { getTemplates, addTemplate } from "@/lib/data";
import { NextRequest } from "next/server";

export async function GET() {
  const templates = getTemplates();
  return Response.json(templates);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, style, description, basePrompt, qualityBoosters, negativePrompt, tags } = body;

    if (!name || !style || !basePrompt) {
      return Response.json(
        { error: "name, style, and basePrompt are required." },
        { status: 400 }
      );
    }

    const newTemplate = addTemplate({
      name,
      style,
      description: description || "",
      basePrompt,
      qualityBoosters: qualityBoosters || [],
      negativePrompt: negativePrompt || "",
      tags: tags || [],
    });

    return Response.json(newTemplate, { status: 201 });
  } catch (error) {
    console.error("Templates API error:", error);
    return Response.json(
      { error: "Failed to create template." },
      { status: 500 }
    );
  }
}
