import { NextResponse } from "next/server";
import { GEMINI_ENV_HINT, getGeminiApiKey } from "@/lib/env";
import { generateStories } from "@/lib/gemini";
import { generateRequestSchema } from "@/lib/validate";

export const maxDuration = 60;

const recentRequests = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const stamps = (recentRequests.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  if (stamps.length >= RATE_MAX) {
    recentRequests.set(ip, stamps);
    return true;
  }
  stamps.push(now);
  recentRequests.set(ip, stamps);
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Слишком много запросов. Подождите минуту и попробуйте снова.",
        },
        { status: 429 },
      );
    }

    if (!getGeminiApiKey()) {
      return NextResponse.json({ error: GEMINI_ENV_HINT }, { status: 503 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Некорректное тело запроса" },
        { status: 400 },
      );
    }

    const parsed = generateRequestSchema.safeParse(body);
    if (!parsed.success) {
      const message =
        parsed.error.issues[0]?.message || "Проверьте заполнение формы";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const series = await generateStories(parsed.data);
    return NextResponse.json(series);
  } catch (err) {
    const code = err instanceof Error ? err.message : "UNKNOWN";

    if (code === "MISSING_API_KEY") {
      return NextResponse.json({ error: GEMINI_ENV_HINT }, { status: 503 });
    }

    if (code === "INVALID_RESPONSE" || code === "INVALID_JSON" || code === "EMPTY_RESPONSE") {
      return NextResponse.json(
        {
          error:
            "Не удалось разобрать ответ нейросети. Нажмите «Сгенерировать снова».",
        },
        { status: 502 },
      );
    }

    console.error("[generate]", err);
    return NextResponse.json(
      {
        error:
          "Ошибка генерации. Проверьте ключ API и соединение, затем попробуйте снова.",
      },
      { status: 502 },
    );
  }
}
