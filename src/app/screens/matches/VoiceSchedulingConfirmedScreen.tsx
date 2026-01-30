import React from 'react';
import { CheckCircle, Calendar, Clock, Phone, Bell, X } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

interface VoiceSchedulingConfirmedScreenProps {
  matchName: string;
  matchPhoto: string;
  scheduledDate: Date;
  onBack: () => void;
  onReschedule: () => void;
  onCancel: () => void;
  onAddToCalendar?: () => void;
}

export function VoiceSchedulingConfirmedScreen({
  matchName,
  matchPhoto,
  scheduledDate,
  onBack,
  onReschedule,
  onCancel,
  onAddToCalendar,
}: VoiceSchedulingConfirmedScreenProps) {
  const [showCelebration, setShowCelebration] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowCelebration(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const formatFullDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    };
    return scheduledDate.toLocaleDateString('en-US', options);
  };

  const getTimeUntil = () => {
    const now = new Date();
    const diff = scheduledDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} day${days !== 1 ? 's' : ''}, ${hours} hour${hours !== 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''}`;
    return 'Less than 1 hour';
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
          <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 animate-ping">
                <div className="w-24 h-24 mx-auto rounded-full bg-success/20" />
              </div>
              <div className="relative w-24 h-24 mx-auto rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
            </div>
            <h2 className="text-[var(--text-title-1)] font-bold text-text-primary">
              Call Confirmed!
            </h2>
          </div>
        </div>
      )}

      <TopBar title="Call Confirmed" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Success Header */}
          <div className="text-center pt-2">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
              You're All Set!
            </h1>
            <p className="text-[var(--text-callout)] text-text-secondary">
              Your call with {matchName} is confirmed
            </p>
          </div>

          {/* Match Photo */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-accent/20">
              <img src={matchPhoto} alt={matchName} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Call Details */}
          <div className="bg-accent/5 rounded-[var(--radius-lg)] p-4 border border-accent/10 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-[var(--text-caption)] text-text-muted uppercase tracking-wide mb-1">
                  Date & Time
                </p>
                <p className="text-[var(--text-body)] font-semibold text-text-primary">
                  {formatFullDate()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-[var(--text-caption)] text-text-muted uppercase tracking-wide mb-1">
                  Time Until Call
                </p>
                <p className="text-[var(--text-body)] font-semibold text-text-primary">
                  {getTimeUntil()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-[var(--text-caption)] text-text-muted uppercase tracking-wide mb-1">
                  Duration
                </p>
                <p className="text-[var(--text-body)] font-semibold text-text-primary">
                  15 minutes
                </p>
              </div>
            </div>
          </div>

          {/* Add to Calendar */}
          {onAddToCalendar && (
            <Button
              variant="secondary"
              size="large"
              onClick={onAddToCalendar}
              className="w-full"
            >
              <Calendar className="w-5 h-5" />
              <span>Add to Calendar</span>
            </Button>
          )}

          {/* What Happens Next */}
          <div className="bg-surface rounded-[var(--radius-lg)] border border-border-primary p-4">
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-3">
              What happens next
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bell className="w-3.5 h-3.5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-[var(--text-callout)] text-text-primary font-medium">
                    Get a reminder
                  </p>
                  <p className="text-[var(--text-caption)] text-text-muted">
                    We'll notify you 15 minutes before your call
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-[var(--text-callout)] text-text-primary font-medium">
                    We'll call you
                  </p>
                  <p className="text-[var(--text-caption)] text-text-muted">
                    Answer when Cohort calls to connect with {matchName}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-[var(--text-callout)] text-text-primary font-medium">
                    Share feedback
                  </p>
                  <p className="text-[var(--text-caption)] text-text-muted">
                    After the call, share how it went to unlock date planning
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Reschedule/Cancel */}
          <div className="space-y-2">
            <button
              onClick={onReschedule}
              className="w-full p-3 rounded-[var(--radius-md)] border border-border-primary bg-background-secondary hover:bg-surface transition-colors"
            >
              <span className="text-[var(--text-callout)] text-text-secondary">
                Need to reschedule?
              </span>
            </button>
            <button
              onClick={onCancel}
              className="w-full p-3 rounded-[var(--radius-md)] hover:bg-background-secondary transition-colors"
            >
              <span className="text-[var(--text-callout)] text-text-muted">
                Cancel call
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
