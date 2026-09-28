import FadeIn from "../components/FadeIn";
import TechLogo from "../components/TechLogo";

const STACK = [
  {
    label: "Languages & Frontend",
    items: ["JavaScript", "HTML5", "CSS3", "React", "Vue.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    label: "Backend & Storage",
    items: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "MySQL", "RESTful APIs"],
  },
  {
    label: "DevOps & Tooling",
    items: ["Git", "Docker", "Hostinger", "Cloudinary", "Vite", "Vercel", "Render", "Resend"],
  },
  {
    label: "AI",
    items: ["Claude", "Gemini", "Cursor", "Claude Design", "Google Stitch"],
  },
];

export default function TechStackSection() {
  return (
    <section className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-24"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Tech Stack
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col gap-12 sm:gap-14">
        {STACK.map((group, gi) => (
          <FadeIn key={group.label} delay={gi * 0.1} className="flex flex-col gap-5 items-center">
            <h3
              className="text-[#D7E2EA] font-medium uppercase tracking-wider"
              style={{ fontSize: "clamp(1rem, 2.2vw, 1.6rem)" }}
            >
              {group.label}
            </h3>
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
              {group.items.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2.5 rounded-full border border-[#D7E2EA]/30 hover:bg-[#D7E2EA]/10 text-[#D7E2EA] px-4 py-2 sm:px-5 sm:py-2.5 transition-colors duration-200"
                >
                  <TechLogo name={tech} />
                  <span className="text-xs sm:text-sm uppercase tracking-wider">{tech}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
