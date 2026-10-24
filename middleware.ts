import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getClientIpFromHeaders } from "@/lib/get-client-ip";
import { checkKvRateLimit, isKvRateLimitEnabled } from "@/lib/kv-rate-limit";
import { RATE_LIMIT_MESSAGE } from "@/lib/rate-limit-config";

export async function middleware(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.next();
  }

  if (!isKvRateLimitEnabled()) {
    return NextResponse.next();
  }

  try {
    const ip = getClientIpFromHeaders(request.headers);
    const { allowed } = await checkKvRateLimit(ip);
    if (!allowed) {
      return NextResponse.json({ error: RATE_LIMIT_MESSAGE }, { status: 429 });
    }
  } catch (err) {
    console.error("[middleware rate-limit]", err);
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/stories/generate",
};
