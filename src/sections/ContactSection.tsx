import { useState } from "react";
import { MapPin, Github, Linkedin, Facebook, ExternalLink, Mail, Check, Copy } from "lucide-react";
import { site } from "../data/site";

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="contact-details-section"
      className="relative w-full min-h-screen flex flex-col justify-center pt-32 md:pt-40 pb-32 md:pb-40 px-6 md:px-12 z-10 bg-transparent overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 filter blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto container">
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-sans">
            Need a Web Developer? Contact Me!
          </h2>
          <div className="h-[2px] w-20 bg-gradient-to-r from-cyan-400 via-purple-500 to-transparent mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
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
                <span className="text-base md:text-lg font-medium font-sans text-gray-200">{site.email}</span>
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
                href={`mailto:${site.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 rounded text-xs font-mono uppercase tracking-wider font-semibold border border-cyan-500/20 hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-1.5"
              >
                <span>Launch</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

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
                <span className="text-base md:text-lg font-semibold font-sans text-gray-200 block">{site.location}</span>

                <div className="flex items-center gap-2 mt-1.5">
                  <div className="px-2.5 py-1 rounded bg-black/40 border border-white/5 text-[10px] md:text-xs font-mono text-emerald-400 font-bold">
                    {site.coordinates}
                  </div>
                </div>
                <span className="text-xs font-sans text-gray-400 mt-2 block leading-relaxed">{site.timezoneNote}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#09090c]/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 relative overflow-hidden group shadow-lg flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full filter blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-all duration-500" />

            <div>
              <span className="text-[10px] md:text-[11px] font-mono text-gray-400 uppercase block mb-1 font-semibold">Interlinked Networks</span>
              <span className="text-sm font-mono text-white tracking-widest font-bold uppercase block mb-6">Professional Nodes</span>
            </div>

            <div className="flex flex-col gap-3.5 text-left">
              <a
                href={site.social.linkedin}
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
                href={site.social.github}
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
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 md:p-4.5 rounded-xl bg-black/20 border border-white/15 hover:border-blue-400/35 text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-between group/link"
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
  );
}
