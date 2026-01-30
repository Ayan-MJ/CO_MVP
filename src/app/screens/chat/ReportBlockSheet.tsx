import React from 'react';
import { X, ShieldAlert, BadgeAlert, UserX, Ban, Link2Off, Flag } from 'lucide-react';

interface ReportBlockSheetProps {
  matchName: string;
  type: 'report' | 'block';
  onClose: () => void;
  onConfirm: (reason?: string) => void;
}

const REPORT_REASONS = [
  { id: 'harassment', label: 'Harassment', icon: <ShieldAlert className="w-5 h-5" /> },
  { id: 'scam', label: 'Scam', icon: <BadgeAlert className="w-5 h-5" /> },
  { id: 'misrepresentation', label: 'Misrepresentation', icon: <UserX className="w-5 h-5" /> },
  { id: 'hate', label: 'Hate', icon: <Ban className="w-5 h-5" /> },
  { id: 'off-platform-coercion', label: 'Off-platform coercion', icon: <Link2Off className="w-5 h-5" /> },
  { id: 'other', label: 'Other', icon: <Flag className="w-5 h-5" /> },
];

export function ReportBlockSheet({ matchName, type, onClose, onConfirm }: ReportBlockSheetProps) {
  const [selectedReason, setSelectedReason] = React.useState<string | null>(null);
  const [additionalDetails, setAdditionalDetails] = React.useState('');

  const handleConfirm = () => {
    if (type === 'report') {
      onConfirm(selectedReason || undefined);
    } else {
      onConfirm();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-in fade-in">
      <div className="w-full max-w-[393px] bg-surface rounded-t-[24px] pb-8 animate-in slide-in-from-bottom">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-[var(--text-title-3)] font-bold text-text-primary">
            {type === 'report' ? 'Report Conversation' : 'Block User'}
          </h2>
          <button onClick={onClose} className="p-2 -mr-2 hover:bg-input-background rounded-full transition-colors">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="px-6 space-y-4">
          {type === 'report' ? (
            <>
              <p className="text-[var(--text-callout)] text-text-secondary">
                Help us keep Cohort safe. Let us know what's wrong with this conversation.
              </p>

              {/* Report Reasons */}
              <div className="space-y-2">
                {REPORT_REASONS.map((reason) => (
                  <button
                    key={reason.id}
                    onClick={() => setSelectedReason(reason.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-[var(--radius-md)] border transition-colors ${
                      selectedReason === reason.id
                        ? 'border-accent bg-accent/10'
                        : 'border-border-primary hover:border-accent/50 bg-background-secondary'
                    }`}
                  >
                    <div
                      className={`${
                        selectedReason === reason.id ? 'text-accent' : 'text-text-secondary'
                      }`}
                    >
                      {reason.icon}
                    </div>
                    <span className="text-[var(--text-callout)] text-text-primary">{reason.label}</span>
                  </button>
                ))}
              </div>

              {/* Additional Details */}
              {selectedReason && (
                <div>
                  <label className="block text-[var(--text-footnote)] text-text-secondary mb-2">
                    Additional details (optional)
                  </label>
                  <textarea
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    placeholder="Provide more context if needed..."
                    rows={3}
                    className="w-full bg-input-background text-text-primary placeholder:text-text-muted rounded-[var(--radius-md)] px-4 py-3 text-[var(--text-callout)] focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={handleConfirm}
                  disabled={!selectedReason}
                  className="w-full px-6 py-4 bg-destructive text-white rounded-[var(--radius-md)] font-semibold hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Report
                </button>
                <button
                  onClick={onClose}
                  className="w-full px-6 py-4 bg-input-background text-text-primary rounded-[var(--radius-md)] font-semibold hover:bg-surface transition-colors"
                >
                  Cancel
                </button>
              </div>

              {/* Safety Note */}
              <div className="bg-accent-muted rounded-[var(--radius-md)] p-4">
                <p className="text-[var(--text-caption)] text-text-secondary">
                  Your report is confidential. We'll review it and take appropriate action. If you're in immediate danger, contact local authorities.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Block Confirmation */}
              <div className="bg-destructive/10 rounded-[var(--radius-md)] p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[var(--text-callout)] font-medium text-text-primary mb-1">
                    Block {matchName}?
                  </p>
                  <p className="text-[var(--text-footnote)] text-text-secondary">
                    They won't be able to message you or see your profile. This action can be undone from Settings.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                <button
                  onClick={handleConfirm}
                  className="w-full px-6 py-4 bg-destructive text-white rounded-[var(--radius-md)] font-semibold hover:bg-destructive/90 transition-colors"
                >
                  Block User
                </button>
                <button
                  onClick={onClose}
                  className="w-full px-6 py-4 bg-input-background text-text-primary rounded-[var(--radius-md)] font-semibold hover:bg-surface transition-colors"
                >
                  Cancel
                </button>
              </div>

              {/* Additional Option */}
              <button
                onClick={() => {
                  // Switch to report flow
                  onClose();
                }}
                className="w-full text-[var(--text-callout)] text-accent hover:underline"
              >
                Report this conversation instead
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
