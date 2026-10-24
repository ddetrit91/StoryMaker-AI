export type NichePreset =
  | "beauty_salon"
  | "clothing_store"
  | "cafe"
  | "personal_blog"
  | "custom";

export type StoryGoal =
  | "attract_clients"
  | "announce_new"
  | "announce_promo"
  | "boost_engagement";

export type TextStyle = "friendly" | "expert" | "creative";

export type InteractiveType = "poll" | "question" | "cta";

export type TemplateId =
  | "soft_blush"
  | "cream_minimal"
  | "rose_glass"
  | "warm_beige"
  | "dark_elegant";

export interface GenerateRequest {
  niche: NichePreset;
  customNiche?: string;
  goal: StoryGoal;
  textStyle: TextStyle;
  additionalInfo?: string;
}

export interface StoryInteractive {
  type: InteractiveType;
  content: string;
}

export interface StoryDesign {
  background: string;
  colors: string[];
  textPlacement: string;
}

export interface StoryItem {
  title: string;
  text: string;
  visualIdea: string;
  interactive: StoryInteractive;
  design: StoryDesign;
}

export interface StorySeries {
  stories: [StoryItem, StoryItem, StoryItem];
}

export const NICHE_LABELS: Record<NichePreset, string> = {
  beauty_salon: "Салон красоты",
  clothing_store: "Магазин одежды",
  cafe: "Кафе",
  personal_blog: "Личный блог",
  custom: "Своя ниша",
};

export const GOAL_LABELS: Record<StoryGoal, string> = {
  attract_clients: "Привлечь клиентов",
  announce_new: "Рассказать о новинке",
  announce_promo: "Объявить акцию",
  boost_engagement: "Повысить активность подписчиков",
};

export const STYLE_LABELS: Record<TextStyle, string> = {
  friendly: "Дружелюбный",
  expert: "Экспертный",
  creative: "Креативный",
};

export const INTERACTIVE_LABELS: Record<InteractiveType, string> = {
  poll: "Опрос",
  question: "Вопрос",
  cta: "Призыв к действию",
};
