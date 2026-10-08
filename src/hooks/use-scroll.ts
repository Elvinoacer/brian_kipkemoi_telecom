"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which page section is currently in view for nav highlighting.
 */
export function useActiveSection(ids: string[], offset = 140) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const handler = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) {
          current = id;
        }
      }
      // Snap to last section when near the bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 160) {
        current = ids[ids.length - 1] ?? current;
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids, offset]);

  return active;
}

/**
 * Scroll progress from 0 to 1.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return progress;
}
