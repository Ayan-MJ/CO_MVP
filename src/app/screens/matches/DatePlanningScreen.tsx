import React from 'react';
import { MapPin, Calendar, Coffee, Utensils, Music, Heart, Sparkles, Info, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

interface DateIdea {
  id: string;
  title: string;
  category: 'coffee' | 'dinner' | 'activity' | 'drinks';
  description: string;
  vibe: string;
  duration: string;
  priceRange: string;
  location?: string;
  whyRecommended: string;
  icon: any;
}

interface DatePlanningScreenProps {
  matchName: string;
  matchPhoto: string;
  onBack: () => void;
  onSelectDateIdea: (idea: DateIdea) => void;
  onProposeCustomDate: () => void;
}

export function DatePlanningScreen({
  matchName,
  matchPhoto,
  onBack,
  onSelectDateIdea,
  onProposeCustomDate,
}: DatePlanningScreenProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  // Curated date ideas based on compatibility
  const dateIdeas: DateIdea[] = [
    {
      id: 'idea-1',
      title: 'Sunday Farmers Market Walk',
      category: 'activity',
      description: 'Explore Brooklyn Prospect Park Farmers Market',
      vibe: 'Casual, relaxed, conversation-focused',
      duration: '1-2 hours',
      priceRange: '$',
      location: 'Prospect Park, Brooklyn',
      whyRecommended: "You both mentioned loving sustainable living and farmers markets in your profiles",
      icon: MapPin,
    },
    {
      id: 'idea-2',
      title: 'Coffee at Blue Bottle',
      category: 'coffee',
      description: 'Low-pressure coffee date in a cozy setting',
      vibe: 'Intimate, focused conversation',
      duration: '45-60 min',
      priceRange: '$',
      location: 'Williamsburg',
      whyRecommended: 'Perfect for deep conversations you both value',
      icon: Coffee,
    },
    {
      id: 'idea-3',
      title: 'Farm-to-Table Dinner',
      category: 'dinner',
      description: 'Seasonal tasting menu at Olmsted',
      vibe: 'Romantic, sophisticated',
      duration: '2-3 hours',
      priceRange: '$$$',
      location: 'Prospect Heights',
      whyRecommended: 'Aligns with your shared interest in sustainable, local food',
      icon: Utensils,
    },
    {
      id: 'idea-4',
      title: 'Live Jazz at Smalls',
      category: 'activity',
      description: 'Intimate jazz club in the West Village',
      vibe: 'Sophisticated, cultural',
      duration: '2-3 hours',
      priceRange: '$$',
      location: 'West Village',
      whyRecommended: 'Both appreciate arts and culture',
      icon: Music,
    },
  ];

  const categories = [
    { id: 'all', label: 'All Ideas', icon: Sparkles },
    { id: 'coffee', label: 'Coffee', icon: Coffee },
    { id: 'dinner', label: 'Dinner', icon: Utensils },
    { id: 'activity', label: 'Activity', icon: MapPin },
  ];

  const filteredIdeas =
    selectedCategory === 'all'
      ? dateIdeas
      : dateIdeas.filter((idea) => idea.category === selectedCategory);

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Plan Your Date" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-4 border-accent/20">
              <img src={matchPhoto} alt={matchName} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
              Date Ideas with {matchName}
            </h1>
            <p className="text-[var(--text-callout)] text-text-secondary max-w-sm mx-auto">
              Curated based on your compatibility and shared interests
            </p>
          </div>

          {/* Unlocked Badge */}
          <div className="bg-accent/5 rounded-[var(--radius-md)] p-4 border border-accent/10">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                  Date planning unlocked!
                </h3>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  Your intro call went well. Now pick a date idea and coordinate timing.
                </p>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-accent text-white border-accent'
                        : 'bg-surface text-text-secondary border-border-primary hover:border-accent/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[var(--text-callout)] font-medium">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Ideas */}
          <div>
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-3">
              Recommended for you both
            </h3>
            <div className="space-y-3">
              {filteredIdeas.map((idea) => {
                const Icon = idea.icon;
                return (
                  <button
                    key={idea.id}
                    onClick={() => onSelectDateIdea(idea)}
                    className="w-full bg-surface rounded-[var(--radius-lg)] border border-border-primary p-4 hover:bg-elevated-surface hover:border-accent/50 active:scale-[0.98] transition-all text-left"
                  >
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-[var(--text-body)] font-semibold text-text-primary">
                            {idea.title}
                          </h4>
                          <ChevronRight className="w-5 h-5 text-text-muted flex-shrink-0" />
                        </div>
                        <p className="text-[var(--text-callout)] text-text-secondary mb-2">
                          {idea.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="text-[var(--text-caption)] text-text-muted">
                            {idea.duration}
                          </span>
                          <span className="text-text-muted">•</span>
                          <span className="text-[var(--text-caption)] text-text-muted">
                            {idea.priceRange}
                          </span>
                          {idea.location && (
                            <>
                              <span className="text-text-muted">•</span>
                              <span className="text-[var(--text-caption)] text-text-muted">
                                {idea.location}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex items-start gap-2 bg-accent/5 rounded-[var(--radius-sm)] p-2 border border-accent/10">
                          <Heart className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                          <p className="text-[var(--text-caption)] text-text-secondary">
                            {idea.whyRecommended}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Date Option */}
          <div className="pt-2">
            <button
              onClick={onProposeCustomDate}
              className="w-full p-4 rounded-[var(--radius-md)] border-2 border-dashed border-border-primary hover:border-accent/50 hover:bg-accent/5 transition-colors"
            >
              <p className="text-[var(--text-callout)] text-text-secondary">
                Have your own idea? <span className="text-accent font-medium">Propose a custom date</span>
              </p>
            </button>
          </div>

          {/* Info Tip */}
          <div className="bg-surface rounded-[var(--radius-md)] border border-border-primary p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-[var(--text-callout)] text-text-secondary">
                After selecting a date idea, you'll coordinate timing with {matchName} and get location details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
