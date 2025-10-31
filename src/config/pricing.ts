/**
 * Hexa Pricing Configuration
 *
 * Single source of truth: src/config/pricing.json
 * Edit the JSON file to update pricing, features, or add new tiers.
 */

import pricingData from './pricing.json'

export interface PricingMetadata {
  tier: string
  tier_level: number
  models: string
  requests_per_month: number  // -1 = unlimited, 0 = none (free tier)
  rate_limit: string
  support: string
  api_access: boolean
  workspaces: number  // -1 = unlimited
  early_access?: boolean
  sso?: boolean
  on_premise?: boolean
  sla?: string
  custom_models?: boolean
}

export interface PricingTier {
  name: string
  price: number | null  // null = custom pricing (contact sales)
  popular: boolean
  description: string
  features: string[]
  checkoutUrl: string | null  // null = free tier, 'contact' = enterprise
  color: 'gray' | 'electric-teal' | 'cyber-violet'
  metadata: PricingMetadata
}

// Import from JSON (single source of truth)
export const PRICING_TIERS = pricingData as PricingTier[]
