export class RateLimiter {
  private store = new Map<string, { count: number; resetTime: number }>();

  check(identifier: string, limit: number, windowMs: number): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const record = this.store.get(identifier);

    if (!record) {
      const resetTime = now + windowMs;
      this.store.set(identifier, { count: 1, resetTime });
      return { allowed: true, remaining: limit - 1, resetTime };
    }

    if (now > record.resetTime) {
      const resetTime = now + windowMs;
      this.store.set(identifier, { count: 1, resetTime });
      return { allowed: true, remaining: limit - 1, resetTime };
    }

    record.count++;
    this.store.set(identifier, record);

    return {
      allowed: record.count <= limit,
      remaining: Math.max(0, limit - record.count),
      resetTime: record.resetTime,
    };
  }
}

export function getRateLimitHeaders(result: { allowed: boolean; remaining: number; resetTime: number }) {
  return {
    'X-RateLimit-Limit': '100', // adjust as needed
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
  };
}

export const rateLimiter = new RateLimiter();
