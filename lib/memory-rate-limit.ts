import { RATE_LIMIT_MAX } from "./rate-limit-config";

const RATE_WINDOW_MS = 60_000;
const recentRequests = new Map<string, number[]>();

/** Локальный fallback, когда KV не подключён (dev без Upstash). */
export function isMemoryRateLimited(ip: string): boolean {
  const now = Date.now();
  const stamps = (recentRequests.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  if (stamps.length >= RATE_LIMIT_MAX) {
    recentRequests.set(ip, stamps);
    return true;
  }
  stamps.push(now);
  recentRequests.set(ip, stamps);
  return false;
}

export function shouldUseMemoryRateLimit(): boolean {
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ??
    process.env.KV_REST_API_URL?.trim();
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ??
    process.env.KV_REST_API_TOKEN?.trim();
  return !(url && token);
}
