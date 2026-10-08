"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Download, Mail, MapPin, Radio } from "lucide-react";
import { Github, Linkedin } from "./icons";
import { navSections, profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Magnetic, Reveal, WordReveal } from "./motion";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32" aria-label="Contact">
      {/* backdrop imagery */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/portfolio/kenya-network.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#081018]/85 to-background" />
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-cyan/[0.08] blur-[130px] animate-aurora" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-signal-green">
              Final packet · Open to opportunities
            </p>
          </Reveal>

          {/* giant finale type */}
          <h2 className="mt-8 font-display font-extrabold leading-[0.96] tracking-tight">
            <WordReveal
              text="GOT A SIGNAL"
              className="block text-[clamp(2.8rem,8.5vw,7rem)] text-outline"
            />
            <WordReveal
              text="WORTH CARRYING?"
              delay={0.18}
              className="block text-[clamp(2.8rem,8.5vw,7rem)] text-gradient-signal"
            />
          </h2>

          <Reveal delay={0.28}>
            <p className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Looking for a graduate telecom engineer ready to learn and contribute? I&apos;m open to
              graduate telecommunications, network engineering, RF, transmission, IoT and
              infrastructure opportunities.
            </p>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={0.3}>
                <Button asChild size="lg" className="group h-14 px-8 text-base font-semibold shadow-[0_0_48px_-8px_rgba(56,189,248,0.85)]">
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="mr-2.5 h-5 w-5" />
                    Email Brian
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.22}>
                <Button asChild size="lg" variant="outline" className="h-14 border-line-bright px-8 text-base font-medium backdrop-blur">
                  <a href={profile.cvUrl} download="brian-kipkemoi-cv.pdf">
                    <Download className="mr-2.5 h-5 w-5" />
                    Download CV
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.22}>
                <Button asChild size="lg" variant="outline" className="h-14 border-line-bright px-8 text-base font-medium backdrop-blur">
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2.5 h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.44}>
            <p className="mt-10 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-signal-cyan" />
              {profile.location}
              <span className="text-line-bright">·</span>
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-signal-green animate-pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-green" />
                </span>
                Available for graduate roles
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-[#060d16]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-signal-cyan/30 bg-signal-cyan/[0.08]">
              <Radio className="h-4 w-4 text-signal-cyan" />
            </span>
            <div>
              <p className="text-sm font-semibold">{profile.fullName}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                {profile.professionalTitle}
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Footer navigation">
            {navSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-xs text-muted-foreground transition-colors hover:text-signal-cyan"
              >
                {s.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-signal-cyan" aria-label="GitHub">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-signal-cyan" aria-label="LinkedIn">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line/50 pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70 sm:flex-row">
          <p>© 2026 {profile.fullName} · Nairobi, Kenya (EAT)</p>
          <p className="flex items-center gap-2">
            Built with Next.js · Framer Motion · Recharts
            <span className="h-1 w-1 rounded-full bg-signal-green" />
            <span className="text-signal-green/80">signal stable</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 700);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-signal-cyan/40 bg-[#0d1620]/90 text-signal-cyan shadow-[0_0_24px_-6px_rgba(56,189,248,0.6)] backdrop-blur transition-transform hover:-translate-y-1"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4.5 w-4.5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
