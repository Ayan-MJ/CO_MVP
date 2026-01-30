import React from 'react';
import { Heart, CheckCircle, Shield, Users, Sparkles } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

interface SoftPaywallScreenProps {
  onBack: () => void;
  onSubscribe: () => void;
  onSkip?: () => void;
}

export function SoftPaywallScreen({ onBack, onSubscribe, onSkip }: SoftPaywallScreenProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Membership" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Hero */}
          <div className="text-center pt-4">
            <div className="w-16 h-16 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
              Unlock weekly introductions
            </h2>
            <p className="text-[var(--text-callout)] text-text-secondary">
              Subscribe to start receiving curated matches every week
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-elevated-surface rounded-[var(--radius-md)] p-5 shadow-[var(--shadow-lg)] border border-divider">
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-4">
              Membership includes
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-[var(--text-callout)] text-text-primary font-medium mb-0.5">
                    3 curated intros per week
                  </p>
                  <p className="text-[var(--text-footnote)] text-text-muted">
                    Carefully selected matches based on your preferences
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-[var(--text-callout)] text-text-primary font-medium mb-0.5">
                    Unlimited messaging
                  </p>
                  <p className="text-[var(--text-footnote)] text-text-muted">
                    Connect with all your matches without limits
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-[var(--text-callout)] text-text-primary font-medium mb-0.5">
                    Advanced filters
                  </p>
                  <p className="text-[var(--text-footnote)] text-text-muted">
                    Refine your preferences for better matches
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-[var(--text-callout)] text-text-primary font-medium mb-0.5">
                    Priority verification
                  </p>
                  <p className="text-[var(--text-footnote)] text-text-muted">
                    Fast-track your profile verification
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Placeholder */}
          <div className="bg-accent-muted rounded-[var(--radius-md)] p-5 border border-accent/20">
            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  Membership pricing
                </p>
                <p className="text-[var(--text-title-1)] font-bold text-text-primary">
                  Coming soon
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-[var(--text-caption)] font-semibold">
                Premium
              </span>
            </div>
            <p className="text-[var(--text-footnote)] text-text-muted">
              Plans and pricing will be available during beta. Cancel anytime.
            </p>
          </div>

          {/* Social Proof */}
          <div className="bg-surface rounded-[var(--radius-md)] p-4 border border-divider">
            <p className="text-[var(--text-footnote)] text-text-muted italic text-center">
              "The quality of matches on Cohort is unmatched. Finally, a dating app that values real connections."
            </p>
            <p className="text-[var(--text-caption)] text-text-muted text-center mt-2">
              — Sarah, SF member since 2025
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 border-t border-divider bg-surface space-y-3">
        <Button variant="primary" size="large" onClick={onSubscribe}>
          Continue to Profile Setup
        </Button>
        {onSkip && (
          <button
            onClick={onSkip}
            className="w-full text-[var(--text-callout)] text-text-secondary"
          >
            I'll decide later
          </button>
        )}
        <p className="text-[var(--text-caption)] text-text-muted text-center">
          Subscription required to unlock weekly introductions
        </p>
      </div>
    </div>
  );
}
