"use client";

import { getTemplate } from "@/lib/story-templates";
import {
  INTERACTIVE_LABELS,
  type StoryItem,
  type TemplateId,
} from "@/lib/types";
import { CopyButton } from "./CopyButton";

interface StoryCardProps {
  story: StoryItem;
  index: number;
  templateId: TemplateId;
  compact?: boolean;
}

export function formatStoryText(story: StoryItem, index: number): string {
  return [
    `Сторис ${index + 1}: ${story.title}`,
    "",
    story.text,
    "",
    `Интерактив (${INTERACTIVE_LABELS[story.interactive.type]}): ${story.interactive.content}`,
  ].join("\n");
}

export function StoryCard({
  story,
  index,
  templateId,
  compact = false,
}: StoryCardProps) {
  const tpl = getTemplate(templateId);

  return (
    <article
      className="flex flex-col gap-3 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mx-auto w-full max-w-[280px]">
        <div
          className="rounded-[1.6rem] p-2 shadow-[0_24px_48px_-28px_rgba(46,42,39,0.55)]"
          style={tpl.frameStyle}
        >
          <div
            className="relative flex flex-col overflow-hidden rounded-[1.2rem]"
            style={{
              aspectRatio: "9 / 16",
              background: tpl.screenBackground,
              color: tpl.bodyColor,
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-8 top-3 z-10 h-1.5 rounded-full"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
              aria-hidden
            />
            <div className="story-card-scroll relative min-h-0 flex-1 px-5 pb-4 pt-8">
              <p
                className="mb-2 text-[11px] uppercase tracking-[0.16em]"
                style={{ color: tpl.labelColor }}
              >
                Story {index + 1}
              </p>
              <h3
                className="font-[family-name:var(--font-cormorant)] text-[1.7rem] font-semibold leading-tight"
                style={{ color: tpl.titleColor }}
              >
                {story.title}
              </h3>
              <p
                className="mt-3 whitespace-pre-line text-sm leading-relaxed"
                style={{ color: tpl.bodyColor }}
              >
                {story.text}
              </p>
              <div
                className="mt-5 rounded-2xl px-3 py-2.5 text-xs leading-snug"
                style={tpl.chipStyle}
              >
                <span className="font-bold">
                  {INTERACTIVE_LABELS[story.interactive.type]}
                </span>
                <span style={{ opacity: 0.9 }}>
                  {" "}
                  · {story.interactive.content}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!compact ? (
        <div className="space-y-3 rounded-2xl border border-border bg-surface/80 p-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Визуал
            </p>
            <p className="mt-1 text-sm text-text">{story.visualIdea}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Оформление
            </p>
            <p className="mt-1 text-sm text-text">
              {story.design.background}. Текст: {story.design.textPlacement}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {story.design.colors.map((color) => (
                <span
                  key={`${index}-${color}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-2 py-1 text-xs text-muted"
                >
                  <span
                    className="h-3 w-3 rounded-full border border-black/10"
                    style={{ background: color }}
                    aria-hidden
                  />
                  {color}
                </span>
              ))}
            </div>
          </div>
          <CopyButton text={formatStoryText(story, index)} label="Копировать текст" />
        </div>
      ) : null}
    </article>
  );
}
