"use client";

import type { CSSProperties } from "react";
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
  enterKey?: string;
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
  enterKey = "0",
}: StoryCardProps) {
  const tpl = getTemplate(templateId);
  const cardDelay = index * 140;

  if (compact) {
    return (
      <article
        className="story-card-enter"
        data-enter={enterKey}
        style={{ animationDelay: `${cardDelay}ms` }}
      >
        <div className="mx-auto w-full max-w-[280px]">
          <div
            className="story-card-enter__frame rounded-[1.6rem] p-2 shadow-[0_24px_48px_-28px_rgba(46,42,39,0.55)]"
            style={
              {
                ...tpl.frameStyle,
                animationDelay: `${cardDelay}ms`,
              } as CSSProperties
            }
          >
            <div
              className="story-preview-screen relative flex w-full flex-col overflow-hidden rounded-[1.2rem]"
              style={{
                background: tpl.screenBackground,
                color: tpl.bodyColor,
              }}
            >
              <StoryPreviewBody
                story={story}
                index={index}
                tpl={tpl}
                cardDelay={cardDelay}
              />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="story-card-stack story-card-enter group/card"
      data-enter={enterKey}
      style={{ animationDelay: `${cardDelay}ms` }}
    >
      <div
        className="story-card-stack__story story-card-enter__frame relative flex min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-border transition duration-500 ease-out group-hover/card:-translate-y-1 group-hover/card:shadow-[0_28px_48px_-28px_rgba(46,42,39,0.55)]"
        style={
          {
            background: tpl.screenBackground,
            color: tpl.bodyColor,
            animationDelay: `${cardDelay}ms`,
          } as CSSProperties
        }
      >
        <StoryPreviewBody
          story={story}
          index={index}
          tpl={tpl}
          cardDelay={cardDelay}
        />
      </div>

      <div
        className="story-card-stack__meta story-card-enter__meta flex min-h-0 w-full flex-col space-y-3 rounded-2xl border border-border bg-surface/80 p-4 transition duration-500 group-hover/card:border-accent/40 group-hover/card:bg-surface"
        style={{ animationDelay: `${520 + index * 140}ms` }}
      >
        <div className="shrink-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Визуал
          </p>
          <p className="mt-1 text-sm text-text">{story.visualIdea}</p>
        </div>
        <div className="min-h-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Оформление
          </p>
          <p className="mt-1 text-sm text-text">
            {story.design.background}. Текст: {story.design.textPlacement}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {story.design.colors.map((color, colorIndex) => (
              <span
                key={`${index}-${color}`}
                className="story-card-enter__swatch inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-2 py-1 text-xs text-muted"
                style={{
                  animationDelay: `${600 + index * 140 + colorIndex * 60}ms`,
                }}
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
        <div className="shrink-0 pt-1">
          <CopyButton text={formatStoryText(story, index)} label="Копировать текст" />
        </div>
      </div>
    </article>
  );
}

function StoryPreviewBody({
  story,
  index,
  tpl,
  cardDelay,
}: {
  story: StoryItem;
  index: number;
  tpl: ReturnType<typeof getTemplate>;
  cardDelay: number;
}) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-8 top-3 z-10 h-1.5 rounded-full"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.12)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] story-card-enter__sheen"
        style={{ animationDelay: `${cardDelay + 180}ms` }}
        aria-hidden
      />
      <div className="relative z-[2] flex min-h-0 flex-1 flex-col px-4 pb-4 pt-8 sm:px-5">
        <div className="story-card-scroll min-h-0 flex-1 overflow-y-auto">
          <p
            className="story-card-enter__item mb-2 text-[11px] uppercase tracking-[0.16em]"
            style={{
              color: tpl.labelColor,
              animationDelay: `${220 + index * 140}ms`,
            }}
          >
            Story {index + 1}
          </p>
          <h3
            className="story-card-enter__item font-[family-name:var(--font-cormorant)] text-[1.65rem] font-semibold leading-tight sm:text-[1.7rem]"
            style={{
              color: tpl.titleColor,
              animationDelay: `${300 + index * 140}ms`,
            }}
          >
            {story.title}
          </h3>
          <p
            className="story-card-enter__item mt-3 whitespace-pre-line text-sm leading-relaxed"
            style={{
              color: tpl.bodyColor,
              animationDelay: `${380 + index * 140}ms`,
            }}
          >
            {story.text}
          </p>
        </div>
        <div
          className="story-card-enter__item mt-4 shrink-0 rounded-2xl px-3 py-2.5 text-xs leading-snug"
          style={{
            ...tpl.chipStyle,
            animationDelay: `${460 + index * 140}ms`,
          }}
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
    </>
  );
}
