"use client";

import { motion } from "framer-motion";
import { GraduationCap, Layers, CalendarClock, FolderKanban, Building2, Wrench } from "lucide-react";
import { snapshot } from "@/data/portfolio";
import { CountUp, Reveal, StaggerGroup, staggerItem } from "./motion";

const icons = [GraduationCap, Building2, CalendarClock, FolderKanban, Layers, Wrench];
const accents = [
  "text-signal-cyan",
  "text-signal-green",
  "text-signal-amber",
  "text-signal-violet",
  "text-signal-cyan-soft",
  "text-signal-green",
];

export function Snapshot() {
  return (
    <section id="snapshot" className="relative py-20 sm:py-24" aria-label="Candidate snapshot">
      {/* faint dotted backdrop for depth */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.35] [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-signal-cyan/60" aria-hidden />
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Operator profile · decoded
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-signal-cyan/60" aria-hidden />
        </Reveal>

        <StaggerGroup className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {snapshot.map((item, i) => {
            const Icon = icons[i];
            const numeric = item.value.match(/^\d+$/);
            return (
              <motion.div key={item.label} variants={staggerItem} className="h-full">
                <div className="group glass-panel relative h-full overflow-hidden rounded-xl p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-signal-cyan/40 hover:shadow-[0_20px_50px_-20px_rgba(56,189,248,0.45)] sm:p-5">
                  {/* top accent line */}
                  <span
                    className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-signal-cyan to-signal-green transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                      {item.label}
                    </span>
                    <Icon className="h-4 w-4 text-signal-cyan/60 transition-all duration-300 group-hover:scale-110 group-hover:text-signal-cyan" />
                  </div>
                  <div className="mt-3">
                    {numeric ? (
                      <span className={`font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${accents[i]}`}>
                        <CountUp to={parseInt(item.value, 10)} />
                        {item.suffix ? (
                          <span className="text-lg font-bold text-muted-foreground">{item.suffix}</span>
                        ) : null}
                      </span>
                    ) : (
                      <p className="font-display text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
                        {item.value}
                      </p>
                    )}
                  </div>
                  <p className="mt-auto pt-3 text-[11px] leading-snug text-muted-foreground">{item.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </StaggerGroup>

        <Reveal delay={0.2} className="mt-6">
          <div className="glass-panel flex flex-wrap items-center justify-center gap-x-8 gap-y-2 rounded-xl px-6 py-5 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-signal-cyan">
              Positioning
            </span>
            <p className="max-w-3xl text-sm leading-relaxed text-foreground/85">
              A fresh engineering graduate with strong communication-systems foundations, useful practical
              exposure, structured problem-solving skills and clear potential to grow in{" "}
              <span className="font-medium text-signal-cyan">telecommunications</span> and{" "}
              <span className="font-medium text-signal-green">connected infrastructure</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
