"use client";

import { useCallback, useState } from "react";
import type {
  GenerateRequest,
  StorySeries,
  TemplateId,
} from "@/lib/types";
import { AmbientBackground } from "./AmbientBackground";
import { ErrorBanner } from "./ErrorBanner";
import { Header } from "./Header";
import { HeroStoryPreview } from "./HeroStoryPreview";
import { StoryForm } from "./StoryForm";
import { Reveal } from "./Reveal";
import { ScrollProgress } from "./ScrollProgress";
import { StoryResults } from "./StoryResults";

export function HomeClient() {
  const [series, setSeries] = useState<StorySeries | null>(null);
  const [formData, setFormData] = useState<GenerateRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [templateId, setTemplateId] = useState<TemplateId>("soft_blush");

  const generate = useCallback(async (data: GenerateRequest) => {
    setFormData(data);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stories/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          typeof payload.error === "string"
            ? payload.error
            : "Не удалось сгенерировать сторис",
        );
      }

      setSeries(payload as StorySeries);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Произошла ошибка при генерации";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleRegenerate() {
    if (formData) void generate(formData);
  }

  return (
    <div id="top" className="relative flex min-h-dvh flex-col overflow-x-hidden">
      <ScrollProgress />
      <AmbientBackground />
      <Header />

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        <section className="mb-8 grid grid-cols-1 items-center gap-6 lg:mb-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10">
          <div className="min-w-0 max-w-2xl">
            <Reveal delay={0}>
              <p className="mb-3 text-sm text-muted">AI-генератор для бизнеса</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-[family-name:var(--font-cormorant)] text-4xl leading-[1.08] tracking-tight text-text sm:text-5xl md:text-6xl lg:text-7xl">
                StoryMaker AI
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
                Заполните короткое брифо и получите серию из трёх готовых Instagram
                Stories: текст, визуальную идею, интерактив и рекомендации по
                оформлению.
              </p>
            </Reveal>
          </div>

          <Reveal className="mx-auto w-[148px] shrink-0 sm:w-[168px] lg:mx-0 lg:w-[200px]" delay={220} variant="scale">
            <HeroStoryPreview />
          </Reveal>
        </section>

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <Reveal
            className="relative z-20 w-full min-w-0 lg:sticky lg:top-24 lg:self-start"
            delay={0}
            variant="left"
          >
            <StoryForm loading={loading} onSubmit={generate} />
          </Reveal>

          <Reveal className="relative z-10 w-full min-w-0 space-y-4" delay={120} variant="right">
            {error ? (
              <ErrorBanner message={error} onRetry={handleRegenerate} />
            ) : null}
            <StoryResults
              series={series}
              loading={loading}
              formData={formData}
              templateId={templateId}
              onTemplateChange={setTemplateId}
              onRegenerate={handleRegenerate}
            />
          </Reveal>
        </div>
      </main>

      <Reveal as="footer" className="relative z-10 border-t border-border/70 py-6 text-center text-xs text-muted" delay={0}>
        StoryMaker AI · контент генерируется через Gemini · не выдумывает факты,
        которых нет в вашей форме
      </Reveal>
    </div>
  );
}
