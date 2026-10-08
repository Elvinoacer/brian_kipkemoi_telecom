"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: an instant dot + lagging ring that magnetizes over
 * interactive elements. Mounts only on fine-pointer devices without
 * reduced-motion preference. Elements can carry:
 *   data-cursor="view"  → expands ring with a label
 *   data-cursor-text="OPEN" → label text (fallback: "VIEW")
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.body.dataset.customCursor = "on";

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
        dot.style.opacity = "0";
        ring.style.opacity = "0";
    };

    const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor]";

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hit = target.closest(INTERACTIVE) as HTMLElement | null;
      if (!hit) {
        targetScale = 1;
        label.textContent = "";
        ring.style.removeProperty("background");
        return;
      }
      if (hit.dataset.cursor !== undefined) {
        targetScale = 2.6;
        label.textContent = hit.dataset.cursorText ?? "VIEW";
        ring.style.background = "rgba(56, 189, 248, 0.16)";
        ring.style.borderColor = "rgba(56, 189, 248, 0.65)";
      } else {
        targetScale = 1.8;
        label.textContent = "";
        ring.style.background = "rgba(56, 189, 248, 0.08)";
        ring.style.borderColor = "rgba(56, 189, 248, 0.55)";
      }
    };

    const loop = () => {
      // dot tracks instantly
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      // ring lerps behind
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += (targetScale - scale) * 0.14;
      const size = 34;
      const half = (size * scale) / 2;
      ring.style.transform = `translate3d(${rx - half}px, ${ry - half}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      delete document.body.dataset.customCursor;
    };
  }, []);

  // Elements render always but stay invisible unless the effect wires them up
  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[95] h-1.5 w-1.5 rounded-full bg-signal-cyan opacity-0 shadow-[0_0_10px_rgba(56,189,248,0.9)]"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[94] flex h-[34px] w-[34px] items-center justify-center rounded-full border border-signal-cyan/40 opacity-0 transition-[background,border-color] duration-200"
        aria-hidden
      >
        <span
          ref={labelRef}
          className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-signal-cyan-soft"
        />
      </div>
    </>
  );
}
