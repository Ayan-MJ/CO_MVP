import React from 'react';
import { ShieldCheck, CreditCard, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { EmptyState } from '@/app/components/Feedback';

interface IntroEmptyStateProps {
  type: 'not-verified' | 'not-subscribed' | 'no-intros';
  onAction: () => void;
}

export function IntroEmptyState({ type, onAction }: IntroEmptyStateProps) {
  if (type === 'not-verified') {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-sm">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-[var(--text-title-2)] font-bold text-text-primary text-center mb-3">
              Complete Verification
            </h2>
            <p className="text-[var(--text-body)] text-text-secondary text-center mb-6">
              To receive weekly introductions, please complete your profile verification. This ensures a safe, trusted community for everyone.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 bg-surface rounded-[var(--radius-md)]">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--text-caption)] font-bold text-accent">1</span>
                </div>
                <span className="text-[var(--text-callout)] text-text-secondary">
                  Verify your phone number
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface rounded-[var(--radius-md)]">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--text-caption)] font-bold text-accent">2</span>
                </div>
                <span className="text-[var(--text-callout)] text-text-secondary">
                  Complete photo verification
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface rounded-[var(--radius-md)]">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--text-caption)] font-bold text-accent">3</span>
                </div>
                <span className="text-[var(--text-callout)] text-text-secondary">
                  Finish your profile setup
                </span>
              </div>
            </div>
            <Button variant="primary" size="large" onClick={onAction}>
              Continue Verification
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'not-subscribed') {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-sm">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-[var(--text-title-2)] font-bold text-text-primary text-center mb-3">
              Premium Feature
            </h2>
            <p className="text-[var(--text-body)] text-text-secondary text-center mb-6">
              Weekly curated introductions are available to Cohort Premium members. Get thoughtfully selected matches every Monday.
            </p>
            
            {/* Benefits */}
            <div className="bg-accent/5 rounded-[var(--radius-md)] p-4 border border-accent/10 mb-6">
              <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-3">
                Premium Benefits
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-[var(--text-callout)] text-text-secondary">
                    3 curated introductions every week
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-[var(--text-callout)] text-text-secondary">
                    AI-powered compatibility insights
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-[var(--text-callout)] text-text-secondary">
                    See who's interested in you
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-[var(--text-callout)] text-text-secondary">
                    Priority support & safety features
                  </span>
                </li>
              </ul>
            </div>

            <Button variant="primary" size="large" onClick={onAction}>
              <CreditCard className="w-5 h-5" />
              View Premium Plans
            </Button>
            <p className="text-[var(--text-footnote)] text-text-muted text-center mt-3">
              Starting at $29/month
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No intros this week
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-sm">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-[var(--text-title-2)] font-bold text-text-primary text-center mb-3">
            No Introductions This Week
          </h2>
          <p className="text-[var(--text-body)] text-text-secondary text-center mb-6">
            We're working on finding the right matches for you. Check back Monday for new introductions.
          </p>
          
          <div className="bg-surface rounded-[var(--radius-md)] p-4 border border-divider mb-6">
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-3 text-center">
              While you wait
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-[var(--text-callout)] text-text-secondary">
                  Complete your profile for better matches
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-[var(--text-callout)] text-text-secondary">
                  Update your preferences if needed
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-[var(--text-callout)] text-text-secondary">
                  Add more photos to your profile
                </span>
              </li>
            </ul>
          </div>

          <Button variant="secondary" size="large" onClick={onAction}>
            Edit My Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
