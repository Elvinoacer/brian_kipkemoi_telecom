"use client";

import Image from "next/image";
import { Activity, Cable, Cpu, Network, Radio, Waves } from "lucide-react";
import { experience, labs } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal, SectionHeading, StaggerGroup, staggerItem } from "./motion";
import { motion } from "framer-motion";

const labIcons: Record<string, React.ElementType> = {
  waves: Waves,
  radio: Radio,
  activity: Activity,
  network: Network,
  cable: Cable,
  cpu: Cpu,
};

export function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28" aria-label="Industrial attachment and laboratory experience">
      <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_80%_20%,rgba(52,211,153,0.05),transparent)]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          eyebrow="Industrial Attachment · 12 Weeks"
          title={
            <>
              Where theory met{" "}
              <span className="bg-gradient-to-r from-signal-amber to-signal-green bg-clip-text text-transparent">
                production infrastructure
              </span>
            </>
          }
          description="Supervised exposure across network operations, transmission and field engineering — observing how live telecom systems are monitored, maintained and troubleshot."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* attachment card */}
          <Reveal direction="right">
            <div className="card-glow overflow-hidden rounded-2xl border border-line bg-surface/60">
              <div className="relative aspect-[16/8]">
                <Image
                  src={experience.image}
                  alt={experience.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" aria-hidden />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-signal-amber/50 bg-[#081018]/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-amber backdrop-blur">
                    {experience.type}
                  </span>
                  <span className="rounded-full border border-line bg-[#081018]/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur">
                    {experience.period}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {experience.department}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{experience.role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {experience.organization} · <span className="font-mono text-xs">{experience.orgNote}</span>
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-signal-cyan">
                      Responsibilities — supervised
                    </p>
                    <ul className="space-y-2">
                      {experience.responsibilities.slice(0, 6).map((r) => (
                        <li key={r} className="flex gap-2.5 text-[13px] leading-relaxed text-foreground/80">
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-signal-cyan/70" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-signal-green">
                      Infrastructure exposure
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {experience.infrastructure.map((inf) => (
                        <Badge
                          key={inf}
                          variant="outline"
                          className="border-line bg-elevated/70 font-mono text-[10px] font-normal text-foreground/80"
                        >
                          {inf}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-5 mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-signal-violet">
                      Diagnostic tools
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {experience.tools.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="border-line bg-elevated/70 font-mono text-[10px] font-normal text-foreground/80"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="mt-6 rounded-xl border-l-2 border-signal-amber bg-signal-amber/[0.05] px-5 py-4 text-sm italic leading-relaxed text-foreground/90">
                  “{experience.lessons}”
                </blockquote>
              </div>
            </div>
          </Reveal>

          {/* laboratory grid */}
          <Reveal direction="left" delay={0.12}>
            <div className="flex h-full flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight">University Laboratory Work</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  6 labs · hands-on
                </span>
              </div>
              <StaggerGroup className="grid flex-1 gap-3 sm:grid-cols-2">
                {labs.map((lab) => {
                  const Icon = labIcons[lab.icon] ?? Waves;
                  return (
                    <motion.div key={lab.name} variants={staggerItem} className="h-full">
                      <Card className="group h-full border-line/80 bg-surface/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal-cyan/35">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="flex h-8 w-8 items-center justify-center rounded-lg border"
                              style={{ borderColor: `${lab.accent}40`, background: `${lab.accent}12`, color: lab.accent }}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <p className="text-[13px] font-semibold leading-tight text-foreground">{lab.name}</p>
                          </div>
                          <ul className="mt-3 space-y-1">
                            {lab.work.map((w) => (
                              <li key={w} className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground">
                                <span className="mt-[6px] h-[3px] w-[3px] shrink-0 rounded-full" style={{ background: lab.accent }} />
                                {w}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </StaggerGroup>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
