import React from 'react';
import { Shield, CheckCircle, Lock, Camera } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

interface VerificationIntroScreenProps {
  onBack: () => void;
  onStart: () => void;
}

export function VerificationIntroScreen({ onBack, onStart }: VerificationIntroScreenProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Photo Verification" onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Hero Icon */}
        <div className="flex justify-center pt-4">
          <div className="w-20 h-20 rounded-full bg-accent-muted flex items-center justify-center">
            <Shield className="w-10 h-10 text-accent" />
          </div>
        </div>

        {/* Main Message */}
        <div className="text-center">
          <h2 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
            Verify your photos
          </h2>
          <p className="text-[var(--text-callout)] text-text-secondary">
            Help us keep Cohort safe and authentic for everyone
          </p>
        </div>

        {/* Why Verification */}
        <div className="bg-surface rounded-[var(--radius-md)] p-4 border border-divider">
          <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-3">
            Why we verify
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-[var(--text-callout)] text-text-primary font-medium mb-0.5">
                  Build trust
                </p>
                <p className="text-[var(--text-footnote)] text-text-muted">
                  Verified profiles help everyone feel confident they're talking to real people
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-[var(--text-callout)] text-text-primary font-medium mb-0.5">
                  Prevent catfishing
                </p>
                <p className="text-[var(--text-footnote)] text-text-muted">
                  Verification confirms you are who you say you are
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-[var(--text-callout)] text-text-primary font-medium mb-0.5">
                  Community standard
                </p>
                <p className="text-[var(--text-footnote)] text-text-muted">
                  All Cohort members are verified before they can send intros
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div>
          <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-3">
            How it works
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[var(--text-caption)] font-bold text-accent">1</span>
              </div>
              <div>
                <p className="text-[var(--text-callout)] text-text-primary">
                  Take a selfie following the on-screen pose
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[var(--text-caption)] font-bold text-accent">2</span>
              </div>
              <div>
                <p className="text-[var(--text-callout)] text-text-primary">
                  We'll compare it to your profile photos
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[var(--text-caption)] font-bold text-accent">3</span>
              </div>
              <div>
                <p className="text-[var(--text-callout)] text-text-primary">
                  Get your verified badge within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="bg-accent-muted rounded-[var(--radius-md)] p-4 border border-accent/20">
          <div className="flex gap-3">
            <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                Your privacy matters
              </h4>
              <p className="text-[var(--text-footnote)] text-text-secondary">
                Verification photos are used only for identity confirmation and are never shown on your profile or shared with other members.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 border-t border-divider bg-surface">
        <Button variant="primary" size="large" onClick={onStart}>
          <Camera className="w-5 h-5" />
          Start Verification
        </Button>
      </div>
    </div>
  );
}
