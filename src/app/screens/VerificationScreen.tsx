import React from 'react';
import { ArrowLeft, ShieldCheck, Clock, XCircle, AlertCircle, Camera, HelpCircle } from 'lucide-react';

interface VerificationScreenProps {
  onBack: () => void;
  verificationStatus: {
    status: 'verified' | 'pending' | 'failed' | 'not-started';
    submittedDate?: string;
    failureReason?: string;
  };
  onStartVerification: () => void;
  onRetryVerification: () => void;
  onContactSupport: () => void;
}

export function VerificationScreen({ 
  onBack, 
  verificationStatus,
  onStartVerification,
  onRetryVerification,
  onContactSupport
}: VerificationScreenProps) {
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
          Verification
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Status Card */}
        <div className="mx-4 mt-6 mb-6">
          {verificationStatus.status === 'verified' ? (
            <div className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-[var(--radius-lg)] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h2 className="text-[var(--text-title-3)] font-bold text-text-primary">
                    Verified
                  </h2>
                  <p className="text-[var(--text-callout)] text-text-secondary">
                    Your identity has been confirmed
                  </p>
                </div>
              </div>
              <p className="text-[var(--text-callout)] text-text-secondary">
                Your verified badge is displayed on your profile, building trust with potential matches.
              </p>
            </div>
          ) : verificationStatus.status === 'pending' ? (
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-[var(--radius-lg)] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-[var(--text-title-3)] font-bold text-text-primary">
                    Verification Pending
                  </h2>
                  <p className="text-[var(--text-callout)] text-text-secondary">
                    We're reviewing your submission
                  </p>
                </div>
              </div>
              {verificationStatus.submittedDate && (
                <p className="text-[var(--text-callout)] text-text-secondary mb-3">
                  Submitted {verificationStatus.submittedDate}
                </p>
              )}
              <p className="text-[var(--text-callout)] text-text-secondary">
                Verification typically takes 24-48 hours. We'll notify you once complete.
              </p>
            </div>
          ) : verificationStatus.status === 'failed' ? (
            <div className="bg-elevated-surface border border-warning/20 rounded-[var(--radius-lg)] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h2 className="text-[var(--text-title-3)] font-bold text-text-primary">
                    Verification Failed
                  </h2>
                  <p className="text-[var(--text-callout)] text-text-secondary">
                    We couldn't verify your identity
                  </p>
                </div>
              </div>
              {verificationStatus.failureReason && (
                <div className="mb-4 p-3 bg-warning/5 rounded-[var(--radius-md)] border border-warning/10">
                  <p className="text-[var(--text-callout)] text-text-primary">
                    <span className="font-medium">Reason: </span>
                    {verificationStatus.failureReason}
                  </p>
                </div>
              )}
              <button
                onClick={onRetryVerification}
                className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-[var(--radius-md)] font-semibold hover:bg-accent/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="bg-elevated-surface border border-divider rounded-[var(--radius-lg)] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-text-muted" />
                </div>
                <div>
                  <h2 className="text-[var(--text-title-3)] font-bold text-text-primary">
                    Not Verified
                  </h2>
                  <p className="text-[var(--text-callout)] text-text-secondary">
                    Get verified to build trust
                  </p>
                </div>
              </div>
              <button
                onClick={onStartVerification}
                className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-[var(--radius-md)] font-semibold hover:bg-accent/90 transition-colors"
              >
                Start Verification
              </button>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="mb-6">
          <h3 className="px-4 mb-3 text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide">
            How Verification Works
          </h3>
          <div className="bg-surface border-y border-divider px-4 py-4">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--text-callout)] font-bold text-accent">1</span>
                </div>
                <div>
                  <h4 className="text-[var(--text-body)] font-semibold text-text-primary mb-0.5">
                    Take a selfie
                  </h4>
                  <p className="text-[var(--text-callout)] text-text-secondary">
                    Follow the on-screen prompts to capture a clear selfie
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--text-callout)] font-bold text-accent">2</span>
                </div>
                <div>
                  <h4 className="text-[var(--text-body)] font-semibold text-text-primary mb-0.5">
                    We review
                  </h4>
                  <p className="text-[var(--text-callout)] text-text-secondary">
                    Our team verifies your photo matches your profile pictures
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--text-callout)] font-bold text-accent">3</span>
                </div>
                <div>
                  <h4 className="text-[var(--text-body)] font-semibold text-text-primary mb-0.5">
                    Get your badge
                  </h4>
                  <p className="text-[var(--text-callout)] text-text-secondary">
                    Once approved, a verified badge appears on your profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <h3 className="px-4 mb-3 text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide">
            Why Verify?
          </h3>
          <div className="bg-surface border-y border-divider px-4 py-4">
            <div className="space-y-3">
              {[
                'Build trust with potential matches',
                'Show you\'re a real person',
                'Increase match acceptance rate',
                'Help keep the community safe',
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-[var(--text-callout)] text-text-primary">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Link */}
        <div className="mb-6">
          <div className="bg-surface border-y border-divider">
            <button
              onClick={onContactSupport}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-input-background transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-elevated-surface flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-4 h-4 text-text-primary" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[var(--text-body)] text-text-primary">
                  Need Help?
                </span>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  Contact support for verification issues
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mx-4 mb-6 p-4 bg-elevated-surface rounded-[var(--radius-md)] border border-divider">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed">
              Your verification photo is used only to confirm your identity and is never shown to other users. Photos are deleted after verification is complete.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}