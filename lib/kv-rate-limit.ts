import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { RATE_LIMIT_MAX, RATE_WINDOW_LABEL } from "./rate-limit-config";

function getRedisRestConfig(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ??
    process.env.KV_REST_API_URL?.trim();
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ??
    process.env.KV_REST_API_TOKEN?.trim();
  if (!url || !token) {
    return null;
  }
  return { url, token };
}

export function isKvRateLimitEnabled(): boolean {
  return getRedisRestConfig() !== null;
}

let ratelimit: Ratelimit | null = null;

function getRatelimit(): Ratelimit | null {
  const config = getRedisRestConfig();
  if (!config) {
    return null;
  }
  if (!ratelimit) {
    const redis = new Redis({ url: config.url, token: config.token });
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX, RATE_WINDOW_LABEL),
      prefix: "storymaker:generate",
    });
  }
  return ratelimit;
}

export async function checkKvRateLimit(
  identifier: string,
): Promise<{ allowed: boolean }> {
  const limiter = getRatelimit();
  if (!limiter) {
    return { allowed: true };
  }
  const { success } = await limiter.limit(identifier);
  return { allowed: success };
}
