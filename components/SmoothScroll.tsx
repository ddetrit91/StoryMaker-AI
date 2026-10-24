"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ScrollMotion = {
  scroll: number;
  velocity: number;
  progress: number;
};

const ScrollMotionContext = createContext<ScrollMotion>({
  scroll: 0,
  velocity: 0,
  progress: 0,
});

export function useScrollMotion() {
  return useContext(ScrollMotionContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [motion, setMotion] = useState<ScrollMotion>({
    scroll: 0,
    velocity: 0,
    progress: 0,
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("lenis", "lenis-smooth");

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
      wheelMultiplier: 0.95,
    });

    lenis.on("scroll", ({ scroll, velocity, progress }) => {
      setMotion({ scroll, velocity, progress });
    });

    let frame = 0;
    function onFrame(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(onFrame);
    }
    frame = requestAnimationFrame(onFrame);

    function onAnchorClick(event: MouseEvent) {
      const target = event.currentTarget;
      if (!(target instanceof HTMLAnchorElement)) return;
      const href = target.getAttribute("href");
      if (!href?.startsWith("#") || href.length < 2) return;
      event.preventDefault();
      lenis.scrollTo(href, { offset: -72 });
    }

    const anchors = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    );
    for (const anchor of anchors) {
      anchor.addEventListener("click", onAnchorClick);
    }

    return () => {
      cancelAnimationFrame(frame);
      for (const anchor of anchors) {
        anchor.removeEventListener("click", onAnchorClick);
      }
      lenis.destroy();
      root.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  const value = useMemo(() => motion, [motion]);

  return (
    <ScrollMotionContext.Provider value={value}>
      {children}
    </ScrollMotionContext.Provider>
  );
}
