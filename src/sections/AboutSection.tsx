import { lazy, Suspense } from "react";
import { MapPin, ExternalLink, Award, BookOpen } from "lucide-react";
import gradPic from "../assets/project-previews/grad_pic.svg";
import { site } from "../data/site";

const TechMatrixCanvas = lazy(() => import("../components/TechMatrixCanvas"));

const CanvasLoader = () => (
  <div className="flex items-center justify-center w-full h-72 font-mono text-[10px] text-cyan-400/50">
    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping mr-2" />
    <span>CONNECTING_CANVAS...</span>
  </div>
);

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 lg:px-24 xl:px-32 z-10">
      <div className="absolute top-12 left-6 md:left-20 w-48 h-48 md:w-64 md:h-64 rounded-full bg-emerald-500/15 blur-[80px] md:blur-[110px] pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="flex flex-col justify-center text-white space-y-7">
          <div className="flex items-center gap-5 md:gap-6">
            <div className="relative w-28 h-28 md:w-36 md:h-36 shrink-0">
              <div className="absolute -inset-[1px] rounded-full bg-gradient-to-br from-cyan-400/40 via-purple-500/25 to-transparent opacity-70" />
              <div className="absolute inset-0 rounded-full overflow-hidden ring-1 ring-white/10 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
                <img
                  src={gradPic}
                  alt={`${site.fullName} graduation portrait`}
                  className="w-full h-full object-cover object-top [filter:brightness(0.96)_saturate(0.92)]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-cyan-400/5 pointer-events-none" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-cyan-400 font-mono tracking-widest text-xs uppercase mb-1 block">
                {site.role}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                {site.name}
              </h2>
              <div className="mt-2 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-transparent w-full" />
              <div className="mt-4 space-y-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold">Academic Foundation</h3>
                </div>
                <h4 className="text-sm font-semibold">{site.education.degree}</h4>
                <p className="text-xs text-gray-400">{site.education.school}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-gray-400 text-xs font-mono tracking-wider">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{site.location}</span>
            </div>
            <span className="text-white/15">|</span>
            <a href={`mailto:${site.email}`} className="hover:text-purple-400 transition-colors">
              {site.email}
            </a>
            <span className="text-white/15">|</span>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>linkedin</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            Computer Engineering graduate and aspiring Full-Stack Developer with a robust technical foundation in the modern Node.js, Express, React, and Vue.js ecosystem. Proficient in architecting both relational (PostgreSQL) and NoSQL (MongoDB) database systems while driving agile workflows, performance tuning, and row-level security constraints.
          </p>

          <p className="text-sm text-gray-400 leading-relaxed border-l border-cyan-400/30 pl-4">
            This portfolio collects the products I&apos;ve shipped, the tools I rely on, and the way I like to build — clear interfaces, dependable systems, and code that stays easy to maintain.
          </p>

          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300">Certifications</span>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li className="flex items-start gap-1">
                  <span className="text-purple-400 mr-1">•</span>
                  <span>Colt Steele: Web Developer Bootcamp 2025</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-purple-400 mr-1">•</span>
                  <span>Google UI/UX Design Professional Certificate</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300">Engineering Philosophy</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-mono italic">
                "I focus on writing clean, straightforward code and building systems that do exactly what they're supposed to. Good software shouldn't be over-engineered—it should be simple, reliable, and easy to maintain."
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <Suspense fallback={<CanvasLoader />}>
            <TechMatrixCanvas />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
