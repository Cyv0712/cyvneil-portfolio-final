import { useState, useRef, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  ArrowUpRight,
  Code,
  Sparkles,
  Eye,
  Database,
  Lock,
  Shield,
  Cpu,
  ExternalLink,
  Github,
  Award,
  Terminal,
  Monitor,
  CheckCircle2,
  X,
  Compass
} from "lucide-react";
import TechLogo from "./TechLogo";

// @ts-ignore
import barangayTalambanPreview from '../assets/project-previews/barangay-talamban-case-management-system.svg';
// @ts-ignore
import farmDeskPreview from '../assets/project-previews/farm-desk.svg';
// @ts-ignore
import farmJournalPreview from '../assets/project-previews/farmjournal-web-app.svg';
// @ts-ignore
import jettLauDoneDealPreview from '../assets/project-previews/jett-lau-done-deal.png';
// @ts-ignore
import katinginBikesPreview from '../assets/project-previews/katingin-bikes.png';

interface ProjectStat {
  label: string;
  value: string;
}

interface ProjectPreview {
  accent: string;
  glow: string;
  surface: string;
  image: string;
  domain: string;
  badge: string;
  eyebrow: string;
  headline: string;
  copy: string;
  pills: string[];
  stats: ProjectStat[];
  imagePosition?: string;
}

interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  role: string;
  organization: string;
  liveUrl: string;
  repoUrl?: string;
  tech: string[];
  icon: string;
  proof: string;
  preview: ProjectPreview;
  impact: string[];
}

