import React from 'react';
import { ArrowLeft, FileText, ChevronRight } from 'lucide-react';

interface LegalScreenProps {
  onBack: () => void;
  onNavigate: (screen: 'terms' | 'privacy') => void;
}

export function LegalScreen({ onBack, onNavigate }: LegalScreenProps) {
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
          Legal
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mt-6 mb-6">
          <div className="bg-surface border-y border-divider">
            <button
              onClick={() => onNavigate('terms')}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-input-background transition-colors border-b border-divider"
            >
              <div className="w-8 h-8 rounded-lg bg-elevated-surface flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-text-primary" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[var(--text-body)] text-text-primary">
                  Terms of Service
                </span>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  User agreement and guidelines
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted flex-shrink-0" />
            </button>

            <button
              onClick={() => onNavigate('privacy')}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-input-background transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-elevated-surface flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-text-primary" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[var(--text-body)] text-text-primary">
                  Privacy Policy
                </span>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  How we handle your data
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="mx-4 mb-6 p-4 bg-elevated-surface rounded-[var(--radius-md)] border border-divider text-center">
          <p className="text-[var(--text-callout)] text-text-secondary mb-1">
            Cohort Dating App
          </p>
          <p className="text-[var(--text-caption)] text-text-muted">
            Version 1.0.0
          </p>
          <p className="text-[var(--text-caption)] text-text-muted mt-3">
            © 2026 Cohort, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
