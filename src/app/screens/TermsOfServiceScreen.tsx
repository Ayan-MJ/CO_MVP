import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsOfServiceScreenProps {
  onBack: () => void;
}

export function TermsOfServiceScreen({ onBack }: TermsOfServiceScreenProps) {
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
          Terms of Service
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
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using Cohort ("the Service"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                2. Eligibility
              </h2>
              <p className="mb-2">
                To use Cohort, you must:
              </p>
              <ul className="space-y-1 pl-5">
                <li>• Be at least 18 years of age</li>
                <li>• Be legally able to enter into a binding contract</li>
                <li>• Not be prohibited from using the Service under applicable laws</li>
                <li>• Provide accurate and truthful information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                3. Account Security
              </h2>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all 
                activities that occur under your account. You agree to notify us immediately of any unauthorized 
                access to your account.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                4. User Conduct
              </h2>
              <p className="mb-2">
                When using Cohort, you agree not to:
              </p>
              <ul className="space-y-1 pl-5">
                <li>• Harass, threaten, or harm other users</li>
                <li>• Post false, misleading, or fraudulent content</li>
                <li>• Use the Service for commercial purposes without authorization</li>
                <li>• Violate any applicable laws or regulations</li>
                <li>• Impersonate another person or entity</li>
                <li>• Interfere with the proper functioning of the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                5. Content and Intellectual Property
              </h2>
              <p className="mb-3">
                You retain ownership of content you submit to Cohort. However, by submitting content, you grant 
                us a worldwide, non-exclusive license to use, reproduce, and display your content in connection 
                with operating the Service.
              </p>
              <p>
                All Service content, features, and functionality are owned by Cohort and protected by copyright, 
                trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                6. Subscriptions and Payments
              </h2>
              <p className="mb-2">
                Premium subscriptions are billed in advance and automatically renew until canceled. You may cancel 
                your subscription at any time through your App Store settings. Cancellation takes effect at the end 
                of the current billing period.
              </p>
              <p>
                All fees are non-refundable except as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                7. Termination
              </h2>
              <p>
                We reserve the right to suspend or terminate your account at any time for violations of these Terms 
                or for any other reason at our discretion. You may delete your account at any time through the app settings.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                8. Disclaimers
              </h2>
              <p className="mb-2">
                The Service is provided "as is" without warranties of any kind. We do not guarantee:
              </p>
              <ul className="space-y-1 pl-5">
                <li>• The accuracy of user profiles or information</li>
                <li>• That you will find a match or relationship</li>
                <li>• Uninterrupted or error-free service</li>
                <li>• The behavior or actions of other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                9. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, Cohort shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages resulting from your use of or inability to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                10. Changes to Terms
              </h2>
              <p>
                We may modify these Terms at any time. We will notify you of material changes by posting the updated 
                Terms in the app. Continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-[var(--text-title-3)] font-bold text-text-primary mb-3">
                11. Contact Us
              </h2>
              <p>
                If you have questions about these Terms, please contact us at legal@cohortapp.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
