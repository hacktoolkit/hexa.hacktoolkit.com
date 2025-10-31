import React from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Hexa ⟡</title>
        <meta name="description" content="Hexa Privacy Policy" />
      </Head>

      <div className="min-h-screen flex flex-col bg-warm-white dark:bg-space-black text-space-black dark:text-warm-white">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-mono font-bold text-electric-teal mb-8">
            Privacy Policy
          </h1>

          <div className="prose dark:prose-invert max-w-none space-y-6 text-gray-800 dark:text-gray-200">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Last Updated: January 2025
            </p>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                1. Introduction
              </h2>
              <p>
                Hacktoolkit ("we," "our," or "us") operates Hexa ⟡ (hexa.hacktoolkit.com). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
              </p>
              <p>
                We are committed to protecting your privacy and ensuring transparency about how your data is handled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-mono font-semibold mb-2">2.1 Account Information</h3>
              <p>When you create an account, we collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email address</li>
                <li>Name (optional)</li>
                <li>Payment information (processed securely by Stripe)</li>
                <li>Subscription plan details</li>
              </ul>

              <h3 className="text-xl font-mono font-semibold mb-2 mt-4">2.2 Usage Data</h3>
              <p>We automatically collect certain information when you use the Service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>IP address</li>
                <li>Pages visited and features used</li>
                <li>Time and date of visits</li>
                <li>Time spent on pages</li>
              </ul>

              <h3 className="text-xl font-mono font-semibold mb-2 mt-4">2.3 Code and Prompts</h3>
              <p>
                When you use our AI services, we process your prompts and generated code to provide the Service. The handling of this data depends on your chosen AI provider:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Mock Mode:</strong> No data is sent to any server; all processing is local in your browser</li>
                <li><strong>Local AI (Transformers.js):</strong> All processing happens entirely in your browser; no data is sent to our servers or third parties</li>
                <li><strong>Cloud AI (Backend):</strong> Prompts and code are sent to third-party AI providers (OpenAI, Anthropic) via encrypted connections</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                3. How We Use Your Information
              </h2>
              <p>We use collected information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve the Service</li>
                <li>Process your subscription and payments</li>
                <li>Send you service-related notifications</li>
                <li>Respond to your support requests</li>
                <li>Monitor and analyze usage patterns</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                4. Code Privacy and AI Training
              </h2>
              <h3 className="text-xl font-mono font-semibold mb-2">4.1 Code Storage</h3>
              <p>
                Your prompts and generated code are processed securely but <strong>not stored permanently</strong> on our servers. We retain temporary logs for debugging and service improvement for up to 30 days.
              </p>

              <h3 className="text-xl font-mono font-semibold mb-2 mt-4">4.2 AI Training</h3>
              <p>
                <strong>Your code is NOT used to train AI models</strong> without your explicit permission. When using third-party AI providers (OpenAI, Anthropic), their respective data policies apply, but we configure API calls to opt out of training data collection where available.
              </p>

              <h3 className="text-xl font-mono font-semibold mb-2 mt-4">4.3 Privacy-First Option</h3>
              <p>
                For maximum privacy, use the <strong>Local AI (Transformers.js)</strong> provider, which processes all code entirely in your browser with no data sent to any server.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                5. Data Sharing and Disclosure
              </h2>
              <p>We do not sell your personal information. We may share information with:</p>

              <h3 className="text-xl font-mono font-semibold mb-2 mt-4">5.1 Service Providers</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Stripe:</strong> Payment processing (subject to Stripe's privacy policy)</li>
                <li><strong>OpenAI/Anthropic:</strong> AI processing when using cloud AI providers</li>
                <li><strong>Hosting providers:</strong> For infrastructure and service delivery</li>
              </ul>

              <h3 className="text-xl font-mono font-semibold mb-2 mt-4">5.2 Legal Requirements</h3>
              <p>
                We may disclose your information if required by law, court order, or government regulation, or if necessary to protect our rights, property, or safety.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                6. Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption in transit (HTTPS/TLS)</li>
                <li>Encryption at rest for stored data</li>
                <li>Secure API connections to third-party services</li>
                <li>Regular security audits and monitoring</li>
                <li>Access controls and authentication</li>
              </ul>
              <p>
                However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                7. Your Privacy Rights
              </h2>
              <p>Depending on your location, you may have the following rights:</p>

              <h3 className="text-xl font-mono font-semibold mb-2 mt-4">7.1 GDPR Rights (EU/EEA)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>

              <h3 className="text-xl font-mono font-semibold mb-2 mt-4">7.2 CCPA Rights (California)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Right to know what personal information is collected</li>
                <li>Right to know if personal information is sold or disclosed</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to deletion of personal information</li>
                <li>Right to non-discrimination for exercising your rights</li>
              </ul>

              <p className="mt-4">
                To exercise these rights, contact us at <a href="mailto:privacy@hacktoolkit.com" className="text-electric-teal hover:underline">privacy@hacktoolkit.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                8. Data Retention
              </h2>
              <p>We retain your information for as long as necessary to provide the Service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account data:</strong> Until you delete your account</li>
                <li><strong>Usage logs:</strong> Up to 90 days</li>
                <li><strong>Code/prompts:</strong> Temporary processing only, up to 30 days in logs</li>
                <li><strong>Payment records:</strong> As required by law (typically 7 years)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                9. Cookies and Tracking
              </h2>
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain your session and authentication</li>
                <li>Remember your preferences (theme, settings)</li>
                <li>Analyze usage patterns and improve the Service</li>
              </ul>
              <p>
                You can control cookies through your browser settings. Note that disabling cookies may affect Service functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                10. Third-Party Links
              </h2>
              <p>
                The Service may contain links to third-party websites. We are not responsible for the privacy practices of these sites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                11. Children's Privacy
              </h2>
              <p>
                Hexa ⟡ is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                12. International Data Transfers
              </h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers, including standard contractual clauses approved by the European Commission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                13. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of material changes via email or through the Service. The "Last Updated" date at the top indicates when the policy was last revised.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-mono font-bold text-electric-teal mb-4">
                14. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or wish to exercise your privacy rights, contact us at:
              </p>
              <p className="font-mono">
                Email: <a href="mailto:privacy@hacktoolkit.com" className="text-electric-teal hover:underline">privacy@hacktoolkit.com</a><br />
                Email (General): <a href="mailto:hello@hacktoolkit.com" className="text-electric-teal hover:underline">hello@hacktoolkit.com</a><br />
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
