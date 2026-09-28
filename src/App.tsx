import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import CanvasCursor from "./components/CanvasCursor";
import HeroSection from "./sections/HeroSection";
import MarqueeSection from "./sections/MarqueeSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import ProjectsSection from "./sections/ProjectsSection";
import TechStackSection from "./sections/TechStackSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import ContactSection from "./sections/ContactSection";

// Skip the cursor trail on touch, small, or low-power devices and for reduced motion.
function shouldEnableCursorTrail() {
  if (typeof window === "undefined") return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  return !(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth < 768 ||
    nav.connection?.saveData ||
    nav.connection?.effectiveType === "2g" ||
    lowMemory ||
    navigator.hardwareConcurrency <= 4
  );
}

export default function App() {
  const [enableCursorTrail] = useState(shouldEnableCursorTrail);

  return (
    <main className="bg-[#0C0C0C] font-sans" style={{ overflowX: "clip" }}>
      {enableCursorTrail && <CanvasCursor />}
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TechStackSection />
      <TestimonialsSection />
      <ContactSection />
      <Analytics />
    </main>
  );
}
