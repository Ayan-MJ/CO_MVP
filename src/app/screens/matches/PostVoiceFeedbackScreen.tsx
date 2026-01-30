import React from 'react';
import { Heart, ThumbsUp, ThumbsDown, Meh, Sparkles, Lock } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

type FeedbackRating = 'great' | 'good' | 'okay' | 'not-interested';

interface PostVoiceFeedbackScreenProps {
  matchName: string;
  matchPhoto: string;
  onBack: () => void;
  onSubmitFeedback: (rating: FeedbackRating, notes?: string) => void;
  isLocked?: boolean; // True if voice call hasn't happened yet
}

export function PostVoiceFeedbackScreen({
  matchName,
  matchPhoto,
  onBack,
  onSubmitFeedback,
  isLocked = false,
}: PostVoiceFeedbackScreenProps) {
  const [selectedRating, setSelectedRating] = React.useState<FeedbackRating | null>(null);
  const [notes, setNotes] = React.useState('');

  const handleSubmit = () => {
    if (selectedRating) {
      onSubmitFeedback(selectedRating, notes || undefined);
    }
  };

  const feedbackOptions = [
    {
      value: 'great' as FeedbackRating,
      label: 'Great Connection',
      icon: Heart,
      color: 'accent',
      description: 'Really enjoyed talking, want to meet in person',
    },
    {
      value: 'good' as FeedbackRating,
      label: 'Positive',
      icon: ThumbsUp,
      color: 'success',
      description: 'Good conversation, curious to see where it goes',
    },
    {
      value: 'okay' as FeedbackRating,
      label: 'Neutral',
      icon: Meh,
      color: 'warning',
      description: 'It was fine, but not sure about next steps',
    },
    {
      value: 'not-interested' as FeedbackRating,
      label: 'Not a Match',
      icon: ThumbsDown,
      color: 'text-muted',
      description: "Don't want to pursue this further",
    },
  ];

  if (isLocked) {
    return (
      <div className="flex flex-col h-full bg-background">
        <TopBar title="Feedback" onBack={onBack} />

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-background-secondary flex items-center justify-center">
              <Lock className="w-10 h-10 text-text-muted" />
            </div>
            <h2 className="text-[var(--text-title-2)] font-bold text-text-primary mb-2">
              Feedback Locked
            </h2>
            <p className="text-[var(--text-callout)] text-text-secondary">
              You'll be able to share feedback after your intro call with {matchName}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Share Feedback" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-4 border-accent/20">
              <img src={matchPhoto} alt={matchName} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
              How was your call?
            </h1>
            <p className="text-[var(--text-callout)] text-text-secondary max-w-sm mx-auto">
              Your honest feedback helps us make better matches for everyone
            </p>
          </div>

          {/* Feedback Options */}
          <div>
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-3">
              Overall feeling
            </h3>
            <div className="space-y-3">
              {feedbackOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedRating === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setSelectedRating(option.value)}
                    className={`w-full p-4 rounded-[var(--radius-lg)] border transition-all text-left ${
                      isSelected
                        ? 'border-accent bg-accent/10'
                        : 'border-border-primary bg-surface hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? `bg-${option.color} text-white`
                            : 'bg-background-secondary text-text-muted'
                        }`}
                        style={
                          isSelected && option.color === 'accent'
                            ? { backgroundColor: 'var(--accent)' }
                            : isSelected && option.color === 'success'
                            ? { backgroundColor: 'var(--success)' }
                            : isSelected && option.color === 'warning'
                            ? { backgroundColor: 'var(--warning)' }
                            : undefined
                        }
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[var(--text-body)] font-semibold text-text-primary mb-0.5">
                          {option.label}
                        </p>
                        <p className="text-[var(--text-callout)] text-text-secondary">
                          {option.description}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-2 ${
                          isSelected ? 'border-accent bg-accent' : 'border-border-primary'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Notes */}
          {selectedRating && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-[var(--text-callout)] font-semibold text-text-primary">
                Anything else? (Optional)
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share what you liked or what felt off. This stays private."
                className="w-full min-h-[100px] p-4 rounded-[var(--radius-md)] border border-border-primary bg-background-secondary text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-accent transition-colors"
                maxLength={500}
              />
              <div className="text-right">
                <span className="text-[var(--text-footnote)] text-text-muted">
                  {notes.length}/500
                </span>
              </div>
            </div>
          )}

          {/* What Happens Next */}
          {selectedRating === 'great' || selectedRating === 'good' ? (
            <div className="bg-accent/5 rounded-[var(--radius-lg)] p-4 border border-accent/10">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                    Date planning unlocked
                  </h4>
                  <p className="text-[var(--text-callout)] text-text-secondary">
                    After submitting, you'll get access to date planning tools and curated date ideas
                  </p>
                </div>
              </div>
            </div>
          ) : selectedRating === 'not-interested' ? (
            <div className="bg-surface rounded-[var(--radius-md)] p-4 border border-border-primary">
              <p className="text-[var(--text-callout)] text-text-secondary">
                We'll let {matchName} know you're not interested in moving forward. Your feedback helps improve future matches.
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="border-t border-border-primary bg-background p-4 safe-area-bottom">
        <Button
          variant="primary"
          size="large"
          onClick={handleSubmit}
          disabled={!selectedRating}
          className="w-full"
        >
          <span>Submit Feedback</span>
        </Button>
        <p className="text-[var(--text-footnote)] text-text-muted text-center mt-3">
          Your feedback is private and helps us improve
        </p>
      </div>
    </div>
  );
}