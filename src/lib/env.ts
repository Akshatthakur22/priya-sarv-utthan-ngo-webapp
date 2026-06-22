import { z } from 'zod';

const envSchema = z.object({
  // Database configuration
  DATABASE_URL: z.string().url().optional(),
  
  // Email configuration (optional for deployment)
  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: z.string().optional(),
  EMAIL_SECURE: z.string().optional(),
  EMAIL_USER: z.string().email().optional(),
  EMAIL_APP_PASSWORD: z.string().min(1).optional(),
  EMAIL_FROM: z.string().email().optional(),
  NOTIFY_EMAIL: z.string().email().optional(),
  
  // Razorpay configuration (optional for deployment)
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().min(1).optional(),
  RAZORPAY_KEY_SECRET: z.string().min(1).optional(),
  
  // Application configuration
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

type Env = z.infer<typeof envSchema>;

// Validate environment variables
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    throw new Error('Invalid environment variables. Check .env.local file.');
  }
}

export const env = validateEnv();

// Helper to check if we're in production
export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
