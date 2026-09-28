import { motion } from "motion/react";
import FadeIn from "../components/FadeIn";
import AnimatedText from "../components/AnimatedText";
import ContactButton from "../components/ContactButton";
import { site } from "../data/site";

import javascriptLogo from "../assets/about/javascript.svg";
import postgresqlLogo from "../assets/about/postgresql.svg";
import claudeLogo from "../assets/about/claude.svg";
import geminiLogo from "../assets/about/gemini.svg";

// Tools I work with, floating in the corners. JavaScript/PostgreSQL from Devicon,
// Claude/Gemini marks from Simple Icons with their brand colours applied.
const DECOR = [
  {
    src: javascriptLogo,
    alt: "JavaScript",
    className: "w-[64px] sm:w-[96px] md:w-[130px] top-[6%] left-[3%] sm:left-[4%] md:left-[6%]",
    glow: "rgba(240, 219, 79, 0.35)",
    delay: 0.1,
    x: -80,
    floatDelay: "0s",
  },
  {
    src: postgresqlLogo,
    alt: "PostgreSQL",
    className: "w-[70px] sm:w-[104px] md:w-[140px] bottom-[8%] left-[5%] sm:left-[8%] md:left-[12%]",
    glow: "rgba(51, 103, 145, 0.55)",
    delay: 0.25,
    x: -80,
    floatDelay: "-2s",
  },
  {
    src: claudeLogo,
    alt: "Claude",
    className: "w-[64px] sm:w-[96px] md:w-[130px] top-[6%] right-[3%] sm:right-[4%] md:right-[6%]",
    glow: "rgba(217, 119, 87, 0.4)",
    delay: 0.15,
    x: 80,
    floatDelay: "-1s",
  },
  {
    src: geminiLogo,
    alt: "Gemini",
    className: "w-[70px] sm:w-[104px] md:w-[140px] bottom-[8%] right-[5%] sm:right-[8%] md:right-[12%]",
    glow: "rgba(145, 119, 199, 0.45)",
    delay: 0.3,
    x: 80,
    floatDelay: "-3s",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10 py-20">
      {DECOR.map((d) => (
        // The wrapper stays put so the in-view check fires even when the slide-in
        // start position is off-screen (clipped by the page's overflow-x: clip).
        <motion.div
          key={d.src}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "50px", amount: 0 }}
          className={`about-float absolute pointer-events-none ${d.className}`}
          style={{ animationDelay: d.floatDelay }}
        >
          <motion.img
            src={d.src}
            alt={d.alt}
            loading="lazy"
            variants={{ hidden: { opacity: 0, x: d.x }, shown: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.9, delay: d.delay, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full h-auto"
            style={{ filter: `drop-shadow(0 0 28px ${d.glow})` }}
          />
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            About me
          </FadeIn>
          <AnimatedText
            text={site.about}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
          />
        </div>
        <FadeIn>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