export const projectItems: ProjectItem[] = [
  {
    slug: 'katingin-bikes',
    title: 'Katingin Bikes',
    description:
      'Inventory site and admin panel for a pre-owned motorcycle shop. Originally deployed via Vercel & Render with Cloudinary, then migrated to a self-hosted Hostinger VPS with self-hosted Umami and Uptime Kuma monitoring to optimize resource utilization and tracking.',
    role: 'Full Stack Developer',
    organization: 'Unsponsored Client Project',
    liveUrl: 'https://katinginbikes.com',
    repoUrl: 'https://github.com/Cyv0712/katingin-bikes',
    tech: ['React 19', 'Bootstrap', 'Node.js', 'Express', 'MongoDB Atlas', 'Cloudinary', 'Hostinger VPS', 'Umami', 'Uptime Kuma'],
    icon: 'device',
    proof: 'Admin panel, Hostinger VPS deployment, Umami analytics, Uptime Kuma status.',
    preview: {
      accent: '#f97316',
      glow: 'rgba(249, 115, 22, 0.35)',
      surface:
        'linear-gradient(140deg, rgba(11, 18, 32, 0.98) 0%, rgba(36, 18, 6, 0.95) 52%, rgba(8, 11, 21, 0.98) 100%)',
      image: katinginBikesPreview,
      domain: 'katinginbikes.com',
      badge: 'Live showroom',
      eyebrow: 'Dark showroom inventory & VPS',
      headline: 'Pre-owned bikes, listed and monitored.',
      copy:
        'Public showroom plus a backend to add bikes and manage photos. Engineered on Vercel/Render before migrating to self-hosted Hostinger VPS with detailed telemetry.',
      pills: ['Hostinger VPS', 'Umami Analytics', 'Uptime Kuma'],
      stats: [
        { label: 'Hosting', value: 'Self-Hosted VPS' },
        { label: 'Telemetry', value: 'Umami / Kuma' },
        { label: 'Cloud Storage', value: 'Cloudinary' },
      ],
    },
    impact: [
      'Built an admin dashboard to add, edit, and remove premium pre-owned listings.',
      'Wired up Cloudinary for uploads, thumbnails, and automated cloud asset hygiene.',
      'Migrated application hosting from Vercel & Render to a self-hosted Hostinger VPS to improve response latency and eliminate platform constraints.',
      'Configured self-hosted Umami Analytics and Uptime Kuma monitoring instances to ensure high availability and lightweight user insights.',
    ],
  },
  {
    slug: 'jett-lau-done-deal',
    title: 'Jett Lau Done Deal',
    description:
      'Big-bike inventory site for a seller in the Philippines. Strong brand story on the front, easy ways to reach them on WhatsApp, Viber, or Messenger.',
    role: 'Full Stack Developer',
    organization: 'Unsponsored Client Project',
    liveUrl: 'https://jettlaudonedeal.com',
    repoUrl: 'https://github.com/Cyv0712/jett-lau-done-deal',
    tech: ['React 19', 'Vite', 'Bootstrap', 'Node.js', 'Express', 'MongoDB Atlas', 'Cloudinary'],
    icon: 'dashboard',
    proof: 'Testimonials, chat links, and a layout built to rebrand.',
    preview: {
      accent: '#fb923c',
      glow: 'rgba(251, 146, 60, 0.32)',
      surface:
        'linear-gradient(145deg, rgba(16, 13, 18, 0.98) 0%, rgba(49, 20, 4, 0.94) 48%, rgba(11, 13, 20, 0.98) 100%)',
      image: jettLauDoneDealPreview,
      imagePosition: '22% top',
      domain: 'jettlaudonedeal.com',
      badge: 'Brand platform',
      eyebrow: 'Premium big-bike experience',
      headline: 'Inventory with honest notes and quick contact.',
      copy:
        'Built for a seller who cares about trust — clear bike details and one-tap reach on the channels buyers already use.',
      pills: ['Honest Notes', 'Buyer Stories', 'WhatsApp / Viber / Messenger'],
      stats: [
        { label: 'Architecture', value: 'White-label ready' },
        { label: 'Media', value: 'Cloud powered' },
        { label: 'Focus', value: 'Lead conversion' },
      ],
    },
    impact: [
      'Split brand styling from core app logic so the same codebase can be rebranded faster.',
      'Listed bikes with large photos and plain-language condition notes.',
      'Added WhatsApp, Viber, and Messenger links for inquiries.',
      'Built an About page and testimonial section around how the seller actually works.',
    ],
  },
  {
    slug: 'barangay-talamban-case-management-system',
    title: 'Barangay Talamban Case Management System',
    description:
      'Thesis project: a robust case management app for barangay staff. Deployed and self-hosted on a dedicated Hostinger VPS using Docker, configured with fully automated CI/CD workflows to test, build, and deploy new release candidates seamlessly.',
    role: 'Full Stack Developer',
    organization: 'Thesis Project',
    liveUrl: 'https://barangaytalambancms.cloud',
    tech: ['Vue.js', 'Node.js', 'PostgreSQL', 'Hostinger VPS', 'Docker', 'GitHub Actions', 'CI/CD'],
    icon: 'dashboard',
    proof: 'CI/CD workflows, Docker container configurations, self-hosted Hostinger VPS base, PostgreSQL database layers.',
    preview: {
      accent: '#0ac8b9',
      glow: 'rgba(10, 200, 185, 0.28)',
      surface:
        'linear-gradient(145deg, rgba(6, 21, 32, 0.98) 0%, rgba(8, 42, 57, 0.94) 54%, rgba(7, 18, 29, 0.98) 100%)',
      image: barangayTalambanPreview,
      domain: 'barangaytalambancms.cloud',
      badge: 'Operations system',
      eyebrow: 'Civic case workflow & CI/CD',
      headline: 'Reports, records, and secure self-hosted execution.',
      copy:
        'Streamlined workflow for local governance — backed by robust relational constraints and automated pipelines feeding directly to Hostinger production environments.',
      pills: ['Hostinger VPS', 'GitHub Actions CI/CD', 'Docker Orchestrated'],
      stats: [
        { label: 'Hosting', value: 'Hostinger VPS' },
        { label: 'Deployment', value: 'GitHub Actions' },
        { label: 'Runtime', value: 'Docker Container' },
      ],
    },
    impact: [
      'Set up role-based access control and high-performance database indexing so secretaries query resident profiles instantly.',
      'Designed and coded automated GitHub Actions CI/CD workflows, compiling code and updating Docker image containers automatically on push.',
      'Configured secure environment variables and systemd service profiles on a Hostinger VPS for uninterrupted background execution.',
      'Successfully delivered a highly praised thesis solution, decreasing manual paperwork time and clerical lookup errors by over 70%.',
    ],
  },
  {
    slug: 'farm-desk',
    title: 'Farm-Desk',
    description:
      'Internal desk tool at Farmtri for tickets and org workflows. Shares a Supabase database with their other apps, with strict row-level security.',
    role: 'Software Engineer Intern',
    organization: 'Farmtri AI',
    liveUrl: 'https://desk.farmtri.ai',
    tech: ['Next.js 16', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Docker'],
    icon: 'dashboard',
    proof: 'Shared Supabase setup, RLS on every table, Next.js App Router.',
    preview: {
      accent: '#22c55e',
      glow: 'rgba(34, 197, 94, 0.3)',
      surface:
        'linear-gradient(145deg, rgba(10, 24, 14, 0.98) 0%, rgba(15, 45, 25, 0.94) 50%, rgba(10, 20, 14, 0.98) 100%)',
      image: farmDeskPreview,
      imagePosition: 'left top',
      domain: 'desk.farmtri.ai',
      badge: 'Internal Platform',
      eyebrow: 'Operations Management',
      headline: 'Internal tickets and desk work in one place.',
      copy:
        'Helps the team track work without mixing data between products — RLS keeps each app\'s rows separate.',
      pills: ['Next.js 16 App Router', 'Shared Auth', 'Migration-driven DB'],
      stats: [
        { label: 'Security', value: 'Mandatory RLS' },
        { label: 'Scale', value: 'Shared Schema' },
        { label: 'Stack', value: 'Next.js 16' },
      ],
    },
    impact: [
      'Shared a Supabase project with FarmJournal, using table prefixes to keep data separated.',
      'Turned on RLS for every operational table.',
      'Built desk features on Next.js 16 App Router with server-rendered pages where it helped.',
      'Ran migrations across local, staging, and production without breaking sync.',
    ],
  },
  {
    slug: 'farmjournal-web-app',
    title: 'FarmJournal Web App',
    description:
      'Farm management app from my Farmtri internship — same stack as Farm-Desk (Next.js, Supabase, TypeScript). Signup, forms, and day-to-day screens on the product farmers actually use.',
    role: 'Software Engineer Intern',
    organization: 'Farmtri AI',
    liveUrl: 'https://journal.farmtri.ai/signup/',
    tech: ['Next.js 16', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Docker'],
    icon: 'device',
    proof: 'Next.js + Supabase, shared DB with Farm-Desk, RLS on operational data.',
    preview: {
      accent: '#84cc16',
      glow: 'rgba(132, 204, 22, 0.28)',
      surface:
        'linear-gradient(145deg, rgba(10, 24, 14, 0.98) 0%, rgba(20, 43, 16, 0.94) 55%, rgba(12, 24, 14, 0.98) 100%)',
      image: farmJournalPreview,
      domain: 'journal.farmtri.ai',
      badge: 'Product workflow',
      eyebrow: 'Farm management platform',
      headline: 'Day-to-day farm tools, not demo screens.',
      copy:
        'Customer-facing side of the Farmtri suite — same Supabase backend as Farm-Desk, kept separate with prefixes and RLS.',
      pills: ['Next.js 16 App Router', 'Shared Supabase', 'Signup & forms'],
      stats: [
        { label: 'Context', value: 'Internship build' },
        { label: 'Stack', value: 'Next.js 16' },
        { label: 'Data', value: 'Shared w/ Desk' },
      ],
    },
    impact: [
      'Helped build and fix user-facing flows on the farm management product.',
      'Worked in Next.js 16 and Supabase — same setup as Farm-Desk, with table prefixes and RLS between apps.',
      'Shipped onboarding, forms, and screens wired to live Supabase data.',
      'Learned how shipping works when someone else reviews your PR and prod has real users.',
    ],
  },
];

export default function TechProjectsSection() {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  // Track selected project for detailed inspector blueprint popup modal
  const [inspectProject, setInspectProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (inspectProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [inspectProject]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const hoverPositionRef = useRef({ x: 0, y: 0 });
  const hoverFrameRef = useRef<number | null>(null);

  const syncPreviewPosition = () => {
    hoverFrameRef.current = null;
    const preview = previewRef.current;
    if (!preview) return;

    preview.style.left = `${hoverPositionRef.current.x + 25}px`;
    preview.style.top = `${hoverPositionRef.current.y - 120}px`;
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (!rectRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
    const rect = rectRef.current;
    hoverPositionRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (hoverFrameRef.current === null) {
      hoverFrameRef.current = requestAnimationFrame(syncPreviewPosition);
    }
  };

  useEffect(() => {
    const clearCache = () => {
      rectRef.current = null;
    };
    window.addEventListener("scroll", clearCache, { passive: true });
    window.addEventListener("resize", clearCache);
    return () => {
      window.removeEventListener("scroll", clearCache);
      window.removeEventListener("resize", clearCache);
      if (hoverFrameRef.current !== null) {
        cancelAnimationFrame(hoverFrameRef.current);
      }
    };
  }, []);

  const handleRowClick = (project: ProjectItem) => {
    setInspectProject(project);
  };

  return (
    <section
      id="custom-projects-section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-24 xl:px-32 z-10 bg-transparent overflow-hidden"
    >
      {/* Visual background atmospheric glowing stars */}
      <div className="absolute top-12 right-12 w-96 h-96 rounded-full bg-cyan-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-12 left-12 w-96 h-96 rounded-full bg-amber-500/5 blur-[130px] pointer-events-none" />

      {/* Floating HUD Cursor Project Thumbnail Portal for 2D list hover */}
      <AnimatePresence>
        {activeHoverId && (() => {
          const activeProj = projectItems.find((p) => p.slug === activeHoverId);
          if (!activeProj) return null;
          return (
            <motion.div
              ref={previewRef}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="absolute pointer-events-none hidden lg:flex z-50 w-90 h-60 rounded-xl border border-white/15 bg-[#09090c] overflow-hidden shadow-2xl flex-col justify-between"
              style={{
                left: 0,
                top: 0,
                boxShadow: `0 25px 60px -12px ${activeProj.preview.glow || 'rgba(0,0,0,0.6)'}, 0 4px 12px rgba(0,0,0,0.9)`
              }}
            >
              {/* Upper Section: Unobscured Thumbnail Image */}
              <div className="relative w-full flex-grow bg-black/60 overflow-hidden select-none">
                <img
                  src={activeProj.preview.image}
                  alt={activeProj.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-95 transition-transform duration-500 z-0"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />

                {/* Clean HUD corner target graphics over thumbnail */}
                <div className="absolute inset-2 border border-white/[0.08] rounded-md pointer-events-none flex flex-col justify-between p-1.5">
                  <div className="flex justify-between">
                    <div className="w-1.5 h-1.5 border-t border-l border-white/30" />
                    <div className="w-1.5 h-1.5 border-t border-r border-white/30" />
                  </div>
                  <div className="flex justify-between">
                    <div className="w-1.5 h-1.5 border-b border-l border-white/30" />
                    <div className="w-1.5 h-1.5 border-b border-r border-white/30" />
                  </div>
                </div>

                {/* Left/Right Gradient overlays to protect hud text but keep center completely clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40 pointer-events-none" />

                {/* HUD Overlay badges above the image */}
                <div className="absolute inset-x-0 top-0 p-3 flex justify-between items-start font-mono text-[9px] pointer-events-none">
                  <div className="bg-black/65 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 space-y-0.5">
                    <span className="text-white font-bold block" style={{ color: activeProj.preview.accent }}>
                      {activeProj.preview.badge.toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-[8px] block">{activeProj.preview.domain}</span>
                  </div>
                  <div className="bg-black/65 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-right space-y-0.5">
                    <span className="block text-gray-500 text-[8px] uppercase">SYS_LOG::{activeProj.slug.substring(0, 6)}</span>
                    <div className="flex items-center gap-1 justify-end">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 font-bold block text-[8px]">ONLINE</span>
                    </div>
                  </div>
                </div>

                {/* Headline as small, elegant bottom-anchored caption over the image */}
                <div className="absolute bottom-2 left-3 right-3 bg-black/75 backdrop-blur-md border border-white/10 rounded-md py-1 px-2.5 pointer-events-none">
                  <span className="text-[10px] font-mono text-gray-400 block line-clamp-1">
                    "{activeProj.preview.headline}"
                  </span>
                </div>
              </div>

              {/* Lower Section: Frosted HUD Metadata Footer */}
              <div className="relative z-10 p-3 bg-[#0d0d12] border-t border-white/10 flex items-center justify-between font-mono">
                <div className="max-w-[65%]">
                  <span className="text-xs font-bold text-white tracking-wider block truncate">
                    {activeProj.title}
                  </span>
                  <span className="text-[10px] text-gray-400 block truncate mt-0.5">{activeProj.organization}</span>
                </div>
                <div className="text-right">
                  <span
                    className="px-2 py-1 rounded text-[8px] font-bold tracking-widest uppercase select-none bg-white/5 border text-white transition-opacity duration-300"
                    style={{ borderColor: `${activeProj.preview.accent}40`, color: activeProj.preview.accent }}
                  >
                    CLICK TO INSPECT
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <div className="max-w-6xl w-full mx-auto space-y-12">
        {/* SECTION HEADER ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/[0.04] pb-6">
          <div className="space-y-2 text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Projects
            </h2>
            <div className="h-[2px] bg-gradient-to-r from-cyan-400 via-[#84cc16] to-transparent w-40" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-4">
          {/* Left Hand: Cyber Directory telemetry — Desktop only */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-6 sticky top-24">
            <div className="p-5 rounded-2xl bg-[#09090b]/80 backdrop-blur-md border border-white/[0.04] space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[10px] font-mono text-gray-400 tracking-wider">PROJECTS_LEDGER</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-mono text-emerald-400 font-bold">READY</span>
                </div>
              </div>

              <div className="space-y-1">
                {projectItems.map((project, idx) => (
                  <button
                    key={project.slug}
                    onClick={() => handleRowClick(project)}
                    onMouseEnter={() => setActiveHoverId(project.slug)}
                    onMouseLeave={() => setActiveHoverId(null)}
                    className={`w-full flex items-center justify-between text-left py-1.5 px-2 rounded-md text-xs font-mono transition-all group ${activeHoverId === project.slug
                        ? "bg-white/5 text-cyan-400"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                      }`}
                  >
                    <span className="truncate pr-2">{project.title}</span>
                    <span
                      className="text-[8px] px-1.5 py-0.5 rounded uppercase flex-shrink-0"
                      style={{
                        backgroundColor: activeHoverId === project.slug ? `${project.preview.accent}15` : 'rgba(255,255,255,0.03)',
                        color: activeHoverId === project.slug ? project.preview.accent : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {project.preview.badge.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Hand: Interactive 2D listing row triggers — full width on mobile */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-white/[0.05]">
            {projectItems.map((project, index) => (
              <div
                id={`row-item-${project.slug}`}
                key={project.slug}
                onMouseEnter={() => setActiveHoverId(project.slug)}
                onMouseLeave={() => setActiveHoverId(null)}
                onClick={() => handleRowClick(project)}
                className="py-8 flex flex-col md:flex-row items-start justify-between gap-6 transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                {/* Neon scanline visual hover background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/[0.015] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Gigantic Number & descriptive text block */}
                <div className="flex gap-6 items-start flex-1 min-w-0">
                  <span className="text-3xl md:text-5xl font-mono tracking-tight text-white mb-2 leading-none font-extralight text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 group-hover:from-cyan-400/50 group-hover:to-cyan-400/5 transition-all">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="space-y-1.5 text-left min-w-0 pr-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg md:text-xl font-bold tracking-wide text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-[9px] font-mono bg-white/5 text-gray-400 px-2 py-0.5 rounded border border-white/5">
                        {project.role}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 leading-normal font-sans">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-1.5 pt-1 text-[10px] font-mono text-gray-500">
                      <Award className="w-3.5 h-3.5" style={{ color: project.preview.accent }} />
                      <span>Work for:</span>
                      <strong className="text-gray-300 font-medium">{project.organization}</strong>
                    </div>
                  </div>
                </div>

                {/* Technology tokens column */}
                <div className="flex flex-col md:items-end justify-between self-stretch shrink-0 text-left md:text-right gap-4 md:w-56">
                  <div className="space-y-1.5">
                    <span className="text-[9.5px] font-bold text-gray-500 font-mono tracking-widest uppercase block">
                      COMPILER_STACK //
                    </span>
                    <div className="flex flex-wrap md:justify-end gap-1">
                      {project.tech.map((tn) => (
                        <div
                          key={tn}
                          className="bg-white/5 border border-white/5 rounded px-2.5 py-1 flex items-center gap-1 text-[11px] font-mono text-gray-300"
                        >
                          <TechLogo name={tn} />
                          <span>{tn}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Open telemetry inspector trigger link */}
                  <div className="text-[10px] font-mono tracking-widest uppercase text-gray-500 flex items-center gap-1 max-md:pt-2 group-hover:text-white transition-colors">
                    <span>INSPECT BLUEPRINT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" style={{ color: project.preview.accent }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🛠️ Dynamic High-Fidelity Specs & Blueprint Overlay Module Modal */}
      <AnimatePresence>
        {inspectProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-8">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Main Blueprint Terminal Core */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-[#0c0c0f] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col pointer-events-auto text-left"
              style={{
                boxShadow: `0 30px 80px -20px ${inspectProject.preview.glow || 'rgba(0,0,0,0.6)'}, 0 0 0 1px rgba(255,255,255,0.05) inset`
              }}
            >
              {/* Terminal header style caliper */}
              <div className="bg-[#121217] border-b border-white/5 py-3.5 px-6 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setInspectProject(null)} />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="h-4 w-[1px] bg-white/10 mx-1.5" />
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-widest hidden sm:inline">
                    inspect_system_blueprint::{inspectProject.slug}.cfg
                  </span>
                </div>

                <button
                  onClick={() => setInspectProject(null)}
                  className="p-1 rounded bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto flex-grow rounded-b-2xl">
                {/* Dynamic HUD banner */}
                <div
                  className="w-full py-10 px-6 md:px-10 border-b border-white/5 relative overflow-hidden"
                >
                  {/* Surface background gradient */}
                  <div
                    className="absolute inset-0 opacity-40 z-0"
                    style={{ background: inspectProject.preview.surface }}
                  />
                  {/* Caliper overlay */}
                  <div className="absolute inset-3 border border-white/[0.02] rounded-lg pointer-events-none" />

                  <div className="relative z-10 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${inspectProject.preview.accent}15`,
                          color: inspectProject.preview.accent,
                          border: `1px solid ${inspectProject.preview.accent}30`
                        }}
                      >
                        {inspectProject.preview.badge}
                      </span>
                      <span className="text-[10px] font-mono text-white/40">{inspectProject.preview.domain}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase mt-1">
                      {inspectProject.title}
                    </h3>
                    <p className="text-xs md:text-sm font-mono text-gray-300 mt-2 max-w-2xl leading-relaxed">
                      "{inspectProject.preview.headline}"
                    </p>
                  </div>
                </div>

                {/* Specification Content Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 md:p-8">
                  {/* Specs column (Left) */}
                  <div className="md:col-span-7 space-y-6 order-2 md:order-1">
                    {/* System Overview */}
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-bold">
                        System Description
                      </h4>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans">
                        {inspectProject.description}
                      </p>
                    </div>

                    {/* Accomplishments & Core Impact bullets */}
                    <div className="space-y-3">
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-bold">
                        Core Performance Impact Log
                      </h4>
                      <div className="space-y-2.5">
                        {inspectProject.impact.map((point, i) => (
                          <div key={i} className="flex gap-2.5 items-start">
                            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                            <span className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Ledger Parameters (Right) */}
                  <div className="md:col-span-5 space-y-4 lg:space-y-6 order-1 md:order-2 md:sticky md:top-6 self-start">
                    {/* Technical Screenshot Preview Mockup */}
                    <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 aspect-[16/10] group/modal-thumb">
                      <img
                        src={inspectProject.preview.image}
                        alt={inspectProject.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/modal-thumb:scale-[1.03]"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Cyber decoration calipers */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />
                    </div>

                    {/* Scope Meta info */}
                    <div className="p-5 rounded-xl bg-white/[0.01]/10 border border-white/5 space-y-3">
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-bold border-b border-white/5 pb-1.5">
                        Scope Parameters
                      </h4>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[11px] font-mono">
                        <div>
                          <span className="text-gray-500 block uppercase">Role</span>
                          <span className="text-white font-medium">{inspectProject.role}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block uppercase">Organization</span>
                          <span className="text-white font-medium">{inspectProject.organization}</span>
                        </div>
                      </div>
                    </div>

                    {/* Compiler stack */}
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-bold">
                        Module Dependents
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {inspectProject.tech.map((tn) => (
                          <div
                            key={tn}
                            className="bg-white/5 border border-white/5 rounded px-2.5 py-1 flex items-center gap-1 text-[11px] font-mono text-gray-300"
                          >
                            <TechLogo name={tn} />
                            <span>{tn}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Direct system linkages redirect anchors */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                      <a
                        href={inspectProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl text-center text-xs font-mono font-bold text-black flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90"
                        style={{ backgroundColor: inspectProject.preview.accent }}
                      >
                        <Globe className="w-4 h-4" />
                        <span>VISIT LIVE SITE</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      {inspectProject.repoUrl && (
                        <a
                          href={inspectProject.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 rounded-xl text-center text-xs font-mono font-bold text-white bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/25 flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Github className="w-4 h-4" />
                          <span>ACCESS REPOSITORY SOURCE</span>
                          <Code className="w-3.5 h-3.5 text-gray-400" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
