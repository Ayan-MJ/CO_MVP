import React from 'react';
import { X, Clock, Sparkles, AlertTriangle, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { IntroCardData } from '@/app/components/IntroCard';
import { TrustBadge } from '@/app/components/Safety';

interface IntroDetailScreenProps {
  intro: IntroCardData;
  onBack: () => void;
  onAccept: (introId: string) => void;
  onDecline: (introId: string) => void;
}

export function IntroDetailScreen({ intro, onBack, onAccept, onDecline }: IntroDetailScreenProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);
  const [showDeclineConfirm, setShowDeclineConfirm] = React.useState(false);

  const timeLeft = intro.expiresAt.getTime() - Date.now();
  const daysLeft = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
  const hoursLeft = Math.max(0, Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % intro.photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + intro.photos.length) % intro.photos.length);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-divider bg-surface sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-elevated-surface transition-colors"
        >
          <X className="w-6 h-6 text-text-primary" />
        </button>
        <h3 className="text-[var(--text-body)] font-semibold text-text-primary">
          Introduction
        </h3>
        {/* Expiry Timer */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-warning/15 border border-warning/30">
          <Clock className="w-4 h-4 text-warning" />
          <span className="text-[var(--text-caption)] text-warning font-semibold tabular-nums">
            Expires in {daysLeft}d {hoursLeft}h
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Photo Gallery */}
        <div className="relative h-[420px] bg-black">
          <img
            src={intro.photos[currentPhotoIndex]}
            alt={`${intro.name} - Photo ${currentPhotoIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Photo Navigation */}
          {intro.photos.length > 1 && (
            <>
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Photo Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {intro.photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhotoIndex(idx)}
                    className={`h-1 rounded-full transition-all ${
                      idx === currentPhotoIndex
                        ? 'w-6 bg-white'
                        : 'w-1 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Trust Badge Overlay */}
          {intro.verified && (
            <div className="absolute top-4 right-4">
              <TrustBadge
                phoneVerified={true}
                photoVerified={true}
                profileQualityScore={intro.trustScore}
                size="small"
              />
            </div>
          )}

          {/* Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Profile Content */}
        <div className="p-4 space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-1">
                  {intro.name}, {intro.age}
                </h1>
                {/* Profile Details */}
                {(intro.location || intro.occupation) && (
                  <div className="flex flex-wrap items-center gap-2 text-[var(--text-callout)] text-text-secondary mb-2">
                    {intro.occupation && <span>{intro.occupation}</span>}
                    {intro.occupation && intro.location && <span>•</span>}
                    {intro.location && <span>{intro.location}</span>}
                  </div>
                )}
                {(intro.education || intro.height) && (
                  <div className="flex flex-wrap items-center gap-2 text-[var(--text-callout)] text-text-muted mb-2">
                    {intro.education && <span>{intro.education}</span>}
                    {intro.education && intro.height && <span>•</span>}
                    {intro.height && <span>{intro.height}</span>}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          i < Math.floor(intro.trustScore / 20)
                            ? 'bg-accent'
                            : 'bg-divider'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[var(--text-callout)] text-text-secondary">
                    {intro.trustScore}% compatibility
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Life Map Highlight */}
          {intro.lifeMapHighlight && (
            <div className="bg-accent/5 rounded-[var(--radius-md)] p-4 border border-accent/10">
              <h3 className="text-[var(--text-caption)] font-semibold text-text-muted uppercase tracking-wide mb-2">
                Life Vision
              </h3>
              <p className="text-[var(--text-body)] text-text-primary italic leading-relaxed">
                "{intro.lifeMapHighlight}"
              </p>
            </div>
          )}

          {/* Match Reasons */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <h2 className="text-[var(--text-callout)] font-semibold text-text-primary uppercase tracking-wide">
                Why We Think You'll Connect
              </h2>
            </div>
            <div className="space-y-3">
              {intro.matchReasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-surface rounded-[var(--radius-md)]">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-[var(--text-callout)] text-text-secondary flex-1">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Watch-outs */}
          {intro.watchOuts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                </div>
                <h2 className="text-[var(--text-callout)] font-semibold text-text-primary uppercase tracking-wide">
                  Things to Consider
                </h2>
              </div>
              <div className="space-y-3">
                {intro.watchOuts.map((watchOut, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-warning/5 rounded-[var(--radius-md)] border border-warning/10">
                    <div className="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                    </div>
                    <p className="text-[var(--text-callout)] text-text-secondary flex-1">
                      {watchOut}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[var(--text-footnote)] text-text-muted mt-3 px-3">
                These aren't dealbreakers—just things to be aware of as you get to know each other.
              </p>
            </div>
          )}

          {/* Trust & Safety Info */}
          <div className="bg-surface rounded-[var(--radius-md)] p-4 border border-divider">
            <h3 className="text-[var(--text-caption)] font-semibold text-text-primary uppercase tracking-wide mb-3">
              Trust & Safety
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="text-[var(--text-callout)] text-text-secondary">
                  Phone number verified
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="text-[var(--text-callout)] text-text-secondary">
                  Photo verification complete
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="text-[var(--text-callout)] text-text-secondary">
                  Profile quality: {intro.trustScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom spacing for fixed CTAs */}
          <div className="h-24" />
        </div>
      </div>

      {/* Fixed Bottom CTAs */}
      <div className="p-4 border-t border-divider bg-surface space-y-3 sticky bottom-0">
        {!showDeclineConfirm ? (
          <>
            <Button
              variant="primary"
              size="large"
              onClick={() => onAccept(intro.id)}
            >
              <CheckCircle className="w-5 h-5" />
              I'm Interested
            </Button>
            <button
              onClick={() => setShowDeclineConfirm(true)}
              className="w-full py-3 text-[var(--text-callout)] font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Not a match for me
            </button>
          </>
        ) : (
          <>
            <div className="bg-warning/10 rounded-[var(--radius-md)] p-3 border border-warning/20">
              <p className="text-[var(--text-callout)] text-text-primary text-center">
                Are you sure? This introduction won't return.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowDeclineConfirm(false)}
                className="flex-1"
              >
                Go Back
              </Button>
              <Button
                variant="secondary"
                onClick={() => onDecline(intro.id)}
                className="flex-1 !bg-error/10 !text-error hover:!bg-error/20"
              >
                <XCircle className="w-5 h-5" />
                Decline
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
