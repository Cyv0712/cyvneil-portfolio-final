import { motion } from "motion/react";
import type { ThemeConfig } from "../data/themes";
import { site } from "../data/site";

interface HeroSectionProps {
  activeTheme: ThemeConfig;
}

export default function HeroSection({ activeTheme }: HeroSectionProps) {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 md:px-8 z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.25rem] sm:text-[3.25rem] md:text-[4.75rem] font-light tracking-[-0.03em] text-white leading-[1.15] md:leading-[1.12]"
        >
          Where pixel-perfect design{" "}
          <br className="hidden sm:block" />
          <span className="block sm:inline">meets clean </span>
          <span className="relative inline-block font-medium transition-all duration-300">
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r transition-all duration-500 font-semibold"
              style={{
                backgroundImage: `linear-gradient(to right, ${activeTheme.gradientFrom}, ${activeTheme.gradientVia}, ${activeTheme.gradientTo})`,
              }}
            >
              engineering
            </span>
            <span className="text-white">.</span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-8 flex flex-col items-center justify-center gap-3"
        >
          <span className="text-[11px] md:text-[13px] font-medium tracking-[0.22em] uppercase text-gray-400 font-sans select-none">
            {site.name} · {site.country}
          </span>
          <span className="text-[11px] md:text-xs font-mono tracking-[0.18em] uppercase text-white/45">
            {site.role}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
