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
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-divider">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
        >
          <X className="w-6 h-6 text-text-primary" />
        </button>
        <h3 className="text-[var(--text-body)] font-semibold text-text-primary">
          Decline Introduction
        </h3>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Header Text */}
        <div className="text-center pt-2">
          <h2 className="text-[var(--text-title-2)] font-bold text-text-primary mb-2">
            Not a match with {introName}?
          </h2>
          <p className="text-[var(--text-callout)] text-text-secondary">
            Help us understand what didn't resonate so we can find better matches for you.
          </p>
        </div>

        {/* Optional Reason Selection */}
        <div>
          <p className="text-[var(--text-caption)] text-text-muted uppercase tracking-wide mb-3 px-1">
            Reason (Optional)
          </p>
          <div className="space-y-2">
            {declineReasons.map((reason) => (
              <button
                key={reason.id}
                onClick={() =>
                  setSelectedReason(selectedReason === reason.id ? undefined : reason.id)
                }
                className={`w-full p-4 rounded-[var(--radius-md)] border-2 transition-all text-left ${
                  selectedReason === reason.id
                    ? 'bg-accent-muted border-accent'
                    : 'bg-surface border-divider hover:bg-elevated-surface'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-callout)] font-medium text-text-primary">
                    {reason.label}
                  </span>
                  {selectedReason === reason.id && (
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent-foreground" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Improve Matches Info */}
        <div className="bg-accent/5 rounded-[var(--radius-md)] p-4 border border-accent/10">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                Improve my matches
              </h3>
              <p className="text-[var(--text-callout)] text-text-secondary">
                Your feedback helps our algorithm learn your preferences and suggest better matches each week. The more specific you are, the better we can serve you.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-[var(--text-footnote)] text-text-muted text-center px-4">
          Your feedback is completely private and will not be shared with {introName}.
        </p>
      </div>

      {/* Fixed Bottom CTAs */}
      <div className="p-4 border-t border-divider bg-surface space-y-3">
        <Button variant="primary" size="large" onClick={handleConfirm}>
          {selectedReason ? 'Submit & Decline' : 'Skip & Decline'}
        </Button>
        <button
          onClick={onBack}
          className="w-full py-3 text-[var(--text-callout)] font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}