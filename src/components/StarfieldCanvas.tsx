import { useEffect, useRef, type MutableRefObject } from "react";
import type { ThemeConfig } from "../data/themes";

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

export interface StarfieldConfig {
  starCount: number;
  twinkleSpeedFactor: number;
  parallaxStrength: number;
  shootingStarRate: number;
}

interface StarfieldCanvasProps {
  activeTheme: ThemeConfig;
  config: StarfieldConfig;
  loaderActive: boolean;
  isLowPower: boolean;
  maxCanvasDpr: number;
  mouseCoords: MutableRefObject<{ x: number; y: number }>;
  easedCoords: MutableRefObject<{ x: number; y: number }>;
}

export default function StarfieldCanvas({
  activeTheme,
  config,
  loaderActive,
  isLowPower,
  maxCanvasDpr,
  mouseCoords,
  easedCoords,
}: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollYRef = useRef(0);
  const easedScrollY = useRef(0);
  const { starCount, twinkleSpeedFactor, parallaxStrength, shootingStarRate } = config;

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
        if (sizeRand > 0.95) size = 2.4;
        else if (sizeRand > 0.8) size = 1.6;
        else if (sizeRand > 0.4) size = 1.0;

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
      const dpr = Math.min(window.devicePixelRatio || 1, maxCanvasDpr);
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

    window.addEventListener("resize", handleResize);
    resizeObserver.observe(canvas.parentElement || document.body);
    handleResize();

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      const nextHeroNearViewport = !isLowPower || window.scrollY < window.innerHeight * 1.25;
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
      const angle = Math.PI / 12 + Math.random() * (Math.PI / 6);
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

    let isPageVisible = !document.hidden;
    let isHeroNearViewport = !isLowPower || window.scrollY < window.innerHeight * 1.25;
    let isFrameScheduled = false;

    const render = () => {
      isFrameScheduled = false;
      if (!isPageVisible || !isHeroNearViewport) return;

      ctx.fillStyle = activeTheme.bgStart;
      ctx.fillRect(0, 0, width, height);

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

      easedCoords.current.x += (mouseCoords.current.x - easedCoords.current.x) * 0.08;
      easedCoords.current.y += (mouseCoords.current.y - easedCoords.current.y) * 0.08;
      easedScrollY.current += (scrollYRef.current - easedScrollY.current) * 0.08;

      stars.forEach((star) => {
        star.phase += star.twinkleSpeed * twinkleSpeedFactor;
        const sineVal = Math.sin(star.phase);
        star.alpha = Math.max(0.1, star.baseAlpha + sineVal * 0.35);

        const depthFactor = star.size * 0.8;
        const driftX = easedCoords.current.x * parallaxStrength * depthFactor;
        const driftY = easedCoords.current.y * parallaxStrength * depthFactor;
        const scrollDriftY = -easedScrollY.current * 0.35 * depthFactor;

        let renderX = (star.x + driftX) % width;
        let renderY = (star.y + driftY + scrollDriftY) % height;
        if (renderX < 0) renderX += width;
        if (renderY < 0) renderY = (renderY % height) + height;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(renderX, renderY, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      if (shootingStarRate > 0 && !shootingStar && Math.random() < 1 / (60 * shootingStarRate)) {
        spawnShootingStar();
      }

      if (shootingStar) {
        const tailX = shootingStar.x - shootingStar.dx * 2.5;
        const tailY = shootingStar.y - shootingStar.dy * 2.5;

        const starGrad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
        starGrad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
        starGrad.addColorStop(0.3, "rgba(224, 231, 255, 0.8)");
        starGrad.addColorStop(1.0, "rgba(255, 255, 255, 0.0)");

        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        shootingStar.x += shootingStar.dx;
        shootingStar.y += shootingStar.dy;
        shootingStar.alpha -= 0.02;

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
  }, [
    starCount,
    twinkleSpeedFactor,
    parallaxStrength,
    shootingStarRate,
    activeTheme,
    loaderActive,
    isLowPower,
    maxCanvasDpr,
    mouseCoords,
    easedCoords,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full block pointer-events-none z-[1]"
    />
  );
}
