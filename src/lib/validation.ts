import { z } from 'zod';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address').max(254);
export const phoneSchema = z.string().regex(/^[+]?[\d\s\-\(\)]+$/, 'Invalid phone number').min(10).max(20);
export const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(100).regex(/^[a-zA-Z\s\.\-]+$/, 'Name can only contain letters, spaces, dots, and hyphens');
export const messageSchema = z.string().min(10, 'Message must be at least 10 characters').max(2000);

// Contact form validation
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
});

// Job application validation
export const jobApplicationSchema = z.object({
  applicant: nameSchema,
  email: emailSchema,
  jobId: z
    .string()
    .min(1, 'Job is required')
    .max(100)
    .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid job ID'),
  coverLetter: z
    .string()
    .max(1000, 'Cover letter must be less than 1000 characters')
    .optional(),
});

// Support case validation
export const supportCaseSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema.optional(),
  message: messageSchema,
  serviceType: z.enum(['Legal', 'Grievance', 'Welfare']),
  opposingParty: z.string().max(100).optional(),
  courtDeadline: z.string().datetime().optional(),
  department: z.string().max(100).optional(),
});

// Donation validation (for future use)
export const donationSchema = z.object({
  amount: z.number().min(1, 'Minimum donation amount is ₹1').max(100000, 'Maximum donation amount is ₹100,000'),
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number').optional(),
  address: z.string().max(500).optional(),
});

// Input sanitization helpers
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000); // Limit length
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, ''); // Keep only digits and +
}

// Validation middleware helper
export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      throw new ValidationError(formattedErrors);
    }
    throw error;
  }
}

export class ValidationError extends Error {
  public errors: Array<{ field: string; message: string }>;

  constructor(errors: Array<{ field: string; message: string }>) {
    super('Validation failed');
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

// Rate limiting types
export interface RateLimitInfo {
  ip: string;
  timestamp: number;
  attempts: number;
}

export const RATE_LIMITS = {
  contact: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 requests per 15 minutes
  support: { windowMs: 60 * 60 * 1000, maxRequests: 3 }, // 3 requests per hour
  jobs: { windowMs: 60 * 60 * 1000, maxRequests: 10 }, // 10 applications per hour
  donation: { windowMs: 15 * 60 * 1000, maxRequests: 3 }, // 3 donations per 15 minutes
};
