import React from 'react';
import { Clock, Gift, Users, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { Input } from '@/app/components/Input';
import { TopBar } from '@/app/components/Navigation';
import { Banner } from '@/app/components/Feedback';

interface WaitlistScreenProps {
  city: string;
  neighborhood: string;
  position: number;
  onBack: () => void;
  onSubmitCode: (code: string) => void;
}

export function WaitlistScreen({ city, neighborhood, position, onBack, onSubmitCode }: WaitlistScreenProps) {
  const [inviteCode, setInviteCode] = React.useState('');
  const [referralLink] = React.useState('cohort.app/r/abc123');
  const [copied, setCopied] = React.useState(false);
  const [codeError, setCodeError] = React.useState('');

  const estimatedWait = Math.ceil(position / 10); // weeks

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitCode = () => {
    if (!inviteCode.trim()) {
      setCodeError('Please enter an invite code');
      return;
    }
    // Validate code format
    if (inviteCode.length < 6) {
      setCodeError('Invalid invite code format');
      return;
    }
    setCodeError('');
    onSubmitCode(inviteCode);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Waitlist" onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Status Card */}
        <div className="bg-elevated-surface rounded-[var(--radius-md)] p-6 shadow-[var(--shadow-lg)] border border-divider">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-accent-muted flex items-center justify-center">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="text-[var(--text-title-3)] font-semibold text-text-primary">
                You're on the waitlist
              </h2>
              <p className="text-[var(--text-footnote)] text-text-muted">
                {neighborhood}, {city}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-divider">
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-callout)] text-text-secondary">Your position</span>
              <span className="text-[var(--text-title-2)] font-bold text-accent">#{position}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-callout)] text-text-secondary">Estimated wait</span>
              <span className="text-[var(--text-callout)] font-semibold text-text-primary">
                {estimatedWait} {estimatedWait === 1 ? 'week' : 'weeks'}
              </span>
            </div>
          </div>
        </div>

        {/* What to Expect */}
        <div>
          <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-3">
            What to expect
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[var(--text-caption)] font-bold text-accent">1</span>
              </div>
              <div>
                <p className="text-[var(--text-callout)] text-text-primary mb-1">
                  We'll notify you when space opens
                </p>
                <p className="text-[var(--text-footnote)] text-text-muted">
                  Check your email and phone for updates on your position
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[var(--text-caption)] font-bold text-accent">2</span>
              </div>
              <div>
                <p className="text-[var(--text-callout)] text-text-primary mb-1">
                  Skip the line with an invite code
                </p>
                <p className="text-[var(--text-footnote)] text-text-muted">
                  Have a code from a friend? Enter it below to join immediately
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[var(--text-caption)] font-bold text-accent">3</span>
              </div>
              <div>
                <p className="text-[var(--text-callout)] text-text-primary mb-1">
                  Move up by referring friends
                </p>
                <p className="text-[var(--text-footnote)] text-text-muted">
                  Share your link to move up 5 spots for each friend who joins
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Invite Code Entry */}
        <div className="bg-surface rounded-[var(--radius-md)] p-4 border border-divider">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-accent" />
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary">
              Have an invite code?
            </h3>
          </div>
          <div className="space-y-3">
            <Input
              placeholder="Enter code (e.g., COHORT2026)"
              value={inviteCode}
              onChange={(e) => {
                setInviteCode(e.target.value.toUpperCase());
                setCodeError('');
              }}
              error={codeError}
            />
            <Button variant="primary" onClick={handleSubmitCode}>
              Skip the Waitlist
            </Button>
          </div>
        </div>

        {/* Referral Section */}
        <div className="bg-accent-muted rounded-[var(--radius-md)] p-4 border border-accent/20">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-accent" />
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary">
              Invite friends, move up faster
            </h3>
          </div>
          <p className="text-[var(--text-footnote)] text-text-secondary mb-3">
            Share your personal link. Each friend who joins moves you up 5 spots.
          </p>
          <div className="flex gap-2">
            <div className="flex-1 h-12 px-4 rounded-[var(--radius-sm)] bg-surface border border-divider flex items-center">
              <span className="text-[var(--text-callout)] text-text-primary truncate">
                {referralLink}
              </span>
            </div>
            <button
              onClick={handleCopyLink}
              className="h-12 px-4 rounded-[var(--radius-sm)] bg-accent text-accent-foreground flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-[var(--text-callout)] font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span className="text-[var(--text-callout)] font-semibold">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <Banner
          message="We'll email you when you're off the waitlist"
          type="info"
        />
      </div>
    </div>
  );
}
