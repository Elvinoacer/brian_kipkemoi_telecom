"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { education } from "@/data/portfolio";
import { SectionHeading, Reveal } from "./motion";
import { cn } from "@/lib/utils";

export function Education() {
  const [active, setActive] = useState(0);
  const group = education.coursework[active];

  return (
    <section id="education" className="relative overflow-hidden py-20 sm:py-28" aria-label="Education and academic foundation">
      <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_20%_30%,rgba(167,139,250,0.05),transparent)]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          eyebrow="Academic Foundation"
          title={
            <>
              Moi University —{" "}
              <span className="bg-gradient-to-r from-signal-violet to-signal-cyan bg-clip-text text-transparent">
                the five-year telecom core
              </span>
            </>
          }
          description="A degree that stacks electrical engineering fundamentals under a full telecommunications curriculum — from electromagnetic fields to mobile systems."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* degree card */}
          <Reveal direction="right">
            <div className="relative h-full overflow-hidden rounded-2xl border border-line card-glow">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[340px]">
                <Image
                  src="/images/portfolio/network-rack.jpg"
                  alt="Engineering laboratory equipment rack representing the university's practical training environment"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081018] via-[#081018]/40 to-transparent" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-signal-cyan-soft">
                    <GraduationCap className="h-4 w-4" />
                    {education.period}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight">{education.institution}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/80">{education.degree}</p>
                  <p className="mt-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {education.school} · {education.location}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 divide-x divide-line/60 border-t border-line/60 bg-surface/70">
                {[
                  { label: "Coursework areas", value: `${education.coursework.reduce((n, c) => n + c.modules.length, 0)}+` },
                  { label: "Laboratories", value: "6" },
                  { label: "Attachment", value: "12 wks" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 text-center">
                    <p className="font-mono text-lg font-bold text-signal-cyan">{stat.value}</p>
                    <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* coursework explorer */}
          <Reveal direction="left" delay={0.1}>
            <div className="h-full rounded-2xl border border-line bg-surface/50 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Coursework explorer
                </h3>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {group.modules.length} modules
                </span>
              </div>

              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Coursework categories">
                {education.coursework.map((c, i) => (
                  <button
                    key={c.category}
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => setActive(i)}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-all",
                      i === active
                        ? "border-signal-violet/50 bg-signal-violet/[0.1] text-signal-violet"
                        : "border-line bg-elevated/60 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {c.category}
                  </button>
                ))}
              </div>

              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-5 grid gap-2 sm:grid-cols-2"
              >
                {group.modules.map((m, i) => (
                  <motion.div
                    key={m}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    className="flex items-center gap-3 rounded-lg border border-line/70 bg-elevated/50 px-3.5 py-2.5"
                  >
                    <span className="font-mono text-[9px] text-signal-violet/70">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[13px] text-foreground/85">{m}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
