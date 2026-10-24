"use client";

import { useScrollMotion } from "./SmoothScroll";

export function AmbientBackground() {
  const { scroll, progress } = useScrollMotion();

  const offset = {
    x: Math.sin(scroll / 420) * 22 + progress * 12,
    y: scroll * 0.18,
  };

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="ambient-orb ambient-orb-a"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y * 0.55}px, 0) scale(${1 + progress * 0.06})`,
        }}
      />
      <div
        className="ambient-orb ambient-orb-b"
        style={{
          transform: `translate3d(${-offset.x * 0.75}px, ${offset.y * 0.38}px, 0) scale(${1 + progress * 0.04})`,
        }}
      />
      <div
        className="ambient-orb ambient-orb-c"
        style={{
          transform: `translate3d(${offset.x * 0.45}px, ${offset.y * 0.28}px, 0)`,
        }}
      />
      <div
        className="ambient-grid"
        style={{ transform: `translate3d(0, ${scroll * 0.04}px, 0)` }}
      />
      <div className="ambient-vignette" />
    </div>
  );
}
