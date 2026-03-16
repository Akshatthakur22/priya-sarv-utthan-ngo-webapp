import { NextResponse } from "next/server";
import { submitContact } from "@/services/contact.service";
import { validateRequest, contactFormSchema, sanitizeString, sanitizeEmail } from "@/lib/validation";
import { logger } from "@/lib/logger";
import { contactRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    // Check rate limit
    const rateLimitResult = await contactRateLimit(request as any);
    if (!rateLimitResult.success) {
      logger.warn('Contact API rate limit exceeded', {
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        retryAfter: rateLimitResult.retryAfter,
      });

      return NextResponse.json(
        { 
          ok: false, 
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter 
        },
        { 
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult)
        }
      );
    }

    const body = await request.json();
    
    // Validate and sanitize input
    const validatedData = validateRequest(contactFormSchema, {
      name: sanitizeString(body.name),
      email: sanitizeEmail(body.email),
      message: sanitizeString(body.message),
    });

    const record = await submitContact(validatedData);
    
    logger.formSubmission('contact', validatedData);
    logger.info('Contact form submitted successfully', { name: validatedData.name });
    
    return NextResponse.json(
      { ok: true, record }, 
      { headers: getRateLimitHeaders(rateLimitResult) }
    );
  } catch (error) {
    if (error.name === 'ValidationError') {
      logger.warn('Contact form validation failed', { errors: error.errors });
      return NextResponse.json(
        { ok: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    logger.apiError('POST', '/api/contact', error);
    const message = error instanceof Error ? error.message : "Unable to submit";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
