"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Live oscilloscope-style waveform canvas — layered sines with noise,
 * cyan phosphor glow. Used as the hero's living background.
 */
export function WaveformCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    const waves = [
      { freq: 0.008, amp: 0.34, speed: 0.9, width: 1.4, alpha: 0.5 },
      { freq: 0.014, amp: 0.22, speed: -1.4, width: 1.1, alpha: 0.38 },
      { freq: 0.027, amp: 0.12, speed: 1.9, width: 1.6, alpha: 0.26 },
    ];

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // center guide line
      ctx.strokeStyle = "rgba(56,189,248,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      for (const wave of waves) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const progress = x / w;
          const envelope =
            Math.sin(progress * Math.PI) * 0.85 + 0.15; // fade at edges
          const y =
            h / 2 +
            Math.sin(x * wave.freq + t * wave.speed) *
              Math.sin(x * 0.0022 + t * 0.35) *
              wave.amp *
              h *
              0.42 *
              envelope;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(56,189,248,${wave.alpha})`;
        ctx.lineWidth = wave.width * dpr;
        ctx.shadowColor = "rgba(56,189,248,0.65)";
        ctx.shadowBlur = 14 * dpr;
        ctx.stroke();
      }

      // sweeping scan line
      const sweepX = ((t * 0.6) % 1.3) * w - 0.15 * w;
      const grad = ctx.createLinearGradient(sweepX - 80 * dpr, 0, sweepX + 80 * dpr, 0);
      grad.addColorStop(0, "rgba(52,211,153,0)");
      grad.addColorStop(0.5, "rgba(52,211,153,0.10)");
      grad.addColorStop(1, "rgba(52,211,153,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(sweepX - 80 * dpr, 0, 160 * dpr, h);

      t += reduce ? 0 : 0.032;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  );
}
