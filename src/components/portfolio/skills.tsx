"use client";

import { motion } from "framer-motion";
import { Activity, Cable, Cpu, Network, Radio, Waves, Wrench } from "lucide-react";
import { proficiencyMeta, skillGroups, tools } from "@/data/portfolio";
import { SectionHeading, Reveal, StaggerGroup, staggerItem } from "./motion";

const groupIcons: Record<string, React.ElementType> = {
  waves: Waves,
  radio: Radio,
  network: Network,
  cable: Cable,
  activity: Activity,
  cpu: Cpu,
};

function ProficiencyDots({ level }: { level: keyof typeof proficiencyMeta }) {
  const meta = proficiencyMeta[level];
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex gap-1" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 400, damping: 18 }}
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: i < meta.dots ? meta.color : "#223244",
              boxShadow: i < meta.dots ? `0 0 8px ${meta.color}66` : undefined,
            }}
          />
        ))}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: meta.color }}>
        {meta.label}
      </span>
    </span>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28" aria-label="Technical skills and tools">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow="Skills & Software"
          title={
            <>
              Honest proficiency, mapped by{" "}
              <span className="bg-gradient-to-r from-signal-cyan to-signal-violet bg-clip-text text-transparent">
                evidence — not percentages
              </span>
            </>
          }
          description="Every skill below is graded against what the coursework, laboratories and projects actually demanded. Strong means repeatedly used; Academic Exposure means studied and applied in controlled settings."
        />

        {/* legend */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-line/70 bg-surface/40 px-5 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Legend</span>
            {(Object.keys(proficiencyMeta) as (keyof typeof proficiencyMeta)[]).map((k) => (
              <ProficiencyDots key={k} level={k} />
            ))}
          </div>
        </Reveal>

        {/* skill groups */}
        <StaggerGroup className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = groupIcons[group.icon] ?? Waves;
            return (
              <motion.div key={group.title} variants={staggerItem} className="h-full">
                <div className="group h-full rounded-2xl border border-line bg-surface/50 p-5 transition-all duration-300 hover:border-signal-cyan/30 hover:bg-surface/70">
                  <div className="flex items-center gap-3 border-b border-line/60 pb-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-signal-cyan/25 bg-signal-cyan/[0.07]">
                      <Icon className="h-4 w-4 text-signal-cyan" />
                    </span>
                    <h3 className="text-sm font-semibold tracking-tight">{group.title}</h3>
                  </div>
                  <ul className="mt-3 divide-y divide-line/40">
                    {group.skills.map((skill) => (
                      <li key={skill.name} className="flex items-center justify-between gap-3 py-2">
                        <span className="text-[13px] text-foreground/85">{skill.name}</span>
                        <ProficiencyDots level={skill.level} />
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </StaggerGroup>

        {/* tools */}
        <div className="mt-14">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
                <Wrench className="h-4.5 w-4.5 text-signal-amber" />
                Engineering Software & Tools
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                only tools genuinely used
              </span>
            </div>
          </Reveal>
          <StaggerGroup className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {tools.map((tool) => (
              <motion.div
                key={tool.name}
                variants={staggerItem}
                className="group rounded-xl border border-line bg-surface/50 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-signal-amber/40 hover:shadow-[0_12px_32px_-14px_rgba(251,191,36,0.4)]"
              >
                <p className="text-[13px] font-semibold text-foreground/90 transition-colors group-hover:text-signal-amber">
                  {tool.name}
                </p>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground/80">
                  {tool.category}
                </p>
                <p className="mt-1.5 font-mono text-[9px] text-signal-cyan/80">{tool.level}</p>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
