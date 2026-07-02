import { useState, useEffect, useRef, RefObject, FormEvent, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, RotateCcw, Stars, MapPin, Github, Linkedin, Facebook, ChevronDown, ExternalLink, Calendar, Award, BookOpen, Cpu, Server, Wrench, Mail, Send, Check, Copy } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import TechLogo from "./components/TechLogo";
import StarCursorTrail from "./components/StarCursorTrail";

// Lazily load heavy canvas and section components for performance optimization
const TechMatrixCanvas = lazy(() => import("./components/TechMatrixCanvas"));
const TechOrbitRingCanvas = lazy(() => import("./components/TechOrbitRingCanvas"));
const MyJourneyTimeline = lazy(() => import("./components/MyJourneyTimeline"));
const TechProjectsSection = lazy(() => import("./components/TechProjectsSection"));

const CanvasLoader = () => (
  <div className="flex items-center justify-center w-full h-72 font-mono text-[10px] text-cyan-400/50">
    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping mr-2" />
    <span>CONNECTING_CANVAS...</span>
  </div>
);

const SectionLoader = () => (
  <div className="flex items-center justify-center w-full min-h-[40vh] font-mono text-[10px] text-purple-400/50">
    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping mr-2" />
    <span>LOADING_SECTION...</span>
  </div>
);

// --- Design Theme Presets ---
interface ThemeConfig {
  id: string;
  name: string;
  bgStart: string;
  bgEnd: string;
  glowColor: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  starColors: string[];
}

const THEME_PRESETS: ThemeConfig[] = [
  {
    id: "cosmic-abyss",
    name: "Cosmic Abyss (Original)",
    bgStart: "#030303",
    bgEnd: "#000000",
    glowColor: "rgba(99, 102, 241, 0.08)",
    gradientFrom: "#a855f7", // Purple
    gradientVia: "#6366f1",  // Indigo
    gradientTo: "#3b82f6",   // Blue
    starColors: ["#ffffff", "#e0e7ff", "#f3e8ff", "#bae6fd"],
  },
  {
    id: "cyan-aurora",
    name: "Cyan Aurora",
    bgStart: "#02080f",
    bgEnd: "#000000",
    glowColor: "rgba(14, 165, 233, 0.09)",
    gradientFrom: "#22d3ee", // Cyan
    gradientVia: "#06b6d4",
    gradientTo: "#2563eb",   // Cobalt
    starColors: ["#ffffff", "#ecfeff", "#e0f2fe", "#99f6e4"],
  },
  {
    id: "stellar-nebula",
    name: "Stellar Nebula",
    bgStart: "#08040a",
    bgEnd: "#000000",
    glowColor: "rgba(236, 72, 153, 0.07)",
    gradientFrom: "#ec4899", // Pink
    gradientVia: "#8b5cf6",  // Violet
    gradientTo: "#ef4444",   // Red-Orange
    starColors: ["#ffffff", "#fce7f3", "#f5f3ff", "#fef3c7"],
  },
  {
    id: "monochrome-pure",
    name: "Silver Halide",
    bgStart: "#050505",
    bgEnd: "#000000",
    glowColor: "rgba(255, 255, 255, 0.04)",
    gradientFrom: "#ffffff",
    gradientVia: "#a3a3a3",
    gradientTo: "#525252",
    starColors: ["#ffffff", "#f5f5f5", "#e5e5e5"],
  }
];

// --- Royalty-Free Default Background Video Presets ---
interface VideoPreset {
  id: string;
  name: string;
  url: string;
  description: string;
}

const VIDEO_PRESETS: VideoPreset[] = [
  {
    id: "kling-vimeo",
    name: "Kling AI Video (Default)",
    url: "https://player.vimeo.com/video/1203015100?badge=0&autopause=0&player_id=0&app_id=58479",
    description: "Your custom Kling AI background video directly streamed from Vimeo",
  },
  {
    id: "space-nebula",
    name: "Abyssal Space Clouds",
    url: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4",
    description: "Serene magenta/blue space clouds slowly floating",
  },
  {
    id: "hyperspace",
    name: "Hyperspace Jump",
    url: "https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-star-field-in-space-44685-large.mp4",
    description: "Fast-forward starry cosmic travel effect",
  },
  {
    id: "deep-rift",
    name: "Deep Nebula Rift",
    url: "https://assets.mixkit.co/videos/preview/mixkit-nebula-in-deep-space-41584-large.mp4",
    description: "Stunning active red interstellar dust clusters",
  }
];

const DEFAULT_VIMEO_URL = VIDEO_PRESETS[0].url;
const LIGHTWEIGHT_VIDEO_URL = VIDEO_PRESETS[1].url;

interface PerformanceProfile {
  isLowPower: boolean;
  prefersReducedMotion: boolean;
  saveData: boolean;
  isCoarsePointer: boolean;
  maxCanvasDpr: number;
  defaultStarCount: number;
  defaultParallaxStrength: number;
  defaultShootingStarRate: number;
  defaultVideoUrl: string;
  defaultVideoId: string;
  disableAutoplayVideo: boolean;
  enableCursorTrail: boolean;
}

