"use client";

import { resolveNicheLabel } from "@/lib/prompts";
import type {
  GenerateRequest,
  StorySeries,
  TemplateId,
} from "@/lib/types";
import { CopyButton } from "./CopyButton";
import { ExportPdfButton } from "./ExportPdfButton";
import { formatStoryText, StoryCard } from "./StoryCard";
import { TemplatePicker } from "./TemplatePicker";

interface StoryResultsProps {
  series: StorySeries | null;
  loading: boolean;
  formData: GenerateRequest | null;
  templateId: TemplateId;
  onTemplateChange: (id: TemplateId) => void;
  onRegenerate: () => void;
}

export function StoryResults({
  series,
  loading,
  formData,
  templateId,
  onTemplateChange,
  onRegenerate,
}: StoryResultsProps) {
  if (!series && !loading) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-border bg-surface px-5 py-10 text-center sm:min-h-[320px] sm:px-6 sm:py-12">
        <p className="font-[family-name:var(--font-cormorant)] text-2xl text-text">
          Здесь появится серия из 3 Stories
        </p>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Заполните форму и нажмите «Сгенерировать сторис» — получите тексты,
          идеи визуала и рекомендации по оформлению.
        </p>
      </div>
    );
  }

  const allText = series
    ? series.stories
        .map((story, index) => formatStoryText(story, index))
        .join("\n\n—\n\n")
    : "";

  const nicheLabel = formData ? resolveNicheLabel(formData) : "Бизнес";

  return (
    <div className="relative space-y-5">
      {loading ? (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-[1.75rem] bg-bg/70 backdrop-blur-[2px]"
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface px-6 py-5 shadow-lg">
            <span
              className="h-8 w-8 animate-spin-slow rounded-full border-2 border-accent/30 border-t-accent"
              aria-hidden
            />
            <p className="text-sm text-muted">Создаём серию сторис…</p>
          </div>
        </div>
      ) : null}

      {series ? (
        <>
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-text sm:text-3xl">
                Ваша серия
              </h2>
              <p className="mt-1 text-sm text-muted">
                Три готовые Stories для {nicheLabel.toLowerCase()}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <CopyButton text={allText} label="Копировать все" />
              <ExportPdfButton
                series={series}
                templateId={templateId}
                nicheLabel={nicheLabel}
              />
              <button
                type="button"
                onClick={onRegenerate}
                disabled={loading || !formData}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3.5 text-sm font-medium text-text transition hover:border-accent hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M4 12a8 8 0 0 1 13.7-5.6M20 12a8 8 0 0 1-13.7 5.6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 3.5V8h-4.5M6 20.5V16H10.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Сгенерировать снова
              </button>
            </div>
          </div>

          <TemplatePicker
            value={templateId}
            onChange={onTemplateChange}
            disabled={loading}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {series.stories.map((story, index) => (
              <StoryCard
                key={`${story.title}-${index}`}
                story={story}
                index={index}
                templateId={templateId}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
