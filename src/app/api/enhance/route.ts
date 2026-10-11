import { enhancePrompt } from "@/lib/ai";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, style } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return Response.json(
        { error: "A non-empty prompt is required." },
        { status: 400 }
      );
    }

    if (prompt.length > 2000) {
      return Response.json(
        { error: "Prompt must be under 2000 characters." },
        { status: 400 }
      );
    }

    const result = await enhancePrompt(prompt.trim(), style);

    if (result.isNSFW) {
      return Response.json(
        { error: "Prompt contains inappropriate content and cannot be enhanced." },
        { status: 422 }
      );
    }

    return Response.json(result);
  } catch (error) {
    console.error("Enhance API error:", error);
    return Response.json(
      { error: "Failed to enhance prompt. Please try again." },
      { status: 500 }
    );
  }
}
