"use client";

import { motion } from "framer-motion";
import { Compass, FlaskConical, Loader2, Map } from "lucide-react";
import { currentlyLearning } from "@/data/portfolio";
import { SectionHeading, StaggerGroup, staggerItem } from "./motion";

export function Learning() {
  return (
    <section id="learning" className="relative py-20 sm:py-28" aria-label="Currently learning">
      <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_85%_50%,rgba(251,191,36,0.045),transparent)]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="08"
          eyebrow="Currently Learning"
          title={
            <>
              The stack that keeps{" "}
              <span className="bg-gradient-to-r from-signal-amber to-signal-green bg-clip-text text-transparent">
                compounding
              </span>
            </>
          }
          description="Deliberate next steps toward production telecom work — each track has a status, a focus and a mini-project that produces evidence rather than certificates alone."
        />

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentlyLearning.map((item) => (
            <motion.div key={item.name} variants={staggerItem} className="h-full">
              <div
                className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-1"
                style={{ ["--accent" as string]: item.accent }}
              >
                {/* corner glow */}
                <span
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `${item.accent}26` }}
                  aria-hidden
                />

                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">
                    {item.name}
                  </h3>
                  <span
                    className="flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em]"
                    style={{ borderColor: `${item.accent}45`, color: item.accent }}
                  >
                    <Loader2 className="h-3 w-3 animate-spin [animation-duration:3s]" />
                    {item.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2.5">
                  <p className="flex gap-2.5 text-[13px] leading-relaxed text-muted-foreground">
                    <Compass className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: item.accent }} />
                    <span className="text-foreground/75">{item.focus}</span>
                  </p>
                  <p className="flex gap-2.5 text-[13px] leading-relaxed text-muted-foreground">
                    <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: item.accent }} />
                    <span className="font-mono text-xs text-foreground/70">{item.miniProject}</span>
                  </p>
                </div>

                {/* progress pulse line */}
                <div className="mt-5 h-1 overflow-hidden rounded-full bg-line/60" aria-hidden>
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ background: item.accent }}
                    initial={{ width: "8%" }}
                    whileInView={{ width: ["8%", "52%", "34%"] }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.2, ease: "easeOut" }}
                  />
                </div>
                <p className="mt-2 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/70">
                  <Map className="h-2.5 w-2.5" />
                  track in progress
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
