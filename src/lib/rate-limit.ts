import { NextRequest } from 'next/server';
import { RATE_LIMITS, RateLimitInfo } from './validation';
import { logger } from './logger';

// In-memory store for rate limiting (for production, use Redis or database)
const rateLimitStore = new Map<string, RateLimitInfo[]>();

export class RateLimiter {
  private store: Map<string, RateLimitInfo[]>;
  private windowMs: number;
  private maxRequests: number;
  private identifier: string;

  constructor(identifier: string) {
    this.identifier = identifier;
    const config = RATE_LIMITS[identifier as keyof typeof RATE_LIMITS];
    if (!config) {
      throw new Error(`Rate limit configuration not found for: ${identifier}`);
    }
    this.windowMs = config.windowMs;
    this.maxRequests = config.maxRequests;
    this.store = rateLimitStore;
  }

  getClientIdentifier(request: NextRequest): string {
    // Try to get client IP from various headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0] || realIp || 'unknown';
    
    // For additional security, you could include user agent hash
    const userAgent = request.headers.get('user-agent') || '';
    const userAgentHash = this.hashString(userAgent.substring(0, 50));
    
    return `${ip}:${userAgentHash}`;
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  private cleanupOldEntries(identifier: string): void {
    const now = Date.now();
    const entries = this.store.get(identifier) || [];
    const validEntries = entries.filter(entry => 
      now - entry.timestamp < this.windowMs
    );
    
    if (validEntries.length === 0) {
      this.store.delete(identifier);
    } else {
      this.store.set(identifier, validEntries);
    }
  }

  public async checkLimit(request: NextRequest): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
  }> {
    const clientIdentifier = this.getClientIdentifier(request);
    const now = Date.now();

    // Clean up old entries
    this.cleanupOldEntries(clientIdentifier);

    // Get current requests
    const requests = this.store.get(clientIdentifier) || [];
    const recentRequests = requests.filter(entry => 
      now - entry.timestamp < this.windowMs
    );

    // Check if limit exceeded
    const allowed = recentRequests.length < this.maxRequests;
    const remaining = Math.max(0, this.maxRequests - recentRequests.length);
    const resetTime = now + this.windowMs;

    if (allowed) {
      // Add this request to the store
      requests.push({
        ip: clientIdentifier,
        timestamp: now,
        attempts: recentRequests.length + 1,
      });
      this.store.set(clientIdentifier, requests);
    } else {
      // Calculate retry after time
      const oldestRequest = recentRequests[0];
      const retryAfter = Math.ceil((oldestRequest.timestamp + this.windowMs - now) / 1000);
      
      logger.warn('Rate limit exceeded', {
        identifier: this.identifier,
        clientIdentifier,
        attempts: recentRequests.length,
        maxRequests: this.maxRequests,
        retryAfter,
      });

      return {
        allowed: false,
        remaining: 0,
        resetTime,
        retryAfter,
      };
    }

    return {
      allowed,
      remaining,
      resetTime,
    };
  }
}

// Rate limiting middleware factory
export function createRateLimitMiddleware(identifier: string) {
  const limiter = new RateLimiter(identifier);

  return async function rateLimit(request: NextRequest) {
    const result = await limiter.checkLimit(request);
    
    if (!result.allowed) {
      return {
        success: false,
        error: 'Rate limit exceeded',
        retryAfter: result.retryAfter,
        remaining: result.remaining,
        resetTime: result.resetTime,
      };
    }

    return {
      success: true,
      remaining: result.remaining,
      resetTime: result.resetTime,
    };
  };
}

// Specific rate limiters for different endpoints
export const contactRateLimit = createRateLimitMiddleware('contact');
export const supportRateLimit = createRateLimitMiddleware('support');
export const jobsRateLimit = createRateLimitMiddleware('jobs');
export const donationRateLimit = createRateLimitMiddleware('donation');

// Helper function to get rate limit headers
export function getRateLimitHeaders(result: {
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}) {
  const headers: Record<string, string> = {
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
  };

  if (result.retryAfter) {
    headers['Retry-After'] = result.retryAfter.toString();
  }

  return headers;
}
