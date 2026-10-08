"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT_EXPO } from "./motion";

const BOOT_LINES = [
  "RF FRONTEND ······ LOCKED",
  "BASEBAND SYNC ···· OK",
  "LORA MAC ········· JOINED",
  "UPLINK ··········· ESTABLISHED",
];

/**
 * Signature intro: a fast telecom boot sequence (~1.7s total) that wipes away
 * with a curtain reveal. Skipped entirely for reduced-motion users.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (reduce) {
      const t = window.setTimeout(() => setDone(true), 0);
      return () => window.clearTimeout(t);
    }

    document.body.style.overflow = "hidden";
    const duration = 1350;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-in-out so the counter feels mechanical yet smooth
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 260);
      }
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  if (reduce && done) return null;

  const visibleLines = Math.floor((progress / 100) * BOOT_LINES.length) + (progress >= 100 ? 0 : 0);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050b12]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
          aria-hidden
        >
          {/* faint grid backdrop */}
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(56,189,248,0.07),transparent)]" />

          <div className="relative w-[min(480px,86vw)]">
            {/* header strip */}
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal-green" />
                handshake
              </span>
              <span>bk://uplink</span>
            </div>

            {/* giant counter */}
            <div className="mt-6 flex items-end justify-between">
              <span className="font-display text-7xl font-extrabold leading-none tracking-tight text-foreground sm:text-8xl">
                {progress}
                <span className="text-signal-cyan">%</span>
              </span>
              <div className="flex items-end gap-1 pb-2" aria-hidden>
                {[10, 16, 24, 34].map((h, i) => (
                  <motion.span
                    key={h}
                    className="w-1.5 rounded-sm bg-signal-cyan"
                    animate={{ height: [h * 0.4, h, h * 0.4] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </div>

            {/* progress rail */}
            <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-line/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-signal-cyan to-signal-green transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* boot log */}
            <div className="mt-6 space-y-1.5 font-mono text-[11px] tracking-[0.12em]">
              {BOOT_LINES.slice(0, visibleLines).map((line) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <span className="text-signal-green">›</span>
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          {/* bottom hint */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.32em] text-muted-foreground/50">
            establishing secure channel
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
