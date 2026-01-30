import React from 'react';
import { Shield, AlertTriangle, Ban, Flag, Phone } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';

export interface ReportSheetProps {
  userName: string;
  onSubmit: (reason: string, details: string) => void;
  onCancel: () => void;
}

export function ReportSheet({ userName, onSubmit, onCancel }: ReportSheetProps) {
  const [selectedReason, setSelectedReason] = React.useState('');
  const [details, setDetails] = React.useState('');
  
  const reasons = [
    'Inappropriate behavior',
    'Harassment',
    'Fake profile',
    'Spam',
    'Safety concerns',
    'Other',
  ];
  
  return (
    <div className="bg-surface rounded-t-[var(--radius-lg)] p-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center">
          <Flag className="w-6 h-6 text-error" />
        </div>
        <div>
          <h3 className="text-[var(--text-title-3)] font-semibold text-text-primary">
            Report {userName}
          </h3>
          <p className="text-[var(--text-footnote)] text-text-muted">
            Help us keep Cohort safe
          </p>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block mb-2 text-[var(--text-callout)] font-medium text-text-primary">
            Reason for report
          </label>
          <div className="space-y-2">
            {reasons.map((reason) => (
              <label
                key={reason}
                className={`
                  flex items-center gap-3 p-3 rounded-[var(--radius-sm)] border cursor-pointer transition-all
                  ${selectedReason === reason
                    ? 'border-accent bg-accent-muted'
                    : 'border-divider bg-surface hover:bg-elevated-surface'
                  }
                `}
              >
                <input
                  type="radio"
                  name="reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-[var(--text-callout)] text-text-primary">{reason}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block mb-2 text-[var(--text-callout)] font-medium text-text-primary">
            Additional details (optional)
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Provide more context..."
            rows={3}
            className="
              w-full px-4 py-3 rounded-[var(--radius-sm)]
              bg-input-background text-text-primary
              border border-divider
              focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-accent
              placeholder:text-text-muted
              resize-none
            "
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={() => onSubmit(selectedReason, details)}
          disabled={!selectedReason}
          className="flex-1"
        >
          Submit Report
        </Button>
      </div>
    </div>
  );
}

export interface BlockConfirmModalProps {
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function BlockConfirmModal({ userName, onConfirm, onCancel }: BlockConfirmModalProps) {
  return (
    <div className="bg-surface rounded-[var(--radius-lg)] p-6 max-w-sm mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center">
          <Ban className="w-6 h-6 text-error" />
        </div>
        <div>
          <h3 className="text-[var(--text-title-3)] font-semibold text-text-primary">
            Block {userName}?
          </h3>
        </div>
      </div>
      
      <p className="text-[var(--text-callout)] text-text-secondary mb-6">
        {userName} will no longer be able to see your profile, send you messages, or match with you. This action can be undone in settings.
      </p>
      
      <div className="flex gap-2">
        <Button variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm} className="flex-1">
          Block
        </Button>
      </div>
    </div>
  );
}

export interface SafetyCardProps {
  variant?: 'emergency' | 'tips';
}

export function SafetyCard({ variant = 'tips' }: SafetyCardProps) {
  if (variant === 'emergency') {
    return (
      <Card elevated className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-error flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
              Emergency Resources
            </h4>
            <p className="text-[var(--text-footnote)] text-text-secondary mb-3">
              If you feel unsafe, reach out for help immediately.
            </p>
            <button className="text-[var(--text-callout)] font-semibold text-error hover:opacity-70 transition-opacity">
              Call Emergency Services
            </button>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-4 bg-accent-muted border-accent/20">
      <div className="flex items-start gap-3">
        <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-[var(--text-callout)] font-semibold text-text-primary mb-2">
            Safety Tips
          </h4>
          <ul className="space-y-1.5 text-[var(--text-footnote)] text-text-secondary">
            <li>• Meet in public places for first dates</li>
            <li>• Tell a friend where you're going</li>
            <li>• Trust your instincts</li>
            <li>• Keep personal information private initially</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

export interface TrustBadgeProps {
  verified?: boolean;
  photoVerified?: boolean;
  size?: 'sm' | 'md';
}

export function TrustBadge({ verified = false, photoVerified = false, size = 'md' }: TrustBadgeProps) {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  };
  
  if (!verified && !photoVerified) return null;
  
  return (
    <div className="flex items-center gap-1">
      {verified && (
        <div
          className={`${sizeStyles[size]} rounded-full bg-accent flex items-center justify-center`}
          title="Verified Profile"
        >
          <Shield className="w-3/5 h-3/5 text-accent-foreground" />
        </div>
      )}
      {photoVerified && (
        <div
          className={`${sizeStyles[size]} rounded-full bg-success flex items-center justify-center`}
          title="Photo Verified"
        >
          <Shield className="w-3/5 h-3/5 text-white" />
        </div>
      )}
    </div>
  );
}
