"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categoryMeta, projects, type Project, type ProjectCategory } from "@/data/portfolio";
import { SectionHeading, TiltCard } from "./motion";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "wireless", label: "Wireless / IoT" },
  { id: "networking", label: "Networking" },
  { id: "transmission", label: "Transmission" },
  { id: "signal-processing", label: "Signal Processing" },
  { id: "embedded", label: "Embedded" },
];

export function ProjectsGrid({ onOpen }: { onOpen: (p: Project) => void }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="relative py-20 sm:py-28" aria-label="Engineering projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="02"
            eyebrow="Selected Engineering Work"
            title={
              <>
                Projects that follow the{" "}
                <span className="bg-gradient-to-r from-signal-green to-signal-cyan bg-clip-text text-transparent">
                  signal end-to-end
                </span>
              </>
            }
            description="Six case studies across wireless, networking, transmission, signal processing and embedded connectivity — each with its evidence, calculations and honest lessons."
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            {visible.length} {visible.length === 1 ? "project" : "projects"} shown
          </motion.div>
        </div>

        {/* filters */}
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
          {filters.map((f) => {
            const active = filter === f.id;
            const count = f.id === "all" ? projects.length : projects.filter((p) => p.category === f.id).length;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "group relative rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300",
                  active
                    ? "border-signal-cyan/50 bg-signal-cyan/[0.1] text-signal-cyan"
                    : "border-line bg-surface/50 text-muted-foreground hover:border-line-bright hover:text-foreground"
                )}
              >
                {f.label}
                <span className={cn("ml-2 text-[9px]", active ? "text-signal-cyan/80" : "text-muted-foreground/60")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* grid */}
        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => {
              const cat = categoryMeta[p.category];
              return (
                <motion.article
                  layout
                  key={p.slug}
                  initial={{ opacity: 0, y: 32, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <TiltCard
                    maxTilt={5}
                    className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 transition-[border-color,box-shadow] duration-300 hover:border-signal-cyan/40 hover:shadow-[0_24px_60px_-24px_rgba(56,189,248,0.4)]"
                  >
                    <div
                      className="flex h-full flex-col outline-none"
                      onClick={() => onOpen(p)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onOpen(p);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Open case study: ${p.title}`}
                      data-cursor=""
                      data-cursor-text="OPEN"
                    >
                  {/* image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    />
                    {/* sheen sweep on hover */}
                    <span
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[340%]"
                      aria-hidden
                    />
                    {/* index watermark */}
                    <span
                      className="pointer-events-none absolute bottom-2 right-3 select-none font-display text-5xl font-extrabold text-outline-faint opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" aria-hidden />
                    <div className="absolute left-3 top-3 flex gap-2">
                      <span
                        className="rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] backdrop-blur"
                        style={{ borderColor: `${cat.color}55`, color: cat.color, background: "rgba(8,16,24,0.75)" }}
                      >
                        {cat.label}
                      </span>
                      {p.featured && (
                        <span className="rounded-full border border-signal-green/50 bg-[#081018]/75 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-signal-green backdrop-blur">
                          ★ Flagship
                        </span>
                      )}
                    </div>
                    <span className="absolute right-3 top-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/90 backdrop-blur">
                      {p.year}
                    </span>
                  </div>

                  {/* body */}
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{p.type}</p>
                    <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight text-foreground">
                      {p.shortTitle}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">{p.tagline}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 4).map((t) => (
                        <span key={t} className="rounded border border-line bg-elevated px-2 py-0.5 font-mono text-[10px] text-foreground/75">
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 4 && (
                        <span className="rounded border border-line bg-elevated px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                          +{p.tech.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-5">
                      <div className="flex gap-4">
                        {p.metrics.slice(0, 2).map((m) => (
                          <div key={m.label}>
                            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">{m.label}</p>
                            <p className="font-mono text-xs font-bold" style={{ color: cat.color }}>{m.value}</p>
                          </div>
                        ))}
                      </div>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-signal-cyan opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Case study
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* hover beam */}
                  <span
                    className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-signal-cyan to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                    </div>
                  </TiltCard>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
