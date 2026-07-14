import { lazy, Suspense } from "react";
import { Cpu, Server, Wrench } from "lucide-react";
import TechLogo from "../components/TechLogo";

const TechOrbitRingCanvas = lazy(() => import("../components/TechOrbitRingCanvas"));

const CanvasLoader = () => (
  <div className="flex items-center justify-center w-full h-72 font-mono text-[10px] text-cyan-400/50">
    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping mr-2" />
    <span>CONNECTING_CANVAS...</span>
  </div>
);

export default function TechStackSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 lg:px-24 xl:px-32 z-10 bg-transparent">
      <div className="absolute bottom-12 right-6 md:right-20 w-48 h-48 md:w-64 md:h-64 rounded-full bg-cyan-500/10 blur-[85px] md:blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 flex flex-col items-start text-left text-white space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Tech Stack
            </h2>
            <p className="text-sm text-gray-400 font-sans tracking-wide">
              These are the languages, frameworks, databases, and DevOps tools that I leverage to build robust scale-ready software.
            </p>
            <div className="h-[2px] bg-gradient-to-r from-purple-500 via-cyan-400 to-transparent w-full md:w-2/3" />
          </div>

          <div className="space-y-6 w-full">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-semibold text-[#f43f5e]/90 font-mono uppercase tracking-widest block">
                  Languages & Frontend
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["JavaScript", "HTML5", "CSS3", "React", "Vue.js", "Tailwind CSS", "Bootstrap"].map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2.5 px-3 py-1.5 bg-white/[0.01] hover:bg-rose-500/10 border border-white/[0.08] hover:border-[#f43f5e]/40 text-gray-300 hover:text-white rounded-xl transition-all duration-300 cursor-default shadow"
                  >
                    <div className="p-1 rounded-md border border-white/[0.08] bg-white/[0.04]">
                      <TechLogo name={tech} />
                    </div>
                    <span className="text-[11.5px] font-mono tracking-wide border-l border-white/10 pl-2 py-0.5">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-purple-400" />
                <span className="text-[11px] font-semibold text-amber-500 font-mono uppercase tracking-widest block">
                  Backend & Storage
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["Node.js", "Express.js", "PostgreSQL", "MongoDB", "MySQL", "RESTful APIs"].map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2.5 px-3 py-1.5 bg-white/[0.01] hover:bg-amber-500/10 border border-white/[0.08] hover:border-amber-500/40 text-gray-300 hover:text-white rounded-xl transition-all duration-300 cursor-default shadow"
                  >
                    <div className="p-1 rounded-md border border-white/[0.08] bg-white/[0.04]">
                      <TechLogo name={tech} />
                    </div>
                    <span className="text-[11.5px] font-mono tracking-wide border-l border-white/10 pl-2 py-0.5">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-semibold text-yellow-500 font-mono uppercase tracking-widest block">
                  DevOps & Tooling
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["Git", "Docker", "Hostinger", "Cloudinary", "Vite", "Vercel", "Render", "Figma", "Resend", "jsPDF"].map(
                  (tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2.5 px-3 py-1.5 bg-white/[0.01] hover:bg-yellow-500/10 border border-white/[0.08] hover:border-yellow-500/40 text-gray-300 hover:text-white rounded-xl transition-all duration-300 cursor-default shadow"
                    >
                      <div className="p-1 rounded-md border border-white/[0.08] bg-white/[0.04]">
                        <TechLogo name={tech} />
                      </div>
                      <span className="text-[11.5px] font-mono tracking-wide border-l border-white/10 pl-2 py-0.5">{tech}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center items-center order-last lg:order-none">
          <Suspense fallback={<CanvasLoader />}>
            <TechOrbitRingCanvas />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
