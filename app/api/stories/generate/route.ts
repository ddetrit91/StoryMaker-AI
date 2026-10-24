import { NextResponse } from "next/server";
import { GEMINI_ENV_HINT, getGeminiApiKey } from "@/lib/env";
import { generateStories } from "@/lib/gemini";
import { generateRequestSchema } from "@/lib/validate";
import { getClientIpFromHeaders } from "@/lib/get-client-ip";
import {
  isMemoryRateLimited,
  shouldUseMemoryRateLimit,
} from "@/lib/memory-rate-limit";
import { RATE_LIMIT_MESSAGE } from "@/lib/rate-limit-config";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    if (shouldUseMemoryRateLimit()) {
      const ip = getClientIpFromHeaders(request.headers);
      if (isMemoryRateLimited(ip)) {
        return NextResponse.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 });
      }
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
