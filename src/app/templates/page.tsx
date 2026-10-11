"use client";

import { useState } from "react";
import { promptTemplates, STYLE_OPTIONS } from "@/lib/data";
import type { PromptTemplate } from "@/lib/data";

export default function TemplatesPage() {
  const [filter, setFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const filteredTemplates =
    filter === "All"
      ? promptTemplates
      : promptTemplates.filter((t) => t.style === filter);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  function buildFullPrompt(template: PromptTemplate): string {
    return `${template.basePrompt}, ${template.qualityBoosters.join(", ")}`;
  }

  const styleColors: Record<string, string> = {
    Photorealistic: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    Anime: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    "Oil Painting": "bg-orange-500/20 text-orange-300 border-orange-500/30",
    "3D Render": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    Watercolor: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    "Pixel Art": "bg-green-500/20 text-green-300 border-green-500/30",
    "Digital Art": "bg-violet-500/20 text-violet-300 border-violet-500/30",
    "Concept Art": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Comic Book": "bg-red-500/20 text-red-300 border-red-500/30",
    "Pencil Sketch": "bg-gray-500/20 text-gray-300 border-gray-500/30",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Template Library</h1>
        <p className="text-gray-400">
          Pre-built prompt templates across {STYLE_OPTIONS.length} styles. Click
          a template to expand and copy.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter("All")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filter === "All"
              ? "bg-violet-600 text-white"
              : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          All ({promptTemplates.length})
        </button>
        {STYLE_OPTIONS.map((style) => {
          const count = promptTemplates.filter((t) => t.style === style).length;
          if (count === 0) return null;
          return (
            <button
              key={style}
              onClick={() => setFilter(style)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === style
                  ? "bg-violet-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {style} ({count})
            </button>
          );
        })}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map((template) => {
          const isExpanded = expandedId === template.id;
          return (
            <div
              key={template.id}
              className="bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition-all overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedId(isExpanded ? null : template.id)
                }
                className="w-full p-5 text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {template.name}
                      </h3>
                      <span
                        className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium border ${styleColors[template.style] || "bg-gray-500/20 text-gray-300"}`}
                      >
                        {template.style}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {template.description}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 mt-1 ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-4 border-t border-gray-800 pt-4">
                  {/* Base Prompt */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Base Prompt
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            buildFullPrompt(template),
                            `full-${template.id}`
                          )
                        }
                        className="text-xs text-violet-400 hover:text-violet-300"
                      >
                        {copied === `full-${template.id}`
                          ? "Copied!"
                          : "Copy Full Prompt"}
                      </button>
                    </div>
                    <p className="text-sm text-gray-300 bg-gray-800 rounded-lg p-3">
                      {template.basePrompt}
                    </p>
                  </div>

                  {/* Quality Boosters */}
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quality Boosters
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {template.qualityBoosters.map((booster) => (
                        <span
                          key={booster}
                          className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-xs"
                        >
                          {booster}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Negative Prompt */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Negative Prompt
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            template.negativePrompt,
                            `neg-${template.id}`
                          )
                        }
                        className="text-xs text-violet-400 hover:text-violet-300"
                      >
                        {copied === `neg-${template.id}`
                          ? "Copied!"
                          : "Copy"}
                      </button>
                    </div>
                    <p className="text-sm text-red-300/70 bg-gray-800 rounded-lg p-3">
                      {template.negativePrompt}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-gray-800 text-gray-400 text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
