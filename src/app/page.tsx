"use client";

import { useState } from "react";
import { projects as projectsList, type Project } from "@/data/portfolio";
import { Preloader } from "@/components/portfolio/preloader";
import { CustomCursor } from "@/components/portfolio/cursor";
import { DotNav } from "@/components/portfolio/dot-nav";
import { SiteNav } from "@/components/portfolio/nav";
import { Hero } from "@/components/portfolio/hero";
import { Snapshot } from "@/components/portfolio/snapshot";
import { FeaturedProject } from "@/components/portfolio/featured-project";
import { ProjectsGrid } from "@/components/portfolio/projects";
import { Experience } from "@/components/portfolio/experience";
import { Capabilities } from "@/components/portfolio/capabilities";
import { Skills } from "@/components/portfolio/skills";
import { Education } from "@/components/portfolio/education";
import { Timeline } from "@/components/portfolio/timeline";
import { Learning } from "@/components/portfolio/learning";
import { Philosophy } from "@/components/portfolio/philosophy";
import { Contact, Footer, BackToTop } from "@/components/portfolio/contact";
import { ProjectDialog } from "@/components/portfolio/project-dialog";

export default function Home() {
  const [dialogProject, setDialogProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openProject = (p: Project) => {
    setDialogProject(p);
    setDialogOpen(true);
  };

  const openNextProject = () => {
    setDialogProject((current) => {
      if (!current) return current;
      const idx = projectsList.findIndex((p) => p.slug === current.slug);
      const next = projectsList[(idx + 1) % projectsList.length];
      return next ?? current;
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <a
        href="#snapshot"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-signal-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#05141f]"
      >
        Skip to content
      </a>

      <Preloader />
      <CustomCursor />
      <SiteNav />
      <DotNav />

      {/* global film grain */}
      <div
        className="pointer-events-none fixed inset-0 z-[90] bg-grain opacity-[0.05] mix-blend-overlay"
        aria-hidden
      />

      <main className="flex-1">
        <Hero />
        <Snapshot />
        <FeaturedProject onOpen={openProject} />
        <ProjectsGrid onOpen={openProject} />
        <Experience />
        <Capabilities />
        <Skills />
        <Education />
        <Timeline />
        <Learning />
        <Philosophy />
        <Contact />
      </main>

      <Footer />
      <BackToTop />

      <ProjectDialog
        project={dialogProject}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onNext={openNextProject}
      />
    </div>
  );
}
