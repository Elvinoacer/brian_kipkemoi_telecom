"use client";

import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cog,
  Cpu,
  FlaskConical,
  Gauge,
  GraduationCap,
  ListChecks,
  Network,
  Sigma,
  Target,
  Wrench,
} from "lucide-react";
import { categoryMeta, type Project } from "@/data/portfolio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RssiChart, PdrChart, BerChart } from "./charts";
import { LoraArchitecture } from "./lora-architecture";

/* ── small building blocks ────────────────────────────────────────────── */

function StudySection({
  index,
  icon: Icon,
  title,
  children,
}: {
  index: string;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line/70 pt-6 first:border-t-0 first:pt-0">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-signal-cyan/25 bg-signal-cyan/[0.07]">
          <Icon className="h-4 w-4 text-signal-cyan" />
        </span>
        <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/90">
          <span className="mr-2 text-signal-cyan/70">{index}</span>
          {title}
        </h4>
      </div>
      {children}
    </section>
  );
}

function BulletList({ items, accent = "#38bdf8" }: { items: string[]; accent?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
          <span className="text-foreground/80">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ChipList({ items, color }: { items: string[]; color?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-md border border-line bg-elevated px-2.5 py-1 font-mono text-[11px] text-foreground/85"
          style={color ? { borderColor: `${color}44`, color } : undefined}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

/* ── the dialog ───────────────────────────────────────────────────────── */

export function ProjectDialog({
  project,
  open,
  onOpenChange,
  onNext,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onNext?: () => void;
}) {
  const p = project;
  if (!p) return null;

  const cat = categoryMeta[p.category];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-hidden border-line bg-[#0a1420] p-0 sm:max-w-4xl">
        {/* ── header banner ── */}
        <div className="relative h-44 shrink-0 sm:h-52">
          <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 640px) 900px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-[#0a1420]/55 to-[#0a1420]/20" aria-hidden />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-signal-cyan/40 bg-[#081018]/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-cyan-soft backdrop-blur">
                {p.type} · {p.year}
              </span>
              <span
                className="rounded-full border bg-[#081018]/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] backdrop-blur"
                style={{ borderColor: `${cat.color}55`, color: cat.color }}
              >
                {cat.label}
              </span>
            </div>
          </div>
          <DialogHeader className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <DialogTitle className="text-balance text-xl font-semibold leading-tight sm:text-2xl">
              {p.title}
            </DialogTitle>
            <DialogDescription className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <span>Role · {p.role}</span>
              <span>Duration · {p.duration}</span>
              {p.teamSize && <span>Team · {p.teamSize}</span>}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* ── scrollable study ── */}
        <div className="max-h-[calc(92vh-14rem)] overflow-y-auto overflow-x-hidden sm:max-h-[calc(92vh-16rem)]">
          <div className="space-y-8 px-5 py-6 sm:px-8">
            {/* summary + tech */}
            <div>
              <p className="text-pretty text-sm leading-relaxed text-foreground/85 sm:text-[15px]">{p.summary}</p>
              <div className="mt-4"><ChipList items={p.tech} color={cat.color} /></div>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {p.metrics.map((m) => (
                  <div key={m.label} className="rounded-lg border border-line bg-surface/70 p-3 text-center">
                    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">{m.label}</p>
                    <p className="mt-1 font-mono text-sm font-bold" style={{ color: cat.color }}>{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <StudySection index="01" icon={Target} title="The Problem">
              <p className="text-sm leading-relaxed text-foreground/80">{p.problem}</p>
            </StudySection>

            <StudySection index="02" icon={ListChecks} title="Requirements">
              <BulletList items={p.requirements} accent={cat.color} />
            </StudySection>

            <StudySection index="03" icon={AlertTriangle} title="Constraints">
              <BulletList items={p.constraints} accent="#fbbf24" />
            </StudySection>

            <StudySection index="04" icon={Network} title="System Architecture">
              {p.slug === "lora-telemetry" ? (
                <LoraArchitecture />
              ) : (
                <div className="space-y-2">
                  {p.architecture.map((a) => (
                    <div key={a} className="rounded-lg border border-line bg-surface/60 px-4 py-2.5 font-mono text-xs leading-relaxed text-foreground/80">
                      {a}
                    </div>
                  ))}
                </div>
              )}
            </StudySection>

            {p.calculations && (
              <StudySection index="05" icon={Sigma} title="Design Calculations">
                <div className="overflow-hidden rounded-xl border border-line">
                  {p.calculations.map((c, i) => (
                    <div
                      key={c.label}
                      className={`grid grid-cols-[1fr_auto] items-baseline gap-3 px-4 py-3 ${
                        i % 2 === 0 ? "bg-surface/60" : "bg-transparent"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground/90">{c.label}</p>
                        {c.note && <p className="mt-0.5 font-mono text-[10px] text-muted-foreground/80">{c.note}</p>}
                      </div>
                      <p className="font-mono text-sm font-bold" style={{ color: cat.color }}>{c.value}</p>
                    </div>
                  ))}
                </div>
              </StudySection>
            )}

            {(p.hardware || p.software) && (
              <StudySection index="06" icon={Cpu} title="Hardware & Software">
                <div className="grid gap-4 sm:grid-cols-2">
                  {p.hardware && (
                    <div className="rounded-xl border border-line bg-surface/60 p-4">
                      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-cyan">Hardware</p>
                      <BulletList items={p.hardware} accent="#38bdf8" />
                    </div>
                  )}
                  {p.software && (
                    <div className="rounded-xl border border-line bg-surface/60 p-4">
                      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-violet">Software</p>
                      <BulletList items={p.software} accent="#a78bfa" />
                    </div>
                  )}
                </div>
              </StudySection>
            )}

            <StudySection index="07" icon={Cog} title="Protocols">
              <ChipList items={p.protocols} />
            </StudySection>

            {p.testing && (
              <StudySection index="08" icon={FlaskConical} title="Testing & Verification">
                <BulletList items={p.testing} accent="#34d399" />
              </StudySection>
            )}

            {/* project-specific evidence visualizations */}
            {p.slug === "lora-telemetry" && p.fieldTestData && (
              <StudySection index="08b" icon={Gauge} title="Field Measurements">
                <div className="rounded-xl border border-line bg-surface/60 p-4">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Signal performance vs distance
                  </p>
                  <RssiChart data={p.fieldTestData} syncId="dialog-rssi" />
                  <div className="mt-4">
                    <PdrChart data={p.fieldTestData} syncId="dialog-rssi" />
                  </div>
                </div>
                <div className="mt-4 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[560px] text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-line bg-surface/80 text-[10px] uppercase tracking-wider text-muted-foreground">
                        <th className="px-4 py-2.5 font-medium">Distance</th>
                        <th className="px-4 py-2.5 font-medium">RSSI</th>
                        <th className="px-4 py-2.5 font-medium">SNR</th>
                        <th className="px-4 py-2.5 font-medium">Sent / Recv</th>
                        <th className="px-4 py-2.5 font-medium text-signal-green">PDR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.fieldTestData.map((row) => (
                        <tr key={row.distance} className="border-b border-line/60 last:border-0">
                          <td className="px-4 py-2 text-foreground/90">{row.distance}</td>
                          <td className="px-4 py-2 text-signal-cyan">{row.rssi} dBm</td>
                          <td className="px-4 py-2 text-signal-violet">{row.snr} dB</td>
                          <td className="px-4 py-2 text-muted-foreground">{row.sent} / {row.received}</td>
                          <td className="px-4 py-2 font-bold text-signal-green">{row.pdr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 font-mono text-[9px] text-muted-foreground/70">
                  PDR = Packet Delivery Ratio · sample dataset for prototype demonstration
                </p>
              </StudySection>
            )}

            {p.slug === "digital-modulation" && (
              <StudySection index="08b" icon={Gauge} title="BER Performance">
                <div className="rounded-xl border border-line bg-surface/60 p-4">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Theoretical BER vs Eb/N0 · AWGN
                  </p>
                  <BerChart />
                </div>
              </StudySection>
            )}

            <StudySection index="09" icon={CheckCircle2} title="Results">
              <BulletList items={p.results} accent="#34d399" />
            </StudySection>

            {p.limitations && (
              <StudySection index="10" icon={AlertTriangle} title="Limitations & What Failed">
                <BulletList items={p.limitations} accent="#f87171" />
              </StudySection>
            )}

            <StudySection index="11" icon={BookOpen} title="Engineering Lessons">
              <blockquote className="rounded-xl border-l-2 border-signal-cyan bg-signal-cyan/[0.05] px-5 py-4 text-sm italic leading-relaxed text-foreground/90">
                “{p.lessons}”
              </blockquote>
            </StudySection>

            <StudySection index="12" icon={Wrench} title="Future Improvements">
              <div className="grid gap-2 sm:grid-cols-2">
                {p.improvements.map((imp) => (
                  <div key={imp} className="rounded-lg border border-line bg-surface/60 px-4 py-2.5 text-sm text-foreground/80">
                    {imp}
                  </div>
                ))}
              </div>
            </StudySection>
          </div>
        </div>

        {/* ── footer actions ── */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line bg-surface/70 px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5 text-signal-cyan/70" />
            Evidence-led case study
          </div>
          {onNext && (
            <button
              onClick={onNext}
              className="group flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-xs font-medium text-foreground/85 transition-colors hover:border-signal-cyan/50 hover:text-signal-cyan"
            >
              Next project
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
