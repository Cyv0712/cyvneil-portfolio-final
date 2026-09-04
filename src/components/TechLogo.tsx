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
    if (clean.includes("gemini")) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Google Gemini">
          <defs>
            <linearGradient id="gemini-official-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1BA1E3" />
              <stop offset="45%" stopColor="#5479F7" />
              <stop offset="75%" stopColor="#9B72CB" />
              <stop offset="100%" stopColor="#D96570" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gemini-official-grad)"
            d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"
          />
        </svg>
      );
    }
    if (clean.includes("grok") && !clean.includes("cursor")) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0 fill-current text-white" viewBox="0 0 196 196" xmlns="http://www.w3.org/2000/svg" aria-label="Grok">
          <path d="M48.7587284,43.4207091 C69.7410025,22.4296584 100.423115,16.7881559 126.45357,26.7147461 L128.220997,27.4156857 C134.061262,29.5875836 139.15118,32.6783184 143.122325,35.5518693 L121.07892,45.7429695 C100.554394,37.1223167 77.0425631,42.9863412 62.6921152,57.3542718 C43.2854824,76.7670645 39.3640866,110.431159 62.108382,132.183577 L0,187.733263 C3.28171432,183.208598 7.22395803,178.892526 11.266648,174.611558 L15.7087583,169.928735 L17.701017,167.809362 C29.564942,155.087578 39.7088957,142.013685 33.3579384,124.491118 L32.7728304,122.978194 C21.6260506,95.8630574 28.1172215,64.086856 48.7587284,43.4207091 Z M168.652875,26.9312166 L195.552119,0 L187.815576,10.7466622 C171.702631,33.4466233 164.550916,47.7368817 171.690048,78.4713306 L171.640181,78.4214639 C177.163646,101.893988 171.256501,127.923205 152.183388,147.019198 C128.137691,171.110069 89.6582384,176.472787 57.9700369,154.787835 L80.0633086,144.546399 C100.287461,152.498663 122.414173,149.006824 138.316353,133.08587 C154.219121,117.164329 157.790159,93.9751648 149.797416,74.6791187 C148.278536,71.02008 143.723071,70.1013604 140.535713,72.4568262 L75.5242703,120.505395 L168.652875,26.8476753 L168.652875,26.9312166 Z" />
        </svg>
      );
    }
    if (clean.includes("cursor") || clean.includes("grok")) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Cursor">
          <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
        </svg>
      );
    }
    if (clean.includes("composer")) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0 fill-current text-purple-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Composer">
          <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
        </svg>
      );
    }
    if (clean.includes("claude")) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#D97706" xmlns="http://www.w3.org/2000/svg" aria-label="Claude">
          <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
        </svg>
      );
    }
    if (clean.includes("stitch")) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Google Stitch">
          <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4" />
          <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z" fill="#34A853" />
          <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05" />
          <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335" />
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
  if (
    hasError ||
    ["vercel", "render", "resend", "jspdf", "restful", "api", "hostinger", "gemini", "cursor", "grok", "composer", "claude", "stitch"].some(item =>
      name.toLowerCase().includes(item)
    )
  ) {
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
