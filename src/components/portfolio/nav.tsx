"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, Radio, X } from "lucide-react";
import { navSections, profile } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteNav() {
  const ids = navSections.map((s) => s.id);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ambient top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(56,189,248,0.08),transparent)]" aria-hidden />

      <div className="border-b border-line/60 bg-[#081018]/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          {/* Brand */}
          <Link href="#top" className="group flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-signal-cyan/30 bg-signal-cyan/[0.08]">
              <Radio className="h-4 w-4 text-signal-cyan" />
              <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-signal-green animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-green" />
              </span>
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-semibold tracking-tight">{profile.fullName}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                Electrical & Telecom Engineer
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`relative rounded-md px-3 py-2 text-[13px] font-medium transition-colors ${
                  active === section.id
                    ? "text-signal-cyan"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.label}
                {active === section.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-md border border-signal-cyan/25 bg-signal-cyan/[0.08]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="hidden font-semibold shadow-[0_0_24px_-6px_rgba(56,189,248,0.6)] sm:inline-flex"
            >
              <a href="#contact">Hire Brian</a>
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 border-line bg-[#0b1520]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-left">
                    <Radio className="h-4 w-4 text-signal-cyan" />
                    {profile.fullName}
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-2 flex flex-col gap-1 px-4" aria-label="Mobile navigation">
                  {navSections.map((section, i) => (
                    <motion.a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium ${
                        active === section.id
                          ? "border-signal-cyan/30 bg-signal-cyan/[0.08] text-signal-cyan"
                          : "border-transparent text-muted-foreground hover:bg-elevated hover:text-foreground"
                      }`}
                    >
                      {section.label}
                      <span className="font-mono text-[9px] text-muted-foreground/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </motion.a>
                  ))}
                  <Button asChild className="mt-3 font-semibold">
                    <a href="#contact" onClick={() => setOpen(false)}>
                      Hire Brian
                    </a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>

        {/* scroll progress */}
        <motion.div
          className="h-[2px] origin-left bg-gradient-to-r from-signal-cyan via-signal-green to-signal-violet"
          style={{ scaleX: progress }}
          aria-hidden
        />
      </div>

      <AnimatePresence>
        {/* Signal strength readout chip — a little telecom easter egg */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="pointer-events-none absolute right-4 top-[72px] hidden items-center gap-2 rounded-full border border-line/70 bg-[#0b1520]/85 px-3 py-1.5 backdrop-blur-md xl:flex"
          aria-hidden
        >
          <div className="flex items-end gap-[2px]">
            {[5, 8, 11, 14].map((h, i) => (
              <motion.span
                key={h}
                className="w-[3px] rounded-sm bg-signal-green"
                animate={{ height: [h - 3, h, h - 3] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.18 }}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] tracking-[0.18em] text-muted-foreground uppercase">
            link ok
          </span>
        </motion.div>
      </AnimatePresence>
    </header>
  );
}
