import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyScreenProps {
  onBack: () => void;
}

export function PrivacyPolicyScreen({ onBack }: PrivacyPolicyScreenProps) {
  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-divider bg-surface flex items-center">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full hover:bg-input-background transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <h1 className="flex-1 text-center text-[var(--text-headline)] font-bold text-text-primary">
          Privacy Policy
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-[var(--text-caption)] text-text-muted mb-6">
            Last updated: January 30, 2026
          </p>

          <div className="space-y-6 text-[var(--text-callout)] text-text-secondary leading-relaxed">
            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                1. Information We Collect
              </h2>
              <p className="mb-2">
                We collect information you provide directly to us, including:
              </p>
              <ul className="space-y-1 pl-5 mb-3">
                <li>• Profile information (name, age, photos, occupation, education)</li>
                <li>• Preferences and values</li>
                <li>• Messages and communications</li>
                <li>• Verification photos</li>
                <li>• Device information and usage data</li>
              </ul>
              <p>
                We also collect information automatically through your use of the Service, such as 
                location data, device identifiers, and interaction patterns.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                2. How We Use Your Information
              </h2>
              <p className="mb-2">
                We use your information to:
              </p>
              <ul className="space-y-1 pl-5">
                <li>• Provide and improve our matching services</li>
                <li>• Create curated introductions</li>
                <li>• Verify user identities</li>
                <li>• Process subscriptions and payments</li>
                <li>• Send notifications and updates</li>
                <li>• Maintain safety and security</li>
                <li>• Analyze usage and improve the Service</li>
                <li>• Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                3. Sharing Your Information
              </h2>
              <p className="mb-3">
                We do not sell your personal information. We may share your information with:
              </p>
              <p className="mb-2">
                <span className="font-semibold text-text-primary">Other Users:</span> Your profile 
                information is visible to users we introduce you to. Messages are only visible to you 
                and your matches.
              </p>
              <p className="mb-2">
                <span className="font-semibold text-text-primary">Service Providers:</span> We work 
                with third-party providers for hosting, analytics, payment processing, and customer support.
              </p>
              <p>
                <span className="font-semibold text-text-primary">Legal Requirements:</span> We may 
                disclose information when required by law or to protect our rights and safety.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                4. Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your information, including 
                encryption, secure servers, and access controls. However, no method of transmission over 
                the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                5. Data Retention
              </h2>
              <p>
                We retain your information for as long as your account is active or as needed to provide 
                services. When you delete your account, we delete or anonymize your personal information 
                within 30 days, except where we are required to retain it for legal purposes.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                6. Your Privacy Rights
              </h2>
              <p className="mb-2">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="space-y-1 pl-5">
                <li>• Access your personal data</li>
                <li>• Correct inaccurate information</li>
                <li>• Request deletion of your data</li>
                <li>• Object to data processing</li>
                <li>• Export your data</li>
                <li>• Withdraw consent</li>
              </ul>
              <p className="mt-3">
                You can exercise these rights through your account settings or by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                7. Location Data
              </h2>
              <p>
                We collect and use your approximate location to show you matches in your area. You can 
                control location permissions through your device settings. Disabling location may limit 
                certain features of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                8. Cookies and Tracking
              </h2>
              <p>
                We use cookies and similar technologies to recognize you, remember preferences, analyze 
                usage, and improve our Service. You can control cookie preferences through your device 
                or browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                9. Third-Party Services
              </h2>
              <p>
                Our Service may contain links to third-party websites or services. We are not responsible 
                for the privacy practices of these third parties. We encourage you to review their privacy 
                policies.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                10. Children's Privacy
              </h2>
              <p>
                Our Service is not intended for users under 18 years of age. We do not knowingly collect 
                information from children. If we learn that we have collected information from a child, we 
                will delete it immediately.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                11. International Data Transfers
              </h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your information in accordance 
                with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                12. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of material changes 
                by posting the updated policy in the app and updating the "Last updated" date. Your continued 
                use of the Service after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                13. Contact Us
              </h2>
              <p className="mb-2">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="font-medium text-text-primary">
                privacy@cohortapp.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
