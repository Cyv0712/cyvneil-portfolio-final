import { useState } from "react";

interface TechLogoProps {
  name: string;
}

export default function TechLogo({ name }: TechLogoProps) {
  const [hasError, setHasError] = useState(false);

  // Mapped Slugs for Devicon to ensure 100% correct matching
  const getSlug = (techName: string): string => {
    const clean = techName.toLowerCase().trim();
    if (clean.includes("next")) return "nextjs";
    if (clean.includes("react")) return "react";
    if (clean.includes("vue")) return "vuejs";
    if (clean.includes("typescript")) return "typescript";
    if (clean.includes("javascript")) return "javascript";
    if (clean.includes("tailwind")) return "tailwindcss";
    if (clean.includes("node")) return "nodejs";
    if (clean.includes("express")) return "express";
    if (clean.includes("postgresql") || clean.includes("postgres")) return "postgresql";
    if (clean.includes("mongodb") || clean.includes("mongo")) return "mongodb";
    if (clean.includes("mysql")) return "mysql";
    if (clean.includes("supabase")) return "supabase";
    if (clean.includes("git")) return "git";
    if (clean.includes("docker")) return "docker";
    if (clean.includes("figma")) return "figma";
    if (clean.includes("vite")) return "vite";
    if (clean.includes("bootstrap")) return "bootstrap";
    if (clean.includes("java") && !clean.includes("script")) return "java";
    if (clean === "c") return "c";
    if (clean.includes("html")) return "html5";
    if (clean.includes("css")) return "css3";
    return clean.replace(/[\s\.\-\/]/g, "");
  };

  const slug = getSlug(name);

  // Custom inline SVG fallbacks for technologies that aren't easily fetchable from Devicon, or for Vercel/Render
  const getFallbackSvg = (techName: string) => {
    const clean = techName.toLowerCase().trim();
    if (clean.includes("vercel")) {
      return (
        <svg className="w-3.5 h-3.5 fill-current text-white shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 22.525H0L12 1.475L24 22.525Z" />
        </svg>
      );
    }
    if (clean.includes("render")) {
      return (
        <svg className="w-3.5 h-3.5 fill-current text-cyan-400 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 4c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8z" />
        </svg>
      );
    }
    if (clean.includes("resend")) {
      return (
        <svg className="w-3.5 h-3.5 stroke-current text-purple-400 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 8L12 13L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (clean.includes("jspdf") || clean.includes("document")) {
      return (
        <svg className="w-3.5 h-3.5 fill-current text-red-400 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
        </svg>
      );
    }
    if (clean.includes("rest") || clean.includes("api")) {
      return (
        <svg className="w-3.5 h-3.5 stroke-current text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 9H16M8 13H14M12 21L3 17V5L12 2L21 5V17L12 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (clean.includes("hostinger")) {
      return (
        <svg className="w-3.5 h-3.5 fill-current text-[#673de6] shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 2.5a1 1 0 0 1 1 1V10h11V3.5a1 1 0 1 1 2 0V20.5a1 1 0 1 1-2 0V12h-11v8.5a1 1 0 1 1-2 0V3.5a1 1 0 0 1 1-1z" />
        </svg>
      );
    }
    // Generic fallback letter-badge
    return (
      <span className="w-3.5 h-3.5 bg-cyan-500/20 text-[#22d3ee] border border-cyan-500/30 rounded-sm flex items-center justify-center font-mono text-[8.5px] font-bold select-none shrink-0 uppercase">
        {name.substring(0, 2)}
      </span>
    );
  };

  // If we know it's a special fallback or if an error loading regular devicon occurs
  if (hasError || ["vercel", "render", "resend", "jspdf", "restful", "api", "hostinger"].some(item => name.toLowerCase().includes(item))) {
    return getFallbackSvg(name);
  }

  // Next.js exception icon style handling
  const deviconUrl = slug === "nextjs"
    ? "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
    : `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;

  return (
    <img
      src={deviconUrl}
      alt={`${name} icon`}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className="w-4 h-4 object-contain shrink-0"
    />
  );
}
