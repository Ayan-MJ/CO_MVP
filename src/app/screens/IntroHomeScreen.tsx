import React from 'react';
import { Sparkles, Calendar, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { IntroCard, IntroCardData, CountdownTimer } from '@/app/components/IntroCard';
import { TopBar } from '@/app/components/Navigation';
import { Banner, EmptyState, LoadingSkeleton } from '@/app/components/Feedback';
import { useIntros } from '@/app/hooks/useIntros';

interface IntroHomeScreenProps {
  onIntroClick: (intro: IntroCardData) => void;
  onBack?: () => void;
}

export function IntroHomeScreen({ onIntroClick, onBack }: IntroHomeScreenProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const { intros, isLoading, error, refresh } = useIntros();

  // Calculate a 72-hour refresh window
  const getNextRefresh = () => {
    const now = new Date();
    const refreshAt = new Date(now.getTime() + 72 * 60 * 60 * 1000);
    return refreshAt;
  };

  const nextRefresh = getNextRefresh();
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Get Monday
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const formatWeekRange = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${weekStart.toLocaleDateString('en-US', options)} – ${weekEnd.toLocaleDateString('en-US', options)}`;
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  React.useEffect(() => {
    if (currentIndex >= intros.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, intros.length]);

  const renderLoadingState = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-4">
        <div className="text-center pt-2 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-border-primary/30 mb-3">
            <Calendar className="w-4 h-4 text-text-muted" />
            <span className="text-[var(--text-caption)] text-text-muted font-normal">
              {formatWeekRange()}
            </span>
          </div>
          <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
            Loading introductions
          </h1>
          <p className="text-[var(--text-callout)] text-text-secondary max-w-sm mx-auto">
            We’re fetching this week’s curated matches.
          </p>
        </div>
        <CountdownTimer targetDate={nextRefresh} label="Introductions refresh in 72h" />
        <LoadingSkeleton variant="intro" />
        <LoadingSkeleton variant="intro" />
      </div>
    </div>
  );

  const renderErrorState = () => (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        <Banner
          type="error"
          message={error ?? 'We hit a snag loading introductions.'}
          action={{ label: 'Retry', onClick: refresh }}
        />
        <EmptyState
          icon={<AlertCircle className="w-6 h-6" />}
          title="Unable to load introductions"
          description="Check your connection and try again. We’ll keep your place saved."
          action={{ label: 'Try again', onClick: refresh }}
        />
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex-1 overflow-y-auto p-4">
      <EmptyState
        icon={<Sparkles className="w-6 h-6" />}
        title="No introductions yet"
        description="We’re still curating thoughtful matches for you. Check back soon for new introductions."
        action={{ label: 'Refresh', onClick: refresh }}
      />
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background">
      {onBack && <TopBar title="Introductions" onBack={onBack} />}

      {isLoading && renderLoadingState()}
      {!isLoading && error && renderErrorState()}
      {!isLoading && !error && intros.length === 0 && renderEmptyState()}
      {!isLoading && !error && intros.length > 0 && (
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="text-center pt-2 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-border-primary/30 mb-3">
              <Calendar className="w-4 h-4 text-text-muted" />
              <span className="text-[var(--text-caption)] text-text-muted font-normal">
                {formatWeekRange()}
              </span>
            </div>
            <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
              This Week's Introductions
            </h1>
            <p className="text-[var(--text-callout)] text-text-secondary max-w-sm mx-auto">
              We've carefully selected {intros.length} people we think you'll genuinely connect with
            </p>
          </div>

          {/* Countdown Timer */}
          <CountdownTimer targetDate={nextRefresh} label="Introductions refresh in 72h" />

          {/* Quality Over Quantity Callout */}
          <div className="bg-accent/5 rounded-[var(--radius-md)] p-4 border border-accent/10">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                  Quality over quantity
                </h3>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  Each introduction is thoughtfully curated based on your values, goals, and what matters most to you in a long-term partner.
                </p>
              </div>
            </div>
          </div>

          {/* Current Card Indicator */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10">
              <span className="text-[var(--text-caption)] font-bold text-accent">
                {currentIndex + 1}
              </span>
              <span className="text-[var(--text-caption)] text-text-muted">
                of {intros.length}
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Card Pager */}
        <div className="relative px-4">
          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={() => scrollToIndex(currentIndex - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border-primary flex items-center justify-center shadow-lg hover:bg-background transition-colors"
              aria-label="Previous introduction"
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>
          )}
          {currentIndex < intros.length - 1 && (
            <button
              onClick={() => scrollToIndex(currentIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border-primary flex items-center justify-center shadow-lg hover:bg-background transition-colors"
              aria-label="Next introduction"
            >
              <ChevronRight className="w-5 h-5 text-text-primary" />
            </button>
          )}

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {intros.map((intro) => (
              <div
                key={intro.id}
                className="flex-shrink-0 w-full snap-center px-2"
                style={{ scrollSnapAlign: 'center' }}
              >
                <IntroCard intro={intro} onClick={() => onIntroClick(intro)} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 py-6">
          {intros.map((intro, index) => (
            <button
              key={intro.id}
              onClick={() => scrollToIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-accent'
                  : 'w-2 h-2 bg-border-primary hover:bg-accent/50'
              }`}
              aria-label={`Go to introduction ${index + 1}`}
            />
          ))}
        </div>

        <div className="p-4">
          {/* Footer Info */}
          <div className="text-center py-6">
            <p className="text-[var(--text-footnote)] text-text-muted max-w-xs mx-auto">
              Introductions expire in 72 hours. Review each profile soon so you don't miss the window.
            </p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
