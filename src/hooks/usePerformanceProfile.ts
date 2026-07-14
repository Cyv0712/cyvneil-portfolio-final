export interface PerformanceProfile {
  isLowPower: boolean;
  prefersReducedMotion: boolean;
  saveData: boolean;
  isCoarsePointer: boolean;
  slowConnection: boolean;
  useShortIntro: boolean;
  maxCanvasDpr: number;
  defaultStarCount: number;
  defaultParallaxStrength: number;
  defaultShootingStarRate: number;
  enableCursorTrail: boolean;
}

export const getPerformanceProfile = (): PerformanceProfile => {
  if (typeof window === "undefined") {
    return {
      isLowPower: false,
      prefersReducedMotion: false,
      saveData: false,
      isCoarsePointer: false,
      slowConnection: false,
      useShortIntro: false,
      maxCanvasDpr: 2,
      defaultStarCount: 250,
      defaultParallaxStrength: 15,
      defaultShootingStarRate: 45,
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
  const slowConnection = (nav.connection?.effectiveType ?? "") === "2g";
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const lowCoreCount = navigator.hardwareConcurrency <= 4;
  const narrowViewport = window.innerWidth < 768;
  const isLowPower =
    prefersReducedMotion ||
    saveData ||
    slowConnection ||
    isCoarsePointer ||
    lowMemory ||
    lowCoreCount ||
    narrowViewport;
  const useShortIntro = prefersReducedMotion || saveData || slowConnection;

  return {
    isLowPower,
    prefersReducedMotion,
    saveData,
    isCoarsePointer,
    slowConnection,
    useShortIntro,
    maxCanvasDpr: isLowPower ? 1.25 : 1.75,
    defaultStarCount: isLowPower ? 120 : 250,
    defaultParallaxStrength: isLowPower ? 8 : 15,
    defaultShootingStarRate: isLowPower ? 75 : 45,
    enableCursorTrail: !isLowPower,
  };
};
