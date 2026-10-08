"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";

/* ══ Shared easing ═══════════════════════════════════════════════════════ */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SOFT = [0.21, 0.47, 0.32, 0.98] as const;

/* ── Reveal-on-scroll wrapper ─────────────────────────────────────────── */

const directions = {
  up: { y: 36, x: 0 },
  down: { y: -36, x: 0 },
  left: { x: 44, y: 0 },
  right: { x: -44, y: 0 },
  none: { x: 0, y: 0 },
} as const;

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  direction?: keyof typeof directions;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const offset = reduce ? { x: 0, y: 0 } : directions[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE_SOFT }}
    >
      {children}
    </motion.div>
  );
}

/* ── Staggered children container ─────────────────────────────────────── */

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SOFT },
  },
};

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

/* ── WordReveal — masked word-by-word rise for headlines ──────────────── */
/* The signature elite entrance: each word rises out of its own clip mask.  */

export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="[display:contents]">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "115%", rotate: 4 }}
              whileInView={{ y: "0%", rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: delay + i * stagger, ease: EASE_OUT_EXPO }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* ── Magnetic — element gravitates toward the cursor ──────────────────── */

export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useRef(false);

  useEffect(() => {
    fine.current = window.matchMedia("(pointer: fine)").matches;
  }, []);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !fine.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-300 ease-out ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/* ── TiltCard — perspective tilt + moving glare highlight ─────────────── */

export function TiltCard({
  children,
  className,
  maxTilt = 7,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useRef(false);

  useEffect(() => {
    fine.current = window.matchMedia("(pointer: fine)").matches;
  }, []);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !fine.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * maxTilt;
    const ry = (px - 0.5) * maxTilt;
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.012, 1.012, 1)`;
    if (glare && glareRef.current) {
      glareRef.current.style.background = `radial-gradient(420px circle at ${px * 100}% ${py * 100}%, rgba(125, 211, 252, 0.13), transparent 55%)`;
    }
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    if (glareRef.current) glareRef.current.style.background = "transparent";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d] ${className ?? ""}`}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-[background] duration-100"
          aria-hidden
        />
      )}
    </div>
  );
}

/* ── Parallax — scroll-linked vertical drift ──────────────────────────── */

export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const smooth = useSpring(y, { stiffness: 90, damping: 24, mass: 0.5 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y: smooth }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/* ── Count-up number ──────────────────────────────────────────────────── */

export function CountUp({
  to,
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          if (reduce) {
            setDisplay(to);
            return;
          }
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / (duration * 1000));
            // ease-out cubic
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(eased * to));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/* ── Section heading — display-grade, watermark index ─────────────────── */

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`relative ${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}>
      {/* watermark index */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-10 select-none font-display text-[7rem] font-extrabold leading-none text-outline-faint sm:text-[9rem] ${
          align === "center" ? "left-1/2 -translate-x-1/2" : "-left-3 sm:-left-6"
        }`}
      >
        {index}
      </span>

      <Reveal>
        <div
          className={`relative flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] uppercase text-signal-cyan ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="text-muted-foreground/70">/{index}</span>
          <span className="h-px w-8 bg-signal-cyan/50" aria-hidden />
          <span>{eyebrow}</span>
        </div>
      </Reveal>

      <div className="relative mt-4">
        <h2 className="font-display text-balance text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h2>
      </div>

      {description ? (
        <Reveal delay={0.18}>
          <p className="relative mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
