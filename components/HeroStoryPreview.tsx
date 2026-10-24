"use client";

import { useEffect, useState } from "react";
import { useScrollMotion } from "./SmoothScroll";

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=720&q=80";

/** Декоративное превью Stories с фото в стиле Instagram */
export function HeroStoryPreview() {
  const { scroll, velocity } = useScrollMotion();
  const [motionPrefs, setMotionPrefs] = useState({
    reduce: false,
    mobile: false,
  });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    setMotionPrefs({ reduce, mobile });

    function onResize() {
      setMotionPrefs({
        reduce: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        mobile: window.matchMedia("(max-width: 1023px)").matches,
      });
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const baseRotate = motionPrefs.mobile ? 0 : 5;
  const lift = motionPrefs.reduce ? 0 : Math.min(scroll * 0.14, 72);
  const tilt = motionPrefs.reduce
    ? 0
    : Math.max(-6, Math.min(6, velocity * 0.04));
  const float = motionPrefs.reduce
    ? 0
    : Math.sin(scroll / 220) * 6;

  return (
    <div className="hero-story-preview" aria-hidden>
      <div
        className="hero-story-preview__phone"
        style={{
          transform: `translate3d(0, ${lift + float}px, 0) rotate(${baseRotate + tilt}deg)`,
        }}
      >
        <div className="hero-story-preview__notch" />
        <div className="hero-story-preview__screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_PHOTO}
            alt=""
            className="hero-story-preview__photo"
            width={360}
            height={640}
            loading="eager"
            decoding="async"
            style={
              motionPrefs.reduce
                ? undefined
                : {
                    transform: `scale(${1.06 + scroll * 0.00008}) translate3d(0, ${scroll * 0.03}px, 0)`,
                  }
            }
          />
          <div className="hero-story-preview__fade" />
          <div className="hero-story-preview__caption">
            <p className="hero-story-preview__label">Story</p>
            <p className="hero-story-preview__title">Новый вайб</p>
            <div className="hero-story-preview__chip">Опрос · Нравится?</div>
          </div>
        </div>
      </div>
    </div>
  );
}
