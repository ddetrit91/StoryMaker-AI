const PLACEHOLDER = "your_gemini_api_key_here";

export function getGeminiApiKey(): string | null {
  const raw = process.env.GEMINI_API_KEY?.trim();
  if (!raw || raw === PLACEHOLDER) {
    return null;
  }
  return raw;
}

export const GEMINI_ENV_HINT =
  "Создайте файл .env.local в корне проекта (рядом с package.json), укажите GEMINI_API_KEY=ваш_ключ и полностью перезапустите npm run dev. Файл .env.example Next.js не читает.";
