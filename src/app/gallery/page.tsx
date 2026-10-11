"use client";

import { useState } from "react";
import { galleryItems, STYLE_OPTIONS } from "@/lib/data";

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredItems =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.style === filter);

  const selectedItem = galleryItems.find((item) => item.id === selectedId);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function getScoreColor(score: number) {
    if (score >= 0.9) return "text-emerald-400";
    if (score >= 0.7) return "text-yellow-400";
    return "text-red-400";
  }

  const activeStyles = [
    ...new Set(galleryItems.map((item) => item.style)),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Gallery</h1>
        <p className="text-gray-400">
          Curated showcase of optimized prompts with quality scores and gradient
          placeholders representing generated images.
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
          All
        </button>
        {STYLE_OPTIONS.filter((s) => activeStyles.includes(s)).map((style) => (
          <button
            key={style}
            onClick={() => setFilter(style)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === style
                ? "bg-violet-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className="group bg-gray-900 rounded-xl border border-gray-800 hover:border-violet-500/40 overflow-hidden transition-all text-left"
          >
            {/* Gradient placeholder image */}
            <div
              className="w-full aspect-square relative"
              style={{ background: item.gradient }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              {/* Score badge */}
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold bg-black/60 backdrop-blur-sm ${getScoreColor(item.qualityScore)}`}
                >
                  {item.qualityScore.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-xs font-medium">
                  {item.style}
                </span>
                <span className="text-xs text-gray-500">{item.createdAt}</span>
              </div>
              <p className="text-sm text-gray-300 line-clamp-2">
                {item.prompt}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="bg-gray-900 rounded-2xl border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient header */}
            <div
              className="w-full h-48 rounded-t-2xl"
              style={{ background: selectedItem.gradient }}
            />

            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm font-medium">
                    {selectedItem.style}
                  </span>
                  <span
                    className={`text-lg font-bold ${getScoreColor(selectedItem.qualityScore)}`}
                  >
                    {selectedItem.qualityScore.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Prompt */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prompt
                  </span>
                  <button
                    onClick={() => copyToClipboard(selectedItem.prompt)}
                    className="text-xs text-violet-400 hover:text-violet-300"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-gray-200 bg-gray-800 rounded-lg p-4 text-sm leading-relaxed">
                  {selectedItem.prompt}
                </p>
              </div>

              {/* Negative Prompt */}
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Negative Prompt
                </span>
                <p className="mt-2 text-red-300/70 bg-gray-800 rounded-lg p-4 text-sm">
                  {selectedItem.negativePrompt}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {selectedItem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-gray-800 text-gray-400 text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
