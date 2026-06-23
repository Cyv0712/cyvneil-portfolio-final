import { useEffect, useRef, MouseEvent } from "react";

interface RingDimension {
  radius: number;
  speed: number;
  color: string;
  angleY: number;
  angleX: number;
  width: number;
  particles: Array<{
    angle: number;
    size: number;
    speed: number;
    phase: number;
  }>;
}

export default function TechOrbitRingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  
  // Outer global rotation angles updated on auto-spin and dragging
  const globalRotation = useRef({ x: 0.4, y: 0.6 });
  const dragVelocity = useRef({ x: 0, y: 0.003 });

  // Custom multi-ring orbital systems
  const ringsRef = useRef<RingDimension[]>([
    {
      radius: 60,
      speed: 0.012,
      color: "rgba(34, 211, 238, 0.4)", // Cyan Inner Core
      angleY: 0.2,
      angleX: 0.1,
      width: 1.5,
      particles: Array.from({ length: 6 }, (_, i) => ({
        angle: (i * Math.PI * 2) / 6,
        size: 3,
        speed: 0.015,
        phase: Math.random() * 100
      }))
    },
    {
      radius: 110,
      speed: -0.007,
      color: "rgba(168, 85, 247, 0.35)", // Purple Middle Gyro
      angleY: -0.5,
      angleX: 0.4,
      width: 2.0,
      particles: Array.from({ length: 8 }, (_, i) => ({
        angle: (i * Math.PI * 2) / 8,
        size: 4,
        speed: -0.009,
        phase: Math.random() * 100
      }))
    },
    {
      radius: 160,
      speed: 0.004,
      color: "rgba(16, 185, 129, 0.25)", // Emerald Outer Ring
      angleY: 0.8,
      angleX: -0.3,
      width: 1.2,
      particles: Array.from({ length: 12 }, (_, i) => ({
        angle: (i * Math.PI * 2) / 12,
        size: 3.5,
        speed: 0.005,
        phase: Math.random() * 100
      }))
    }
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(canvas.parentElement || document.body);
    handleResize();

    const render = (time: number) => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Decelerate dragging velocities to ambient rotation
      if (!isDraggingRef.current) {
        dragVelocity.current.y += (0.002 - dragVelocity.current.y) * 0.04;
        dragVelocity.current.x += (0.0 - dragVelocity.current.x) * 0.04;
        globalRotation.current.y += dragVelocity.current.y;
        globalRotation.current.x += dragVelocity.current.x;
      }

      const cx = width / 2;
      const cy = height / 2;
      
      const cosG_X = Math.cos(globalRotation.current.x);
      const sinG_X = Math.sin(globalRotation.current.x);
      const cosG_Y = Math.cos(globalRotation.current.y);
      const sinG_Y = Math.sin(globalRotation.current.y);

      // --- Draw Outer Starfield Background of the widget ---
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      ctx.strokeRect(20, 20, width - 40, height - 40);

      // --- Draw Center Fusion Hologram Core ---
      const corePulse = Math.sin(time * 0.003) * 12 + 18;
      const coreGradient = ctx.createRadialGradient(cx, cy, 1, cx, cy, corePulse);
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      coreGradient.addColorStop(0.2, "rgba(34, 211, 238, 0.8)");
      coreGradient.addColorStop(0.5, "rgba(168, 85, 247, 0.3)");
      coreGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, corePulse, 0, Math.PI * 2);
      ctx.fill();

      // --- Project and Draw Nested Orbital Rings with Particles ---
      // We sort elements by calculated depth (z) for high fidelity overlapping look
      interface Projectable {
        type: "ring_segment" | "particle";
        z: number;
        color: string;
        lineWidth?: number;
        draw: (ctx: CanvasRenderingContext2D) => void;
      }

      const drawQueue: Projectable[] = [];

      ringsRef.current.forEach((ring, ringIdx) => {
        // Increment particle angles for runtime orbit movement
        ring.particles.forEach((p) => {
          p.angle += p.speed;
        });

        const steps = 60;
        const pts: Array<{ x: number; y: number; z: number }> = [];

        // Project the continuous ring circle path in 3D space
        for (let s = 0; s <= steps; s++) {
          const theta = (s * Math.PI * 2) / steps;
          
          // Ring plane coordinate
          let rx = Math.cos(theta) * ring.radius;
          let rz = Math.sin(theta) * ring.radius;
          let ry = 0;

          // Local ring tilt transformation
          // Tilt Y
          const ry1 = ry * Math.cos(ring.angleY) - rz * Math.sin(ring.angleY);
          const rz1 = ry * Math.sin(ring.angleY) + rz * Math.cos(ring.angleY);

          // Tilt X
          const rx2 = rx * Math.cos(ring.angleX) - rz1 * Math.sin(ring.angleX);
          const rz2 = rx * Math.sin(ring.angleX) + rz1 * Math.cos(ring.angleX);

          // Global camera viewport rotate Y
          const rx3 = rx2 * cosG_Y - rz2 * sinG_Y;
          const rz3 = rx2 * sinG_Y + rz2 * cosG_Y;

          // Global camera viewport rotate X
          const ry3 = ry1 * cosG_X - rz3 * sinG_X;
          const rz4 = ry1 * sinG_X + rz3 * cosG_X;

          pts.push({ x: rx3, y: ry3, z: rz4 });
        }

        // Segment the continuous orbital ring path into depth segments to handle overlap correctly
        for (let i = 0; i < steps; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const segmentZ = (p1.z + p2.z) / 2;

          drawQueue.push({
            type: "ring_segment",
            z: segmentZ,
            color: ring.color,
            lineWidth: ring.width,
            draw: (canvasCtx) => {
              canvasCtx.beginPath();
              canvasCtx.moveTo(cx + p1.x, cy + p1.y);
              canvasCtx.lineTo(cx + p2.x, cy + p2.y);
              canvasCtx.stroke();
            }
          });
        }

        // Project all the moving satellite active entities orbiting around the core
        ring.particles.forEach((particle) => {
          let px = Math.cos(particle.angle) * ring.radius;
          let pz = Math.sin(particle.angle) * ring.radius;
          let py = 0;

          // Local ring tilt
          const py1 = py * Math.cos(ring.angleY) - pz * Math.sin(ring.angleY);
          const pz1 = py * Math.sin(ring.angleY) + pz * Math.cos(ring.angleY);

          const px2 = px * Math.cos(ring.angleX) - pz1 * Math.sin(ring.angleX);
          const pz2 = px * Math.sin(ring.angleX) + pz1 * Math.cos(ring.angleX);

          // Global Y
          const px3 = px2 * cosG_Y - pz2 * sinG_Y;
          const pz3 = px2 * sinG_Y + pz2 * cosG_Y;

          // Global X
          const py3 = py1 * cosG_X - pz3 * sinG_X;
          const pz4 = py1 * sinG_X + pz3 * cosG_X;

          // Dynamic pulsing sizes
          const currentSize = particle.size + Math.sin(time * 0.01 + particle.phase) * 1.2;

          drawQueue.push({
            type: "particle",
            z: pz4,
            color: ring.color.replace("0.25", "0.95").replace("0.35", "0.95").replace("0.4", "0.95"),
            draw: (canvasCtx) => {
              // Glowing outer radial halo
              const pulseGrad = canvasCtx.createRadialGradient(cx + px3, cy + py3, 1, cx + px3, cy + py3, currentSize * 2.5);
              pulseGrad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
              pulseGrad.addColorStop(0.3, ring.color.replace("0.4", "0.8").replace("0.35", "0.8").replace("0.25", "0.8"));
              pulseGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

              canvasCtx.fillStyle = pulseGrad;
              canvasCtx.beginPath();
              canvasCtx.arc(cx + px3, cy + py3, currentSize * 2.5, 0, Math.PI * 2);
              canvasCtx.fill();

              // Solid inner point high-contrast light Core
              canvasCtx.fillStyle = "#ffffff";
              canvasCtx.beginPath();
              canvasCtx.arc(cx + px3, cy + py3, currentSize * 0.4, 0, Math.PI * 2);
              canvasCtx.fill();
            }
          });
        });
      });

      // Sort by back-to-front depth coordinates
      drawQueue.sort((a, b) => b.z - a.z);

      // Render each sorted piece
      drawQueue.forEach((item) => {
        if (item.type === "ring_segment") {
          ctx.strokeStyle = item.color;
          ctx.lineWidth = item.lineWidth || 1.0;
        }
        item.draw(ctx);
      });

      // Draw subtle orbital metric indicator lines on HUD background
      ctx.strokeStyle = "rgba(6, 182, 212, 0.05)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx - 180, cy);
      ctx.lineTo(cx + 180, cy);
      ctx.moveTo(cx, cy - 180);
      ctx.lineTo(cx, cy + 180);
      ctx.stroke();

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

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    globalRotation.current.y += dx * 0.007;
    globalRotation.current.x += dy * 0.007;

    // Clamping vertical axis orbit to avoid gimbal flip
    globalRotation.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, globalRotation.current.x));

    dragVelocity.current = { x: dy * 0.001, y: dx * 0.001 };
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto select-none overflow-hidden cursor-grab active:cursor-grabbing bg-white/[0.01]/5 rounded-2xl p-4 shadow-2xl flex items-center justify-center">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="w-full h-full block"
      />
      <div className="absolute top-4 left-4 flex gap-1.5 items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-[8px] font-mono tracking-widest text-cyan-400/55 uppercase">QUANTUM CORE ACTIVE</span>
      </div>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[8.5px] font-mono tracking-widest text-cyan-400/30 uppercase pointer-events-none text-center">
        DRAG TO TILT QUANTUM HARMONIC GYRO
      </span>
    </div>
  );
}
