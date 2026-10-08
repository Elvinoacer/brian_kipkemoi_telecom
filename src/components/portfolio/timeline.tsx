"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/data/portfolio";
import { SectionHeading } from "./motion";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" className="relative py-20 sm:py-28" aria-label="Engineering journey timeline">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="07"
          eyebrow="Engineering Timeline · 2021 → 2026"
          align="center"
          title={
            <>
              The journey from{" "}
              <span className="bg-gradient-to-r from-signal-cyan to-signal-green bg-clip-text text-transparent">
                circuits to systems
              </span>
            </>
          }
          description="Six years that stack foundations, electronics, communications, wireless, industry and a final-year system — in that order, each layer on the last."
        />

        <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
          {/* spine */}
          <div className="absolute left-5 top-0 h-full w-px bg-line md:left-1/2" aria-hidden />
          <motion.div
            className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-signal-cyan via-signal-green to-signal-violet md:left-1/2"
            style={{ scaleY: lineScale }}
            aria-hidden
          />

          <div className="space-y-10">
            {timeline.map((entry, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={entry.year}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className={`relative flex md:w-1/2 ${
                    left ? "md:pr-12" : "md:ml-auto md:pl-12"
                  } pl-14 md:pl-0 ${left ? "" : "md:pl-12"}`}
                >
                  {/* node */}
                  <span
                    className="absolute left-5 top-1.5 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:top-2"
                    style={{ left: left ? undefined : "50%", transform: left ? undefined : undefined }}
                    aria-hidden
                  >
                    <span
                      className="absolute h-4 w-4 rounded-full"
                      style={{ background: `${entry.accent}22`, border: `1px solid ${entry.accent}` }}
                    />
                    <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: entry.accent }} />
                  </span>

                  <div className="group w-full rounded-xl border border-line bg-surface/60 p-5 transition-all duration-300 hover:border-signal-cyan/35 hover:shadow-[0_16px_40px_-18px_rgba(56,189,248,0.35)]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold tracking-tight" style={{ color: entry.accent }}>
                        {entry.year}
                      </span>
                      <span
                        className="rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]"
                        style={{ borderColor: `${entry.accent}45`, color: entry.accent }}
                      >
                        {entry.tag}
                      </span>
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-foreground">{entry.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{entry.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
