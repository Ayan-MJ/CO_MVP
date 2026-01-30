import React from 'react';
import { X, Lightbulb } from 'lucide-react';
import { Button } from '@/app/components/Button';

interface IntroDeclineScreenProps {
  introName: string;
  onBack: () => void;
  onConfirm: (reason?: string) => void;
}

const declineReasons = [
  { id: 'distance', label: 'Distance is too far' },
  { id: 'lifestyle', label: 'Different lifestyle preferences' },
  { id: 'values', label: "Values don't align" },
  { id: 'timing', label: 'Not the right timing for me' },
  { id: 'physical', label: 'Not physically attracted' },
  { id: 'age', label: 'Age preference mismatch' },
  { id: 'kids', label: 'Different views on children' },
  { id: 'other', label: 'Other reason' },
];

export function IntroDeclineScreen({ introName, onBack, onConfirm }: IntroDeclineScreenProps) {
  const [selectedReason, setSelectedReason] = React.useState<string | undefined>();

  const handleConfirm = () => {
    onConfirm(selectedReason);
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex-1" />
      <div className="w-full rounded-t-[32px] bg-surface shadow-[0_-12px_30px_rgba(0,0,0,0.12)] border-t border-divider">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-elevated-surface transition-colors"
          >
            <X className="w-5 h-5 text-text-primary" />
          </button>
          <h3 className="text-[var(--text-body)] font-semibold text-text-primary">
            Decline Introduction
          </h3>
          <div className="w-10" />
        </div>

        <div className="px-4 pb-6 pt-2 space-y-5">
          {/* Header Text */}
          <div className="text-center">
            <h2 className="text-[var(--text-title-2)] font-bold text-text-primary">
              Not a match with {introName}?
            </h2>
            <p className="text-[var(--text-callout)] text-text-secondary">
              Share a quick reason so we can improve future matches.
            </p>
          </div>

          {/* Optional Reason Selection */}
          <div>
            <p className="text-[var(--text-caption)] text-text-muted uppercase tracking-wide mb-3 px-1">
              Reason (Optional)
            </p>
            <div className="flex flex-wrap gap-2">
              {declineReasons.map((reason) => (
                <button
                  key={reason.id}
                  onClick={() =>
                    setSelectedReason(selectedReason === reason.id ? undefined : reason.id)
                  }
                  className={`px-4 py-2 rounded-full border text-[var(--text-callout)] transition-all ${
                    selectedReason === reason.id
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'bg-background text-text-primary border-divider hover:bg-elevated-surface'
                  }`}
                >
                  {reason.label}
                </button>
              ))}
            </div>
          </div>

          {/* Improve Matches Info */}
          <div className="bg-accent/5 rounded-[var(--radius-md)] p-3 border border-accent/10">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent flex-shrink-0" />
              <p className="text-[var(--text-callout)] text-text-secondary">
                Your feedback stays private and helps us personalize future intros.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <Button variant="primary" size="large" onClick={handleConfirm}>
              Decline
            </Button>
            <button
              onClick={onBack}
              className="w-full text-[var(--text-callout)] font-medium text-text-muted hover:text-text-primary transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
