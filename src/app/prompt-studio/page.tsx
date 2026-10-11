"use client";

import { useState } from "react";
import { STYLE_OPTIONS } from "@/lib/data";

interface EnhanceResult {
  enhancedPrompt: string;
  negativePrompt: string;
  qualityScore: number;
  style: string;
  isNSFW: boolean;
  demoMode: boolean;
}

export default function PromptStudioPage() {
  const [basicPrompt, setBasicPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [result, setResult] = useState<EnhanceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  async function handleEnhance() {
    if (!basicPrompt.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: basicPrompt,
          style: selectedStyle || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to enhance prompt");
      }

      const data: EnhanceResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  function getScoreColor(score: number) {
    if (score >= 0.9) return "text-emerald-400";
    if (score >= 0.7) return "text-yellow-400";
    return "text-red-400";
  }

  function getScoreBar(score: number) {
    if (score >= 0.9) return "bg-emerald-500";
    if (score >= 0.7) return "bg-yellow-500";
    return "bg-red-500";
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Prompt Studio</h1>
        <p className="text-gray-400">
          Enter a basic idea and let AI transform it into an optimized image
          generation prompt.
        </p>
      </div>

      {/* Input section */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-8">
        <label
          htmlFor="prompt-input"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Your Basic Idea
        </label>
        <textarea
          id="prompt-input"
          value={basicPrompt}
          onChange={(e) => setBasicPrompt(e.target.value)}
          placeholder="e.g., a cat sitting on a windowsill at sunset"
          className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
          maxLength={2000}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">
            {basicPrompt.length}/2000 characters
          </span>
        </div>

        <div className="mt-4">
          <label
            htmlFor="style-select"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Style (optional — auto-detected if left empty)
          </label>
          <select
            id="style-select"
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="w-full sm:w-64 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 appearance-none"
          >
            <option value="">Auto-detect</option>
            {STYLE_OPTIONS.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleEnhance}
          disabled={loading || !basicPrompt.trim()}
          className="mt-6 px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Enhancing...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
              Enhance Prompt
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 rounded-lg bg-red-900/30 border border-red-800 text-red-300">
          {error}
        </div>
      )}

      {/* Result section */}
      {result && (
        <div className="space-y-6">
          {/* Before / After */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  Before — Basic Prompt
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{basicPrompt}</p>
            </div>

            {/* After */}
            <div className="bg-gray-900 rounded-xl border border-violet-500/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                    After — Enhanced Prompt
                  </h3>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(result.enhancedPrompt, "enhanced")
                  }
                  className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"
                >
                  {copied === "enhanced" ? "Copied!" : "Copy"}
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-white leading-relaxed">
                {result.enhancedPrompt}
              </p>
            </div>
          </div>

          {/* Negative Prompt */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Negative Prompt
              </h3>
              <button
                onClick={() =>
                  copyToClipboard(result.negativePrompt, "negative")
                }
                className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"
              >
                {copied === "negative" ? "Copied!" : "Copy"}
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                  />
                </svg>
              </button>
            </div>
            <p className="text-red-300/80 leading-relaxed">
              {result.negativePrompt}
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Quality Score */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
              <h4 className="text-sm text-gray-400 mb-2">Quality Score</h4>
              <div className="flex items-end gap-2 mb-2">
                <span
                  className={`text-3xl font-bold ${getScoreColor(result.qualityScore)}`}
                >
                  {result.qualityScore.toFixed(2)}
                </span>
                <span className="text-gray-500 text-sm mb-1">/1.00</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${getScoreBar(result.qualityScore)} transition-all duration-500`}
                  style={{ width: `${result.qualityScore * 100}%` }}
                />
              </div>
            </div>

            {/* Style */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
              <h4 className="text-sm text-gray-400 mb-2">Detected Style</h4>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm font-medium">
                {result.style}
              </span>
            </div>

            {/* Mode */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
              <h4 className="text-sm text-gray-400 mb-2">Mode</h4>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  result.demoMode
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-emerald-500/20 text-emerald-300"
                }`}
              >
                {result.demoMode ? "Demo (Offline)" : "Live AI"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
