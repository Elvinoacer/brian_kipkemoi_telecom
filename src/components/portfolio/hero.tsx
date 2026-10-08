"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "./icons";
import { profile, marqueeTerms } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Magnetic, TiltCard, EASE_OUT_EXPO, EASE_SOFT } from "./motion";
import { NetworkCanvas } from "./network-canvas";
import { SignalPath } from "./signal-path";

/* ── live telemetry — gentle random-walk values that tick ─────────────── */

function useTelemetry() {
  const [t, setT] = useState({ rssi: -92.4, snr: 5.2, pdr: 99.1, latency: 812 });

  useEffect(() => {
    const id = window.setInterval(() => {
      setT((prev) => ({
        rssi: Math.min(-85, Math.max(-98, +(prev.rssi + (Math.random() - 0.5) * 1.6).toFixed(1))),
        snr: Math.min(9.5, Math.max(2, +(prev.snr + (Math.random() - 0.5) * 0.8).toFixed(1))),
        pdr: Math.min(99.9, Math.max(96, +(prev.pdr + (Math.random() - 0.5) * 0.6).toFixed(1))),
        latency: Math.min(1200, Math.max(600, Math.round(prev.latency + (Math.random() - 0.5) * 90))),
      }));
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  return t;
}

/* ── rotating role line ───────────────────────────────────────────────── */

const ROLES = [
  { label: "Wireless Networks", color: "text-signal-cyan" },
  { label: "Communication Systems", color: "text-signal-green" },
  { label: "Connected Infrastructure", color: "text-signal-violet" },
];

function RoleRotator() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % ROLES.length), 2600);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-flex h-[1.4em] min-w-0 items-baseline overflow-hidden align-baseline">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROLES[i].label}
          className={`whitespace-nowrap font-semibold ${ROLES[i].color}`}
          initial={reduce ? undefined : { y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={reduce ? undefined : { y: "-105%", opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        >
          {ROLES[i].label}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── word-mask reveal for the giant name ──────────────────────────────── */

function MaskWord({
  children,
  delay,
  className,
}: {
  children: string;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em] align-bottom">
      <motion.span
        className={`inline-block will-change-transform ${className ?? ""}`}
        initial={reduce ? undefined : { y: "112%", rotate: 3 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ duration: 1.05, delay, ease: EASE_OUT_EXPO }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ── hero ─────────────────────────────────────────────────────────────── */

export function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const telemetry = useTelemetry();

  // scroll-linked exit: hero drifts up + fades as you leave it
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.1]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  return (
    <section id="top" ref={heroRef} className="relative overflow-hidden" aria-label="Introduction">
      {/* ══ layered atmosphere ══════════════════════════════════════════ */}
      <motion.div style={reduce ? undefined : { scale: bgScale }} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <NetworkCanvas className="absolute inset-0 h-full w-full opacity-70" />
        {/* aurora blobs */}
        <div
          className="absolute -top-32 left-1/4 h-[34rem] w-[34rem] rounded-full bg-signal-cyan/[0.13] blur-[120px] animate-aurora"
          aria-hidden
        />
        <div
          className="absolute -bottom-40 right-[8%] h-[30rem] w-[30rem] rounded-full bg-signal-violet/[0.11] blur-[130px] animate-aurora-late"
          aria-hidden
        />
        <div
          className="absolute right-1/3 top-1/3 h-[22rem] w-[22rem] rounded-full bg-signal-green/[0.07] blur-[110px] animate-aurora"
          aria-hidden
        />
        <Image
          src="/images/portfolio/hero-abstract.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none absolute inset-0 object-cover opacity-[0.16] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,transparent_40%,#081018_100%)]" aria-hidden />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-7xl px-4 pb-14 pt-32 will-change-transform sm:px-6 sm:pt-36 lg:px-8 lg:pb-20 lg:pt-40"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.18fr_0.82fr] lg:gap-12">
          {/* ══ Left: identity ═════════════════════════════════════════ */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 1.9, duration: 0.7, ease: EASE_SOFT }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-signal-cyan/25 bg-signal-cyan/[0.07] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-signal-cyan-soft backdrop-blur">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal-cyan" />
                <span className="hidden sm:inline">{profile.eyebrow}</span>
                <span className="sm:hidden">B.Eng. Telecom Engineer</span>
              </span>
            </motion.div>

            {/* giant kinetic name */}
            <h1 className="mt-7 font-display font-extrabold leading-[0.94] tracking-tight">
              <span className="block text-[clamp(2.5rem,10.5vw,9.2rem)] text-outline">
                <MaskWord delay={reduce ? 0 : 2.0}>BRIAN</MaskWord>
              </span>
              <span className="block text-[clamp(2.5rem,10.5vw,9.2rem)]">
                <MaskWord delay={reduce ? 0 : 2.12} className="text-gradient-signal">
                  KIPKEMOI
                </MaskWord>
              </span>
            </h1>

            {/* role rotator */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 2.5, duration: 0.7, ease: EASE_SOFT }}
              className="mt-7 font-mono text-sm uppercase tracking-[0.24em] text-muted-foreground sm:text-base"
            >
              <span className="text-signal-cyan">→</span>{" "}
              <RoleRotator />
              <span className="ml-1 inline-block h-3 w-[2px] animate-blink bg-signal-cyan align-middle" aria-hidden />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 2.62, duration: 0.7, ease: EASE_SOFT }}
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {profile.summary}
            </motion.p>

            {/* CTAs — magnetic */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 2.74, duration: 0.7, ease: EASE_SOFT }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.28}>
                <Button asChild size="lg" className="group font-semibold shadow-[0_0_40px_-8px_rgba(56,189,248,0.75)]">
                  <a href="#projects">
                    Explore the Work
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.22}>
                <Button asChild size="lg" variant="outline" className="border-line-bright font-medium backdrop-blur">
                  <a href={profile.cvUrl} download="brian-kipkemoi-cv.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Button asChild size="lg" variant="ghost" className="text-muted-foreground">
                  <a href="#contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </a>
                </Button>
              </Magnetic>
            </motion.div>

            {/* availability + socials */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 2.86, duration: 0.7, ease: EASE_SOFT }}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <span className="flex items-center gap-2.5 text-sm text-foreground/85">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-signal-green" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal-green" />
                </span>
                {profile.availability}
              </span>
              <span className="hidden h-4 w-px bg-line sm:block" aria-hidden />
              <div className="flex items-center gap-1">
                <Button asChild variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-signal-cyan" aria-label="LinkedIn profile">
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4.5 w-4.5" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-signal-cyan" aria-label="GitHub profile">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4.5 w-4.5" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-signal-cyan" aria-label="Send email">
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="h-4.5 w-4.5" />
                  </a>
                </Button>
                <span className="ml-2 hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:flex">
                  <MapPin className="h-3 w-3" />
                  {profile.location}
                </span>
              </div>
            </motion.div>
          </div>

          {/* ══ Right: portrait instrument ════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 2.35, duration: 1, ease: EASE_OUT_EXPO }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <TiltCard maxTilt={6} className="relative">
              <div className="relative">
                {/* RF corner brackets */}
                {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map(
                  (pos) => (
                    <span key={pos} className={`absolute z-10 h-9 w-9 rounded-sm border-signal-cyan/70 ${pos}`} aria-hidden />
                  )
                )}

                <div className="card-glow relative overflow-hidden rounded-2xl border border-line">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={profile.portrait}
                      alt="Portrait of Brian Kipkemoi, graduate electrical and telecommunications engineer"
                      fill
                      priority
                      sizes="(min-width: 1024px) 38vw, 90vw"
                      className="object-cover"
                    />
                    {/* scanline sweep */}
                    {!reduce && (
                      <motion.span
                        className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-signal-cyan/15 to-transparent"
                        animate={{ x: ["-130%", "460%"] }}
                        transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
                        aria-hidden
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081018]/95 via-transparent to-transparent" aria-hidden />

                    {/* identification strip */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-signal-cyan-soft">
                        <span>B.KIPKEMOI · ENGINEER</span>
                        <span className="text-signal-green">● LIVE</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>Moi University · B.Eng.</span>
                        <span>Class of {profile.graduationYear}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* floating telemetry chips */}
                <motion.div
                  className="glass-panel absolute -left-4 top-8 z-20 rounded-lg px-3 py-2 sm:-left-8"
                  animate={reduce ? {} : { y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">LoRa node</p>
                  <p className="font-mono text-xs font-semibold text-signal-green">868 MHz · SF10</p>
                </motion.div>

                <motion.div
                  className="glass-panel absolute -right-3 top-1/3 z-20 rounded-lg px-3 py-2 sm:-right-7"
                  animate={reduce ? {} : { y: [0, 12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Gateway RSSI</p>
                  <p className="font-mono text-xs font-semibold text-signal-cyan">−{Math.abs(telemetry.rssi).toFixed(1)} dBm</p>
                </motion.div>

                <motion.div
                  className="glass-panel absolute -bottom-4 left-8 z-20 rounded-lg px-3 py-2"
                  animate={reduce ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Packet delivery</p>
                  <p className="font-mono text-xs font-semibold text-signal-amber">{telemetry.pdr.toFixed(1)}% @ 1 km</p>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* live telemetry strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 3.0, duration: 0.8, ease: EASE_SOFT }}
          className="glass-panel mt-16 grid grid-cols-2 divide-line/70 rounded-xl sm:grid-cols-4 sm:divide-x lg:mt-20"
        >
          {[
            { k: "RX POWER", v: `${telemetry.rssi.toFixed(1)} dBm`, c: "text-signal-cyan" },
            { k: "SNR", v: `${telemetry.snr.toFixed(1)} dB`, c: "text-signal-green" },
            { k: "PACKET DELIVERY", v: `${telemetry.pdr.toFixed(1)} %`, c: "text-signal-amber" },
            { k: "UPLINK LATENCY", v: `${telemetry.latency} ms`, c: "text-signal-violet" },
          ].map((m) => (
            <div key={m.k} className="flex flex-col gap-1 px-5 py-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{m.k}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={m.v}
                  className={`font-mono text-lg font-bold tabular-nums ${m.c}`}
                  initial={reduce ? undefined : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  {m.v}
                </motion.span>
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* signal path diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 3.1, duration: 0.9, ease: EASE_SOFT }}
          className="mt-14 lg:mt-16"
        >
          <SignalPath />
        </motion.div>

        {/* scroll cue */}
        <motion.a
          href="#snapshot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 3.4 }}
          className="group mt-14 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-signal-cyan"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors group-hover:border-signal-cyan/50">
            <motion.span animate={reduce ? undefined : { y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </span>
          Scroll to decode
        </motion.a>
      </motion.div>

      {/* ══ dual display marquees ══════════════════════════════════════ */}
      <div className="relative border-y border-line/70 bg-[#0a1420]/70 py-5 backdrop-blur-sm" aria-hidden>
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee-slow items-center">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {["FROM SIGNALS TO SERVICE", "ENGINEERING THE INVISIBLE", "CONNECTING THE UNCONNECTED"].map((s) => (
                  <span key={`${copy}-${s}`} className="flex items-center">
                    <span className="px-6 font-display text-3xl font-bold tracking-tight text-foreground/90 sm:text-4xl">
                      {s}
                    </span>
                    <span className="h-3 w-3 rotate-45 bg-signal-cyan/70" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mask-fade-x mt-3 overflow-hidden">
          <div className="flex w-max animate-marquee items-center [animation-direction:reverse]">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {marqueeTerms.map((term) => (
                  <span key={`${copy}-${term}`} className="flex items-center">
                    <span className="px-5 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground/80">
                      {term}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-signal-cyan/50" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
