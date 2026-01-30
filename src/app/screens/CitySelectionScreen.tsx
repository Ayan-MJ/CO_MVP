import React from 'react';
import { Search, ChevronRight, MapPin, Clock } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { Input } from '@/app/components/Input';
import { TopBar } from '@/app/components/Navigation';
import { EmptyState } from '@/app/components/Feedback';

interface CitySelectionScreenProps {
  onBack: () => void;
  onContinue: (city: string, neighborhood: string, isWaitlisted: boolean) => void;
}

interface City {
  id: string;
  name: string;
  neighborhoods: Neighborhood[];
}

interface Neighborhood {
  id: string;
  name: string;
  status: 'live' | 'waitlist';
  waitlistSize?: number;
}

const cities: City[] = [
  {
    id: 'sf',
    name: 'San Francisco',
    neighborhoods: [
      { id: 'sf-soma', name: 'SoMa', status: 'live' },
      { id: 'sf-marina', name: 'Marina District', status: 'live' },
      { id: 'sf-mission', name: 'Mission District', status: 'live' },
      { id: 'sf-hayes', name: 'Hayes Valley', status: 'waitlist', waitlistSize: 45 },
      { id: 'sf-nob', name: 'Nob Hill', status: 'live' },
    ],
  },
  {
    id: 'nyc',
    name: 'New York City',
    neighborhoods: [
      { id: 'nyc-williamsburg', name: 'Williamsburg', status: 'live' },
      { id: 'nyc-upper-west', name: 'Upper West Side', status: 'live' },
      { id: 'nyc-chelsea', name: 'Chelsea', status: 'waitlist', waitlistSize: 120 },
      { id: 'nyc-east-village', name: 'East Village', status: 'live' },
    ],
  },
  {
    id: 'la',
    name: 'Los Angeles',
    neighborhoods: [
      { id: 'la-santa-monica', name: 'Santa Monica', status: 'live' },
      { id: 'la-silverlake', name: 'Silver Lake', status: 'live' },
      { id: 'la-venice', name: 'Venice Beach', status: 'waitlist', waitlistSize: 78 },
    ],
  },
];

export function CitySelectionScreen({ onBack, onContinue }: CitySelectionScreenProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState<City | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = React.useState<Neighborhood | null>(null);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.neighborhoods.some(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleContinue = () => {
    if (selectedCity && selectedNeighborhood) {
      onContinue(
        selectedCity.name,
        selectedNeighborhood.name,
        selectedNeighborhood.status === 'waitlist'
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Choose Your Location" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="mb-2">
            <p className="text-[var(--text-callout)] text-text-secondary">
              Select your city and neighborhood to see availability in your area
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <Input
              placeholder="Search cities or neighborhoods..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* City/Neighborhood List */}
          {!selectedCity ? (
            <div className="space-y-2">
              <p className="text-[var(--text-caption)] text-text-muted uppercase tracking-wide px-1">
                Available Cities
              </p>
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCity(city)}
                    className="w-full flex items-center justify-between p-4 bg-surface rounded-[var(--radius-md)] border border-divider hover:bg-elevated-surface active:scale-[0.98] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-accent" />
                      <span className="text-[var(--text-body)] font-medium text-text-primary">
                        {city.name}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-muted" />
                  </button>
                ))
              ) : (
                <EmptyState
                  icon={<Search className="w-8 h-8" />}
                  title="No cities found"
                  description={`We couldn't find any cities matching "${searchQuery}"`}
                  action={{
                    label: 'Clear Search',
                    onClick: () => setSearchQuery(''),
                  }}
                />
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => {
                  setSelectedCity(null);
                  setSelectedNeighborhood(null);
                }}
                className="text-[var(--text-callout)] text-accent mb-2"
              >
                ← Back to cities
              </button>
              <p className="text-[var(--text-caption)] text-text-muted uppercase tracking-wide px-1 mb-3">
                Neighborhoods in {selectedCity.name}
              </p>
              {selectedCity.neighborhoods.map((neighborhood) => (
                <button
                  key={neighborhood.id}
                  onClick={() => setSelectedNeighborhood(neighborhood)}
                  className={`w-full flex items-center justify-between p-4 rounded-[var(--radius-md)] border transition-all ${
                    selectedNeighborhood?.id === neighborhood.id
                      ? 'bg-accent-muted border-accent'
                      : 'bg-surface border-divider hover:bg-elevated-surface'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[var(--text-callout)] font-medium text-text-primary">
                        {neighborhood.name}
                      </span>
                      {neighborhood.status === 'live' ? (
                        <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-[var(--text-caption)] font-medium">
                          Live
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-warning/20 text-warning text-[var(--text-caption)] font-medium">
                          Waitlist
                        </span>
                      )}
                    </div>
                    {neighborhood.status === 'waitlist' && neighborhood.waitlistSize && (
                      <div className="flex items-center gap-1 text-[var(--text-footnote)] text-text-muted">
                        <Clock className="w-3 h-3" />
                        <span>{neighborhood.waitlistSize} people ahead</span>
                      </div>
                    )}
                  </div>
                  {selectedNeighborhood?.id === neighborhood.id && (
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Continue Button */}
      {selectedCity && selectedNeighborhood && (
        <div className="p-4 border-t border-divider bg-surface">
          <Button variant="primary" size="large" onClick={handleContinue}>
            Continue to {selectedNeighborhood.status === 'live' ? 'Sign Up' : 'Waitlist'}
          </Button>
        </div>
      )}
    </div>
  );
}