"use client";

import { STORY_TEMPLATES } from "@/lib/story-templates";
import type { TemplateId } from "@/lib/types";

interface TemplatePickerProps {
  value: TemplateId;
  onChange: (id: TemplateId) => void;
  disabled?: boolean;
}

export function TemplatePicker({
  value,
  onChange,
  disabled,
}: TemplatePickerProps) {
  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-text">Визуальный шаблон</p>
      <div className="flex gap-2.5 overflow-x-auto pb-1">
        {STORY_TEMPLATES.map((tpl) => {
          const selected = value === tpl.id;
          return (
            <button
              key={tpl.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(tpl.id)}
              aria-pressed={selected}
              aria-label={tpl.label}
              title={tpl.description}
              className={`group flex min-w-[92px] shrink-0 flex-col items-center gap-2 rounded-2xl border p-2 transition duration-300 ease-out ${
                selected
                  ? "border-accent bg-accent-soft shadow-[0_12px_28px_-18px_rgba(232,164,184,0.85)]"
                  : "border-border bg-surface hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
              } disabled:opacity-60`}
            >
              <span
                className="block h-16 w-full rounded-xl border border-black/5 transition duration-300 group-hover:scale-[1.03]"
                style={{ background: tpl.preview }}
                aria-hidden
              />
              <span className="text-xs font-medium text-text">{tpl.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
