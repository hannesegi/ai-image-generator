export default function ArchitecturePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Architecture</h1>
        <p className="text-gray-400">
          System architecture and data flow diagram for PixelForge AI.
        </p>
      </div>

      {/* Architecture Diagram - SVG */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-10 overflow-x-auto">
        <svg viewBox="0 0 900 600" className="w-full min-w-[700px]" xmlns="http://www.w3.org/2000/svg">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1f2937" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="violetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
            <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>
          <rect width="900" height="600" fill="#030712" />
          <rect width="900" height="600" fill="url(#grid)" />

          {/* Title */}
          <text x="450" y="35" textAnchor="middle" fill="#f9fafb" fontSize="18" fontWeight="bold" fontFamily="system-ui">
            PixelForge AI — System Architecture
          </text>

          {/* Client Layer */}
          <rect x="30" y="60" width="840" height="120" rx="12" fill="#1f2937" fillOpacity="0.5" stroke="#374151" strokeWidth="1" />
          <text x="50" y="82" fill="#9ca3af" fontSize="11" fontFamily="system-ui" fontWeight="600">CLIENT (BROWSER)</text>

          {/* Client boxes */}
          <rect x="50" y="95" width="150" height="65" rx="8" fill="url(#violetGrad)" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="125" y="122" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="600" fontFamily="system-ui">Prompt Studio</text>
          <text x="125" y="140" textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="system-ui">Input + Enhance</text>

          <rect x="220" y="95" width="150" height="65" rx="8" fill="url(#cyanGrad)" fillOpacity="0.15" stroke="#06b6d4" strokeWidth="1.5" />
          <text x="295" y="122" textAnchor="middle" fill="#67e8f9" fontSize="12" fontWeight="600" fontFamily="system-ui">Template Library</text>
          <text x="295" y="140" textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="system-ui">Browse + Copy</text>

          <rect x="390" y="95" width="150" height="65" rx="8" fill="url(#emeraldGrad)" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.5" />
          <text x="465" y="122" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="600" fontFamily="system-ui">Gallery</text>
          <text x="465" y="140" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="system-ui">Showcase + Detail</text>

          <rect x="560" y="95" width="150" height="65" rx="8" fill="url(#orangeGrad)" fillOpacity="0.15" stroke="#f97316" strokeWidth="1.5" />
          <text x="635" y="122" textAnchor="middle" fill="#fdba74" fontSize="12" fontWeight="600" fontFamily="system-ui">Dashboard</text>
          <text x="635" y="140" textAnchor="middle" fill="#fb923c" fontSize="10" fontFamily="system-ui">Analytics</text>

          <rect x="730" y="95" width="120" height="65" rx="8" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
          <text x="790" y="122" textAnchor="middle" fill="#d1d5db" fontSize="12" fontWeight="600" fontFamily="system-ui">Architecture</text>
          <text x="790" y="140" textAnchor="middle" fill="#9ca3af" fontSize="10" fontFamily="system-ui">Diagram</text>

          {/* Arrows from client to API */}
          <line x1="125" y1="160" x2="125" y2="230" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrowViolet)" />
          <line x1="295" y1="160" x2="295" y2="230" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan)" />
          <line x1="465" y1="160" x2="465" y2="230" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowEmerald)" />
          <line x1="635" y1="160" x2="635" y2="230" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />

          {/* Arrow markers */}
          <defs>
            <marker id="arrowViolet" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" />
            </marker>
            <marker id="arrowCyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
            </marker>
            <marker id="arrowEmerald" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
            <marker id="arrowOrange" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
            </marker>
            <marker id="arrowGray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7280" />
            </marker>
          </defs>

          {/* API Layer */}
          <rect x="30" y="230" width="840" height="110" rx="12" fill="#1f2937" fillOpacity="0.5" stroke="#374151" strokeWidth="1" />
          <text x="50" y="252" fill="#9ca3af" fontSize="11" fontFamily="system-ui" fontWeight="600">NEXT.JS API ROUTES (SERVER)</text>

          <rect x="50" y="265" width="170" height="55" rx="8" fill="#1e1b4b" fillOpacity="0.5" stroke="#6366f1" strokeWidth="1.5" />
          <text x="135" y="288" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="600" fontFamily="system-ui">POST /api/enhance</text>
          <text x="135" y="305" textAnchor="middle" fill="#818cf8" fontSize="9" fontFamily="system-ui">Prompt Enhancement</text>

          <rect x="240" y="265" width="170" height="55" rx="8" fill="#164e63" fillOpacity="0.3" stroke="#0891b2" strokeWidth="1.5" />
          <text x="325" y="288" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="600" fontFamily="system-ui">GET/POST /api/templates</text>
          <text x="325" y="305" textAnchor="middle" fill="#22d3ee" fontSize="9" fontFamily="system-ui">CRUD Templates</text>

          <rect x="430" y="265" width="170" height="55" rx="8" fill="#064e3b" fillOpacity="0.3" stroke="#059669" strokeWidth="1.5" />
          <text x="515" y="288" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="600" fontFamily="system-ui">GET/POST /api/gallery</text>
          <text x="515" y="305" textAnchor="middle" fill="#34d399" fontSize="9" fontFamily="system-ui">CRUD Gallery Items</text>

          <rect x="620" y="265" width="170" height="55" rx="8" fill="#7c2d12" fillOpacity="0.3" stroke="#ea580c" strokeWidth="1.5" />
          <text x="705" y="288" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="600" fontFamily="system-ui">GET /api/stats</text>
          <text x="705" y="305" textAnchor="middle" fill="#fb923c" fontSize="9" fontFamily="system-ui">Analytics</text>

          {/* Arrows to services */}
          <line x1="135" y1="320" x2="135" y2="400" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowViolet)" />
          <line x1="135" y1="320" x2="450" y2="400" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" markerEnd="url(#arrowGray)" />

          {/* Services Layer */}
          <rect x="30" y="400" width="840" height="100" rx="12" fill="#1f2937" fillOpacity="0.5" stroke="#374151" strokeWidth="1" />
          <text x="50" y="422" fill="#9ca3af" fontSize="11" fontFamily="system-ui" fontWeight="600">AI SERVICES</text>

          {/* Jev AI */}
          <rect x="50" y="435" width="200" height="50" rx="8" fill="#4c1d95" fillOpacity="0.3" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="150" y="457" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="700" fontFamily="system-ui">Jev AI Engine</text>
          <text x="150" y="473" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="system-ui">Score + Classify + NSFW</text>

          {/* OpenRouter */}
          <rect x="350" y="435" width="230" height="50" rx="8" fill="#0c4a6e" fillOpacity="0.3" stroke="#0284c7" strokeWidth="1.5" />
          <text x="465" y="457" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="700" fontFamily="system-ui">OpenRouter API</text>
          <text x="465" y="473" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="system-ui">qwen/qwen3-coder:free</text>

          {/* Data Store */}
          <rect x="670" y="435" width="180" height="50" rx="8" fill="#1c1917" fillOpacity="0.5" stroke="#78716c" strokeWidth="1.5" />
          <text x="760" y="457" textAnchor="middle" fill="#d6d3d1" fontSize="12" fontWeight="700" fontFamily="system-ui">In-Memory Store</text>
          <text x="760" y="473" textAnchor="middle" fill="#a8a29e" fontSize="9" fontFamily="system-ui">Templates + Gallery</text>

          {/* Arrows from API to data store */}
          <line x1="325" y1="320" x2="760" y2="435" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" markerEnd="url(#arrowGray)" />
          <line x1="515" y1="320" x2="760" y2="435" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" markerEnd="url(#arrowGray)" />
          <line x1="705" y1="320" x2="760" y2="435" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" markerEnd="url(#arrowGray)" />

          {/* Legend */}
          <rect x="30" y="520" width="840" height="70" rx="12" fill="#1f2937" fillOpacity="0.3" stroke="#374151" strokeWidth="1" />
          <text x="50" y="545" fill="#9ca3af" fontSize="11" fontFamily="system-ui" fontWeight="600">FLOW</text>
          <line x1="90" y1="560" x2="130" y2="560" stroke="#8b5cf6" strokeWidth="2" />
          <text x="140" y="564" fill="#d1d5db" fontSize="10" fontFamily="system-ui">Data flow</text>
          <line x1="220" y1="560" x2="260" y2="560" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,4" />
          <text x="270" y="564" fill="#d1d5db" fontSize="10" fontFamily="system-ui">Storage access</text>

          <text x="420" y="545" fill="#9ca3af" fontSize="11" fontFamily="system-ui" fontWeight="600">DEMO MODE</text>
          <text x="420" y="564" fill="#d1d5db" fontSize="10" fontFamily="system-ui">Works offline with heuristic scoring and deterministic prompt enhancement</text>
        </svg>
      </div>

      {/* Tech stack details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Tech Stack</h2>
          <ul className="space-y-3">
            {[
              { label: "Framework", value: "Next.js 16 (App Router)" },
              { label: "Language", value: "TypeScript" },
              { label: "Styling", value: "Tailwind CSS v4" },
              { label: "AI (Enhancement)", value: "OpenRouter (qwen3-coder:free)" },
              { label: "AI (Scoring)", value: "Jev AI Engine (heuristic)" },
              { label: "Storage", value: "In-memory (server-side)" },
            ].map((item) => (
              <li
                key={item.label}
                className="flex items-start gap-3 text-sm"
              >
                <span className="text-gray-500 w-32 flex-shrink-0">
                  {item.label}
                </span>
                <span className="text-gray-300">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            API Endpoints
          </h2>
          <ul className="space-y-3">
            {[
              {
                method: "POST",
                path: "/api/enhance",
                desc: "Enhance a basic prompt with AI",
              },
              {
                method: "GET",
                path: "/api/templates",
                desc: "List all prompt templates",
              },
              {
                method: "POST",
                path: "/api/templates",
                desc: "Create a new template",
              },
              {
                method: "GET",
                path: "/api/gallery",
                desc: "List gallery items",
              },
              {
                method: "POST",
                path: "/api/gallery",
                desc: "Add a gallery item",
              },
              {
                method: "GET",
                path: "/api/stats",
                desc: "Analytics and stats",
              },
            ].map((endpoint) => (
              <li key={`${endpoint.method}-${endpoint.path}`} className="flex items-start gap-2 text-sm">
                <span
                  className={`px-1.5 py-0.5 rounded text-xs font-mono font-bold flex-shrink-0 ${
                    endpoint.method === "POST"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {endpoint.method}
                </span>
                <code className="text-gray-300 font-mono text-xs">
                  {endpoint.path}
                </code>
                <span className="text-gray-500">— {endpoint.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
