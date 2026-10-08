"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: "cyan" | "green" | "violet";
};

type Packet = {
  a: number;
  b: number;
  t: number;
  speed: number;
};

const COLORS: Record<Node["hue"], string> = {
  cyan: "56, 189, 248",
  green: "52, 211, 153",
  violet: "167, 139, 250",
};

/**
 * Ambient network constellation: drifting nodes, proximity links,
 * packet sparks traveling between nodes, and gentle mouse attraction.
 * Performance-aware: DPR capped, pauses when offscreen or tab hidden,
 * renders a single static frame for reduced-motion users.
 */
export function NetworkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let inView = true;
    const mouse = { x: -9999, y: -9999 };
    const LINK_DIST = 150;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // node density scales with area, capped for performance
      const count = Math.min(96, Math.max(28, Math.round((width * height) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1 + Math.random() * 1.6,
        hue: (Math.random() < 0.72 ? "cyan" : Math.random() < 0.6 ? "green" : "violet") as Node["hue"],
      }));
      packets = [];
    };

    const spawnPacket = () => {
      if (packets.length >= 4 || nodes.length < 2) return;
      const a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      if (a === b) b = (b + 1) % nodes.length;
      packets.push({ a, b, t: 0, speed: 0.006 + Math.random() * 0.008 });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.28;
            ctx.strokeStyle = `rgba(${COLORS[n.hue]}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const distToMouse = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const glow = distToMouse < 180 ? 0.55 + (1 - distToMouse / 180) * 0.4 : 0.4;
        ctx.fillStyle = `rgba(${COLORS[n.hue]}, ${glow})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // packets — bright sparks traveling along links
      for (const p of packets) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 7);
        grad.addColorStop(0, "rgba(186, 230, 253, 0.95)");
        grad.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      if (!running) return;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        // gentle mouse attraction
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 220 && dist > 0.001) {
          const pull = 0.012 * (1 - dist / 220);
          n.x += (dx / dist) * pull * 60 * 0.06;
          n.y += (dy / dist) * pull * 60 * 0.06;
        }

        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // advance packets
      packets = packets.filter((p) => {
        p.t += p.speed;
        return p.t <= 1;
      });
      if (Math.random() < 0.02) spawnPacket();

      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseOut = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();

    if (reduce) {
      // single static frame
      draw();
      return () => undefined;
    }

    raf = requestAnimationFrame(step);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && inView) start();
        else stop();
      },
      { threshold: 0.02 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(canvas);

    window.addEventListener("mousemove", onMouse, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseOut);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      document.documentElement.removeEventListener("mouseleave", onMouseOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
    />
  );
}
