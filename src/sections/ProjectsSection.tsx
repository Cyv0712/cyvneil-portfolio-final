import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import FadeIn from "../components/FadeIn";
import LiveProjectButton from "../components/LiveProjectButton";
import TechLogo from "../components/TechLogo";
import { projects, type Project } from "../data/projects";

const IMAGE_RADIUS = "rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border border-[#D7E2EA]/15";

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function ProjectCard({ project, index, total, progress }: ProjectCardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="h-[85vh] sticky top-24 md:top-32">
      <motion.article
        style={{ scale, top: `${index * 28}px`, transformOrigin: "top center" }}
        className="relative rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 px-2 sm:px-4">
          <div className="flex items-end gap-4 sm:gap-6 md:gap-8 min-w-0">
            <span className="hero-heading font-black leading-none shrink-0" style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1 pb-1 sm:pb-2 min-w-0">
              <span className="text-[#D7E2EA]/60 font-light uppercase tracking-widest text-xs sm:text-sm">
                {project.category}
              </span>
              <h3
                className="text-[#D7E2EA] font-medium uppercase leading-tight"
                style={{ fontSize: "clamp(1.1rem, 2.4vw, 2.2rem)" }}
              >
                {project.title}
              </h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {project.repoUrl && <LiveProjectButton href={project.repoUrl} label="Source Code" compact />}
            <LiveProjectButton href={project.liveUrl} compact />
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="w-[40%] flex flex-col gap-3 sm:gap-4">
            <div
              className={`${IMAGE_RADIUS} bg-[#D7E2EA]/[0.06] p-5 sm:p-7 md:p-9 flex flex-col justify-between gap-3 overflow-hidden`}
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            >
              <p
                className="text-[#D7E2EA]/80 font-light leading-snug line-clamp-3 sm:line-clamp-4"
                style={{ fontSize: "clamp(0.7rem, 1.1vw, 1rem)" }}
              >
                {project.description}
              </p>
              <div className="hidden sm:flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA]/80 px-2.5 py-0.5 text-[10px] md:text-xs uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div
              className={`${IMAGE_RADIUS} bg-[#D7E2EA]/[0.06] p-5 sm:p-6 lg:p-9 flex flex-col gap-3 lg:gap-5`}
              style={{ minHeight: "clamp(160px, 22vw, 340px)" }}
            >
              <span className="text-[#D7E2EA]/60 font-light uppercase tracking-widest text-[10px] sm:text-xs md:text-sm">
                {project.aiNote ?? "AI-assisted"}
              </span>
              <div className="flex flex-col gap-2 lg:gap-3">
                {project.aiTools.map((tool) => (
                  <div key={tool} className="flex items-center gap-2 sm:gap-3 text-[#D7E2EA]">
                    <span className="shrink-0 grid place-items-center w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full border border-[#D7E2EA]/30">
                      <TechLogo name={tool} />
                    </span>
                    <span
                      className="font-medium uppercase tracking-wider leading-tight"
                      style={{ fontSize: "clamp(0.65rem, 1.2vw, 1.05rem)" }}
                    >
                      {tool}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[60%]">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              loading="lazy"
              className={`${IMAGE_RADIUS} w-full h-full object-cover`}
              style={{ objectPosition: project.imagePosition ?? "center top" }}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  return (
    <section
      id="projects"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-10"
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10 sm:mb-14 md:mb-20"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Projects
      </FadeIn>

      <div ref={containerRef} className="max-w-7xl mx-auto">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
