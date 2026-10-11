import { getStats, getGalleryItems } from "@/lib/data";

export default function DashboardPage() {
  const stats = getStats();
  const galleryItems = getGalleryItems();

  const maxStyleCount = Math.max(
    ...stats.topStyles.map((s) => s.count),
    1
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Analytics overview of your prompt engineering activity.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Prompts</p>
              <p className="text-2xl font-bold text-white">{stats.totalPrompts}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg Quality Score</p>
              <p className="text-2xl font-bold text-emerald-400">
                {stats.averageQualityScore.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Templates</p>
              <p className="text-2xl font-bold text-white">{stats.templatesCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">Est. Tokens Used</p>
              <p className="text-2xl font-bold text-white">
                {stats.totalTokensEstimate.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Style distribution */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">
            Style Distribution
          </h2>
          <div className="space-y-4">
            {stats.topStyles.map(({ style, count }) => (
              <div key={style}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">{style}</span>
                  <span className="text-sm text-gray-400">{count}</span>
                </div>
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-700"
                    style={{
                      width: `${(count / maxStyleCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality score distribution */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">
            Quality Score Distribution
          </h2>
          <div className="space-y-3">
            {galleryItems
              .sort((a, b) => b.qualityScore - a.qualityScore)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-md flex-shrink-0"
                    style={{ background: item.gradient }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 truncate">
                      {item.prompt.slice(0, 50)}...
                    </p>
                  </div>
                  <span
                    className={`text-sm font-mono font-bold flex-shrink-0 ${
                      item.qualityScore >= 0.9
                        ? "text-emerald-400"
                        : item.qualityScore >= 0.7
                          ? "text-yellow-400"
                          : "text-red-400"
                    }`}
                  >
                    {item.qualityScore.toFixed(2)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-6 bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-6">
          Recent Prompts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-800">
                <th className="pb-3 pr-4">Prompt</th>
                <th className="pb-3 pr-4">Style</th>
                <th className="pb-3 pr-4">Score</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {galleryItems.slice(0, 6).map((item) => (
                <tr key={item.id}>
                  <td className="py-3 pr-4 max-w-xs truncate text-gray-300">
                    {item.prompt.slice(0, 80)}...
                  </td>
                  <td className="py-3 pr-4">
                    <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-xs">
                      {item.style}
                    </span>
                  </td>
                  <td className="py-3 pr-4 font-mono font-bold">
                    <span
                      className={
                        item.qualityScore >= 0.9
                          ? "text-emerald-400"
                          : item.qualityScore >= 0.7
                            ? "text-yellow-400"
                            : "text-red-400"
                      }
                    >
                      {item.qualityScore.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500">{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
