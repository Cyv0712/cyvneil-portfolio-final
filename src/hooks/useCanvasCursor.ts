import { useEffect } from "react";

type CursorContext = CanvasRenderingContext2D & {
  running: boolean;
  frame: number;
};

type Point = { x: number; y: number };

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type Config = {
  friction: number;
  trails: number;
  size: number;
  dampening: number;
  tension: number;
};

class Oscillator {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  private value = 0;

  constructor(options: Partial<Oscillator> = {}) {
    this.phase = options.phase ?? 0;
    this.offset = options.offset ?? 0;
    this.frequency = options.frequency ?? 0.001;
    this.amplitude = options.amplitude ?? 1;
  }

  update() {
    this.phase += this.frequency;
    this.value = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.value;
  }
}

export default function useCanvasCursor(canvasId = "canvas") {
  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (!canvas) return;

    const baseCtx = canvas.getContext("2d");
    if (!baseCtx) return;

    const ctx = baseCtx as CursorContext;
    const pos: Point = { x: 0, y: 0 };
    const config: Config = {
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    };

    let lines: Line[] = [];
    let oscillator: Oscillator;
    let animationFrameId = 0;

    class Node {
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
    }

    class Line {
      spring: number;
      friction: number;
      nodes: NodePoint[];

      constructor(options: { spring: number }) {
        this.spring = options.spring + 0.1 * Math.random() - 0.02;
        this.friction = config.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];

        for (let i = 0; i < config.size; i++) {
          const node = new Node();
          node.x = pos.x;
          node.y = pos.y;
          this.nodes.push(node);
        }
      }

      update() {
        let spring = this.spring;
        let node = this.nodes[0];

        node.vx += (pos.x - node.x) * spring;
        node.vy += (pos.y - node.y) * spring;

        for (let i = 0; i < this.nodes.length; i++) {
          node = this.nodes[i];

          if (i > 0) {
            const prev = this.nodes[i - 1];
            node.vx += (prev.x - node.x) * spring;
            node.vy += (prev.y - node.y) * spring;
            node.vx += prev.vx * config.dampening;
            node.vy += prev.vy * config.dampening;
          }

          node.vx *= this.friction;
          node.vy *= this.friction;
          node.x += node.vx;
          node.y += node.vy;
          spring *= config.tension;
        }
      }

      draw() {
        let x = this.nodes[0].x;
        let y = this.nodes[0].y;

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let i = 1; i < this.nodes.length - 2; i++) {
          const current = this.nodes[i];
          const next = this.nodes[i + 1];
          x = 0.5 * (current.x + next.x);
          y = 0.5 * (current.y + next.y);
          ctx.quadraticCurveTo(current.x, current.y, x, y);
        }

        const penultimate = this.nodes[this.nodes.length - 2];
        const last = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(penultimate.x, penultimate.y, last.x, last.y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    const createLines = () => {
      lines = [];
      for (let i = 0; i < config.trails; i++) {
        lines.push(new Line({ spring: 0.4 + (i / config.trails) * 0.025 }));
      }
    };

    const updatePosition = (event: MouseEvent | TouchEvent) => {
      if ("touches" in event && event.touches.length > 0) {
        pos.x = event.touches[0].clientX;
        pos.y = event.touches[0].clientY;
      } else if ("clientX" in event) {
        pos.x = event.clientX;
        pos.y = event.clientY;
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        pos.x = event.touches[0].clientX;
        pos.y = event.touches[0].clientY;
      }
    };

    const onFirstMove = (event: MouseEvent | TouchEvent) => {
      document.removeEventListener("mousemove", onFirstMove);
      document.removeEventListener("touchstart", onFirstMove);
      document.addEventListener("mousemove", updatePosition);
      document.addEventListener("touchmove", updatePosition, { passive: true });
      document.addEventListener("touchstart", onTouchStart, { passive: true });
      updatePosition(event);
      createLines();
      render();
    };

    const render = () => {
      if (!ctx.running) return;

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `hsla(${Math.round(oscillator.update())},50%,50%,0.2)`;
      ctx.lineWidth = 1;

      for (const line of lines) {
        line.update();
        line.draw();
      }

      ctx.frame += 1;
      animationFrameId = window.requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    };

    const onFocus = () => {
      if (!ctx.running) {
        ctx.running = true;
        render();
      }
    };

    const onBlur = () => {
      ctx.running = false;
      window.cancelAnimationFrame(animationFrameId);
    };

    ctx.running = true;
    ctx.frame = 1;
    oscillator = new Oscillator({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    document.addEventListener("mousemove", onFirstMove);
    document.addEventListener("touchstart", onFirstMove);
    document.body.addEventListener("orientationchange", resizeCanvas);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    resizeCanvas();

    return () => {
      ctx.running = false;
      window.cancelAnimationFrame(animationFrameId);
      document.removeEventListener("mousemove", onFirstMove);
      document.removeEventListener("touchstart", onFirstMove);
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("touchmove", updatePosition);
      document.removeEventListener("touchstart", onTouchStart);
      document.body.removeEventListener("orientationchange", resizeCanvas);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, [canvasId]);
}
