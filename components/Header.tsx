"use client";

import { useScrollMotion } from "./SmoothScroll";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { scroll, velocity } = useScrollMotion();
  const scrolled = scroll > 20;
  const hideNudge = Math.min(Math.abs(velocity) * 0.08, 8);

  return (
    <header
      className={`site-header sticky top-0 z-40 border-b border-border/70 bg-bg/80 backdrop-blur-md transition-[box-shadow,border-color,transform] duration-500${scrolled ? " site-header--scrolled" : ""}`}
      style={{
        transform: scrolled ? `translate3d(0, ${hideNudge * 0.15}px, 0)` : undefined,
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-semibold text-white shadow-[0_6px_18px_-8px_rgba(232,164,184,0.9)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
            aria-hidden
          >
            S
          </span>
          <span className="font-[family-name:var(--font-cormorant)] text-xl tracking-tight text-text transition-colors duration-300 group-hover:text-accent sm:text-2xl">
            StoryMaker AI
          </span>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
