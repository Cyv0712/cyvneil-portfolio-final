import { Github, Linkedin } from "lucide-react";
import { site } from "../data/site";

export default function SocialDock() {
  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 flex flex-wrap items-center gap-2 pointer-events-auto">
      <a
        href={site.social.github}
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub Profile"
        className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center shadow-lg backdrop-blur-md"
      >
        <Github className="w-4 h-4" />
      </a>

      <a
        href={site.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn Profile"
        className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all duration-300 flex items-center justify-center shadow-lg backdrop-blur-md"
      >
        <Linkedin className="w-4 h-4" />
      </a>
    </div>
  );
}
