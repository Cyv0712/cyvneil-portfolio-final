import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface ScrollPromptProps {
  hasInteracted: boolean;
  currentHeight: number;
}

export default function ScrollPrompt({ hasInteracted, currentHeight }: ScrollPromptProps) {
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

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[15] flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:opacity-100 opacity-65"
        onClick={() => window.scrollTo({ top: currentHeight, behavior: "smooth" })}
      >
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-gray-300">EXPLORE PORTFOLIO</span>
        <ChevronDown className="w-4 h-4 text-purple-400 animate-bounce" />
      </div>
    </>
  );
}
