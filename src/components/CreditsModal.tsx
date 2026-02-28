import React, { useState } from 'react'
import { STRIPE_CREDIT_URLS } from '@/config/stripe'
import { CREDIT_TIERS } from '@/config/credits'

interface CreditsModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  const [selectedCredits, setSelectedCredits] = useState<10 | 25 | 50>(50)

  if (!isOpen) return null

  const handlePurchase = (checkoutKey: keyof typeof STRIPE_CREDIT_URLS) => {
    const url = STRIPE_CREDIT_URLS[checkoutKey]
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full p-8 fade-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-mono font-bold text-electric-teal mb-2">
              Buy AI Credits
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Top up your credits for code generation and AI assistance
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Credit Tiers */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {CREDIT_TIERS.map((tier) => {
            // Handle 10/25/50 toggle for the first tier
            const is50Tier = tier.credits === 50
            const displayCredits = is50Tier ? selectedCredits : tier.credits
            const displayPrice = is50Tier ? (selectedCredits / 10) : tier.price
            const displayCheckoutKey = is50Tier ? `credits_${selectedCredits}` as keyof typeof STRIPE_CREDIT_URLS : tier.checkoutKey

            return (
              <div
                key={tier.checkoutKey}
                className={`relative border-2 rounded-lg p-6 transition-all ${
                  tier.popular
                    ? 'border-electric-teal shadow-lg scale-105'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-electric-teal text-space-black px-4 py-1 rounded-full text-xs font-mono font-bold whitespace-nowrap">
                      BEST VALUE
                    </span>
                  </div>
                )}

                {/* Credits Amount */}
                <div className="text-center mb-4">
                  <div className="text-4xl font-mono font-bold text-electric-teal mb-1">
                    {displayCredits.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    credits
                  </div>

                  {/* 10/25/50 Toggle - positioned where bonus credits would be */}
                  {is50Tier && (
                    <div className="mt-2 flex justify-center">
                      <div className="inline-flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                        <button
                          onClick={() => setSelectedCredits(10)}
                          className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                            selectedCredits === 10
                              ? 'bg-electric-teal text-space-black'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          10
                        </button>
                        <button
                          onClick={() => setSelectedCredits(25)}
                          className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                            selectedCredits === 25
                              ? 'bg-electric-teal text-space-black'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          25
                        </button>
                        <button
                          onClick={() => setSelectedCredits(50)}
                          className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                            selectedCredits === 50
                              ? 'bg-electric-teal text-space-black'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          50
                        </button>
                      </div>
                    </div>
                  )}

                  {tier.bonus > 0 && (
                    <div className="mt-2 text-sm text-cyber-violet font-semibold">
                      +{tier.bonus} bonus credits!
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold">${displayPrice}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1 text-sm">
                    one-time
                  </span>
                </div>

                {/* Value indicator */}
                <div className="text-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                  ${(displayPrice / displayCredits * 100).toFixed(1)}¢ per credit
                </div>

                {/* Purchase Button */}
                <button
                  onClick={() => handlePurchase(displayCheckoutKey)}
                  className={`w-full py-3 rounded-lg font-mono font-semibold transition-colors ${
                    tier.popular
                      ? 'bg-electric-teal text-space-black hover:bg-cyber-violet hover:text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-electric-teal hover:text-space-black'
                  }`}
                >
                  Buy Now
                </button>
              </div>
            )
          })}
        </div>

        {/* Footer Info */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div>
              <p className="font-semibold mb-1">Do credits expire?</p>
              <p>No, your credits never expire. Use them whenever you need.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Secure payment</p>
              <p>All payments are securely processed by Stripe.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Need more?</p>
              <p>Consider a subscription plan for unlimited access.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditsModal
