"use client";

import { useState, type FormEvent } from "react";
import {
  GOAL_LABELS,
  NICHE_LABELS,
  STYLE_LABELS,
  type GenerateRequest,
  type NichePreset,
  type StoryGoal,
  type TextStyle,
} from "@/lib/types";
import { GenerateButton } from "./GenerateButton";

interface StoryFormProps {
  loading: boolean;
  onSubmit: (data: GenerateRequest) => void;
}

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-3 text-sm text-text outline-none transition placeholder:text-muted/70 focus:border-accent";

const labelClass = "mb-1.5 block text-sm font-medium text-text";

export function StoryForm({ loading, onSubmit }: StoryFormProps) {
  const [niche, setNiche] = useState<NichePreset>("beauty_salon");
  const [customNiche, setCustomNiche] = useState("");
  const [goal, setGoal] = useState<StoryGoal>("attract_clients");
  const [textStyle, setTextStyle] = useState<TextStyle>("friendly");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (niche === "custom" && !customNiche.trim()) {
      setFieldError("Укажите свою нишу");
      return;
    }
    setFieldError(null);
    onSubmit({
      niche,
      customNiche: niche === "custom" ? customNiche.trim() : undefined,
      goal,
      textStyle,
      additionalInfo: additionalInfo.trim() || undefined,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-20 space-y-5 rounded-[1.75rem] border border-border bg-surface p-4 shadow-[0_20px_50px_-36px_rgba(46,42,39,0.45)] sm:p-6"
      noValidate
    >
      <div>
        <label htmlFor="niche" className={labelClass}>
          Ниша бизнеса
        </label>
        <select
          id="niche"
          value={niche}
          disabled={loading}
          onChange={(e) => setNiche(e.target.value as NichePreset)}
          className={fieldClass}
        >
          {(Object.keys(NICHE_LABELS) as NichePreset[]).map((key) => (
            <option key={key} value={key}>
              {NICHE_LABELS[key]}
            </option>
          ))}
        </select>
      </div>

      {niche === "custom" ? (
        <div>
          <label htmlFor="customNiche" className={labelClass}>
            Своя ниша
          </label>
          <input
            id="customNiche"
            type="text"
            value={customNiche}
            disabled={loading}
            onChange={(e) => setCustomNiche(e.target.value)}
            placeholder="Например: студия йоги"
            maxLength={120}
            className={fieldClass}
            aria-invalid={Boolean(fieldError)}
          />
          {fieldError ? (
            <p className="mt-1.5 text-sm text-danger">{fieldError}</p>
          ) : null}
        </div>
      ) : null}

      <div>
        <label htmlFor="goal" className={labelClass}>
          Цель сторис
        </label>
        <select
          id="goal"
          value={goal}
          disabled={loading}
          onChange={(e) => setGoal(e.target.value as StoryGoal)}
          className={fieldClass}
        >
          {(Object.keys(GOAL_LABELS) as StoryGoal[]).map((key) => (
            <option key={key} value={key}>
              {GOAL_LABELS[key]}
            </option>
          ))}
        </select>
      </div>

      <fieldset disabled={loading}>
        <legend className={labelClass}>Стиль текста</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(Object.keys(STYLE_LABELS) as TextStyle[]).map((key) => {
            const selected = textStyle === key;
            return (
              <label
                key={key}
                className={`flex min-h-11 cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-sm transition ${
                  selected
                    ? "border-accent bg-accent-soft text-text"
                    : "border-border bg-bg/50 text-muted hover:border-accent/60"
                }`}
              >
                <input
                  type="radio"
                  name="textStyle"
                  value={key}
                  checked={selected}
                  onChange={() => setTextStyle(key)}
                  className="sr-only"
                />
                {STYLE_LABELS[key]}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="additionalInfo" className={labelClass}>
          Дополнительная информация{" "}
          <span className="font-normal text-muted">(необязательно)</span>
        </label>
        <textarea
          id="additionalInfo"
          value={additionalInfo}
          disabled={loading}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Услуги, особенности, факты об акции — только то, что можно использовать в тексте"
          rows={4}
          maxLength={2000}
          className={`${fieldClass} resize-y min-h-[110px]`}
        />
      </div>

      <GenerateButton loading={loading} />
    </form>
  );
}
