"use client";

import { useEffect, useState } from "react";

export function AmbientBackground() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    function onScroll() {
      const y = window.scrollY;
      setOffset({
        x: Math.sin(y / 480) * 18,
        y: y * 0.12,
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="ambient-orb ambient-orb-a"
        style={{ transform: `translate3d(${offset.x}px, ${offset.y * 0.55}px, 0)` }}
      />
      <div
        className="ambient-orb ambient-orb-b"
        style={{ transform: `translate3d(${-offset.x * 0.7}px, ${offset.y * 0.35}px, 0)` }}
      />
      <div
        className="ambient-orb ambient-orb-c"
        style={{ transform: `translate3d(${offset.x * 0.4}px, ${offset.y * 0.25}px, 0)` }}
      />
      <div className="ambient-grid" />
      <div className="ambient-vignette" />
    </div>
  );
}
