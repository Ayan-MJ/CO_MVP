import React from 'react';
import { Clock, Calendar, X, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

interface VoiceSchedulingPendingScreenProps {
  matchName: string;
  matchPhoto: string;
  proposedTime: string;
  onBack: () => void;
  onCancel: () => void;
  onAutoConfirm?: () => void; // Auto-transition to confirmed after timeout
}

export function VoiceSchedulingPendingScreen({
  matchName,
  matchPhoto,
  proposedTime,
  onBack,
  onCancel,
  onAutoConfirm,
}: VoiceSchedulingPendingScreenProps) {
  const [timeRemaining, setTimeRemaining] = React.useState('48 hours');

  // Simulate countdown (in real app, this would be based on actual timestamp)
  React.useEffect(() => {
    const deadline = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours from now
    
    const updateTimer = () => {
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining('Expired');
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours >= 24) {
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        setTimeRemaining(`${days}d ${remainingHours}h remaining`);
      } else {
        setTimeRemaining(`${hours}h ${minutes}m remaining`);
      }
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Auto-confirm after 8 seconds (for demo purposes)
  React.useEffect(() => {
    if (onAutoConfirm) {
      const timeout = setTimeout(() => {
        onAutoConfirm();
      }, 8000); // 8 seconds
      
      return () => clearTimeout(timeout);
    }
  }, [onAutoConfirm]);

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Pending Confirmation" onBack={onBack} />

      <div className="flex-1 overflow-y-auto flex items-center justify-center">
        <div className="p-6 text-center max-w-sm">
          {/* Animated Pending Icon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 animate-ping opacity-20">
              <div className="w-24 h-24 mx-auto rounded-full bg-warning" />
            </div>
            <div className="relative w-24 h-24 mx-auto rounded-full bg-warning/20 flex items-center justify-center">
              <Clock className="w-12 h-12 text-warning" />
            </div>
          </div>

          {/* Match Photo */}
          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-accent/20">
            <img src={matchPhoto} alt={matchName} className="w-full h-full object-cover" />
          </div>

          <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
            Waiting for {matchName}
          </h1>
          
          <p className="text-[var(--text-callout)] text-text-secondary mb-6">
            We've sent your proposed time to {matchName}. You'll be notified when they confirm.
          </p>

          {/* Proposed Time */}
          <div className="bg-surface rounded-[var(--radius-lg)] border border-border-primary p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[var(--text-caption)] text-text-muted uppercase tracking-wide">
                  Proposed Time
                </p>
                <p className="text-[var(--text-body)] font-semibold text-text-primary">
                  {proposedTime}
                </p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-accent/5 rounded-[var(--radius-md)] p-4 border border-accent/10 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-[var(--text-callout)] text-text-secondary text-left">
                {matchName} has {timeRemaining} to confirm. If they don't respond, you can propose a different time.
              </p>
            </div>
          </div>

          <Button
            variant="secondary"
            size="large"
            onClick={onCancel}
            className="w-full"
          >
            <X className="w-5 h-5" />
            <span>Cancel Request</span>
          </Button>
        </div>
      </div>
    </div>
  );
}