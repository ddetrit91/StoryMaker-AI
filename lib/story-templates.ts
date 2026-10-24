import type { CSSProperties } from "react";
import type { TemplateId } from "./types";

export interface StoryTemplate {
  id: TemplateId;
  label: string;
  description: string;
  preview: string;
  screenBackground: string;
  titleColor: string;
  bodyColor: string;
  labelColor: string;
  chipStyle: CSSProperties;
  frameStyle: CSSProperties;
}

export const STORY_TEMPLATES: StoryTemplate[] = [
  {
    id: "soft_blush",
    label: "Soft Blush",
    description: "Нежный розово-бежевый градиент",
    preview: "linear-gradient(160deg, #fce8ef 0%, #f7f0ea 55%, #f3d9e3 100%)",
    screenBackground:
      "linear-gradient(160deg, #fce8ef 0%, #f7f0ea 55%, #f3d9e3 100%)",
    titleColor: "#5c3d4a",
    bodyColor: "rgba(61, 53, 50, 0.92)",
    labelColor: "rgba(92, 61, 74, 0.72)",
    chipStyle: {
      backgroundColor: "rgba(255, 255, 255, 0.72)",
      border: "1px solid rgba(255, 255, 255, 0.55)",
      color: "#5c3d4a",
      boxShadow: "0 8px 20px -14px rgba(92, 61, 74, 0.45)",
    },
    frameStyle: {
      backgroundColor: "#1a1614",
      border: "1px solid rgba(0, 0, 0, 0.1)",
    },
  },
  {
    id: "cream_minimal",
    label: "Cream Minimal",
    description: "Чистый кремовый минимализм",
    preview: "linear-gradient(180deg, #fbf8f4 0%, #f3ebe3 100%)",
    screenBackground: "linear-gradient(180deg, #fbf8f4 0%, #f3ebe3 100%)",
    titleColor: "#2e2a27",
    bodyColor: "#4a433e",
    labelColor: "rgba(122, 115, 108, 0.85)",
    chipStyle: {
      backgroundColor: "rgba(234, 223, 212, 0.7)",
      border: "1px solid rgba(217, 205, 192, 0.6)",
      color: "#4a433e",
    },
    frameStyle: {
      backgroundColor: "#1a1614",
      border: "1px solid rgba(0, 0, 0, 0.1)",
    },
  },
  {
    id: "rose_glass",
    label: "Rose Glass",
    description: "Стеклянный розовый с бликом",
    preview: "linear-gradient(145deg, #f6d5e0 0%, #efe6f5 45%, #e8c9d6 100%)",
    screenBackground:
      "linear-gradient(145deg, #f6d5e0 0%, #efe6f5 45%, #e8c9d6 100%)",
    titleColor: "#6b3f52",
    bodyColor: "rgba(69, 56, 63, 0.92)",
    labelColor: "rgba(107, 63, 82, 0.75)",
    chipStyle: {
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      color: "#6b3f52",
    },
    frameStyle: {
      backgroundColor: "#1a1614",
      border: "1px solid rgba(0, 0, 0, 0.1)",
    },
  },
  {
    id: "warm_beige",
    label: "Warm Beige",
    description: "Тёплый беж с мягким светом",
    preview: "linear-gradient(165deg, #f2e6d8 0%, #e8d5c4 50%, #dfc4b0 100%)",
    screenBackground:
      "linear-gradient(165deg, #f2e6d8 0%, #e8d5c4 50%, #dfc4b0 100%)",
    titleColor: "#4a382c",
    bodyColor: "rgba(79, 64, 54, 0.92)",
    labelColor: "rgba(74, 56, 44, 0.78)",
    chipStyle: {
      backgroundColor: "rgba(255, 248, 240, 0.55)",
      border: "1px solid rgba(212, 192, 173, 0.5)",
      color: "#4a382c",
    },
    frameStyle: {
      backgroundColor: "#1a1614",
      border: "1px solid rgba(0, 0, 0, 0.1)",
    },
  },
  {
    id: "dark_elegant",
    label: "Dark Elegant",
    description: "Тёмный элегантный фон",
    preview: "linear-gradient(165deg, #2a2320 0%, #1a1614 55%, #3a2a32 100%)",
    screenBackground:
      "linear-gradient(165deg, #2a2320 0%, #1a1614 55%, #3a2a32 100%)",
    titleColor: "#f5d6e0",
    bodyColor: "rgba(232, 223, 214, 0.92)",
    labelColor: "rgba(232, 223, 214, 0.72)",
    chipStyle: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      color: "#f5d6e0",
    },
    frameStyle: {
      backgroundColor: "#0f0d0c",
      border: "1px solid rgba(0, 0, 0, 0.2)",
    },
  },
];

export function getTemplate(id: TemplateId): StoryTemplate {
  return STORY_TEMPLATES.find((t) => t.id === id) ?? STORY_TEMPLATES[0];
}
