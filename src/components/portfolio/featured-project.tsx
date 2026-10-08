"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Gauge, Radio, Sigma, Waypoints } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal, SectionHeading, CountUp } from "./motion";
import { LoraArchitecture } from "./lora-architecture";
import { RssiChart, PdrChart } from "./charts";
import { ProjectDialog } from "./project-dialog";

const flagship = projects.find((p) => p.featured) as Project;

export function FeaturedProject({ onOpen }: { onOpen?: (p: Project) => void }) {
  const [tab, setTab] = useState("architecture");
  const handleOpen = () => {
    if (onOpen) onOpen(flagship);
    else document.dispatchEvent(new CustomEvent("open-project", { detail: flagship.slug }));
  };

  return (
    <section id="featured" className="relative overflow-hidden py-20 sm:py-28" aria-label="Featured final-year project">
      {/* ambient band */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(56,189,248,0.06),transparent)]" aria-hidden />
      <div className="absolute inset-0 bg-grid-fine opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="Flagship · Final-Year Project"
          title={
            <>
              LoRa Long-Range Telemetry —{" "}
              <span className="bg-gradient-to-r from-signal-cyan to-signal-green bg-clip-text text-transparent">
                engineered for rural reach
              </span>
            </>
          }
          description={flagship.tagline}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          {/* ── Left: visual identity card ───────────────────────── */}
          <Reveal direction="right">
            <div className="group relative h-full overflow-hidden rounded-2xl border border-line card-glow">
              {/* blueprint corner ticks */}
              {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((pos) => (
                <span key={pos} className={`absolute z-10 h-7 w-7 border-signal-cyan/50 ${pos}`} aria-hidden />
              ))}
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]">
                <Image
                  src={flagship.image}
                  alt={flagship.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* sheen sweep */}
                <span
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[340%]"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081018] via-[#081018]/35 to-transparent" aria-hidden />

                {/* meta chips */}
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-signal-cyan/40 bg-[#081018]/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-cyan-soft backdrop-blur">
                    Final-Year · {flagship.year}
                  </span>
                  <span className="rounded-full border border-signal-green/40 bg-[#081018]/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-green backdrop-blur">
                    Wireless · IoT
                  </span>
                </div>

                {/* bottom overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <h3 className="text-balance text-xl font-semibold leading-tight text-foreground sm:text-2xl">
                    {flagship.title}
                  </h3>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <span>Role · System Design & Testing</span>
                    <span>Duration · {flagship.duration}</span>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {flagship.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-line bg-[#0d1620]/85 px-3 py-2 backdrop-blur"
                      >
                        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                          {m.label}
                        </p>
                        <p className="font-mono text-sm font-bold text-signal-cyan">{m.value}</p>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={handleOpen}
                    className="group/btn mt-5 w-full font-semibold sm:w-auto"
                    size="lg"
                  >
                    Explore the Engineering Case Study
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Right: evidence tabs ──────────────────────────────── */}
          <Reveal direction="left" delay={0.12}>
            <Tabs value={tab} onValueChange={setTab} className="flex h-full flex-col">
              <TabsList className="grid w-full grid-cols-4 bg-surface/80 p-1">
                <TabsTrigger value="architecture" className="gap-1.5 font-mono text-[10px] uppercase tracking-wider sm:text-xs">
                  <Waypoints className="h-3.5 w-3.5" /> Architecture
                </TabsTrigger>
                <TabsTrigger value="link" className="gap-1.5 font-mono text-[10px] uppercase tracking-wider sm:text-xs">
                  <Sigma className="h-3.5 w-3.5" /> Link Budget
                </TabsTrigger>
                <TabsTrigger value="field" className="gap-1.5 font-mono text-[10px] uppercase tracking-wider sm:text-xs">
                  <Gauge className="h-3.5 w-3.5" /> Field Test
                </TabsTrigger>
                <TabsTrigger value="power" className="gap-1.5 font-mono text-[10px] uppercase tracking-wider sm:text-xs">
                  <Cpu className="h-3.5 w-3.5" /> Power
                </TabsTrigger>
              </TabsList>

              <TabsContent value="architecture" className="mt-4 flex-1">
                <LoraArchitecture />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-line bg-surface/60 p-4">
                    <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-cyan">
                      <Radio className="h-3.5 w-3.5" /> Protocols
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {flagship.protocols.map((p) => (
                        <span key={p} className="rounded border border-line bg-elevated px-2 py-0.5 font-mono text-[10px] text-foreground/80">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-line bg-surface/60 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal-green">
                      Hardware
                    </p>
                    <ul className="mt-2 space-y-1 text-xs leading-relaxed text-muted-foreground">
                      {flagship.hardware?.slice(0, 4).map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal-green/70" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="link" className="mt-4 flex-1">
                <div className="rounded-xl border border-line bg-surface/60 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Received Power = Tx Power + G<span className="sub">tx</span> + G<span className="sub">rx</span> − Path Loss − Losses
                  </p>
                  <div className="mt-4 divide-y divide-line/70">
                    {flagship.calculations?.map((c) => (
                      <div key={c.label} className="grid grid-cols-[1fr_auto] items-baseline gap-3 py-2.5">
                        <div>
                          <p className="text-sm font-medium text-foreground/90">{c.label}</p>
                          {c.note && <p className="font-mono text-[10px] text-muted-foreground/80">{c.note}</p>}
                        </div>
                        <p className="font-mono text-sm font-bold text-signal-cyan">{c.value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 rounded-lg border border-signal-amber/25 bg-signal-amber/[0.06] px-3 py-2 font-mono text-[10px] leading-relaxed text-signal-amber">
                    Representative values shown for the prototype — final publication uses measured field data.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="field" className="mt-4 flex-1">
                <div className="rounded-xl border border-line bg-surface/60 p-4 sm:p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      RSSI / SNR vs distance · SF10 · BW 125 kHz
                    </p>
                    <span className="hidden font-mono text-[9px] text-muted-foreground/70 sm:inline">
                      sample field-test dataset
                    </span>
                  </div>
                  <RssiChart data={flagship.fieldTestData!} syncId="featured-rssi" />
                  <div className="mt-5">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Packet Delivery Ratio vs distance
                    </p>
                    <PdrChart data={flagship.fieldTestData!} syncId="featured-rssi" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="power" className="mt-4 flex-1">
                <div className="rounded-xl border border-line bg-surface/60 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Average Current = (I<span className="sub">active</span> × duty) + (I<span className="sub">sleep</span> × duty)
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: "Sleep Current", value: "≈ 10 µA" },
                      { label: "Active Current", value: "≈ 40 mA" },
                      { label: "TX Burst", value: "≈ 120 mA" },
                      { label: "Duty Cycle", value: "0.17%" },
                    ].map((p, i) => (
                      <motion.div
                        key={p.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-lg border border-line bg-elevated p-3 text-center"
                      >
                        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">{p.label}</p>
                        <p className="mt-1 font-mono text-sm font-bold text-signal-green">{p.value}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-lg border border-signal-cyan/25 bg-signal-cyan/[0.06] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal-cyan">
                      Estimated battery runtime
                    </p>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      <CountUp to={6} /> months
                      <span className="ml-2 text-sm font-medium text-muted-foreground">
                        @ 10-min interval · 2× 18650 · duty-cycle arithmetic
                      </span>
                    </p>
                  </div>
                  <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-foreground/80">
                    Any published battery-life claim will use real measured values after the full depletion test.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
