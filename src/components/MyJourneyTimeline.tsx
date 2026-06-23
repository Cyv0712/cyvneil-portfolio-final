import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Code, Calendar, Briefcase, Sparkles, CheckCircle2 } from "lucide-react";
import TechLogo from "./TechLogo";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  role?: string;
  description: string;
  details: string[];
  tech: string[];
  icon: any;
  color: string;
}

export default function MyJourneyTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  const timelineData: TimelineItem[] = [
    {
      id: "timeline-jan-2025",
      date: "January 2025",
      title: "First Coding Steps",
      subtitle: "SuperSimpleDev studies",
      description: "First studied the foundational blocks of civil engineering for the web. Grounded standard layouts and user interactions entirely locally.",
      details: [
        "Mastered semantic HTML5 structures and robust document outlines.",
        "Created fully responsive grid and flexbox grids with pure CSS3 styling.",
        "Built dynamic event listeners, callback functions, and basic DOM manipulation schemes in JavaScript."
      ],
      tech: ["HTML5", "CSS3", "JavaScript"],
      icon: BookOpen,
      color: "from-cyan-400 to-blue-500"
    },
    {
      id: "timeline-may-2025",
      date: "May 2025 — January 2026",
      title: "Capstone & Thesis Development",
      subtitle: "Barangay Talamban Case Management System",
      role: "Full Stack Engineer",
      description: "Appointed as the lead technical architect for a comprehensive administrative workflow engine. Built from zero to deployment.",
      details: [
        "Handled custom frontend dashboard design, modular UI implementation, and interactive analytical graphs.",
        "Engineered secure backend APIs handling state machines, administrative roles, and public complaint logs.",
        "Integrated transactional Resend API loops for secure password resets and workflow status notifications.",
        "Synced dynamic appointment booking modules with Google Calendar API using secure OAuth credential chains."
      ],
      tech: ["PostgreSQL", "Express.js", "Node.js", "Resend", "jsPDF", "React"],
      icon: Code,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "timeline-june-2025",
      date: "June 2025 — December 2025",
      title: "The Web Developer Bootcamp",
      subtitle: "Colt Steele’s Full-Stack Curriculum (Udemy)",
      description: "Enrolled in the industry-acclaimed development bootcamp to solidify backend mechanics, database design, and modern engineering practices.",
      details: [
        "Earned professional certification after mastering full-stack web principles, web security, and developer workflows.",
        "Built cohesive CRUD-capable applications using Node.js, Express.js, and MongoDB.",
        "Designed and structured responsive layouts with detailed styling, semantic elements, and modern CSS guidelines.",
        "Implemented secure authentication protocols, custom middleware stacks, password hashing, and state persistence."
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express.js", "MongoDB", "Git"],
      icon: BookOpen,
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: "timeline-jan-2026",
      date: "January 2026 — June 2026",
      title: "Full-Stack Software Engineering Intern",
      subtitle: "Cultivate Systems Inc. (Farmtri AI)",
      description: "Shipped enterprise-ready, AI-driven digital agricultural components within a high-tempo professional product pipeline.",
      details: [
        "Collaborated inside an active agile pod to develop robust modules inside a multi-repository Next.js and TypeScript environment.",
        "Architected relational schemas and orchestrating seamless live database migrations in production.",
        "Designed and enforced airtight Supabase Row-Level Security (RLS) rules to safeguard transactional tenant logs.",
        "Refactored heavy rendering blocks to drive faster, responsive client-side panel states."
      ],
      tech: ["Next.js", "TypeScript", "Supabase", "Row-Level Security", "PostgreSQL", "Git"],
      icon: Briefcase,
      color: "from-[#f43f5e] to-amber-500"
    }
  ];

  useEffect(() => {
    // Scroll progress line animation
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: true,
          }
        }
      );
    }

    // Animate timeline nodes and content boxes
    timelineData.forEach((item) => {
      const cardId = `#card-${item.id}`;
      const badgeId = `#badge-${item.id}`;
      const lineConnectionId = `#connector-${item.id}`;

      // Card animation from left/right
      gsap.fromTo(
        cardId,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cardId,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Node badge glow scale-in
      gsap.fromTo(
        badgeId,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: badgeId,
            start: "top 88%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Small horizontal line connectors
      gsap.fromTo(
        lineConnectionId,
        { width: 0, opacity: 0 },
        {
          width: "24px",
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: lineConnectionId,
            start: "top 88%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="my-journey-timeline-section"
      ref={containerRef}
      className="relative w-full min-h-screen py-28 md:py-36 px-6 md:px-12 lg:px-24 xl:px-32 z-10 bg-transparent flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background ambient radial glow matching overall space aesthetics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-[125px] pointer-events-none" />

      {/* Header section with modular typography styling */}
      <div id="journey-header" className="max-w-4xl text-center space-y-3 mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight">
          My <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">Journey</span>
        </h2>
        <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto font-sans">
          A developmental map tracing my acceleration from first studying basic tags to orchestrating secure, scalable, and enterprise-ready application layers.
        </p>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-40 mx-auto mt-4" />
      </div>

      {/* Main timeline container */}
      <div
        id="journey-nodes-timeline-container"
        ref={triggerRef}
        className="max-w-5xl w-full relative pl-12 md:pl-0"
      >
        {/* Central Vertical Timeline Track - Backing Track line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/[0.03]/5 rounded-full" />

        {/* Dynamic central core colored overlay line which fills up on scroll with GSAP */}
        <div
          ref={lineRef}
          className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-[#f43f5e] rounded-full origin-top transform scale-y-0 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-0"
        />

        <div className="space-y-12 md:space-y-24 w-full relative z-10">
          {timelineData.map((item, index) => {
            const IconComponent = item.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                id={`node-row-${item.id}`}
                className="flex flex-col md:flex-row items-stretch w-full justify-start md:justify-center md:items-center relative"
              >
                {/* Visual Connector Ball / Node — on mobile sits at left edge; on md+ sits center */}
                <div
                  id={`badge-container-${item.id}`}
                  className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20"
                >
                  <div
                    id={`badge-${item.id}`}
                    className={`w-10 h-10 rounded-full bg-black border-2 border-white/10 flex items-center justify-center text-white shadow-lg transition-transform duration-500 group hover:scale-110`}
                  >
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-md group-hover:opacity-40 transition-opacity`} />
                    <IconComponent className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>

                {/* Mobile: single-column card — always rendered, full width */}
                <div className="block md:hidden w-full">
                  <div
                    id={`card-${item.id}`}
                    className="w-full text-left bg-white/[0.01]/10 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:bg-white/[0.02]/15 transition-all duration-300"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${item.color}`} />
                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <span className="text-[10px] font-mono tracking-wider font-semibold text-cyan-400 bg-cyan-500/5 px-2.5 py-1 rounded inline-block uppercase">
                        {item.date}
                      </span>
                      {item.role && (
                        <span className="text-[9.5px] font-mono font-medium text-purple-300 uppercase">
                          {item.role}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white mb-1 tracking-tight group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mb-3">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs text-gray-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                      {item.tech.map((tName) => (
                        <div
                          key={tName}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.02]/10 border border-white/5 text-[10px] font-mono text-gray-300 cursor-default"
                        >
                          <TechLogo name={tName} />
                          <span>{tName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Desktop: Left side slot (even items show here; odd items are empty spacers) */}
                <div className={`hidden md:flex w-full md:w-1/2 pr-12 text-right flex-col ${isEven ? "md:items-end order-1" : "md:items-start order-3 opacity-0 pointer-events-none h-0 overflow-hidden"}`}>
                  {isEven && (
                    <div
                      id={`card-${item.id}`}
                      className="w-full text-left bg-white/[0.01]/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:bg-white/[0.02]/15 transition-all duration-300"
                    >
                      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${item.color}`} />
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] font-mono tracking-wider font-semibold text-cyan-400 bg-cyan-500/5 px-2.5 py-1 rounded inline-block uppercase">
                          {item.date}
                        </span>
                        {item.role && (
                          <span className="text-[9.5px] font-mono font-medium text-purple-300 uppercase">
                            {item.role}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1 tracking-tight group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-mono mb-4">
                        {item.subtitle}
                      </p>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <ul className="space-y-2 mb-5">
                        {item.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-xs text-gray-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                        {item.tech.map((tName) => (
                          <div
                            key={tName}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.02]/10 border border-white/5 text-[10.5px] font-mono text-gray-300 cursor-default"
                          >
                            <TechLogo name={tName} />
                            <span>{tName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Desktop: Center spacer for badge */}
                <div className="hidden md:flex order-2 w-10 flex-shrink-0" />

                {/* Desktop: Right side slot (odd items show here; even items are empty spacers) */}
                <div className={`hidden md:flex w-full md:w-1/2 pl-12 text-left flex-col ${!isEven ? "md:items-start order-3" : "md:items-end order-1 opacity-0 pointer-events-none h-0 overflow-hidden"}`}>
                  {!isEven && (
                    <div
                      id={`card-${item.id}`}
                      className="w-full bg-white/[0.01]/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:bg-white/[0.02]/15 transition-all duration-300"
                    >
                      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${item.color}`} />
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] font-mono tracking-wider font-semibold text-cyan-400 bg-cyan-500/5 px-2.5 py-1 rounded inline-block uppercase">
                          {item.date}
                        </span>
                        {item.role && (
                          <span className="text-[9.5px] font-mono font-medium text-purple-300 uppercase">
                            {item.role}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1 tracking-tight group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-mono mb-4">
                        {item.subtitle}
                      </p>
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <ul className="space-y-2 mb-5">
                        {item.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-xs text-gray-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                        {item.tech.map((tName) => (
                          <div
                            key={tName}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.02]/10 border border-white/5 text-[10.5px] font-mono text-gray-300 cursor-default"
                          >
                            <TechLogo name={tName} />
                            <span>{tName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
