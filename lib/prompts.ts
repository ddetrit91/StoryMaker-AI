import {
  GOAL_LABELS,
  NICHE_LABELS,
  STYLE_LABELS,
  type GenerateRequest,
} from "./types";

export function resolveNicheLabel(input: GenerateRequest): string {
  if (input.niche === "custom") {
    return input.customNiche?.trim() || "бизнес";
  }
  return NICHE_LABELS[input.niche];
}

export const SYSTEM_INSTRUCTION = `Ты — копирайтер Instagram Stories для малого и среднего бизнеса.
Пиши только на русском языке.
Верни строго валидный JSON без markdown и без пояснений вне JSON.

Структура ответа:
{
  "stories": [
    {
      "title": "короткий заголовок",
      "text": "готовый текст сторис (2–5 коротких предложений или абзацев)",
      "visualIdea": "идея визуального оформления",
      "interactive": { "type": "poll" | "question" | "cta", "content": "текст интерактива" },
      "design": {
        "background": "рекомендация по фону",
        "colors": ["#hex1", "#hex2"],
        "textPlacement": "где и как расположить текст"
      }
    }
  ]
}

Правила:
1. Ровно 3 сторис. Логика серии: 1) хук/внимание → 2) ценность или деталь → 3) призыв к действию.
2. НЕ выдумывай цены, скидки, проценты, даты акций, адреса, телефоны, имена брендов, отзывы и другие факты, которых нет во входных данных пользователя.
3. Если данных мало — используй нейтральные формулировки: «узнайте подробности», «напишите в Direct», «сохраните сторис».
4. Если цель — акция, но конкретные условия акции не указаны — не придумывай скидку; пригласи узнать условия у бренда.
5. Стиль текста должен соответствовать запросу (дружелюбный / экспертный / креативный).
6. Интерактив: для разных сторис чередуй poll, question и cta где уместно.
7. colors — 2–4 hex-цвета в палитре беж / белый / нежно-розовый или гармоничных нейтралей под нишу.`;

export function buildUserPrompt(input: GenerateRequest): string {
  const niche = resolveNicheLabel(input);
  const additional = input.additionalInfo?.trim();

  return [
    `Ниша бизнеса: ${niche}`,
    `Цель сторис: ${GOAL_LABELS[input.goal]}`,
    `Стиль текста: ${STYLE_LABELS[input.textStyle]}`,
    additional
      ? `Дополнительная информация от пользователя (единственный источник фактов):\n${additional}`
      : "Дополнительная информация: не указана. Не выдумывай факты.",
    "Сгенерируй серию из 3 Instagram Stories по правилам.",
  ].join("\n");
}
