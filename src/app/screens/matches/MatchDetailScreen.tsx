import React from 'react';
import { X, Sparkles, Calendar, Phone, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { MatchData } from './MatchesListScreen';

interface MatchDetailScreenProps {
  match: MatchData;
  onBack: () => void;
  onScheduleVoice: () => void;
  onSetAvailability: () => void;
  onShareFeedback: () => void;
  onPlanDate: () => void;
  onViewSchedule?: () => void;
  onOpenChat?: () => void;
}

export function MatchDetailScreen({
  match,
  onBack,
  onScheduleVoice,
  onSetAvailability,
  onShareFeedback,
  onPlanDate,
  onViewSchedule,
  onOpenChat,
}: MatchDetailScreenProps) {
  const getProgressSteps = () => {
    return [
      {
        id: 'matched',
        label: 'Matched',
        icon: CheckCircle,
        completed: true,
        current: false,
      },
      {
        id: 'voice-scheduled',
        label: 'Voice Scheduled',
        icon: Calendar,
        completed: match.status !== 'accepted' && match.status !== 'availability-needed',
        current: match.status === 'accepted' || match.status === 'availability-needed',
      },
      {
        id: 'voice-done',
        label: 'Intro Call',
        icon: Phone,
        completed: match.status === 'voice-done' || match.status === 'date-planning',
        current: match.status === 'voice-scheduled',
      },
      {
        id: 'date-planning',
        label: 'First Date',
        icon: Sparkles,
        completed: match.status === 'date-planning',
        current: match.status === 'voice-done',
      },
    ];
  };

  const steps = getProgressSteps();

  const getNextActionCTA = () => {
    switch (match.status) {
      case 'accepted':
        return {
          label: 'Schedule Intro Call',
          action: onScheduleVoice,
          variant: 'primary' as const,
          icon: Phone,
          description: 'Start with a 15-minute voice call to see if there\'s chemistry',
        };
      case 'availability-needed':
        return {
          label: 'Set Your Availability',
          action: onSetAvailability,
          variant: 'primary' as const,
          icon: Calendar,
          description: 'Share your available times so you can schedule a call',
        };
      case 'voice-scheduled':
        return {
          label: 'View Call Details',
          action: onViewSchedule,
          variant: 'secondary' as const,
          icon: Calendar,
          description: 'Your intro call is coming up soon',
        };
      case 'voice-done':
        return {
          label: 'Share Feedback & Plan Date',
          action: onShareFeedback,
          variant: 'primary' as const,
          icon: Sparkles,
          description: 'Let us know how the call went and plan your first in-person date',
        };
      case 'date-planning':
        return {
          label: 'Plan Your First Date',
          action: onPlanDate,
          variant: 'primary' as const,
          icon: Sparkles,
          description: "You've unlocked date planning tools",
        };
    }
  };

  const nextAction = getNextActionCTA();

  const formatMatchedTime = () => {
    const now = new Date();
    const diff = now.getTime() - match.matchedAt.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const formatScheduledDate = () => {
    if (!match.voiceScheduledFor) return '';
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    };
    return match.voiceScheduledFor.toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-primary bg-surface sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-elevated-surface transition-colors"
        >
          <X className="w-6 h-6 text-text-primary" />
        </button>
        <h3 className="text-[var(--text-body)] font-semibold text-text-primary">
          Match Details
        </h3>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Profile Header */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-4 border-accent/20">
              <img
                src={match.photo}
                alt={match.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-1">
              {match.name}, {match.age}
            </h1>
            <p className="text-[var(--text-callout)] text-text-secondary">
              Matched {formatMatchedTime()}
            </p>
          </div>

          {/* Progress Stepper */}
          <div className="bg-surface rounded-[var(--radius-lg)] border border-border-primary p-4">
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-4">
              Your Journey Together
            </h3>
            <div className="space-y-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-start gap-3">
                    {/* Icon & Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed
                            ? 'bg-success text-white'
                            : step.current
                            ? 'bg-accent text-white'
                            : 'bg-background-secondary text-text-muted'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-0.5 h-8 ${
                            step.completed ? 'bg-success' : 'bg-border-primary'
                          }`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-0.5">
                      <p
                        className={`text-[var(--text-callout)] font-medium ${
                          step.completed || step.current
                            ? 'text-text-primary'
                            : 'text-text-muted'
                        }`}
                      >
                        {step.label}
                      </p>
                      {step.current && match.voiceScheduledFor && match.status === 'voice-scheduled' && (
                        <p className="text-[var(--text-caption)] text-text-secondary mt-0.5">
                          {formatScheduledDate()}
                        </p>
                      )}
                      {step.completed && step.id === 'voice-done' && match.voiceDoneAt && (
                        <p className="text-[var(--text-caption)] text-text-secondary mt-0.5">
                          Completed {new Date(match.voiceDoneAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compatibility Summary */}
          <div className="bg-accent/5 rounded-[var(--radius-lg)] p-4 border border-accent/10">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-2">
                  {match.compatibilityScore}% Compatible
                </h3>
                <ul className="space-y-1.5">
                  {match.topMatchReasons.map((reason, index) => (
                    <li key={index} className="text-[var(--text-callout)] text-text-secondary flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Time-bound Nudge */}
          {match.daysUntilExpiry && match.daysUntilExpiry <= 3 && (
            <div className="bg-warning/5 rounded-[var(--radius-md)] p-4 border border-warning/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                    Schedule Soon
                  </h4>
                  <p className="text-[var(--text-callout)] text-text-secondary">
                    You have {match.daysUntilExpiry} {match.daysUntilExpiry === 1 ? 'day' : 'days'} to schedule your intro call, or this match will expire.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Action */}
          {nextAction && (
            <div className="bg-surface rounded-[var(--radius-lg)] border border-border-primary p-4">
              <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-2">
                Next Step
              </h3>
              <p className="text-[var(--text-callout)] text-text-secondary mb-4">
                {nextAction.description}
              </p>
              <Button
                variant={nextAction.variant}
                size="large"
                onClick={nextAction.action}
                className="w-full"
              >
                {React.createElement(nextAction.icon, { className: "w-5 h-5" })}
                <span>{nextAction.label}</span>
              </Button>
            </div>
          )}

          {/* Chat (De-emphasized) */}
          <div className="pt-2">
            <button 
              className="w-full p-4 rounded-[var(--radius-md)] border border-border-primary bg-background-secondary hover:bg-surface transition-colors flex items-center justify-center gap-2" 
              onClick={() => onOpenChat?.()}
            >
              <MessageCircle className="w-5 h-5 text-text-secondary" />
              <span className="text-[var(--text-callout)] text-text-secondary">
                Send a message (optional)
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}