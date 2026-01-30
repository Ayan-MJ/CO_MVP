import React from 'react';
import { Heart, Shield, Users } from 'lucide-react';
import { Button } from '@/app/components/Button';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col h-full bg-background p-6">
      {/* Logo/Brand */}
      <div className="pt-16 pb-8">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-accent-foreground" fill="currentColor" />
        </div>
        <h1 className="text-[var(--text-large-title)] font-bold text-text-primary mb-2">
          Cohort
        </h1>
        <p className="text-[var(--text-title-3)] text-text-secondary">
          Intentional dating for serious relationships
        </p>
      </div>

      {/* Value Props */}
      <div className="flex-1 space-y-6 py-8">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
              3 curated introductions weekly
            </h3>
            <p className="text-[var(--text-footnote)] text-text-muted">
              Quality over quantity. We match you with compatible people in your city.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
              Verified members only
            </h3>
            <p className="text-[var(--text-footnote)] text-text-muted">
              Every member is photo-verified for authenticity and safety.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
              Built for real connection
            </h3>
            <p className="text-[var(--text-footnote)] text-text-muted">
              No endless swiping. Focus on meaningful conversations with compatible matches.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="py-4 px-4 bg-surface rounded-[var(--radius-md)] border border-divider mb-6">
        <p className="text-[var(--text-caption)] text-text-muted text-center">
          Trusted by thousands of professionals seeking long-term relationships
        </p>
      </div>

      {/* CTA */}
      <div className="space-y-3">
        <Button variant="primary" size="large" onClick={onContinue}>
          Get Started
        </Button>
        <p className="text-[var(--text-caption)] text-text-muted text-center">
          By continuing, you agree to our Terms and Privacy Policy
        </p>
      </div>
    </div>
  );
}
