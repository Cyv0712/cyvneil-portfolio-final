import { useEffect, useRef } from "react";

export default function StarCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface StarParticle {
      x: number;
      y: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
    }

    const particles: StarParticle[] = [];
    let isLoopActive = false;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      // Spawn 1-2 stars per mouse move event
      const starCount = 2;
      for (let i = 0; i < starCount; i++) {
        // Random velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.2 + 0.4;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        // Colors matching our cosmic theme (cyan, purple, pink, amber, white)
        const colors = ["#22d3ee", "#a855f7", "#ec4899", "#f59e0b", "#ffffff"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 2.5, // 2.5px to 5.5px
          color,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015, // fade speed
          vx,
          vy,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.08,
        });
      }

      // If animation loop is inactive, start it now
      if (!isLoopActive) {
        isLoopActive = true;
        updateAndRender();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Draw a star shape
    const drawStar = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    };

    const updateAndRender = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotationSpeed;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        
        // Add a subtle glow to each star
        ctx.shadowBlur = p.size * 1.5;
        ctx.shadowColor = p.color;

        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Draw 4-point star for clean, modern cosmic look
        drawStar(ctx, 0, 0, 4, p.size, p.size / 2.5);

        ctx.restore();
      }

      // Stop scheduling frames if there are no active particles
      if (particles.length === 0) {
        isLoopActive = false;
        return;
      }

      animationFrameId = requestAnimationFrame(updateAndRender);
    };

    // Trigger initial render once to clean the canvas context
    updateAndRender();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
