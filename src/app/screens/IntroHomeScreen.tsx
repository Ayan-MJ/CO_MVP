import React from 'react';
import { Sparkles, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { IntroCard, IntroCardData, CountdownTimer } from '@/app/components/IntroCard';
import { TopBar } from '@/app/components/Navigation';

interface IntroHomeScreenProps {
  onIntroClick: (intro: IntroCardData) => void;
  onBack?: () => void;
}

// Mock data - in real app this would come from API
const mockIntros: IntroCardData[] = [
  {
    id: 'intro-1',
    userId: 'user-1',
    name: 'Sophie',
    age: 29,
    photos: [
      'https://images.unsplash.com/photo-1758598304332-94b40ce7c7b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc2OTc1Mzc3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTc1Mzc3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTc1Mzc3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    location: 'Brooklyn, NY',
    occupation: 'Product Designer',
    education: 'Cornell University',
    height: '5\'7"',
    lifeMapHighlight: 'Building a life where Sunday mornings are for farmers markets and deep conversations over coffee',
    matchReasons: [
      'Both value intentional relationships over casual dating',
      'Shared interest in sustainable living and local community',
      'Similar communication styles: thoughtful, direct, emotionally aware',
    ],
    watchOuts: [
      'She prioritizes work-life balance; may need advance planning for spontaneous trips',
    ],
    trustScore: 94,
    verified: true,
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours from now
  },
  {
    id: 'intro-2',
    userId: 'user-2',
    name: 'Marcus',
    age: 32,
    photos: [
      'https://images.unsplash.com/photo-1758599543126-59e3154d7195?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMG91dGRvb3JzfGVufDF8fHx8MTc2OTc2OTAzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    location: 'Manhattan, NY',
    occupation: 'Management Consultant',
    education: 'MIT',
    height: '6\'1"',
    lifeMapHighlight: 'Looking for someone who gets excited about trying new restaurants and discussing big ideas late into the night',
    matchReasons: [
      'Both see relationships as partnerships for personal growth',
      'Match on core values: curiosity, authenticity, adventure',
      'Complementary strengths: you bring stability, he brings spontaneity',
    ],
    watchOuts: [
      'Recently relocated for work; still building his local community',
      'High career ambition may require flexibility during busy seasons',
    ],
    trustScore: 88,
    verified: true,
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
  },
  {
    id: 'intro-3',
    userId: 'user-3',
    name: 'Elena',
    age: 27,
    photos: [
      'https://images.unsplash.com/photo-1666980226747-bf29624ae485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHNtaWxpbmclMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1488716820095-cbe80883c496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx3b21hbiUyMHNtaWxpbmclMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    location: 'Queens, NY',
    occupation: 'UX Researcher',
    education: 'Stanford University',
    height: '5\'5"',
    lifeMapHighlight: 'Creating a life filled with creativity, meaningful work, and people who inspire me to be better',
    matchReasons: [
      'Aligned on wanting children within the next 3-5 years',
      'Both value emotional intelligence and open communication',
      'Strong overlap in lifestyle preferences and weekend activities',
    ],
    watchOuts: [
      'Values quality time; may need reassurance during busy work periods',
    ],
    trustScore: 91,
    verified: true,
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
  },
];

export function IntroHomeScreen({ onIntroClick, onBack }: IntroHomeScreenProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex flex-col h-full bg-background">
      {onBack && <TopBar title="Introductions" onBack={onBack} />}

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
              We've carefully selected {mockIntros.length} people we think you'll genuinely connect with
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
                of {mockIntros.length}
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
          {currentIndex < mockIntros.length - 1 && (
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
            {mockIntros.map((intro) => (
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
          {mockIntros.map((intro, index) => (
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
    </div>
  );
}
