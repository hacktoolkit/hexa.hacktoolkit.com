import React from 'react'
import { STRIPE_CHECKOUT_URLS } from '@/config/stripe'
import { PRICING_TIERS } from '@/config/pricing'

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  // Map pricing config to actual Stripe URLs
  const tiers = PRICING_TIERS.map((tier) => {
    let checkoutUrl: string | null = tier.checkoutUrl

    // Resolve stripe: references to actual URLs
    if (checkoutUrl?.startsWith('stripe:')) {
      const key = checkoutUrl.replace('stripe:', '') as keyof typeof STRIPE_CHECKOUT_URLS
      checkoutUrl = STRIPE_CHECKOUT_URLS[key]
    }

    return {
      ...tier,
      checkoutUrl,
    }
  })

  const handleChoosePlan = (url: string | null) => {
    if (url === null) {
      // Free tier - close modal
      onClose()
      return
    }
    if (url === 'contact') {
      // Enterprise - contact us with prefilled email
      const subject = encodeURIComponent('Hexa Enterprise Inquiry')
      const body = encodeURIComponent(`Hi Hacktoolkit team,

I'm interested in learning more about Hexa ⟡ Enterprise for my organization.

Company Details:
- Company Name:
- Number of Developers:
- Use Case:

Please provide information about:
- Pricing and licensing options
- On-premise deployment
- Custom model training
- SLA and support options

Best regards`)

      window.location.href = `mailto:hello@hacktoolkit.com?subject=${subject}&body=${body}`
      return
    }
    // Open Stripe checkout in new tab
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-6xl w-full p-8 fade-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-mono font-bold text-electric-teal mb-2">
              Upgrade to Hexa ⟡ Pro
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Code faster with unlimited AI generation
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

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-5 gap-4 mb-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
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
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Tier Name */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-mono font-bold mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {tier.description}
                </p>
                <div className="flex items-baseline justify-center">
                  {tier.price === null ? (
                    <span className="text-2xl font-bold text-electric-teal">
                      Contact Us
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-electric-teal">
                        ${tier.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        /month
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-electric-teal mr-2 flex-shrink-0">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Choose Button */}
              <button
                onClick={() => handleChoosePlan(tier.checkoutUrl)}
                className={`w-full py-3 rounded-lg font-mono font-semibold transition-colors ${
                  tier.popular
                    ? 'bg-electric-teal text-space-black hover:bg-cyber-violet hover:text-white'
                    : tier.price === 0
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-electric-teal hover:text-space-black'
                }`}
              >
                {tier.price === 0
                  ? 'Current Plan'
                  : tier.price === null
                  ? 'Contact Sales'
                  : `Choose ${tier.name}`}
              </button>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              30-Day Money-Back Guarantee
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Try Hexa ⟡ Pro risk-free. If you're not satisfied, we'll refund you in full within 30 days.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div>
              <p className="font-semibold mb-1">Can I cancel anytime?</p>
              <p>Yes! Cancel anytime from your account. No questions asked.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What payment methods?</p>
              <p>We accept all major credit cards (Visa, Mastercard, Amex) via Stripe.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">What if I exceed limits?</p>
              <p>Pro has no usage limits! Generate as much code as you need.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingModal
