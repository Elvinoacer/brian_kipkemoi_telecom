"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Spectrum analyzer — animated RF frequency band occupancy bars
 * with channel markers, like a real field analyzer view.
 */
const CHANNELS = Array.from({ length: 36 }, (_, i) => ({
  center: 36 + i * 18,
  base: 0.08 + Math.abs(Math.sin(i * 0.55)) * 0.32 + (i % 7 === 0 ? 0.22 : 0),
  peak: i === 12 || i === 13 ? 0.86 : i === 26 ? 0.72 : null,
}));

export function SpectrumAnalyzer({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // grid
      ctx.strokeStyle = "rgba(34,50,68,0.6)";
      ctx.lineWidth = 1;
      for (let gy = 0; gy <= 4; gy++) {
        const y = (h - 2) - ((h - 10) * gy) / 4;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      CHANNELS.forEach((ch, i) => {
        const bw = w / CHANNELS.length;
        const x = i * bw;
        const jitter = reduce ? 0 : Math.sin(t * 1.7 + i * 1.9) * 0.06 + Math.sin(t * 0.6 + i) * 0.05;
        const level = Math.max(0.03, Math.min(1, ch.base + jitter + (ch.peak ? ch.peak * 0.9 : 0)));
        const barH = level * (h - 12);
        const y = h - 4 - barH;

        const grad = ctx.createLinearGradient(0, h, 0, y);
        grad.addColorStop(0, "rgba(56,189,248,0.16)");
        grad.addColorStop(0.7, "rgba(56,189,248,0.55)");
        grad.addColorStop(1, "rgba(125,211,252,0.95)");

        ctx.fillStyle = hover === i ? "rgba(251,191,36,0.85)" : grad;
        ctx.fillRect(x + bw * 0.18, y, bw * 0.64, barH);

        // peak hold line for busy channels
        if (ch.peak) {
          const peakY = h - 4 - Math.min(1, ch.peak + 0.12) * (h - 12);
          ctx.fillStyle = "rgba(52,211,153,0.9)";
          ctx.fillRect(x + bw * 0.18, peakY, bw * 0.64, 2 * dpr);
        }
      });

      t += reduce ? 0 : 0.05;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduce, hover]);

  return (
    <div className={className}>
      <div className="rounded-xl border border-line bg-[#060d16] p-4">
        <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          <span>RF Spectrum · 868 MHz ISM</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-green animate-blink" />
            scanning
          </span>
        </div>
        <canvas
          ref={canvasRef}
          className="h-32 w-full sm:h-36"
          onMouseLeave={() => setHover(null)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const idx = Math.floor(((e.clientX - rect.left) / rect.width) * CHANNELS.length);
            setHover(Math.max(0, Math.min(CHANNELS.length - 1, idx)));
          }}
          aria-label="Animated RF spectrum analyzer showing channel occupancy across the 868 MHz ISM band"
          role="img"
        />
        <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-muted-foreground">
          <span>863</span>
          <span className="text-signal-cyan/80">channel occupancy · hover to inspect</span>
          <span>870 MHz</span>
        </div>
      </div>
    </div>
  );
}
