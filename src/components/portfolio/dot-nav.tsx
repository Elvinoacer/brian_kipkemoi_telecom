"use client";

import { motion } from "framer-motion";
import { navSections } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/use-scroll";

/**
 * Fixed right-rail section dots with tooltip labels and a moving
 * active indicator. Desktop XL+ only — mobile keeps the sheet nav.
 */
export function DotNav() {
  const ids = navSections.map((s) => s.id);
  const active = useActiveSection(ids);
  const activeIndex = ids.indexOf(active);

  return (
    <nav
      aria-label="Section quick navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
    >
      {/* travelling indicator line */}
      <span className="pointer-events-none absolute right-[7px] top-1/2 h-px w-3 -translate-y-1/2 bg-transparent" aria-hidden />

      {navSections.map((s, i) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={`Jump to ${s.label}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center"
          >
            {/* tooltip */}
            <span
              className={`pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-line/80 bg-[#0b1520]/95 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-signal-cyan-soft opacity-0 shadow-lg backdrop-blur transition-all duration-300 ${
                isActive ? "translate-x-0 opacity-100" : "translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>

            {/* dot */}
            <span className="relative flex h-4 w-4 items-center justify-center">
              {isActive && (
                <motion.span
                  layoutId="dot-nav-active"
                  className="absolute inset-0 rounded-full border border-signal-cyan/60 bg-signal-cyan/15"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span
                className={`relative h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "scale-125 bg-signal-cyan shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                    : "bg-muted-foreground/40 group-hover:bg-signal-cyan/70"
                }`}
              />
            </span>
          </a>
        );
      })}

      {/* rail progress */}
      <span className="mt-1 font-mono text-[9px] tracking-[0.2em] text-muted-foreground/60" aria-hidden>
        {String(activeIndex + 1).padStart(2, "0")}/{String(ids.length).padStart(2, "0")}
      </span>
    </nav>
  );
}
