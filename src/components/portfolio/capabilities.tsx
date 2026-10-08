"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Cable, Cpu, Network, Radio, ShieldCheck } from "lucide-react";
import { focusAreas, rfReasoning, troubleshootingSteps } from "@/data/portfolio";
import { SectionHeading, Reveal } from "./motion";
import { SpectrumAnalyzer } from "./spectrum-analyzer";
import { ConstellationPlot } from "./constellation-plot";
import { cn } from "@/lib/utils";

const areaIcons: Record<string, React.ElementType> = {
  wireless: Radio,
  networks: Network,
  transmission: Cable,
  dsp: Activity,
  iot: Cpu,
};

export function Capabilities() {
  const [activeArea, setActiveArea] = useState(focusAreas[0].id);
  const area = focusAreas.find((a) => a.id === activeArea) ?? focusAreas[0];
  const AreaIcon = areaIcons[area.id] ?? Radio;

  return (
    <section id="capabilities" className="relative overflow-hidden py-20 sm:py-28" aria-label="Telecommunications capability areas">
      <div className="absolute inset-0 bg-grid-fine opacity-50 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="Telecom Capability Areas"
          title={
            <>
              Five domains, one{" "}
              <span className="bg-gradient-to-r from-signal-violet to-signal-cyan bg-clip-text text-transparent">
                end-to-end mindset
              </span>
            </>
          }
          description="From the radio wave to the routed packet to the sensor payload — each domain below is grounded in coursework, laboratory work and project evidence."
        />

        {/* interactive area selector */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal direction="right">
            <div className="flex h-full flex-col gap-2">
              {focusAreas.map((a) => {
                const Icon = areaIcons[a.id] ?? Radio;
                const isActive = a.id === activeArea;
                return (
                  <button
                    key={a.id}
                    onClick={() => setActiveArea(a.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "group relative flex items-center gap-4 overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-all duration-300",
                      isActive
                        ? "border-signal-cyan/40 bg-signal-cyan/[0.07]"
                        : "border-line bg-surface/50 hover:border-line-bright hover:bg-surface"
                    )}
                  >
                    {/* active accent bar */}
                    <motion.span
                      className="absolute left-0 top-0 h-full w-[3px]"
                      style={{ background: a.accent }}
                      initial={false}
                      animate={{ scaleY: isActive ? 1 : 0.25, opacity: isActive ? 1 : 0.35 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors"
                      style={{
                        borderColor: isActive ? `${a.accent}55` : "#223244",
                        background: isActive ? `${a.accent}14` : "#101923",
                        color: isActive ? a.accent : "#748b9e",
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block text-sm font-semibold", isActive ? "text-foreground" : "text-foreground/75")}>
                        {a.title}
                      </span>
                      <span className="mt-0.5 block line-clamp-2 text-xs leading-snug text-muted-foreground">{a.description}</span>
                    </span>
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.14em]"
                      style={{ color: isActive ? a.accent : "#54697c" }}
                    >
                      {a.topics.length} topics
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* active area detail */}
          <Reveal direction="left" delay={0.1}>
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl border"
                  style={{ borderColor: `${area.accent}50`, background: `${area.accent}12`, color: area.accent }}
                >
                  <AreaIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{area.title}</h3>
                  <p className="text-xs text-muted-foreground">{area.description}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {area.topics.map((topic, i) => (
                  <motion.span
                    key={topic}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    className="rounded-lg border border-line bg-elevated px-3 py-1.5 text-xs font-medium text-foreground/85"
                  >
                    {topic}
                  </motion.span>
                ))}
              </div>

              {/* live instrument visuals for two domains */}
              <div className="mt-6 grid flex-1 gap-4 sm:grid-cols-2">
                {area.id === "wireless" && <SpectrumAnalyzer />}
                {area.id === "dsp" && <ConstellationPlot />}
                {(area.id === "networks" || area.id === "transmission" || area.id === "iot") && (
                  <div className="rounded-xl border border-line bg-[#060d16] p-4 sm:col-span-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Layer map · where this domain sits
                    </p>
                    <div className="mt-4 space-y-2">
                      {[
                        { label: "Application & Services", active: area.id === "iot" },
                        { label: "IP / Routing", active: area.id === "networks" },
                        { label: "Transmission · Fiber / MW", active: area.id === "transmission" },
                        { label: "Radio / PHY", active: (area.id as string) === "wireless" },
                        { label: "Signal Processing", active: (area.id as string) === "dsp" },
                      ].map((layer, i) => (
                        <motion.div
                          key={layer.label}
                          initial={{ opacity: 0, x: -18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.07 }}
                          className={cn(
                            "flex items-center justify-between rounded-lg border px-4 py-2.5 font-mono text-xs transition-colors",
                            layer.active
                              ? "border-signal-cyan/50 bg-signal-cyan/[0.08] text-signal-cyan"
                              : "border-line bg-elevated/50 text-muted-foreground"
                          )}
                        >
                          {layer.label}
                          {layer.active && <span className="h-1.5 w-1.5 rounded-full bg-signal-cyan animate-blink" />}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* reasoning frameworks */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-line bg-surface/50 p-6">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-signal-cyan">
                <Radio className="h-3.5 w-3.5" /> Evaluating a wireless link — my checklist
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-2">
                {rfReasoning.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 border-b border-line/50 py-1.5"
                  >
                    <span className="font-mono text-[9px] text-signal-cyan/60">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[13px] text-foreground/85">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="h-full rounded-2xl border border-line bg-surface/50 p-6">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-signal-green">
                <ShieldCheck className="h-3.5 w-3.5" /> Network troubleshooting — my method
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-2">
                {troubleshootingSteps.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 border-b border-line/50 py-1.5"
                  >
                    <span className="font-mono text-[9px] text-signal-green/60">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[13px] text-foreground/85">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
