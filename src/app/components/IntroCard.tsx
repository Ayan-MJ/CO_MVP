import React from 'react';
import { Clock, Sparkles, AlertTriangle, ChevronRight } from 'lucide-react';

export interface IntroCardData {
  id: string;
  userId: string;
  name: string;
  age: number;
  photos: string[];
  lifeMapHighlight: string;
  matchReasons: string[];
  watchOuts: string[];
  trustScore: number;
  verified: boolean;
  expiresAt: Date;
  // Optional profile details
  location?: string;
  occupation?: string;
  education?: string;
  height?: string;
}

interface IntroCardProps {
  intro: IntroCardData;
  onClick: () => void;
  compact?: boolean;
}

export function IntroCard({ intro, onClick, compact = false }: IntroCardProps) {
  const primaryPhoto = intro.photos[0];
  const timeLeft = intro.expiresAt.getTime() - Date.now();
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  
  return (
    <button
      onClick={onClick}
      className="w-full bg-surface rounded-[var(--radius-lg)] border border-divider overflow-hidden hover:bg-elevated-surface active:scale-[0.98] transition-all text-left"
    >
      {/* Photo Section */}
      <div className="relative h-[320px] bg-black">
        <img
          src={primaryPhoto}
          alt={intro.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Photo Count Indicator */}
        {intro.photos.length > 1 && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
            </svg>
            <span className="text-[var(--text-caption)] text-white font-medium">
              {intro.photos.length}
            </span>
          </div>
        )}
        
        {/* Trust Badge */}
        {intro.verified && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
            <span className="text-[var(--text-caption)] text-white font-medium">
              Verified
            </span>
          </div>
        )}
        
        {/* Basic Info Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-[var(--text-title-2)] font-bold text-white mb-0.5">
                {intro.name}, {intro.age}
              </h3>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 rounded-full ${
                        i < Math.floor(intro.trustScore / 20)
                          ? 'bg-accent'
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[var(--text-caption)] text-white/80">
                  {intro.trustScore}% match
                </span>
              </div>
            </div>
            {hoursLeft < 24 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/20 backdrop-blur-sm">
                <Clock className="w-3 h-3 text-accent" />
                <span className="text-[var(--text-caption)] text-accent font-medium">
                  {hoursLeft}h left
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Life Map Highlight */}
        {intro.lifeMapHighlight && (
          <div className="bg-accent/5 rounded-[var(--radius-sm)] p-3 border border-accent/10">
            <p className="text-[var(--text-callout)] text-text-primary italic">
              "{intro.lifeMapHighlight}"
            </p>
          </div>
        )}
        
        {/* Match Reasons */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <h4 className="text-[var(--text-caption)] font-semibold text-text-primary uppercase tracking-wide">
              Why this match
            </h4>
          </div>
          <ul className="space-y-1.5">
            {intro.matchReasons.slice(0, 3).map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-[var(--text-callout)] text-text-secondary">
                  {reason}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Watch-outs */}
        {intro.watchOuts.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <h4 className="text-[var(--text-caption)] font-semibold text-text-primary uppercase tracking-wide">
                Consider
              </h4>
            </div>
            <ul className="space-y-1.5">
              {intro.watchOuts.slice(0, 2).map((watchOut, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-warning mt-2 flex-shrink-0" />
                  <span className="text-[var(--text-callout)] text-text-secondary">
                    {watchOut}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* View Details CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-divider">
          <span className="text-[var(--text-callout)] font-medium text-accent">
            View full profile
          </span>
          <ChevronRight className="w-5 h-5 text-accent" />
        </div>
      </div>
    </button>
  );
}

// Countdown Timer Component
interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
}

export function CountdownTimer({ targetDate, label = 'Next refresh' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-surface rounded-[var(--radius-md)] border border-divider">
      <Clock className="w-5 h-5 text-accent flex-shrink-0" />
      <div className="flex-1">
        <p className="text-[var(--text-caption)] text-text-muted mb-0.5">{label}</p>
        <div className="flex items-center gap-2">
          <TimeUnit value={timeLeft.days} label="d" />
          <span className="text-text-muted">:</span>
          <TimeUnit value={timeLeft.hours} label="h" />
          <span className="text-text-muted">:</span>
          <TimeUnit value={timeLeft.minutes} label="m" />
          <span className="text-text-muted">:</span>
          <TimeUnit value={timeLeft.seconds} label="s" />
        </div>
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-0.5">
      <span className="text-[var(--text-callout)] font-bold text-text-primary tabular-nums">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[var(--text-caption)] text-text-muted">{label}</span>
    </div>
  );
}