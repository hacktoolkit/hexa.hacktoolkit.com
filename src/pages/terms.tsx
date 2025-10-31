import React from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - Hexa ⟡</title>
        <meta name="description" content="Hexa Terms of Service" />
      </Head>

      <div className="min-h-screen flex flex-col bg-warm-white dark:bg-space-black text-space-black dark:text-warm-white">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-mono font-bold text-electric-teal mb-8">
            Terms of Service
          </h1>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-800 dark:text-gray-200">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last Updated: January 2025
            </p>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using Hexa ⟡ ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                2. Description of Service
              </h2>
              <p>
                Hexa ⟡ is an AI-powered coding companion that provides code generation, syntax highlighting, and AI assistance through various provider options including local browser-based AI (Transformers.js), mock responses, and cloud-based AI services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                3. Subscription Plans
              </h2>
              <h3 className="text-xl font-mono font-semibold mb-2">3.1 Free Tier</h3>
              <p>
                The Free tier provides access to mock AI responses and local browser-based AI with no cost and no credit card required.
              </p>

              <h3 className="text-xl font-mono font-semibold mb-2 mt-4">3.2 Paid Subscriptions</h3>
              <p>
                Paid subscription plans (Starter, Pro, Enterprise) are billed on a recurring monthly basis. By subscribing to a paid plan, you authorize us to charge your payment method on a recurring basis.
              </p>

              <h3 className="text-xl font-mono font-semibold mb-2 mt-4">3.3 Auto-Renewal</h3>
              <p>
                Your subscription will automatically renew at the end of each billing period unless you cancel before the renewal date. You will be charged the then-current rate for your subscription plan.
              </p>

              <h3 className="text-xl font-mono font-semibold mb-2 mt-4">3.4 Cancellation</h3>
              <p>
                You may cancel your subscription at any time from your account dashboard. Cancellations take effect at the end of your current billing period. You will retain access to paid features through the end of the billing period you have paid for.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                4. Refunds and Money-Back Guarantee
              </h2>
              <p>
                We offer a 30-day money-back guarantee for first-time subscribers. If you are not satisfied with Hexa ⟡ Pro within 30 days of your initial subscription, contact us for a full refund. After the 30-day period, subscriptions are non-refundable for partial months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                5. Fair Use Policy
              </h2>
              <p>
                While Pro and Enterprise plans offer "unlimited" AI generation, this is subject to fair use. We reserve the right to limit or suspend service if we detect:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>API abuse or automated scraping</li>
                <li>Reselling or redistributing Hexa ⟡ services</li>
                <li>Usage that significantly exceeds normal patterns</li>
                <li>Activities that degrade service quality for other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                6. Intellectual Property
              </h2>
              <h3 className="text-xl font-mono font-semibold mb-2">6.1 Your Code</h3>
              <p>
                You retain all rights, title, and interest in any code, prompts, or content you create using Hexa ⟡. We claim no ownership over your generated code.
              </p>

              <h3 className="text-xl font-mono font-semibold mb-2 mt-4">6.2 Our Service</h3>
              <p>
                Hexa ⟡, including its design, features, and underlying technology, is owned by Hacktoolkit and protected by intellectual property laws. You may not copy, modify, or reverse engineer our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                7. Service Availability
              </h2>
              <p>
                We strive to provide 99.9% uptime for our Service, but we do not guarantee uninterrupted access. The Service is provided "as-is" without warranties of any kind. We reserve the right to modify, suspend, or discontinue the Service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                8. User Responsibilities
              </h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate account information</li>
                <li>Keep your login credentials secure</li>
                <li>Not use the Service for illegal activities</li>
                <li>Not violate any applicable laws or regulations</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                9. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, Hacktoolkit shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service. Our total liability shall not exceed the amount you paid for the Service in the past 12 months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                10. Third-Party Services
              </h2>
              <p>
                Hexa ⟡ integrates with third-party AI services (OpenAI, Anthropic, etc.). Your use of these services through Hexa ⟡ may be subject to their respective terms and policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                11. Changes to Terms
              </h2>
              <p>
                We may update these Terms from time to time. We will notify you of material changes via email or through the Service. Continued use of the Service after changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                12. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                13. Contact Us
              </h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="font-mono">
                Email: <a href="mailto:hello@hacktoolkit.com" className="text-electric-teal hover:underline">hello@hacktoolkit.com</a><br />
                Website: <a href="https://hexa.hacktoolkit.com" className="text-electric-teal hover:underline">hexa.hacktoolkit.com</a>
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
