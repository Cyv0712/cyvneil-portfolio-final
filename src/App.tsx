import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import CanvasCursor from "./components/CanvasCursor";
import ScrollPrompt from "./components/ScrollPrompt";
import SocialDock from "./components/SocialDock";
import StarfieldCanvas, { type StarfieldConfig } from "./components/StarfieldCanvas";
import StarfieldControls from "./components/StarfieldControls";
import IntroLoader from "./sections/IntroLoader";
import HeroSection from "./sections/HeroSection";
import { THEME_PRESETS, type ThemeConfig } from "./data/themes";
import { getPerformanceProfile, type PerformanceProfile } from "./hooks/usePerformanceProfile";

// Lazy-load below-fold sections and heavy canvases. Keep Hero, IntroLoader,
// Starfield, cursor, and chrome eager for a snappy first paint.
const AboutSection = lazy(() => import("./sections/AboutSection"));
const TechStackSection = lazy(() => import("./sections/TechStackSection"));
const MyJourneyTimeline = lazy(() => import("./components/MyJourneyTimeline"));
const TechProjectsSection = lazy(() => import("./components/TechProjectsSection"));
const TestimonialsSection = lazy(() => import("./sections/TestimonialsSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));

const SectionLoader = () => (
  <div className="flex items-center justify-center w-full min-h-[40vh] font-mono text-[10px] text-purple-400/50">
    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping mr-2" />
    <span>LOADING_SECTION...</span>
  </div>
);

export default function App() {
  const [performanceProfile] = useState<PerformanceProfile>(() => getPerformanceProfile());

  const [activeTheme, setActiveTheme] = useState<ThemeConfig>(THEME_PRESETS[0]);
  const [starfieldConfig, setStarfieldConfig] = useState<StarfieldConfig>(() => ({
    starCount: performanceProfile.defaultStarCount,
    twinkleSpeedFactor: 1,
    parallaxStrength: performanceProfile.defaultParallaxStrength,
    shootingStarRate: performanceProfile.defaultShootingStarRate,
  }));
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const mouseCoords = useRef({ x: 0, y: 0 });
  const easedCoords = useRef({ x: 0, y: 0 });

  const [initialLoading, setInitialLoading] = useState(true);
  const [loaderActive, setLoaderActive] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let shutterTimer: ReturnType<typeof setTimeout> | undefined;
    let unlockTimer: ReturnType<typeof setTimeout> | undefined;
    let fontWaitTimer: ReturnType<typeof setTimeout> | undefined;

    const unlockSite = () => {
      if (cancelled) return;
      setLoaderActive(false);
      setInitialLoading(false);
      document.body.style.overflow = "";
    };

    const startShutterSequence = () => {
      if (cancelled) return;

      const shutterMs = performanceProfile.useShortIntro ? 1000 : 2200;
      const unlockMs = performanceProfile.useShortIntro ? 2000 : 4500;

      shutterTimer = setTimeout(() => {
        if (cancelled) return;
        setLoaderActive(false);
      }, shutterMs);

      unlockTimer = setTimeout(unlockSite, unlockMs);
    };

    document.body.style.overflow = "hidden";

    if (performanceProfile.prefersReducedMotion) {
      shutterTimer = setTimeout(() => {
        if (cancelled) return;
        setLoaderActive(false);
      }, 300);
      unlockTimer = setTimeout(unlockSite, 500);
      const failsafeTimer = setTimeout(unlockSite, 6000);
      return () => {
        cancelled = true;
        clearTimeout(shutterTimer);
        clearTimeout(unlockTimer);
        clearTimeout(failsafeTimer);
        document.body.style.overflow = "";
      };
    }

    const FONT_WAIT_MS = 1200;
    let fontsSettled = false;
    const beginAfterFonts = () => {
      if (cancelled || fontsSettled) return;
      fontsSettled = true;
      startShutterSequence();
    };

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(beginAfterFonts).catch(beginAfterFonts);
    } else {
      beginAfterFonts();
    }
    fontWaitTimer = setTimeout(beginAfterFonts, FONT_WAIT_MS);

    const failsafeTimer = setTimeout(unlockSite, 6000);

    return () => {
      cancelled = true;
      clearTimeout(shutterTimer);
      clearTimeout(unlockTimer);
      clearTimeout(fontWaitTimer);
      clearTimeout(failsafeTimer);
      document.body.style.overflow = "";
    };
  }, [performanceProfile.prefersReducedMotion, performanceProfile.useShortIntro]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setHasInteracted(true);
      const width = window.innerWidth;
      const height = window.innerHeight;
      mouseCoords.current = {
        x: (e.clientX - width / 2) / (width / 2),
        y: (e.clientY - height / 2) / (height / 2),
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        setHasInteracted(true);
        const width = window.innerWidth;
        const height = window.innerHeight;
        mouseCoords.current = {
          x: (e.touches[0].clientX - width / 2) / (width / 2),
          y: (e.touches[0].clientY - height / 2) / (height / 2),
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleResetDefaults = () => {
    setActiveTheme(THEME_PRESETS[0]);
    setStarfieldConfig({
      starCount: performanceProfile.defaultStarCount,
      twinkleSpeedFactor: 1,
      parallaxStrength: performanceProfile.defaultParallaxStrength,
      shootingStarRate: performanceProfile.defaultShootingStarRate,
    });
  };

  const currentHeight = typeof window !== "undefined" ? window.innerHeight : 800;

  return (
    <div
      className={`relative w-full min-h-screen overflow-y-auto overflow-x-hidden font-sans select-none scroll-smooth bg-black ${
        performanceProfile.isLowPower ? "low-power-visuals" : ""
      }`}
      style={{ backgroundColor: activeTheme.bgEnd }}
    >
      <IntroLoader initialLoading={initialLoading} loaderActive={loaderActive} />

      <StarfieldCanvas
        activeTheme={activeTheme}
        config={starfieldConfig}
        loaderActive={loaderActive}
        isLowPower={performanceProfile.isLowPower}
        maxCanvasDpr={performanceProfile.maxCanvasDpr}
        mouseCoords={mouseCoords}
        easedCoords={easedCoords}
      />

      {performanceProfile.enableCursorTrail && <CanvasCursor />}

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)] pointer-events-none z-[3]" />

      <ScrollPrompt hasInteracted={hasInteracted} currentHeight={currentHeight} />

      <HeroSection activeTheme={activeTheme} />

      {!loaderActive && (
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
      )}

      {!loaderActive && (
        <Suspense fallback={<SectionLoader />}>
          <TechStackSection />
        </Suspense>
      )}

      {!loaderActive && (
        <Suspense fallback={<SectionLoader />}>
          <MyJourneyTimeline />
        </Suspense>
      )}

      {!loaderActive && (
        <Suspense fallback={<SectionLoader />}>
          <TechProjectsSection />
        </Suspense>
      )}

      {!loaderActive && (
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
      )}

      {!loaderActive && (
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      )}

      <StarfieldControls
        showConfig={showConfig}
        onToggleConfig={() => setShowConfig((prev) => !prev)}
        activeTheme={activeTheme}
        onThemeChange={setActiveTheme}
        config={starfieldConfig}
        onConfigChange={(patch) => setStarfieldConfig((prev) => ({ ...prev, ...patch }))}
        onResetDefaults={handleResetDefaults}
      />

      <SocialDock />

      <Analytics />
    </div>
  );
}
