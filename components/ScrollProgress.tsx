"use client";

import { useScrollMotion } from "./SmoothScroll";

export function ScrollProgress() {
  const { progress } = useScrollMotion();

  return (
    <div
      className="scroll-progress"
      aria-hidden
      style={{ transform: `scaleX(${Math.max(0, Math.min(1, progress))})` }}
    />
  );
}
