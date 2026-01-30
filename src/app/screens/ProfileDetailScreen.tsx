import React from 'react';
import { ArrowLeft, MoreVertical, Shield, AlertCircle, CheckCircle, Clock, MessageCircle, Star, MapPin, Briefcase, GraduationCap, Heart, X, Phone, Calendar } from 'lucide-react';

export interface ProfileData {
  id: string;
  name: string;
  age: number;
  photos: string[];
  location: string;
  verified: boolean;
  
  // Reliability indicators (optional - shown if user has history)
  reliabilityScore?: {
    responseRate?: number; // 0-100
    punctuality?: 'excellent' | 'good' | 'fair';
    feedbackRating?: number; // 0-5
  };
  
  // Basic info
  occupation: string;
  education: string;
  height?: string;
  
  // About
  bio: string;
  
  // Life Map
  lifeMap: {
    timeline: {
      label: string;
      value: string;
      icon?: string;
    }[];
    lifestyle: {
      category: string;
      value: string;
    }[];
  };
  
  // Values
  values: {
    name: string;
    importance: 'essential' | 'important' | 'flexible';
  }[];
  
  // Conflict style
  conflictStyle: {
    primary: string;
    description: string;
  };
  
  // Non-negotiables
  nonNegotiables: string[];
  
  // Match reasons (shown when viewing intro/match)
  matchReasons?: {
    reasons: string[];
    watchOuts: string[];
    compatibilityScore: number;
  };
}

interface ProfileDetailScreenProps {
  profile: ProfileData;
  context: 'intro' | 'match'; // intro = not yet matched, match = already matched
  matchStatus?: 'accepted' | 'voice-scheduled' | 'voice-done' | 'date-planning';
  onBack: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  onScheduleVoice?: () => void;
  onPlanDate?: () => void;
  onReport: () => void;
  onBlock: () => void;
}

