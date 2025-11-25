/**
 * Hexa Credits Configuration
 *
 * Single source of truth: src/config/credits.json
 * Edit the JSON file to update credit packages.
 */

import creditsData from './credits.json'
import { StripeCreditTier } from './stripe'

export interface CreditTier {
  credits: number
  price: number
  bonus: number
  popular: boolean
  checkoutKey: StripeCreditTier
}

// Import from JSON (single source of truth)
export const CREDIT_TIERS = creditsData as CreditTier[]
