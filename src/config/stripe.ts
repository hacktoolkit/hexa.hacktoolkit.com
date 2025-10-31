/**
 * Stripe Checkout Configuration
 *
 * These are PUBLIC checkout URLs that are safe to commit to git.
 * They are visible in the browser's source code after build.
 *
 * NOTE: These URLs work for both test and live mode Stripe accounts.
 * Update these URLs when switching between test and production.
 *
 * DO NOT add secret API keys here - only public checkout URLs.
 */

export const STRIPE_CHECKOUT_URLS = {
  starter: 'https://buy.stripe.com/cNi28tgqvadt5yI6Yl2Ry00',
  pro: 'https://buy.stripe.com/cNi00l5LRclB4uEgyV2Ry01',
  business: 'https://buy.stripe.com/5kQdRbfmr4T9f9i1E12Ry02',
} as const

// Type-safe access
export type StripeTier = keyof typeof STRIPE_CHECKOUT_URLS
