import Link from "next/link";

const features = [
  {
    title: "Prompt Studio",
    description:
      "Transform basic ideas into optimized prompts with AI-powered enhancement, quality scoring, and style classification.",
    href: "/prompt-studio",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Template Library",
    description:
      "Browse pre-built prompt templates across 10 styles — photorealistic, anime, oil painting, 3D render, and more.",
    href: "/templates",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Gallery",
    description:
      "Explore a curated showcase of high-quality prompts with quality scores and style classifications.",
    href: "/gallery",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Dashboard",
    description:
      "Analytics for your prompt engineering — quality scores, style distribution, and usage metrics at a glance.",
    href: "/dashboard",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    gradient: "from-orange-500 to-red-500",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            AI-Powered Prompt Engineering
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            Craft Perfect Prompts with{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              PixelForge AI
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10">
            Generate, refine, and manage optimized prompts for Stable Diffusion,
            DALL-E, and Midjourney. AI-powered quality scoring, style
            classification, and prompt enhancement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/prompt-studio"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
            >
              Open Prompt Studio
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors border border-gray-700"
            >
              Browse Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group relative p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
                <div className="mt-4 text-violet-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Describe Your Idea",
                desc: "Enter a basic prompt describing what you want to generate.",
              },
              {
                step: "2",
                title: "AI Enhancement",
                desc: "Our AI adds quality boosters, style tags, and generates negative prompts.",
              },
              {
                step: "3",
                title: "Use Anywhere",
                desc: "Copy the optimized prompt into Stable Diffusion, DALL-E, or Midjourney.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