export function ProfileDetailScreen({
  profile,
  context,
  matchStatus,
  onBack,
  onAccept,
  onDecline,
  onScheduleVoice,
  onPlanDate,
  onReport,
  onBlock,
}: ProfileDetailScreenProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0);
  const [showMenu, setShowMenu] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setScrollY(scrollContainerRef.current.scrollTop);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const showStickyCTA = scrollY > 400;

  const getReliabilityColor = (type: string, value: any) => {
    if (type === 'responseRate') {
      if (value >= 90) return 'text-success';
      if (value >= 70) return 'text-accent';
      return 'text-warning';
    }
    if (type === 'punctuality') {
      if (value === 'excellent') return 'text-success';
      if (value === 'good') return 'text-accent';
      return 'text-warning';
    }
    if (type === 'feedbackRating') {
      if (value >= 4.5) return 'text-success';
      if (value >= 4.0) return 'text-accent';
      return 'text-warning';
    }
    return 'text-text-secondary';
  };

  const getValueColor = (importance: string) => {
    switch (importance) {
      case 'essential':
        return 'bg-accent text-accent-foreground';
      case 'important':
        return 'bg-accent/20 text-accent';
      case 'flexible':
        return 'bg-surface border border-divider text-text-secondary';
      default:
        return 'bg-surface text-text-secondary';
    }
  };

  return (
    <div className="h-full bg-background flex flex-col relative">
      {/* Fixed Header */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-divider flex items-center justify-center hover:bg-surface transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-divider flex items-center justify-center hover:bg-surface transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-text-primary" />
        </button>
      </div>

      {/* Safety Menu Dropdown */}
      {showMenu && (
        <div className="absolute top-14 right-4 z-30 bg-surface rounded-[var(--radius-md)] border border-divider shadow-lg overflow-hidden min-w-[200px]">
          <button
            onClick={() => {
              setShowMenu(false);
              onReport();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-input-background transition-colors text-left"
          >
            <AlertCircle className="w-5 h-5 text-warning" />
            <span className="text-[var(--text-callout)] text-text-primary">Report profile</span>
          </button>
          <button
            onClick={() => {
              setShowMenu(false);
              onBlock();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-input-background transition-colors text-left border-t border-divider"
          >
            <Shield className="w-5 h-5 text-destructive" />
            <span className="text-[var(--text-callout)] text-destructive">Block user</span>
          </button>
        </div>
      )}

      {/* Scrollable Content */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        {/* Photo Carousel */}
        <div className="relative w-full h-[480px] bg-elevated-surface">
          <img
            src={profile.photos[currentPhotoIndex]}
            alt={profile.name}
            className="w-full h-full object-cover"
          />

          {/* Verification Badge Overlay */}
          {profile.verified && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-success/90 backdrop-blur-md rounded-full">
              <CheckCircle className="w-4 h-4 text-white" />
              <span className="text-[var(--text-caption)] font-medium text-white">Verified</span>
            </div>
          )}

          {/* Photo Navigation Dots */}
          {profile.photos.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
              {profile.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentPhotoIndex
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Photo Navigation Touch Areas */}
          {profile.photos.length > 1 && (
            <>
              <button
                onClick={() => setCurrentPhotoIndex((prev) => Math.max(0, prev - 1))}
                className="absolute left-0 top-0 bottom-0 w-1/3"
              />
              <button
                onClick={() => setCurrentPhotoIndex((prev) => Math.min(profile.photos.length - 1, prev + 1))}
                className="absolute right-0 top-0 bottom-0 w-1/3"
              />
            </>
          )}
        </div>

        {/* Profile Content */}
        <div className="px-4 pb-32">
          {/* Header Info */}
          <div className="pt-5 pb-4 border-b border-divider">
            <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-1">
              {profile.name}, {profile.age}
            </h1>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-text-secondary" />
              <span className="text-[var(--text-callout)] text-text-secondary">{profile.location}</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-text-muted" />
                <span className="text-[var(--text-callout)] text-text-primary">{profile.occupation}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-text-muted" />
                <span className="text-[var(--text-callout)] text-text-primary">{profile.education}</span>
              </div>
              {profile.height && (
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-callout)] text-text-muted">Height:</span>
                  <span className="text-[var(--text-callout)] text-text-primary">{profile.height}</span>
                </div>
              )}
            </div>
          </div>

          {/* Reliability Indicators */}
          {profile.reliabilityScore && (
            <div className="py-4 border-b border-divider">
              <h3 className="text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide mb-3">
                Reliability
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {profile.reliabilityScore.responseRate !== undefined && (
                  <div className="text-center">
                    <div className={`text-[var(--text-title-3)] font-bold mb-0.5 ${getReliabilityColor('responseRate', profile.reliabilityScore.responseRate)}`}>
                      {profile.reliabilityScore.responseRate}%
                    </div>
                    <div className="text-[var(--text-caption)] text-text-muted">Response rate</div>
                  </div>
                )}
                {profile.reliabilityScore.punctuality && (
                  <div className="text-center">
                    <div className={`text-[var(--text-callout)] font-semibold capitalize mb-0.5 ${getReliabilityColor('punctuality', profile.reliabilityScore.punctuality)}`}>
                      {profile.reliabilityScore.punctuality}
                    </div>
                    <div className="text-[var(--text-caption)] text-text-muted">Punctuality</div>
                  </div>
                )}
                {profile.reliabilityScore.feedbackRating !== undefined && (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Star className={`w-4 h-4 ${getReliabilityColor('feedbackRating', profile.reliabilityScore.feedbackRating)}`} />
                      <span className={`text-[var(--text-title-3)] font-bold ${getReliabilityColor('feedbackRating', profile.reliabilityScore.feedbackRating)}`}>
                        {profile.reliabilityScore.feedbackRating.toFixed(1)}
                      </span>
                    </div>
                    <div className="text-[var(--text-caption)] text-text-muted">Date feedback</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* About */}
          <div className="py-5 border-b border-divider">
            <h3 className="text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide mb-3">
              About
            </h3>
            <p className="text-[var(--text-callout)] text-text-primary leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* Why This Match - Only show for intro context or if match reasons exist */}
          {profile.matchReasons && (
            <div className="py-5 border-b border-divider">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-[var(--text-body)] font-bold text-accent">
                    {profile.matchReasons.compatibilityScore}%
                  </span>
                </div>
                <h3 className="text-[var(--text-body)] font-semibold text-text-primary">
                  Why this match
                </h3>
              </div>
              
              {/* Reasons */}
              <div className="space-y-2.5 mb-3">
                {profile.matchReasons.reasons.map((reason, index) => (
                  <div key={index} className="flex gap-2.5">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-[var(--text-callout)] text-text-primary leading-relaxed">
                      {reason}
                    </span>
                  </div>
                ))}
              </div>

              {/* Watch-outs */}
              {profile.matchReasons.watchOuts.length > 0 && (
                <div className="mt-4 pt-4 border-t border-divider/50">
                  <div className="flex items-center gap-2 mb-2.5">
                    <AlertCircle className="w-4 h-4 text-warning" />
                    <span className="text-[var(--text-callout)] font-medium text-text-secondary">
                      Worth discussing
                    </span>
                  </div>
                  <div className="space-y-2">
                    {profile.matchReasons.watchOuts.map((watchOut, index) => (
                      <div key={index} className="flex gap-2">
                        <span className="text-[var(--text-callout)] text-text-secondary leading-relaxed">
                          • {watchOut}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Life Map */}
          <div className="py-5 border-b border-divider">
            <h3 className="text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide mb-4">
              Life Map
            </h3>
            
            {/* Timeline items */}
            <div className="space-y-3 mb-4">
              {profile.lifeMap.timeline.map((item, index) => (
                <div key={index} className="bg-surface rounded-[var(--radius-md)] border border-divider p-3.5">
                  <div className="text-[var(--text-caption)] text-text-muted mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-[var(--text-callout)] font-medium text-text-primary">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Lifestyle rails */}
            <div className="space-y-2">
              {profile.lifeMap.lifestyle.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-[var(--text-callout)] text-text-secondary">
                    {item.category}
                  </span>
                  <span className="text-[var(--text-callout)] font-medium text-text-primary">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="py-5 border-b border-divider">
            <h3 className="text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide mb-3">
              Values
            </h3>
            
            {/* Group values by importance */}
            {profile.values.filter(v => v.importance === 'essential').length > 0 && (
              <div className="mb-4">
                <div className="text-[var(--text-caption)] text-text-muted mb-2">Essential</div>
                <div className="flex flex-wrap gap-2">
                  {profile.values
                    .filter(v => v.importance === 'essential')
                    .map((value, index) => (
                      <div
                        key={index}
                        className="px-3 py-1.5 rounded-full text-[var(--text-callout)] font-medium bg-accent text-accent-foreground"
                      >
                        {value.name}
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            {profile.values.filter(v => v.importance === 'important').length > 0 && (
              <div className="mb-4">
                <div className="text-[var(--text-caption)] text-text-muted mb-2">Important</div>
                <div className="flex flex-wrap gap-2">
                  {profile.values
                    .filter(v => v.importance === 'important')
                    .map((value, index) => (
                      <div
                        key={index}
                        className="px-3 py-1.5 rounded-full text-[var(--text-callout)] font-medium bg-accent/20 text-accent"
                      >
                        {value.name}
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            {profile.values.filter(v => v.importance === 'flexible').length > 0 && (
              <div>
                <div className="text-[var(--text-caption)] text-text-muted mb-2">Flexible</div>
                <div className="flex flex-wrap gap-2">
                  {profile.values
                    .filter(v => v.importance === 'flexible')
                    .map((value, index) => (
                      <div
                        key={index}
                        className="px-3 py-1.5 rounded-full text-[var(--text-callout)] font-medium bg-surface border border-divider text-text-secondary"
                      >
                        {value.name}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Conflict Style */}
          <div className="py-5 border-b border-divider">
            <h3 className="text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide mb-3">
              Conflict Style
            </h3>
            <div className="bg-surface rounded-[var(--radius-md)] border border-divider p-4">
              <div className="text-[var(--text-body)] font-semibold text-text-primary mb-1.5">
                {profile.conflictStyle.primary}
              </div>
              <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed">
                {profile.conflictStyle.description}
              </p>
            </div>
          </div>

          {/* Non-Negotiables */}
          <div className="py-5">
            <h3 className="text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide mb-3">
              Non-Negotiables
            </h3>
            <div className="space-y-2">
              {profile.nonNegotiables.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-[var(--text-callout)] text-text-primary">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className={`absolute bottom-0 left-0 right-0 bg-surface border-t border-divider px-4 py-3 transition-all ${
        showStickyCTA ? 'shadow-xl' : ''
      }`}>
        {context === 'intro' ? (
          /* Intro context: Accept/Decline */
          <div className="flex gap-3">
            <button
              onClick={onDecline}
              className="flex-1 px-6 py-3.5 bg-surface border-2 border-divider text-text-primary rounded-[var(--radius-md)] font-semibold hover:bg-input-background transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Decline
            </button>
            <button
              onClick={onAccept}
              className="flex-[2] px-6 py-3.5 bg-accent text-accent-foreground rounded-[var(--radius-md)] font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Accept Match
            </button>
          </div>
        ) : (
          /* Match context: Schedule voice or Plan date */
          <div className="space-y-2">
            {(matchStatus === 'accepted' || !matchStatus) && onScheduleVoice && (
              <button
                onClick={onScheduleVoice}
                className="w-full px-6 py-3.5 bg-accent text-accent-foreground rounded-[var(--radius-md)] font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Schedule Intro Call
              </button>
            )}
            {(matchStatus === 'voice-done' || matchStatus === 'date-planning') && onPlanDate && (
              <button
                onClick={onPlanDate}
                className="w-full px-6 py-3.5 bg-accent text-accent-foreground rounded-[var(--radius-md)] font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Plan First Date
              </button>
            )}
            {matchStatus === 'voice-scheduled' && (
              <div className="text-center py-2">
                <div className="flex items-center justify-center gap-2 text-success mb-1">
                  <Clock className="w-5 h-5" />
                  <span className="text-[var(--text-callout)] font-semibold">
                    Call Scheduled
                  </span>
                </div>
                <p className="text-[var(--text-caption)] text-text-secondary">
                  Looking forward to your conversation
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}