const getPerformanceProfile = (): PerformanceProfile => {
  if (typeof window === "undefined") {
    return {
      isLowPower: false,
      prefersReducedMotion: false,
      saveData: false,
      isCoarsePointer: false,
      maxCanvasDpr: 2,
      defaultStarCount: 250,
      defaultParallaxStrength: 15,
      defaultShootingStarRate: 45,
      defaultVideoUrl: DEFAULT_VIMEO_URL,
      defaultVideoId: "kling-vimeo",
      disableAutoplayVideo: false,
      enableCursorTrail: true,
    };
  }

  const nav = navigator as Navigator & {
    connection?: {
      saveData?: boolean;
      effectiveType?: string;
    };
    deviceMemory?: number;
  };
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const saveData = Boolean(nav.connection?.saveData);
  const slowConnection = /2g/.test(nav.connection?.effectiveType ?? "");
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const lowCoreCount = navigator.hardwareConcurrency <= 4;
  const narrowViewport = window.innerWidth < 768;
  const isLowPower = prefersReducedMotion || saveData || slowConnection || isCoarsePointer || lowMemory || lowCoreCount || narrowViewport;

  return {
    isLowPower,
    prefersReducedMotion,
    saveData,
    isCoarsePointer,
    maxCanvasDpr: isLowPower ? 1.25 : 1.75,
    defaultStarCount: isLowPower ? 120 : 250,
    defaultParallaxStrength: isLowPower ? 8 : 15,
    defaultShootingStarRate: isLowPower ? 75 : 45,
    defaultVideoUrl: isLowPower ? LIGHTWEIGHT_VIDEO_URL : DEFAULT_VIMEO_URL,
    defaultVideoId: isLowPower ? "space-nebula" : "kling-vimeo",
    disableAutoplayVideo: prefersReducedMotion || saveData,
    enableCursorTrail: !isLowPower,
  };
};

// --- Embed / Video Link Utilities ---
const isIframeUrl = (url: string) => {
  return url.includes("vimeo.com") || url.includes("youtube.com") || url.includes("<iframe") || url.includes("player.");
};

const getEmbedUrl = (input: string) => {
  let src = input;
  if (input.includes("<iframe")) {
    const match = input.match(/src="([^"]+)"/);
    if (match && match[1]) {
      src = match[1];
    }
  }

  // Clean and optimize Vimeo iframe src with background attributes
  if (src.includes("player.vimeo.com") && !src.includes("background=1")) {
    const separator = src.includes("?") ? "&" : "?";
    src = `${src}${separator}background=1&autoplay=1&loop=1&muted=1&byline=0&portrait=0&title=0`;
  }
  return src;
};

interface BackgroundVideoProps {
  loadVideo: boolean;
  videoUrl: string;
  videoBlur: number;
  videoOpacity: number;
  loaderActive: boolean;
  videoSpeed: number;
  videoRef: RefObject<HTMLVideoElement | null>;
  setVideoLoading: (loading: boolean) => void;
  setVideoError: (error: string | null) => void;
}

