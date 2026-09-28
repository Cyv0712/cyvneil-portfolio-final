import barangayTalambanPreview from "../assets/project-previews/barangay-talamban-case-management-system.svg";
import farmDeskPreview from "../assets/project-previews/farm-desk.svg";
import farmJournalPreview from "../assets/project-previews/farmjournal-web-app.svg";
import jettLauDoneDealPreview from "../assets/project-previews/jett-lau-done-deal.png";
import katinginBikesHome from "../assets/project-previews/katingin-bikes-home.webp";
import katinginBikesInventory from "../assets/project-previews/katingin-bikes-inventory.webp";
import katinginBikesDetail from "../assets/project-previews/katingin-bikes-detail.webp";
import katinginBikesFinancing from "../assets/project-previews/katingin-bikes-financing.webp";
import katinginBikesAdmin from "../assets/project-previews/katingin-bikes-admin.webp";

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  liveUrl: string;
  repoUrl?: string;
  tech: string[];
  image: string;
  /** object-position for the main (tall) image */
  imagePosition?: string;
  /** AI tools used while building the project, shown in the card's bottom-left tile */
  aiTools: string[];
  /** Heading for the AI tile, e.g. how fast it shipped. Defaults to "AI-assisted". */
  aiNote?: string;
  /** Extra screenshots, shown only in the marquee */
  gallery?: string[];
}

export const projects: Project[] = [
  {
    slug: "katingin-bikes",
    title: "Katingin Bikes",
    category: "Client",
    description:
      "Inventory site and admin panel for a pre-owned motorcycle shop, self-hosted on a Hostinger VPS with Umami analytics and Uptime Kuma monitoring.",
    liveUrl: "https://katinginbikes.com",
    repoUrl: "https://github.com/Cyv0712/katingin-bikes",
    tech: ["React 19", "Node.js", "Express", "MongoDB", "Cloudinary", "Hostinger VPS"],
    aiTools: ["Claude", "Gemini", "Google AI Studio"],
    aiNote: "AI-assisted, site was live within 2 weeks",
    image: katinginBikesHome,
    imagePosition: "center",
    gallery: [katinginBikesInventory, katinginBikesDetail, katinginBikesFinancing, katinginBikesAdmin],
  },
  {
    slug: "jett-lau-done-deal",
    title: "Jett Lau Done Deal",
    category: "Client",
    description:
      "Big-bike inventory site with a strong brand story and one-tap inquiries over WhatsApp, Viber, or Messenger.",
    liveUrl: "https://jettlaudonedeal.com",
    repoUrl: "https://github.com/Cyv0712/jett-lau-done-deal",
    tech: ["React 19", "Vite", "Node.js", "Express", "MongoDB", "Cloudinary"],
    aiTools: ["Claude", "Gemini", "Google AI Studio"],
    aiNote: "AI-assisted, site was live within 2 weeks",
    image: jettLauDoneDealPreview,
    imagePosition: "22% top",
  },
  {
    slug: "barangay-talamban-case-management-system",
    title: "Barangay Talamban Case Management System (SaaS)",
    category: "Thesis",
    description:
      "Case management system for barangay staff, Dockerized on a Hostinger VPS with automated GitHub Actions CI/CD.",
    liveUrl: "https://barangaytalambancms.cloud",
    tech: ["Vue.js", "Node.js", "PostgreSQL", "Docker", "GitHub Actions"],
    aiTools: ["Cursor Composer", "Claude", "Grok", "v0 by Vercel"],
    aiNote: "AI-assisted, site was live in about 90 days",
    image: barangayTalambanPreview,
  },
  {
    slug: "farm-desk",
    title: "Farm-Desk",
    category: "Farmtri AI",
    description:
      "Internal desk tool at Farmtri for tracking tickets and day-to-day org workflows.",
    liveUrl: "https://desk.farmtri.ai",
    tech: ["Next.js 16", "Supabase", "TypeScript", "Tailwind CSS"],
    aiTools: ["Cursor Composer", "Claude", "Grok"],
    image: farmDeskPreview,
    imagePosition: "left top",
  },
  {
    slug: "farmjournal-web-app",
    title: "FarmJournal",
    category: "Farmtri AI",
    description:
      "Farm management app farmers use day to day: signup, forms, and screens wired to live data.",
    liveUrl: "https://journal.farmtri.ai/signup/",
    tech: ["Next.js 16", "Supabase", "TypeScript", "Tailwind CSS"],
    aiTools: ["Cursor Composer", "Claude", "Grok"],
    image: farmJournalPreview,
  },
];
