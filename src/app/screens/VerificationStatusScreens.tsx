import React from 'react';
import { CheckCircle, XCircle, Clock, Camera, AlertTriangle } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';
import { LoadingSkeleton } from '@/app/components/Feedback';

interface VerificationInProgressProps {
  onBack: () => void;
}

export function VerificationInProgressScreen({ onBack }: VerificationInProgressProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Verification" onBack={onBack} />

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {/* Animated Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-accent-muted flex items-center justify-center">
            <Camera className="w-12 h-12 text-accent" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin" />
        </div>

        <h2 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
          Verifying your photo
        </h2>
        <p className="text-[var(--text-callout)] text-text-secondary mb-8 max-w-sm">
          This usually takes a few seconds, but may take up to 24 hours during busy times
        </p>

        {/* Loading Placeholders */}
        <div className="w-full max-w-sm space-y-2">
          <LoadingSkeleton variant="card" />
        </div>

        <div className="mt-8 px-4 py-3 bg-surface rounded-[var(--radius-md)] border border-divider max-w-sm">
          <p className="text-[var(--text-footnote)] text-text-muted">
            You'll receive a notification when verification is complete. Feel free to close this screen.
          </p>
        </div>
      </div>
    </div>
  );
}

interface VerificationSuccessProps {
  onContinue: () => void;
}

export function VerificationSuccessScreen({ onContinue }: VerificationSuccessProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-success/20 flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-success" />
        </div>

        <h2 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
          Verification successful!
        </h2>
        <p className="text-[var(--text-callout)] text-text-secondary mb-8 max-w-sm">
          Your profile is now verified. This helps build trust with potential matches.
        </p>

        {/* Benefits */}
        <div className="w-full max-w-sm bg-surface rounded-[var(--radius-md)] p-4 border border-divider mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
              <p className="text-[var(--text-callout)] text-text-primary text-left">
                Verified badge added to your profile
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
              <p className="text-[var(--text-callout)] text-text-primary text-left">
                Increased visibility to quality matches
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
              <p className="text-[var(--text-callout)] text-text-primary text-left">
                Ready to receive weekly intros
              </p>
            </div>
          </div>
        </div>

        <Button variant="primary" size="large" onClick={onContinue}>
          Continue to Profile Setup
        </Button>
      </div>
    </div>
  );
}

interface VerificationFailureProps {
  onRetry: () => void;
  onSupport: () => void;
}

export function VerificationFailureScreen({ onRetry, onSupport }: VerificationFailureProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {/* Error Icon */}
        <div className="w-24 h-24 rounded-full bg-error/20 flex items-center justify-center mb-6">
          <XCircle className="w-12 h-12 text-error" />
        </div>

        <h2 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
          Verification unsuccessful
        </h2>
        <p className="text-[var(--text-callout)] text-text-secondary mb-8 max-w-sm">
          We couldn't verify your photo. This can happen if the photo doesn't match your profile or the lighting isn't clear.
        </p>

        {/* Common Reasons */}
        <div className="w-full max-w-sm bg-surface rounded-[var(--radius-md)] p-4 border border-divider mb-6">
          <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-3 text-left">
            Common reasons
          </h3>
          <div className="space-y-2 text-left">
            <p className="text-[var(--text-footnote)] text-text-muted">
              • Photo doesn't match your profile pictures
            </p>
            <p className="text-[var(--text-footnote)] text-text-muted">
              • Poor lighting or blurry image
            </p>
            <p className="text-[var(--text-footnote)] text-text-muted">
              • Face not fully visible in frame
            </p>
            <p className="text-[var(--text-footnote)] text-text-muted">
              • Wearing sunglasses or face coverings
            </p>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <Button variant="primary" size="large" onClick={onRetry}>
            <Camera className="w-5 h-5" />
            Try Again
          </Button>
          <Button variant="tertiary" onClick={onSupport}>
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}

interface VerificationManualReviewProps {
  onBack: () => void;
}

export function VerificationManualReviewScreen({ onBack }: VerificationManualReviewProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Manual Review" onBack={onBack} />

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {/* Review Icon */}
        <div className="w-24 h-24 rounded-full bg-warning/20 flex items-center justify-center mb-6">
          <Clock className="w-12 h-12 text-warning" />
        </div>

        <h2 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
          Under manual review
        </h2>
        <p className="text-[var(--text-callout)] text-text-secondary mb-8 max-w-sm">
          Our team is manually reviewing your verification. This typically takes 12-24 hours.
        </p>

        {/* Info Card */}
        <div className="w-full max-w-sm bg-accent-muted rounded-[var(--radius-md)] p-4 border border-accent/20 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <h4 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                Why manual review?
              </h4>
              <p className="text-[var(--text-footnote)] text-text-secondary">
                Automated verification couldn't confidently verify your photo, so our team will review it manually to ensure accuracy and fairness.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm bg-surface rounded-[var(--radius-md)] p-4 border border-divider">
          <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-2 text-left">
            What happens next
          </h3>
          <div className="space-y-2 text-left">
            <p className="text-[var(--text-footnote)] text-text-muted">
              • Our team will carefully review your photos
            </p>
            <p className="text-[var(--text-footnote)] text-text-muted">
              • You'll get a notification within 24 hours
            </p>
            <p className="text-[var(--text-footnote)] text-text-muted">
              • You can continue setting up your profile
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Button variant="secondary" onClick={onBack}>
            Continue to Profile Setup
          </Button>
        </div>
      </div>
    </div>
  );
}
