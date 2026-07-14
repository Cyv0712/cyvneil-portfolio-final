export interface ThemeConfig {
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

export const THEME_PRESETS: ThemeConfig[] = [
  {
    id: "cosmic-abyss",
    name: "Cosmic Abyss (Original)",
    bgStart: "#030303",
    bgEnd: "#000000",
    glowColor: "rgba(99, 102, 241, 0.08)",
    gradientFrom: "#a855f7",
    gradientVia: "#6366f1",
    gradientTo: "#3b82f6",
    starColors: ["#ffffff", "#e0e7ff", "#f3e8ff", "#bae6fd"],
  },
  {
    id: "cyan-aurora",
    name: "Cyan Aurora",
    bgStart: "#02080f",
    bgEnd: "#000000",
    glowColor: "rgba(14, 165, 233, 0.09)",
    gradientFrom: "#22d3ee",
    gradientVia: "#06b6d4",
    gradientTo: "#2563eb",
    starColors: ["#ffffff", "#ecfeff", "#e0f2fe", "#99f6e4"],
  },
  {
    id: "stellar-nebula",
    name: "Stellar Nebula",
    bgStart: "#08040a",
    bgEnd: "#000000",
    glowColor: "rgba(236, 72, 153, 0.07)",
    gradientFrom: "#ec4899",
    gradientVia: "#8b5cf6",
    gradientTo: "#ef4444",
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
  },
];
