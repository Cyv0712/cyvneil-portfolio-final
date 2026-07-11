import { useEffect, useRef, useState, MouseEvent } from "react";

interface Node3D {
  id: string;
  label: string;
  category: "frontend" | "backend" | "database" | "devops";
  x: number;
  y: number;
  z: number;
  color: string;
  skills: string[];
}

interface Connection {
  from: string;
  to: string;
  pulseOffset: number;
}

export default function TechMatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0.3, y: 0.8 }); // Initial rotating perspective
  const targetRotationSpeed = useRef({ x: 0, y: 0.002 }); 
  const currentRotationSpeed = useRef({ x: 0, y: 0.002 });
  const [hoveredNode, setHoveredNode] = useState<Node3D | null>(null);

  // Define Cyvneil's real architectural nodes in 3D space
  const nodesRef = useRef<Node3D[]>([
    {
      id: "ui",
      label: "Frontend Client",
      category: "frontend",
      x: -120, y: -60, z: -40,
      color: "#22d3ee", // Cyan
      skills: ["React.js", "Next.js", "Vue.js", "Tailwind CSS"]
    },
    {
      id: "api",
      label: "Express Gateway",
      category: "backend",
      x: 0, y: -20, z: 20,
      color: "#a855f7", // Purple
      skills: ["Node.js", "Express.js", "RESTful APIs"]
    },
    {
      id: "pg",
      label: "PostgreSQL DB",
      category: "database",
      x: 100, y: 80, z: -80,
      color: "#3b82f6", // Royal Blue
      skills: ["Relational Engine", "SQL Schemas", "Supabase RLS"]
    },
    {
      id: "mongo",
      label: "MongoDB Atlas",
      category: "database",
      x: -80, y: 80, z: 80,
      color: "#10b981", // Emerald
      skills: ["NoSQL Schemas", "Flexible JSON Models"]
    },
    {
      id: "cloud",
      label: "Cloud Ingress",
      category: "devops",
      x: 120, y: -80, z: 60,
      color: "#f59e0b", // Amber
      skills: ["Vercel", "Docker", "Supabase CLI"]
    },
    {
      id: "integrations",
      label: "API Integrations",
      category: "backend",
      x: 40, y: 40, z: 120,
      color: "#ec4899", // Pink
      skills: ["Resend Email API", "Cloudinary CDN"]
    }
  ]);

  const connectionsRef = useRef<Connection[]>([
    { from: "ui", to: "api", pulseOffset: 0.1 },
    { from: "api", to: "pg", pulseOffset: 0.4 },
    { from: "api", to: "mongo", pulseOffset: 0.7 },
    { from: "api", to: "cloud", pulseOffset: 0.2 },
    { from: "api", to: "integrations", pulseOffset: 0.5 },
    { from: "ui", to: "cloud", pulseOffset: 0.8 }
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let width = 0;
    let height = 0;
    const projectedNodesRef: Array<Node3D & { px: number; py: number; pz: number; scale: number; size: number }> = [];

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const isLowPowerViewport = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
      const dpr = Math.min(window.devicePixelRatio || 1, isLowPowerViewport ? 1.25 : 1.75);
      width = rect.width;
      height = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(canvas.parentElement || document.body);
    handleResize();

    const render = (time: number) => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Decelerate velocities back to standard auto-rotation when user releases mouse
      if (!isDraggingRef.current) {
        currentRotationSpeed.current.y += (targetRotationSpeed.current.y - currentRotationSpeed.current.y) * 0.05;
        currentRotationSpeed.current.x += (targetRotationSpeed.current.x - currentRotationSpeed.current.x) * 0.05;
        rotation.current.y += currentRotationSpeed.current.y;
        rotation.current.x += currentRotationSpeed.current.x;
      }

      const cx = width / 2;
      const cy = height / 2;
      const fov = 350; // Camera perspective depth focal length

      const sinX = Math.sin(rotation.current.x);
      const cosX = Math.cos(rotation.current.x);
      const sinY = Math.sin(rotation.current.y);
      const cosY = Math.cos(rotation.current.y);

      // Reset projected node cache
      projectedNodesRef.length = 0;

      // Project all nodes to 2D
      nodesRef.current.forEach((node) => {
        // Rotate X
        const y1 = node.y * cosX - node.z * sinX;
        const z1 = node.y * sinX + node.z * cosX;

        // Rotate Y
        const x2 = node.x * cosY - z1 * sinY;
        const z2 = node.x * sinY + z1 * cosY;

        const scale = fov / (fov + z2);
        const px = cx + x2 * scale;
        const py = cy + y1 * scale;
        const baseSize = 8;
        const isHovered = hoveredNode?.id === node.id;
        const size = (baseSize + (isHovered ? 6 : 0)) * scale;

        projectedNodesRef.push({
          ...node,
          px,
          py,
          pz: z2,
          scale,
          size
        });
      });

      // --- 1. Draw Architectural Outer Constellation Boundaries & Grid Lines (Tech style background) ---
      ctx.strokeStyle = "rgba(14, 165, 233, 0.03)";
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(14, 165, 233, 0.015)";
      ctx.beginPath();
      ctx.arc(cx, cy, 200, 0, Math.PI * 2);
      ctx.stroke();

      // --- 2. Draw Connection pathways between technology nodes ---
      connectionsRef.current.forEach((conn) => {
        const fromNode = projectedNodesRef.find((n) => n.id === conn.from);
        const toNode = projectedNodesRef.find((n) => n.id === conn.to);

        if (fromNode && toNode) {
          const depthAlpha = Math.min(1, Math.max(0.1, (2 - (fromNode.pz + toNode.pz) / 300) / 2));
          
          ctx.beginPath();
          ctx.moveTo(fromNode.px, fromNode.py);
          ctx.lineTo(toNode.px, toNode.py);

          // Highlight pathway on hover of linked node
          const isLinkedHovered = hoveredNode?.id === conn.from || hoveredNode?.id === conn.to;
          ctx.strokeStyle = isLinkedHovered 
            ? `rgba(6, 182, 212, ${0.45 * depthAlpha})` 
            : `rgba(255, 255, 255, ${0.08 * depthAlpha})`;
          ctx.lineWidth = isLinkedHovered ? 2.0 : 1.0;
          ctx.stroke();

          // Action Pulse trail on network pathways
          const pulseProgress = ((time * 0.001) + conn.pulseOffset) % 1.0;
          const pulseX = fromNode.px + (toNode.px - fromNode.px) * pulseProgress;
          const pulseY = fromNode.py + (toNode.py - fromNode.py) * pulseProgress;

          ctx.fillStyle = isLinkedHovered ? "#22d3ee" : "rgba(168, 85, 247, 0.7)";
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, isLinkedHovered ? 3.0 : 2.0, 0, Math.PI * 2);
          ctx.fill();

          // Inner tiny core particle glowing ring
          if (isLinkedHovered) {
            ctx.strokeStyle = "rgba(34, 211, 238, 0.3)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 6, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });

      // --- 3. Draw nodes with depth sorting (rearmost nodes first) ---
      const sortedNodes = [...projectedNodesRef].sort((a, b) => b.pz - a.pz);

      sortedNodes.forEach((node) => {
        const isHovered = hoveredNode?.id === node.id;
        const opacity = Math.min(1, Math.max(0.2, (1.5 - node.pz / 250)));

        ctx.globalAlpha = opacity;

        // Interactive outer glow halos on hovering specific technical nodes
        if (isHovered) {
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 15;
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.px, node.py, node.size * 1.6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }

        // Solid Node circular bullet
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.px, node.py, node.size, 0, Math.PI * 2);
        ctx.fill();

        // High gloss node white core
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(node.px, node.py, node.size * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // 📝 Draw premium typographic labels facing camera
        ctx.fillStyle = isHovered ? "#ffffff" : "rgba(224, 231, 255, 0.8)";
        ctx.font = isHovered ? "bold 11px system-ui" : "500 10px system-ui";
        ctx.textAlign = "center";
        
        // Solid dark background pill for high contrast text readability over starry night skies
        const rectWidth = ctx.measureText(node.label).width + 12;
        const rectHeight = 16;
        ctx.fillStyle = isHovered ? "rgba(15, 23, 42, 0.9)" : "rgba(3, 7, 18, 0.75)";
        ctx.strokeStyle = isHovered ? node.color : "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        const rx = node.px - rectWidth / 2;
        const ry = node.py - node.size - 24;
        
        // Simple rounded rect
        ctx.roundRect?.(rx, ry, rectWidth, rectHeight, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isHovered ? "#ffffff" : "rgba(224, 231, 255, 0.75)";
        ctx.fillText(node.label, node.px, node.py - node.size - 12);

        // Underline highlighted label connection lines
        if (isHovered) {
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.px, node.py - node.size - 4);
          ctx.lineTo(node.px, node.py);
          ctx.stroke();
        }

        ctx.globalAlpha = 1.0;
      });

      animFrameId = requestAnimationFrame(render);
    };

    let isVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (isVisible && !wasVisible) {
        animFrameId = requestAnimationFrame(render);
      } else if (!isVisible && wasVisible) {
        cancelAnimationFrame(animFrameId);
      }
    }, { threshold: 0.05 });

    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  // --- Search for node hit on movement for interactive hover details ---
  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDraggingRef.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      rotation.current.y += dx * 0.007;
      rotation.current.x += dy * 0.007;
      rotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotation.current.x));

      currentRotationSpeed.current = { x: dy * 0.001, y: dx * 0.001 };
      dragStart.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full aspect-square max-w-[480px] mx-auto select-none overflow-hidden cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="w-full h-full block"
        />
        {/* Holographic interactive indicator over matrix */}
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-cyan-400/40 uppercase pointer-events-none text-center">
          DRAG TO ROTATE BLUEPRINT
        </span>
      </div>

      {/* Floating Info card explaining the active node metrics */}
      {hoveredNode && (
        <div className="mt-4 w-full max-w-[340px] px-4 py-3 bg-slate-950/90 backdrop-blur border border-cyan-500/20 rounded-xl shadow-lg text-left animate-fadeIn">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: hoveredNode.color }} />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {hoveredNode.label}
            </h4>
          </div>
          <p className="text-[10px] text-gray-400 font-mono mb-2">Architectural Layer Components:</p>
          <div className="flex flex-wrap gap-1">
            {hoveredNode.skills.map((skill) => (
              <span key={skill} className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-cyan-200">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