const BackgroundVideo = ({
  loadVideo,
  videoUrl,
  videoBlur,
  videoOpacity,
  loaderActive,
  videoSpeed,
  videoRef,
  setVideoLoading,
  setVideoError
}: BackgroundVideoProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const scrollY = window.scrollY;
      const currentHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
      const scrollFactor = Math.max(0, 1 - scrollY / (currentHeight || 800));
      el.style.opacity = scrollFactor.toString();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {loadVideo && videoUrl && (
        <div
          ref={containerRef}
          className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-[2]"
          style={{
            filter: videoBlur > 0 ? `blur(${videoBlur}px)` : "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaderActive ? 0 : videoOpacity }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            {isIframeUrl(videoUrl) ? (
              <iframe
                src={getEmbedUrl(videoUrl)}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                loading="eager"
                className="absolute pointer-events-none"
                style={{
                  width: '100vw',
                  height: '56.25vw',
                  minHeight: '100vh',
                  minWidth: '177.77vh',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -46%) scale(1.12)',
                }}
                title="Kling Generative background video player"
                onLoad={() => setVideoLoading(false)}
              />
            ) : (
              <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadStart={() => setVideoLoading(true)}
                onCanPlay={() => {
                  setVideoLoading(false);
                  if (videoRef.current) {
                    videoRef.current.playbackRate = videoSpeed;
                  }
                }}
                onError={() => {
                  setVideoLoading(false);
                  setVideoError("Unable to stream this video file. Ensure it is a direct MP4/WebM URL.");
                }}
                className="w-full h-full object-cover scale-[1.10] origin-top"
              />
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

interface ScrollPromptProps {
  hasInteracted: boolean;
  currentHeight: number;
}

const ScrollPrompt = ({ hasInteracted, currentHeight }: ScrollPromptProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (window.scrollY >= 100) {
      setIsVisible(false);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY >= 100) {
        setIsVisible((prev) => (prev ? false : prev));
      } else {
        setIsVisible((prev) => (!prev ? true : prev));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {!hasInteracted && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-2 opacity-50 transition-all duration-700 z-[4]">
          <span className="text-[10px] font-mono tracking-[0.25em] text-white uppercase">Move mouse to explore space parallax</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-white/40 to-transparent animate-bounce" />
        </div>
      )}

      {/* Elegant bouncing chevron inviting the user to scroll to next section */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[15] flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:opacity-100 opacity-65"
        onClick={() => window.scrollTo({ top: currentHeight, behavior: "smooth" })}
      >
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-gray-300">EXPLORE PORTFOLIO</span>
        <ChevronDown className="w-4 h-4 text-purple-400 animate-bounce" />
      </div>
    </>
  );
};

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  phase: number;
  twinkleSpeed: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  dx: number;
  dy: number;
  alpha: number;
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [performanceProfile] = useState<PerformanceProfile>(() => getPerformanceProfile());

  // --- Configuration State ---
  const [activeTheme, setActiveTheme] = useState<ThemeConfig>(THEME_PRESETS[0]);
  const [starCount, setStarCount] = useState<number>(performanceProfile.defaultStarCount);
  const [twinkleSpeedFactor, setTwinkleSpeedFactor] = useState<number>(1);
  const [parallaxStrength, setParallaxStrength] = useState<number>(performanceProfile.defaultParallaxStrength);
  const [shootingStarRate, setShootingStarRate] = useState<number>(performanceProfile.defaultShootingStarRate); // lower is more frequent, 0 is disabled
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showConfig, setShowConfig] = useState<boolean>(false);

  // --- Custom Video Overrides ---
  const [videoUrl, setVideoUrl] = useState<string>(performanceProfile.defaultVideoUrl);
  const [activeVideoId, setActiveVideoId] = useState<string>(performanceProfile.defaultVideoId);
  const [videoOpacity, setVideoOpacity] = useState<number>(performanceProfile.isLowPower ? 0.05 : 0.10);
  const [videoBlur, setVideoBlur] = useState<number>(0);
  const [videoSpeed, setVideoSpeed] = useState<number>(1.0);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  // --- Mouse Parallax Tracker ---
  const mouseCoords = useRef({ x: 0, y: 0 });
  const easedCoords = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);
  const easedScrollY = useRef(0);
  const [portfolioTab, setPortfolioTab] = useState<"experience" | "projects" | "education">("experience");

  // --- Contact Section State ---
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // --- Immersive Custom Initial Loader States ---
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loaderActive, setLoaderActive] = useState<boolean>(true);
  const [loadVideo, setLoadVideo] = useState<boolean>(() => !performanceProfile.disableAutoplayVideo);

  useEffect(() => {
    // 1. Force stateful scroll lock on body during intro loader sequences
    document.body.style.overflow = "hidden";

    // 2. Clear loader state after brief read time
    const timer = setTimeout(() => {
      setLoaderActive(false);
    }, 2200);

    // 3. Complete initial loader and unlock core page flow
    const finalTimer = setTimeout(() => {
      setInitialLoading(false);
      setLoadVideo(!performanceProfile.disableAutoplayVideo);
      document.body.style.overflow = "";
    }, 4500);

    return () => {
      clearTimeout(timer);
      clearTimeout(finalTimer);
      document.body.style.overflow = "";
    };
  }, [performanceProfile.disableAutoplayVideo]);



  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setHasInteracted(true);
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Get normalized coordinates (-1 to 1) based on screen center
      const normX = (e.clientX - width / 2) / (width / 2);
      const normY = (e.clientY - height / 2) / (height / 2);
      mouseCoords.current = { x: normX, y: normY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        setHasInteracted(true);
        const width = window.innerWidth;
        const height = window.innerHeight;
        const normX = (e.touches[0].clientX - width / 2) / (width / 2);
        const normY = (e.touches[0].clientY - height / 2) / (height / 2);
        mouseCoords.current = { x: normX, y: normY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // --- Handle Video Playback Rate Updates ---
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [videoSpeed, videoUrl, activeVideoId]);

  // --- Starfield Initialization & Loop ---
  useEffect(() => {
    if (loaderActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let shootingStar: ShootingStar | null = null;
    let width = 0;
    let height = 0;

    const initStars = (w: number, h: number) => {
      const arr: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        const sizeRand = Math.random();
        let size = 0.5;
        if (sizeRand > 0.95) size = 2.4;       // A few extra bright close stars
        else if (sizeRand > 0.8) size = 1.6;   // Medium stars
        else if (sizeRand > 0.4) size = 1.0;   // Normal stars

        arr.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size,
          baseAlpha: 0.15 + Math.random() * 0.7,
          alpha: 0.2 + Math.random() * 0.8,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.008 + Math.random() * 0.02,
          color: activeTheme.starColors[Math.floor(Math.random() * activeTheme.starColors.length)],
        });
      }
      stars = arr;
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, performanceProfile.maxCanvasDpr);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initStars(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    // Fallback to direct resize if needed
    window.addEventListener("resize", handleResize);
    resizeObserver.observe(canvas.parentElement || document.body);
    handleResize();

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      const nextHeroNearViewport = !performanceProfile.isLowPower || window.scrollY < window.innerHeight * 1.25;
      if (nextHeroNearViewport !== isHeroNearViewport) {
        isHeroNearViewport = nextHeroNearViewport;
        if (isHeroNearViewport) {
          scheduleRender();
        } else {
          cancelAnimationFrame(animationFrameId);
          isFrameScheduled = false;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const spawnShootingStar = () => {
      const startFromLeft = Math.random() > 0.5;
      const x = startFromLeft ? 0 : Math.random() * width;
      const y = Math.random() * (height * 0.4);
      const angle = (Math.PI / 12) + Math.random() * (Math.PI / 6); // Slanted downward trajectory
      const speed = 12 + Math.random() * 12;
      const length = 40 + Math.random() * 80;

      shootingStar = {
        x,
        y,
        length,
        speed,
        dx: Math.cos(angle) * speed * (startFromLeft ? 1 : -1),
        dy: Math.sin(angle) * speed,
        alpha: 1.0,
      };
    };

    // Main Canvas Render Loop running at native display refresh rate for buttery scroll parallax sync.
    let isPageVisible = !document.hidden;
    let isHeroNearViewport = !performanceProfile.isLowPower || window.scrollY < window.innerHeight * 1.25;
    let isFrameScheduled = false;

    const render = () => {
      isFrameScheduled = false;
      if (!isPageVisible || !isHeroNearViewport) return; // Pause when hidden, and below the hero on low-power devices

      // Clear dark cosmos background
      ctx.fillStyle = activeTheme.bgStart;
      ctx.fillRect(0, 0, width, height);

      // Simple radial glow from center / mouse helper gradient
      const gradientX = width / 2 + easedCoords.current.x * (width / 4);
      const gradientY = height / 2 + easedCoords.current.y * (height / 4);
      const bgGlow = ctx.createRadialGradient(
        gradientX,
        gradientY,
        50,
        gradientX,
        gradientY,
        Math.min(width, height) * 0.7
      );
      bgGlow.addColorStop(0, activeTheme.glowColor);
      bgGlow.addColorStop(1, "transparent");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Smooth coordinate interpolation for buttery interactive parallax drift
      easedCoords.current.x += (mouseCoords.current.x - easedCoords.current.x) * 0.08;
      easedCoords.current.y += (mouseCoords.current.y - easedCoords.current.y) * 0.08;
      easedScrollY.current += (scrollYRef.current - easedScrollY.current) * 0.08;

      // Draw all stars with relative parallax layers (deep space layer moves slower, near moves faster)
      stars.forEach((star) => {
        // Star Twinkle Sine effect
        star.phase += star.twinkleSpeed * twinkleSpeedFactor;
        const sineVal = Math.sin(star.phase);
        star.alpha = Math.max(0.1, star.baseAlpha + sineVal * 0.35);

        // Calculate offset based on star size (representing depth distance layers)
        const depthFactor = star.size * 0.8;
        const driftX = easedCoords.current.x * parallaxStrength * depthFactor;
        const driftY = easedCoords.current.y * parallaxStrength * depthFactor;
        const scrollDriftY = -easedScrollY.current * 0.35 * depthFactor;

        // Apply wrapping coordinates if they float off-canvas due to high parallax drift
        let renderX = (star.x + driftX) % width;
        let renderY = (star.y + driftY + scrollDriftY) % height;
        if (renderX < 0) renderX += width;
        if (renderY < 0) renderY = (renderY % height) + height;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        // Circle drawing for realistic fuzzy stellar balls
        ctx.arc(renderX, renderY, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn or animate shooting stars
      ctx.globalAlpha = 1.0;
      if (shootingStarRate > 0 && !shootingStar && Math.random() < 1 / (60 * shootingStarRate)) {
        spawnShootingStar();
      }

      if (shootingStar) {
        // Draw trailing path
        const tailX = shootingStar.x - (shootingStar.dx * 2.5);
        const tailY = shootingStar.y - (shootingStar.dy * 2.5);

        const starGrad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          tailX,
          tailY
        );
        starGrad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
        starGrad.addColorStop(0.3, "rgba(224, 231, 255, 0.8)");
        starGrad.addColorStop(1.0, "rgba(255, 255, 255, 0.0)");

        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Update shooting star movement
        shootingStar.x += shootingStar.dx;
        shootingStar.y += shootingStar.dy;
        shootingStar.alpha -= 0.02;

        // Clean up when leaving bounds
        if (
          shootingStar.alpha <= 0 ||
          shootingStar.x < -100 ||
          shootingStar.x > width + 100 ||
          shootingStar.y > height + 100
        ) {
          shootingStar = null;
        }
      }

      ctx.globalAlpha = 1.0;
      scheduleRender();
    };

    const scheduleRender = () => {
      if (isFrameScheduled || !isPageVisible || !isHeroNearViewport) return;
      isFrameScheduled = true;
      animationFrameId = requestAnimationFrame(render);
    };

    // Pause the canvas loop when the browser tab is hidden to save GPU/CPU
    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        scheduleRender();
      } else {
        cancelAnimationFrame(animationFrameId);
        isFrameScheduled = false;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    scheduleRender();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [starCount, twinkleSpeedFactor, parallaxStrength, shootingStarRate, activeTheme, loaderActive, performanceProfile.isLowPower, performanceProfile.maxCanvasDpr]);

  // --- Reset to original custom portfolio defaults ---
  const handleResetDefaults = () => {
    setActiveTheme(THEME_PRESETS[0]);
    setStarCount(performanceProfile.defaultStarCount);
    setTwinkleSpeedFactor(1);
    setParallaxStrength(performanceProfile.defaultParallaxStrength);
    setShootingStarRate(performanceProfile.defaultShootingStarRate);
    setVideoUrl(performanceProfile.defaultVideoUrl);
    setActiveVideoId(performanceProfile.defaultVideoId);
    setVideoOpacity(performanceProfile.isLowPower ? 0.05 : 0.10);
    setVideoBlur(0);
    setVideoSpeed(1.0);
    setVideoError(null);
    setLoadVideo(!performanceProfile.disableAutoplayVideo);
  };

  // --- Fast helper to assign video presets ---
  const selectVideoPreset = (preset: VideoPreset) => {
    setVideoError(null);
    setVideoLoading(true);
    setActiveVideoId(preset.id);
    setVideoUrl(preset.url);
    setLoadVideo(true);
  };

  const handleCustomVideoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const url = data.get("url") as string;
    if (url.trim()) {
      setVideoError(null);
      setVideoLoading(true);
      setActiveVideoId("custom");
      setVideoUrl(url.trim());
      setLoadVideo(true);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("cyvenriquez1@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
      return;
    }

    setFormStatus("sending");

    // Simulate telemetry server submission delay
    setTimeout(() => {
      setFormStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  const currentHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  return (
    <div
      className={`relative w-full min-h-screen overflow-y-auto overflow-x-hidden font-sans select-none scroll-smooth bg-black ${performanceProfile.isLowPower ? "low-power-visuals" : ""}`}
      style={{ backgroundColor: activeTheme.bgEnd }}
    >
      {/* 🚀 Immersive Initial Custom Screen-Shutter & Name Loader */}
      <AnimatePresence>
        {initialLoading && (
          <motion.div
            key="global-initial-loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 w-full h-full z-[9999] overflow-hidden flex items-center justify-center bg-transparent"
          >
            {/* The grid of 7 vertical black rectangular shutters covering the viewport */}
            <div className="absolute inset-0 grid grid-cols-7 w-full h-full gap-0 pointer-events-none z-10 font-display">
              {Array.from({ length: 7 }).map((_, index) => {
                const panelDelay = index * 0.16; // 160ms stagger per rectangle creates a spectacular sweeping curtain effect

                return (
                  <div key={index} className="relative w-full h-full overflow-hidden">
                    <div
                      className={`loader-shutter flex items-center justify-center ${!loaderActive ? "exit" : ""}`}
                      style={{
                        transitionDelay: `${panelDelay}s`
                      }}
                    >
                      <div
                        className="absolute top-0 h-full flex items-center justify-center select-none px-6"
                        style={{
                          width: "100vw",
                          left: `${index * (-100 / 7)}vw`
                        }}
                      >
                        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7">
                          {Array.from("CYVNEIL").map((letter, letterIndex) => {
                            const letterDelay = letterIndex * 0.16;

                            return (
                              <span
                                key={letterIndex}
                                className="inline-block text-[clamp(3.75rem,12vw,9rem)] font-bold leading-none text-white drop-shadow-[0_15px_45px_rgba(0,0,0,0.6)] loader-letter"
                                style={{
                                  animationDelay: `${letterDelay}s`
                                }}
                              >
                                {letter}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌌 Fixed Background Starfield Canvas Backing */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full block pointer-events-none z-[1]"
      />

      {/* ⭐ Interactive Star-themed Cursor Trail */}
      {performanceProfile.enableCursorTrail && <StarCursorTrail />}

      {/* 📹 Fixed Background Video Layer (Standard MP4 or Vimeo / YouTube Iframe) */}
      <BackgroundVideo
        loadVideo={loadVideo}
        videoUrl={videoUrl}
        videoBlur={videoBlur}
        videoOpacity={videoOpacity}
        loaderActive={loaderActive}
        videoSpeed={videoSpeed}
        videoRef={videoRef}
        setVideoLoading={setVideoLoading}
        setVideoError={setVideoError}
      />

      {/* Fixed Ambient subtle vignette gradient Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)] pointer-events-none z-[3]" />

      {/* 🚀 Dynamic Scroll prompt / mouse hint (Fades out based on scroll) */}
      <ScrollPrompt
        hasInteracted={hasInteracted}
        currentHeight={currentHeight}
      />

      {/* ------------------- SECTION 1: MAIN HERO HEADER ------------------- */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 md:px-8 z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
          {/* Main Hero Header */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[2.25rem] sm:text-[3.25rem] md:text-[4.75rem] font-light tracking-[-0.03em] text-white leading-[1.15] md:leading-[1.12]"
          >
            Where pixel-perfect design{" "}
            <br className="hidden sm:block" />
            <span className="block sm:inline">meets clean </span>
            <span
              className="relative inline-block font-medium transition-all duration-300"
            >
              {/* Highlight word using modern inline gradient masking matching original screen */}
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r transition-all duration-500 font-semibold"
                style={{
                  backgroundImage: `linear-gradient(to right, ${activeTheme.gradientFrom}, ${activeTheme.gradientVia}, ${activeTheme.gradientTo})`
                }}
              >
                engineering
              </span>
              {/* Subtle period/comma element exactly mimicking screen */}
              <span className="text-white">.</span>
            </span>
          </motion.h1>

          {/* Subtitle / Title at bottom - Muted, elegant typography exactly mimicking "Designer & Developer" */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-8 flex items-center justify-center"
          >
            <span className="text-[11px] md:text-[13px] font-medium tracking-[0.22em] uppercase text-gray-400 font-sans select-none">
              Junior Web Developer
            </span>
          </motion.div>
        </div>
      </section>

      {/* ------------------- SECTION 2: DIGITAL INTEGRATED PORTFOLIO ------------------- */}
      <section className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 lg:px-24 xl:px-32 z-10">
        {/* Soft elegant glowing emerald orb in top left exactly as shown in screenshot */}
        <div className="absolute top-12 left-6 md:left-20 w-48 h-48 md:w-64 md:h-64 rounded-full bg-emerald-500/15 blur-[80px] md:blur-[110px] pointer-events-none" />

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Tech Matrix Blueprint & Education Info */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            <Suspense fallback={<CanvasLoader />}>
              {!loaderActive && <TechMatrixCanvas />}
            </Suspense>

            {/* Elegant Education Block */}
            <div className="p-5 rounded-2xl bg-white/[0.01]/10 text-white space-y-3 shadow-xl">
              <div className="flex items-center gap-2 pb-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold">Academic Foundation</h3>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">B.S. in Computer Engineering</h4>
                <p className="text-xs text-gray-400">University of San Carlos</p>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>2022 — 2026</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300">Certifications</span>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-300 font-sans">
                  <li className="flex items-start gap-1">
                    <span className="text-purple-400 mr-1">•</span>
                    <span>Colt Steele: Web Developer Bootcamp 2025 (75h)</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-purple-400 mr-1">•</span>
                    <span>Google UI/UX Design Professional Certificate (30h)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Designer Biography & Tabbed Details */}
          <div className="lg:col-span-7 flex flex-col items-start text-left text-white space-y-6">
            <div>
              <span className="text-cyan-400 font-mono tracking-widest text-xs uppercase mb-1 block">
                FULL-STACK SOFTWARE ENGINEER
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-white mb-2 leading-tight">
                Cyvneil Gleine Enriquez
              </h2>
              {/* Highlight gradient underline */}
              <div className="h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-transparent w-full" />
            </div>

            {/* Geological Pin location & Contact widgets */}
            <div className="flex flex-wrap gap-4 items-center text-gray-400 text-xs font-mono tracking-wider">
              <div className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-default">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Cebu City, Philippines</span>
              </div>
              <span className="text-white/10">|</span>
              <a href="mailto:cyvenriquez1@gmail.com" className="hover:text-purple-400 transition-colors">
                cyvenriquez1@gmail.com
              </a>
              <span className="text-white/10">|</span>
              <a href="https://www.linkedin.com/in/cyvneil" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                <span>linkedin</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Main bio based directly on pdf content */}
            <p className="text-sm md:text-base text-gray-300 font-normal leading-relaxed">
              Computer Engineering graduate and aspiring Full-Stack Developer with a robust technical foundation in the modern Node.js, Express, React, and Vue.js ecosystem. Proficient in architecting both relational (PostgreSQL) and NoSQL (MongoDB) database systems while driving agile workflows, performance tuning, and row-level security constraints.
            </p>

            {/* A clean minimalist signature box summarizing his engineering drive */}
            <div className="p-5 rounded-2xl bg-white/[0.02]/20 border border-white/5 space-y-3.5 w-full">
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
      </section>

      {/* ------------------- SECTION 3: TECH STACK ------------------- */}
      <section className="relative w-full min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-12 lg:px-24 xl:px-32 z-10 bg-transparent">
        {/* Soft elegant glowing nebula orb on the right side */}
        <div className="absolute bottom-12 right-6 md:right-20 w-48 h-48 md:w-64 md:h-64 rounded-full bg-cyan-500/10 blur-[85px] md:blur-[120px] pointer-events-none" />

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Tech Stack description and Category blocks */}
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

            {/* Categories */}
            <div className="space-y-6 w-full">
              {/* Category 1: Languages & Frontend */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span className="text-[11px] font-semibold text-[#f43f5e]/90 font-mono uppercase tracking-widest block">
                    Languages & Frontend
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "TypeScript", "JavaScript", "HTML5", "CSS3", "React", "Next.js", "Vue.js", "Tailwind CSS", "Bootstrap"
                  ].map((tech) => (
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

              {/* Category 2: Backend & Database */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-purple-400" />
                  <span className="text-[11px] font-semibold text-amber-500 font-mono uppercase tracking-widest block">
                    Backend & Storage
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Node.js", "Express.js", "PostgreSQL", "MongoDB", "MySQL", "Supabase", "Row-Level Security", "RESTful APIs"
                  ].map((tech) => (
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

              {/* Category 3: DevOps & Tooling */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-emerald-400" />
                  <span className="text-[11px] font-semibold text-yellow-500 font-mono uppercase tracking-widest block">
                    DevOps & Tooling
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Git", "Docker", "Hostinger", "Supabase CLI", "Cloudinary", "Vite", "Vercel", "Render", "Figma", "Resend", "jsPDF"
                  ].map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2.5 px-3 py-1.5 bg-white/[0.01] hover:bg-yellow-500/10 border border-white/[0.08] hover:border-yellow-500/40 text-gray-300 hover:text-white rounded-xl transition-all duration-300 cursor-default shadow"
                    >
                      <div className="p-1 rounded-md border border-white/[0.08] bg-white/[0.04]">
                        <TechLogo name={tech} />
                      </div>
                      <span className="text-[11.5px] font-mono tracking-wide border-l border-white/10 pl-2 py-0.5">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quantum Orbital Gyroscope canvas - shown last on mobile */}
          <div className="lg:col-span-5 flex justify-center items-center order-last lg:order-none">
            <Suspense fallback={<CanvasLoader />}>
              {!loaderActive && <TechOrbitRingCanvas />}
            </Suspense>
          </div>
        </div>
      </section>

      {/* ------------------- SECTION 4: MY JOURNEY (GSAP SCROLL TIMELINE) ------------------- */}
      <Suspense fallback={<SectionLoader />}>
        {!loaderActive && <MyJourneyTimeline />}
      </Suspense>

      {/* ------------------- SECTION 5: CUSTOM INTERACTIVE PROJECTS DIRECTORY ------------------- */}
      <Suspense fallback={<SectionLoader />}>
        {!loaderActive && <TechProjectsSection />}
      </Suspense>

      {/* ------------------- SECTION 6: CONTACT & COMMISSION DETAILS ------------------- */}
      <section id="contact-details-section" className="relative w-full min-h-screen flex flex-col justify-center pt-32 md:pt-40 pb-32 md:pb-40 px-6 md:px-12 z-10 bg-transparent overflow-hidden">
        {/* Subtle decorative glowing backdrops */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 filter blur-[120px] pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto container">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center space-y-3 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans">
              Need a Web Developer? Contact Me!
            </h2>
            <div className="h-[2px] w-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-transparent mt-2" />
          </div>

          {/* Contact Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Node 1: Primary Vector Direct Link (Email) */}
            <div className="bg-[#09090c]/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 relative overflow-hidden group shadow-lg flex flex-col justify-between h-full">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full filter blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-all duration-500" />

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] md:text-[11px] font-mono text-gray-400 uppercase block mb-1 font-semibold">Direct Vector</span>
                    <span className="text-sm font-mono text-white tracking-widest font-bold uppercase block">Email Uplink</span>
                  </div>
                  <div className="p-2.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-2 text-left">
                  <span className="text-base md:text-lg font-medium font-sans text-gray-200">cyvenriquez1@gmail.com</span>
                  <span className="text-xs font-sans text-gray-400 leading-relaxed">
                    Standard transport channel for all professional or employment queries.
                  </span>
                </div>
              </div>

              <div className="mt-8 flex gap-2.5">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded text-xs font-mono uppercase tracking-wider font-semibold border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span className="text-emerald-400">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
                <a
                  href="mailto:cyvenriquez1@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 rounded text-xs font-mono uppercase tracking-wider font-semibold border border-cyan-500/20 hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <span>Launch</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Node 2: Geophysics Base Coordinate */}
            <div className="bg-[#09090c]/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 relative overflow-hidden group shadow-lg flex flex-col justify-between h-full">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full filter blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-500" />

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] md:text-[11px] font-mono text-gray-400 uppercase block mb-1 font-semibold">Geographic Node</span>
                    <span className="text-sm font-mono text-white tracking-widest font-bold uppercase block">Operational Base</span>
                  </div>
                  <div className="p-2.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-2.5 text-left">
                  <span className="text-base md:text-lg font-semibold font-sans text-gray-200 block">Cebu City, Philippines</span>

                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="px-2.5 py-1 rounded bg-black/40 border border-white/5 text-[10px] md:text-xs font-mono text-emerald-400 font-bold">10.3157° N, 123.8854° E</div>
                  </div>
                  <span className="text-xs font-sans text-gray-400 mt-2 block leading-relaxed">
                    Operating in Asia/Manila, synchronized to global client timelines.
                  </span>
                </div>
              </div>
            </div>

            {/* Node 3: Cyber Networks profiles */}
            <div className="bg-[#09090c]/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 relative overflow-hidden group shadow-lg flex flex-col justify-between h-full">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full filter blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-all duration-500" />

              <div>
                <span className="text-[10px] md:text-[11px] font-mono text-gray-400 uppercase block mb-1 font-semibold">Interlinked Networks</span>
                <span className="text-sm font-mono text-white tracking-widest font-bold uppercase block mb-6">Professional Nodes</span>
              </div>

              <div className="flex flex-col gap-3.5 text-left">
                <a
                  href="https://www.linkedin.com/in/cyvneil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 md:p-4.5 rounded-xl bg-black/20 border border-white/15 hover:border-cyan-400/35 text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-5 h-5 text-cyan-400" />
                    <div>
                      <span className="text-xs md:text-sm font-semibold font-sans block leading-none">LinkedIn</span>
                      <span className="text-[10px] font-mono text-gray-400 block mt-1">Corporate Signal</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover/link:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://github.com/cyvneil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 md:p-4.5 rounded-xl bg-black/20 border border-white/15 hover:border-indigo-400/35 text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-5 h-5 text-indigo-400" />
                    <div>
                      <span className="text-xs md:text-sm font-semibold font-sans block leading-none">GitHub</span>
                      <span className="text-[10px] font-mono text-gray-400 block mt-1">Source Core</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover/link:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://www.facebook.com/ultra.magnus.0712"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 md:p-4.5 rounded-xl bg-black/20 border border-white/15 hover:border-blue-455/35 text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-between group/link"
                >
                  <div className="flex items-center gap-2.5">
                    <Facebook className="w-5 h-5 text-blue-400" />
                    <div>
                      <span className="text-xs md:text-sm font-semibold font-sans block leading-none">Facebook</span>
                      <span className="text-[10px] font-mono text-gray-400 block mt-1">Social Link</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover/link:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⚙️ Floating Collapsible Interactive Cosmic Control Dashboard (Bottom Right) */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 flex flex-col items-end">
        <AnimatePresence>
          {showConfig && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 w-[calc(100vw-2rem)] sm:w-80 max-w-sm max-h-[75vh] overflow-y-auto bg-black/90 backdrop-blur-md border border-white/10 rounded-xl p-5 text-white shadow-2xl custom-scrollbar"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold font-mono uppercase tracking-wider">Starfield Playground</span>
                </div>
                <button
                  onClick={handleResetDefaults}
                  className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
                  title="Reset to Defaults"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Theme & Canvas Stars Control Section */}
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block mb-2">Space Theme Nebula</label>
                  <div className="grid grid-cols-2 gap-2">
                    {THEME_PRESETS.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setActiveTheme(theme)}
                        className={`text-left p-2 rounded-lg text-xs transition-all border ${activeTheme.id === theme.id
                          ? "bg-white/10 border-white/30 text-white font-medium"
                          : "bg-white/5 border-transparent text-gray-400 hover:bg-white/5 hover:border-white/10"
                          }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full block border border-white/10"
                            style={{ backgroundImage: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})` }}
                          />
                          <span className="truncate">{theme.name.split(" ")[0]}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Star Count Density */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Star Density</label>
                    <span className="text-[10px] font-mono text-purple-300">{starCount} stars</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="25"
                    value={starCount}
                    onChange={(e) => setStarCount(parseInt(e.target.value))}
                    className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Twinkle Factor */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Twinkle Sparkle Speed</label>
                    <span className="text-[10px] font-mono text-purple-300">{twinkleSpeedFactor.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={twinkleSpeedFactor}
                    onChange={(e) => setTwinkleSpeedFactor(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Parallax Drift Displacement */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Parallax Depth Drift</label>
                    <span className="text-[10px] font-mono text-purple-300">{parallaxStrength}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="45"
                    step="5"
                    value={parallaxStrength}
                    onChange={(e) => setParallaxStrength(parseInt(e.target.value))}
                    className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Shooting Star Frequency */}
                <div className="border-b border-white/10 pb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Comet Frequency</label>
                    <span className="text-[10px] font-mono text-purple-300">
                      {shootingStarRate === 0 ? "Disabled" : `Rate ${shootingStarRate}`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={shootingStarRate}
                    onChange={(e) => setShootingStarRate(parseInt(e.target.value))}
                    className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Background Video Controls */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Background Video</label>
                    <input
                      type="checkbox"
                      checked={loadVideo}
                      onChange={(e) => setLoadVideo(e.target.checked)}
                      className="accent-purple-500 rounded border-white/10 bg-white/5 cursor-pointer w-4 h-4"
                    />
                  </div>

                  {loadVideo && (
                    <>
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Video Opacity</label>
                          <span className="text-[10px] font-mono text-purple-300">{Math.round(videoOpacity * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.05"
                          max="0.9"
                          step="0.05"
                          value={videoOpacity}
                          onChange={(e) => setVideoOpacity(parseFloat(e.target.value))}
                          className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Video Blur</label>
                          <span className="text-[10px] font-mono text-purple-300">{videoBlur}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="1"
                          value={videoBlur}
                          onChange={(e) => setVideoBlur(parseInt(e.target.value))}
                          className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Icon widget */}
        <div className="rainbow-border-button rounded-full p-[1.5px] shadow-lg">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${showConfig
              ? "bg-purple-600 text-white"
              : "bg-[#0b0b0f] text-gray-300 hover:text-white hover:bg-[#14141b]"
              }`}
          >
            {showConfig ? (
              <>
                <Stars className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Close Options</span>
              </>
            ) : (
              <>
                <Sliders className="w-3.5 h-3.5" />
                <span>Customize Scene</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 🔮 Persistent Sticky social icons and watermark footer dock */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 flex flex-wrap items-center gap-2 pointer-events-auto">
        <a
          href="https://github.com/cyvneil"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Profile"
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center shadow-lg backdrop-blur-md"
        >
          <Github className="w-4 h-4" />
        </a>

        <a
          href="https://www.linkedin.com/in/cyvneil"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn Profile"
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all duration-300 flex items-center justify-center shadow-lg backdrop-blur-md"
        >
          <Linkedin className="w-4 h-4" />
        </a>

      </div>

      {/* Vercel Analytics tracking */}
      <Analytics />
    </div>
  );
}

