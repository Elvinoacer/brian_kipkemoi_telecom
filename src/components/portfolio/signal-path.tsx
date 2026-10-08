"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * End-to-end signal path: User Device → Base Station → Transmission →
 * Core / IP Network → Service. Animated packet dots flow along the path.
 */
const nodes = [
  { label: "User Device", sub: " handset · sensor ", icon: "device" },
  { label: "Base Station", sub: " RF · LTE/5G ", icon: "tower" },
  { label: "Transmission", sub: " fiber · microwave ", icon: "link" },
  { label: "Core / IP", sub: " routing · switching ", icon: "core" },
  { label: "Service", sub: " voice · data · IoT ", icon: "service" },
] as const;

function NodeGlyph({ icon, active }: { icon: string; active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={active ? "#7dd3fc" : "#748b9e"} strokeWidth={1.5} className="h-5 w-5">
      {icon === "device" && (
        <>
          <rect x="7" y="3" width="10" height="18" rx="2" />
          <path d="M11 18h2" />
        </>
      )}
      {icon === "tower" && (
        <>
          <path d="M12 21V9" />
          <path d="M8.5 13.5 12 9l3.5 4.5" />
          <path d="M6.5 17.5 12 9l5.5 8.5" />
          <path d="M9 5.5a4.2 4.2 0 0 1 6 0" />
          <path d="M7 3a7 7 0 0 1 10 0" />
        </>
      )}
      {icon === "link" && (
        <>
          <path d="M9 17H7A5 5 0 0 1 7 7h2" />
          <path d="M15 7h2a5 5 0 0 1 0 10h-2" />
          <path d="M8 12h8" />
        </>
      )}
      {icon === "core" && (
        <>
          <rect x="3" y="3" width="7" height="6" rx="1" />
          <rect x="14" y="3" width="7" height="6" rx="1" />
          <rect x="3" y="15" width="7" height="6" rx="1" />
          <rect x="14" y="15" width="7" height="6" rx="1" />
          <path d="M10 6h4M6.5 9v6M17.5 9v6M10 18h4" />
        </>
      )}
      {icon === "service" && (
        <>
          <path d="M12 3a15 15 0 0 1 15 15" opacity="0" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
        </>
      )}
    </svg>
  );
}

export function SignalPath({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-signal-green animate-pulse-ring" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-green" />
          </span>
          Live signal path
        </span>
        <span className="hidden sm:inline">end-to-end</span>
      </div>

      <div className="relative rounded-xl border border-line bg-surface/70 p-4 sm:p-5">
        <div className="grid grid-cols-5 items-start gap-1 sm:gap-2">
          {nodes.map((node, i) => (
            <div key={node.label} className="relative flex flex-col items-center text-center">
              {/* connector */}
              {i < nodes.length - 1 && (
                <svg
                  className="absolute top-5 left-[62%] hidden h-px w-[76%] sm:block"
                  viewBox="0 0 60 2"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <line
                    x1="0"
                    y1="1"
                    x2="60"
                    y2="1"
                    stroke="#2e4256"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className={reduce ? "" : "animate-dash-flow"}
                  />
                </svg>
              )}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.5, ease: "backOut" }}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-elevated"
              >
                <NodeGlyph icon={node.icon} active />
              </motion.div>
              <p className="mt-2 text-[11px] font-medium leading-tight text-foreground/90 sm:text-xs">
                {node.label}
              </p>
              <p className="mt-0.5 hidden font-mono text-[9px] leading-tight text-muted-foreground md:block">
                {node.sub.trim()}
              </p>
            </div>
          ))}
        </div>

        {/* protocol ribbon */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-line/70 pt-3">
          {["RF", "LTE / 5G", "IP", "Fiber", "DSP", "IoT"].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + 0.08 * i }}
              className="rounded border border-signal-cyan/25 bg-signal-cyan/[0.07] px-2 py-0.5 font-mono text-[10px] tracking-wider text-signal-cyan-soft"
            >
              {tag}
            </motion.span>
          ))}
          <span className="ml-auto font-mono text-[9px] text-muted-foreground/70">
            concept diagram
          </span>
        </div>
      </div>
    </div>
  );
}
