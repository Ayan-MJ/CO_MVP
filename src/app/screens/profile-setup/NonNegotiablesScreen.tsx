import React from 'react';
import { Shield } from 'lucide-react';
import { ChipGroup } from '@/app/components/Chip';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

interface NonNegotiablesScreenProps {
  onContinue: (selectedIds: string[]) => void;
  onBack: () => void;
  initialSelected?: string[];
}

const dealbreakers = [
  { id: 'smoking', label: 'Smoking' },
  { id: 'no-kids', label: "Doesn't want kids" },
  { id: 'different-religion', label: 'Different religion' },
  { id: 'no-pets', label: 'No pets allowed' },
  { id: 'long-distance', label: 'Not open to relocation' },
  { id: 'different-politics', label: 'Very different politics' },
  { id: 'substance-use', label: 'Substance use' },
  { id: 'workaholic', label: 'Extreme work hours' },
  { id: 'no-commitment', label: 'Not seeking commitment' },
  { id: 'poor-communication', label: 'Poor communication' },
];

export function NonNegotiablesScreen({
  onContinue,
  onBack,
  initialSelected = [],
}: NonNegotiablesScreenProps) {
  const [selected, setSelected] = React.useState<string[]>(initialSelected);

  const maxSelection = 5;
  const canSelectMore = selected.length < maxSelection;

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Non-Negotiables" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-accent" />
              <h2>Your deal-breakers</h2>
            </div>
            <p className="text-[var(--text-callout)] text-text-secondary mb-2">
              Select up to {maxSelection} non-negotiables. We'll filter matches accordingly.
            </p>
            <p className="text-[var(--text-footnote)] text-text-muted">
              These are private and only used for matching—they won't appear on your profile.
            </p>
          </div>

          {/* Selection Counter */}
          <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] bg-surface border border-divider">
            <span className="text-[var(--text-callout)] text-text-secondary">
              {selected.length} of {maxSelection} selected
            </span>
            {!canSelectMore && (
              <span className="text-[var(--text-caption)] text-warning font-medium">
                Maximum reached
              </span>
            )}
          </div>

          {/* Dealbreaker Chips */}
          <div>
            <ChipGroup
              chips={dealbreakers}
              selectedIds={selected}
              onSelectionChange={(newSelected) => {
                if (newSelected.length <= maxSelection) {
                  setSelected(newSelected);
                }
              }}
              variant="dealbreaker"
            />
          </div>

          {/* Helper Text */}
          <div className="p-4 rounded-[var(--radius-md)] bg-accent/10 border border-accent/20">
            <p className="text-[var(--text-footnote)] text-text-secondary mb-2">
              <span className="font-semibold">💡 Tip:</span> Be thoughtful but not too restrictive.
            </p>
            <p className="text-[var(--text-footnote)] text-text-muted">
              Selecting too many filters can limit potential matches. Focus on what truly matters
              for long-term compatibility.
            </p>
          </div>

          {/* Skip Option */}
          <div className="text-center">
            <button
              onClick={() => onContinue([])}
              className="text-[var(--text-callout)] text-text-muted hover:text-text-primary transition-colors"
            >
              I don't have any deal-breakers right now
            </button>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-4 border-t border-divider bg-surface">
        <Button
          variant="primary"
          size="large"
          onClick={() => onContinue(selected)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}