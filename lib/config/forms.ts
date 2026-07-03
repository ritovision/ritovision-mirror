import { z } from 'zod';

/**
 * Environment variables schema for form configuration
 */
const envSchema = z.object({
  NEXT_PUBLIC_FORMS_API_URL: z
    .string()
    .refine(
      (val) => {
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'NEXT_PUBLIC_FORMS_API_URL must be a valid URL' }
    )
    .optional(),
  NEXT_PUBLIC_ENABLE_FORM_MOCKING: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
});

/**
 * Validate and parse environment variables
 */
const env = envSchema.parse({
  NEXT_PUBLIC_FORMS_API_URL: process.env.NEXT_PUBLIC_FORMS_API_URL,
  NEXT_PUBLIC_ENABLE_FORM_MOCKING: process.env.NEXT_PUBLIC_ENABLE_FORM_MOCKING,
});

/**
 * Forms configuration
 * - apiUrl: Cloudflare Worker URL for form submissions
 * - enableMocking: If true, form submissions return mock success without API calls (useful in dev to avoid CORS)
 */
export const formsConfig = {
  apiUrl: env.NEXT_PUBLIC_FORMS_API_URL,
  enableMocking: env.NEXT_PUBLIC_ENABLE_FORM_MOCKING ?? true, // Default to true in development
} as const;
