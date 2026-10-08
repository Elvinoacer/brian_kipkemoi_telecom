"use client";

import { motion } from "framer-motion";
import { philosophy } from "@/data/portfolio";
import { Reveal } from "./motion";

export function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden py-24 sm:py-32" aria-label="Engineering philosophy">
      {/* backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(56,189,248,0.07),transparent)]" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(50%_50%_at_50%_50%,black,transparent)]" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-signal-cyan">
            Engineering philosophy
          </p>
        </Reveal>

        <div className="mt-8 space-y-2">
          {philosophy.mantra.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.14 * i, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              {i === philosophy.mantra.length - 1 ? (
                <span className="bg-gradient-to-r from-signal-cyan via-signal-green to-signal-cyan bg-clip-text text-transparent text-glow-cyan">
                  {line}
                </span>
              ) : (
                <span className="text-foreground/95">{line}</span>
              )}
            </motion.p>
          ))}
        </div>

        {/* waveform underline */}
        <div className="mx-auto mt-10 max-w-xl" aria-hidden>
          <svg viewBox="0 0 400 24" className="w-full">
            <motion.path
              d="M0 12 Q 12.5 0, 25 12 T 50 12 T 75 12 T 100 12 T 125 12 T 150 12 T 175 12 T 200 12 T 225 12 T 250 12 T 275 12 T 300 12 T 325 12 T 350 12 T 375 12 T 400 12"
              fill="none"
              stroke="url(#philGrad)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.6 }}
            />
            <defs>
              <linearGradient id="philGrad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" stopOpacity="0" />
                <stop offset="0.5" stopColor="#34d399" />
                <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {philosophy.expanded}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
