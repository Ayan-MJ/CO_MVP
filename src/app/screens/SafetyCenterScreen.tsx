import React from 'react';
import { 
  ArrowLeft, 
  Shield, 
  AlertCircle, 
  Heart, 
  Phone, 
  Flag,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

interface SafetyCenterScreenProps {
  onBack: () => void;
  onNavigateToBlockList: () => void;
  blockedUsersCount: number;
}

export function SafetyCenterScreen({ onBack, onNavigateToBlockList, blockedUsersCount }: SafetyCenterScreenProps) {
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
          Safety Center
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="mx-4 mt-6 mb-6 p-6 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-[var(--radius-lg)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-[var(--text-title-3)] font-bold text-text-primary">
              Your Safety Matters
            </h2>
          </div>
          <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed">
            We're committed to keeping Cohort a safe and respectful community. Here's how we protect you.
          </p>
        </div>

        {/* Safety Tools */}
        <div className="mb-6">
          <h3 className="px-4 mb-3 text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide">
            Safety Tools
          </h3>
          <div className="bg-surface border-y border-divider">
            <button
              onClick={onNavigateToBlockList}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-input-background transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-elevated-surface flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-text-primary" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[var(--text-body)] text-text-primary">
                  Blocked Users
                </span>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  {blockedUsersCount > 0 ? `${blockedUsersCount} blocked` : 'No blocked users'}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* Reporting Guidelines */}
        <div className="mb-6">
          <h3 className="px-4 mb-3 text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide">
            Reporting Guidelines
          </h3>
          <div className="mx-4 mb-4 p-4 bg-elevated-surface rounded-[var(--radius-md)] border border-divider">
            <div className="flex gap-3 mb-4">
              <Flag className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[var(--text-body)] font-semibold text-text-primary mb-1">
                  When to Report
                </h4>
                <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed">
                  Report anyone who violates our community standards or makes you feel unsafe.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0 mt-2" />
                <div>
                  <p className="text-[var(--text-callout)] font-medium text-text-primary">
                    Harassment or abusive behavior
                  </p>
                  <p className="text-[var(--text-caption)] text-text-muted">
                    Threatening, hostile, or disrespectful messages
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0 mt-2" />
                <div>
                  <p className="text-[var(--text-callout)] font-medium text-text-primary">
                    Fake profile or catfishing
                  </p>
                  <p className="text-[var(--text-caption)] text-text-muted">
                    Using someone else's photos or false information
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0 mt-2" />
                <div>
                  <p className="text-[var(--text-callout)] font-medium text-text-primary">
                    Inappropriate content
                  </p>
                  <p className="text-[var(--text-caption)] text-text-muted">
                    Sexual content, hate speech, or scams
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0 mt-2" />
                <div>
                  <p className="text-[var(--text-callout)] font-medium text-text-primary">
                    Safety concerns
                  </p>
                  <p className="text-[var(--text-caption)] text-text-muted">
                    Dangerous behavior or threats of violence
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-4 p-4 bg-accent/5 rounded-[var(--radius-md)] border border-accent/20">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[var(--text-callout)] font-medium text-text-primary mb-1">
                  What Happens Next?
                </p>
                <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed">
                  Our safety team reviews all reports within 24 hours. Reports are confidential and the person won't know you reported them.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Check-In */}
        <div className="mb-6">
          <h3 className="px-4 mb-3 text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide">
            Safety Check-In
          </h3>
          <div className="mx-4 p-4 bg-elevated-surface rounded-[var(--radius-md)] border border-divider">
            <div className="flex gap-3 mb-3">
              <Heart className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[var(--text-body)] font-semibold text-text-primary mb-1">
                  Share Your Plans
                </h4>
                <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed">
                  Before meeting someone for the first time, consider sharing your plans with a trusted friend or family member.
                </p>
              </div>
            </div>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2 text-[var(--text-callout)] text-text-secondary">
                <span className="text-accent mt-1">•</span>
                <span>Where you're going and when</span>
              </li>
              <li className="flex items-start gap-2 text-[var(--text-callout)] text-text-secondary">
                <span className="text-accent mt-1">•</span>
                <span>Who you're meeting (name and profile)</span>
              </li>
              <li className="flex items-start gap-2 text-[var(--text-callout)] text-text-secondary">
                <span className="text-accent mt-1">•</span>
                <span>Expected end time</span>
              </li>
            </ul>
          </div>
        </div>

        {/* First Date Safety Tips */}
        <div className="mb-6">
          <h3 className="px-4 mb-3 text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide">
            First Date Safety Tips
          </h3>
          <div className="mx-4 space-y-3">
            {[
              {
                title: 'Meet in public',
                description: 'Choose a busy, public location for first dates',
              },
              {
                title: 'Arrange your own transport',
                description: 'Drive yourself or use your own ride service',
              },
              {
                title: 'Stay sober',
                description: 'Keep your drinks monitored and limit alcohol',
              },
              {
                title: 'Trust your instincts',
                description: 'If something feels off, it\'s okay to leave',
              },
            ].map((tip, index) => (
              <div key={index} className="p-4 bg-surface border border-divider rounded-[var(--radius-md)]">
                <h4 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                  {tip.title}
                </h4>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Information */}
        <div className="mb-6">
          <h3 className="px-4 mb-3 text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide">
            Emergency Resources
          </h3>
          <div className="mx-4 p-4 bg-destructive/5 rounded-[var(--radius-md)] border border-destructive/20">
            <div className="flex gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[var(--text-body)] font-semibold text-text-primary mb-1">
                  In Case of Emergency
                </h4>
                <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed mb-3">
                  If you're in immediate danger or experiencing a life-threatening situation, contact local emergency services immediately.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background rounded-[var(--radius-md)]">
                <div>
                  <p className="text-[var(--text-callout)] font-semibold text-text-primary">
                    Emergency Services (US)
                  </p>
                  <p className="text-[var(--text-caption)] text-text-muted">
                    Police, Fire, Ambulance
                  </p>
                </div>
                <a 
                  href="tel:911"
                  className="flex items-center gap-2 px-4 py-2 bg-destructive text-white rounded-[var(--radius-md)] font-semibold hover:bg-destructive/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  911
                </a>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background rounded-[var(--radius-md)]">
                <div>
                  <p className="text-[var(--text-callout)] font-semibold text-text-primary">
                    National Domestic Violence Hotline
                  </p>
                  <p className="text-[var(--text-caption)] text-text-muted">
                    24/7 confidential support
                  </p>
                </div>
                <a 
                  href="tel:1-800-799-7233"
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-[var(--radius-md)] font-medium hover:bg-accent/90 transition-colors text-[var(--text-callout)]"
                >
                  Call
                </a>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-divider/50">
              <p className="text-[var(--text-caption)] text-text-muted leading-relaxed">
                <span className="font-semibold">Disclaimer:</span> Cohort is not an emergency service. For immediate assistance, always contact local emergency services or appropriate helplines.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mx-4 mb-6 p-4 bg-elevated-surface rounded-[var(--radius-md)] border border-divider">
          <h4 className="text-[var(--text-body)] font-semibold text-text-primary mb-2">
            More Safety Resources
          </h4>
          <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed mb-3">
            Visit our website for comprehensive safety guidelines, dating tips, and support resources.
          </p>
          <a
            href="https://example.com/safety"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-callout)] font-medium text-accent hover:underline"
          >
            Learn more about online dating safety →
          </a>
        </div>
      </div>
    </div>
  );
}