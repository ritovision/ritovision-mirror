// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://236e8db2006c9af0cbb54e6c45d03b23@o4510327391715328.ingest.us.sentry.io/4510327394729984",

  // Reduce trace sampling in production to save quota (10% vs 100% in dev)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Track which environment errors are coming from
  environment: process.env.NODE_ENV || 'development',

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: false,

  // Filter out noisy errors (optional - customize based on your needs)
  beforeSend(event) {
    // Example: Don't send ad-blocker related errors
    if (event.exception?.values?.[0]?.value?.includes('adsbygoogle')) {
      return null;
    }
    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;