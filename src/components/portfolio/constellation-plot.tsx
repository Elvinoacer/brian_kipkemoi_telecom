"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated QPSK constellation with Gaussian noise jitter —
 * the four decision points breathe with realistic scatter.
 */
export function ConstellationPlot({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const points = [
    { x: 70, y: 70 },
    { x: 170, y: 70 },
    { x: 70, y: 170 },
    { x: 170, y: 170 },
  ];

  const scatter = (i: number, frame: number) => {
    // deterministic pseudo-random drift per point
    const a = Math.sin(frame * 0.7 + i * 2.1) * 9;
    const b = Math.cos(frame * 0.9 + i * 1.3) * 9;
    return { dx: a, dy: b };
  };

  return (
    <div className={className}>
      <div className="rounded-xl border border-line bg-[#060d16] p-4">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          <span>QPSK · AWGN</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-cyan animate-blink" />
            live
          </span>
        </div>

        <svg viewBox="0 0 240 240" className="w-full" role="img" aria-label="Animated QPSK constellation diagram with additive noise scatter">
          {/* grid */}
          {[48, 96, 144, 192].map((v) => (
            <g key={v} stroke="#132030" strokeWidth="1">
              <line x1={v} y1="24" x2={v} y2="216" />
              <line x1="24" y1={v} x2="216" y2={v} />
            </g>
          ))}
          {/* axes */}
          <line x1="120" y1="24" x2="120" y2="216" stroke="#223244" strokeWidth="1.2" />
          <line x1="24" y1="120" x2="216" y2="120" stroke="#223244" strokeWidth="1.2" />

          {/* decision boundaries */}
          <line x1="24" y1="120" x2="216" y2="120" stroke="#2e4256" strokeDasharray="3 5" strokeWidth="1" />
          <line x1="120" y1="24" x2="120" y2="216" stroke="#2e4256" strokeDasharray="3 5" strokeWidth="1" />

          {/* symbol labels */}
          {["00", "01", "10", "11"].map((s, i) => (
            <text
              key={s}
              x={points[i].x + (i % 2 === 0 ? -26 : 26)}
              y={points[i].y + (i < 2 ? -22 : 30)}
              fill="#748b9e"
              fontSize="10"
              fontFamily="var(--font-geist-mono), monospace"
              textAnchor="middle"
            >
              {s}
            </text>
          ))}

          {/* noise scatter + constellation points */}
          {points.map((p, i) => (
            <g key={i}>
              <motion.g
                animate={
                  reduce
                    ? {}
                    : { x: [0, scatter(i, 1).dx, scatter(i, 2).dx, scatter(i, 3).dx, 0], y: [0, scatter(i, 1).dy, scatter(i, 2).dy, scatter(i, 3).dy, 0] }
                }
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              >
                <circle cx={p.x} cy={p.y} r="16" fill="#38bdf8" opacity="0.07" />
                <circle cx={p.x} cy={p.y} r="9" fill="#38bdf8" opacity="0.16" />
                <circle cx={p.x} cy={p.y} r="3.6" fill="#7dd3fc" />
              </motion.g>
            </g>
          ))}

          {/* axis labels */}
          <text x="226" y="124" fill="#54697c" fontSize="9" fontFamily="var(--font-geist-mono), monospace">I</text>
          <text x="116" y="18" fill="#54697c" fontSize="9" fontFamily="var(--font-geist-mono), monospace">Q</text>
        </svg>

        <p className="mt-2 text-center font-mono text-[9px] text-muted-foreground">
          4 symbols · 2 bits/symbol · noise σ ≈ 0.35
        </p>
      </div>
    </div>
  );
}
