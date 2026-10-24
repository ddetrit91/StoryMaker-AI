const HERO_PHOTO =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=720&q=80";

/** Декоративное превью Stories с фото в стиле Instagram */
export function HeroStoryPreview() {
  return (
    <div
      className="hero-story-preview"
      aria-hidden
    >
      <div className="hero-story-preview__phone">
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
