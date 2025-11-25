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

export const STRIPE_CREDIT_URLS = {
  credits_50: 'https://buy.stripe.com/28EbJ32zF4T98KU6Yl2Ry03',
  credits_120: 'https://buy.stripe.com/4gMfZjfmrdpFe5ebeB2Ry04',
  credits_200: 'https://buy.stripe.com/9B6dRb0rx3P58KU5Uh2Ry05',
  credits_300: 'https://buy.stripe.com/14A7sN6PV5Xd9OYeqN2Ry06',
  credits_500: 'https://buy.stripe.com/7sY7sN1vBbhx1is4Qd2Ry07',
  credits_1200: 'https://buy.stripe.com/7sY28tb6bgBRf9i1E12Ry08',
} as const

// Type-safe access
export type StripeTier = keyof typeof STRIPE_CHECKOUT_URLS
export type StripeCreditTier = keyof typeof STRIPE_CREDIT_URLS
