/** Средний лимит: ~10 генераций в минуту с одного IP (скользящее окно 60 с). */
export const RATE_LIMIT_MAX = 10;
export const RATE_WINDOW_LABEL = "60 s";

export const RATE_LIMIT_MESSAGE =
  "Слишком много запросов. Подождите минуту и попробуйте снова.";
