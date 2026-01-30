import React from 'react';
import { Settings, Info } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';
import { Toggle } from '@/app/components/ListRow';

interface PreferencesData {
  distance: number;
  ageMin: number;
  ageMax: number;
  kidsPreference: 'yes' | 'no' | 'open' | 'have-kids';
  relocationOpenness: 'yes' | 'no' | 'maybe';
  hardFilters: {
    distance: boolean;
    age: boolean;
    kids: boolean;
    relocation: boolean;
  };
}

interface PreferencesScreenProps {
  onContinue: (data: PreferencesData) => void;
  onBack: () => void;
  initialData?: Partial<PreferencesData>;
}

export function PreferencesScreen({ onContinue, onBack, initialData }: PreferencesScreenProps) {
  const [distance, setDistance] = React.useState(initialData?.distance || 25);
  const [ageMin, setAgeMin] = React.useState(initialData?.ageMin || 25);
  const [ageMax, setAgeMax] = React.useState(initialData?.ageMax || 35);
  const [kidsPreference, setKidsPreference] = React.useState<PreferencesData['kidsPreference']>(
    initialData?.kidsPreference || 'open'
  );
  const [relocationOpenness, setRelocationOpenness] = React.useState<
    PreferencesData['relocationOpenness']
  >(initialData?.relocationOpenness || 'maybe');

  const [hardFilters, setHardFilters] = React.useState({
    distance: initialData?.hardFilters?.distance ?? false,
    age: initialData?.hardFilters?.age ?? false,
    kids: initialData?.hardFilters?.kids ?? false,
    relocation: initialData?.hardFilters?.relocation ?? false,
  });

  const toggleHardFilter = (key: keyof typeof hardFilters) => {
    setHardFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = () => {
    onContinue({
      distance,
      ageMin,
      ageMax,
      kidsPreference,
      relocationOpenness,
      hardFilters,
    });
  };

  const distancePresets = [
    { label: '5 mi', value: 5 },
    { label: '10 mi', value: 10 },
    { label: '15 mi', value: 15 },
    { label: '25 mi', value: 25 },
    { label: '50 mi', value: 50 },
  ];

  const agePresets = [
    { label: '22–30', min: 22, max: 30 },
    { label: '25–35', min: 25, max: 35 },
    { label: '30–40', min: 30, max: 40 },
    { label: '35–45', min: 35, max: 45 },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Preferences" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-5 h-5 text-accent" />
              <h2>Matching preferences</h2>
            </div>
            <p className="text-[var(--text-callout)] text-text-secondary">
              Help us find the right matches for you. You can adjust these anytime.
            </p>
          </div>

          <details
            className="rounded-[var(--radius-md)] border border-divider bg-surface"
            open
          >
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer">
              <div>
                <h3 className="text-[var(--text-callout)] font-semibold text-text-primary">
                  Distance &amp; Age
                </h3>
                <p className="text-[var(--text-footnote)] text-text-muted">
                  Set how far and what age range works best for you.
                </p>
              </div>
              <span className="text-[var(--text-footnote)] text-text-muted">Open</span>
            </summary>
            <div className="px-4 pb-4 space-y-6">
              {/* Distance */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[var(--text-callout)] font-semibold text-text-primary">
                      Maximum Distance
                    </h4>
                    <p className="text-[var(--text-footnote)] text-text-muted">
                      How far are you willing to travel?
                    </p>
                  </div>
                  <span className="text-[var(--text-title-3)] font-bold text-accent">
                    {distance} mi
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {distancePresets.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setDistance(preset.value)}
                      className={`px-3 py-1.5 rounded-full border text-[var(--text-caption)] font-medium transition ${
                        distance === preset.value
                          ? 'bg-accent-muted border-accent text-text-primary'
                          : 'bg-surface border-divider text-text-secondary hover:bg-elevated-surface'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value))}
                  className="w-full h-2 bg-divider rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer"
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[var(--text-footnote)] text-text-secondary">
                    <Toggle
                      checked={hardFilters.distance}
                      onChange={() => toggleHardFilter('distance')}
                    />
                    <span>Hard filter (strict)</span>
                  </label>
                  <button className="text-text-muted hover:text-text-primary">
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Age Range */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[var(--text-callout)] font-semibold text-text-primary">
                      Age Range
                    </h4>
                    <p className="text-[var(--text-footnote)] text-text-muted">
                      Preferred age range for matches
                    </p>
                  </div>
                  <span className="text-[var(--text-title-3)] font-bold text-accent">
                    {ageMin}–{ageMax}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {agePresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setAgeMin(preset.min);
                        setAgeMax(preset.max);
                      }}
                      className={`px-3 py-1.5 rounded-full border text-[var(--text-caption)] font-medium transition ${
                        ageMin === preset.min && ageMax === preset.max
                          ? 'bg-accent-muted border-accent text-text-primary'
                          : 'bg-surface border-divider text-text-secondary hover:bg-elevated-surface'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--text-caption)] text-text-muted w-12">Min</span>
                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={ageMin}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setAgeMin(val);
                        if (val > ageMax) setAgeMax(val);
                      }}
                      className="flex-1 h-2 bg-divider rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--text-caption)] text-text-muted w-12">Max</span>
                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={ageMax}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setAgeMax(val);
                        if (val < ageMin) setAgeMin(val);
                      }}
                      className="flex-1 h-2 bg-divider rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[var(--text-footnote)] text-text-secondary">
                    <Toggle checked={hardFilters.age} onChange={() => toggleHardFilter('age')} />
                    <span>Hard filter (strict)</span>
                  </label>
                </div>
              </div>
            </div>
          </details>

          <details className="rounded-[var(--radius-md)] border border-divider bg-surface">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer">
              <div>
                <h3 className="text-[var(--text-callout)] font-semibold text-text-primary">
                  Family &amp; Relocation
                </h3>
                <p className="text-[var(--text-footnote)] text-text-muted">
                  Share your family goals and moving flexibility.
                </p>
              </div>
              <span className="text-[var(--text-footnote)] text-text-muted">Open</span>
            </summary>
            <div className="px-4 pb-4 space-y-6">
              {/* Kids Preference */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                    Children Preferences
                  </h4>
                  <p className="text-[var(--text-footnote)] text-text-muted">
                    Your stance on having children
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'yes', label: 'Want kids' },
                    { value: 'no', label: "Don't want kids" },
                    { value: 'have-kids', label: 'Have kids' },
                    { value: 'open', label: 'Open to either' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setKidsPreference(option.value as any)}
                      className={`p-3 rounded-[var(--radius-md)] border-2 transition-all text-center ${
                        kidsPreference === option.value
                          ? 'bg-accent-muted border-accent text-text-primary'
                          : 'bg-surface border-divider text-text-secondary hover:bg-elevated-surface'
                      }`}
                    >
                      <span className="text-[var(--text-callout)] font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[var(--text-footnote)] text-text-secondary">
                    <Toggle checked={hardFilters.kids} onChange={() => toggleHardFilter('kids')} />
                    <span>Hard filter (strict)</span>
                  </label>
                </div>
              </div>

              {/* Relocation */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                    Relocation Openness
                  </h4>
                  <p className="text-[var(--text-footnote)] text-text-muted">
                    Would you consider moving for the right person?
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'yes', label: 'Yes' },
                    { value: 'maybe', label: 'Maybe' },
                    { value: 'no', label: 'No' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setRelocationOpenness(option.value as any)}
                      className={`p-3 rounded-[var(--radius-md)] border-2 transition-all text-center ${
                        relocationOpenness === option.value
                          ? 'bg-accent-muted border-accent text-text-primary'
                          : 'bg-surface border-divider text-text-secondary hover:bg-elevated-surface'
                      }`}
                    >
                      <span className="text-[var(--text-callout)] font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[var(--text-footnote)] text-text-secondary">
                    <Toggle
                      checked={hardFilters.relocation}
                      onChange={() => toggleHardFilter('relocation')}
                    />
                    <span>Hard filter (strict)</span>
                  </label>
                </div>
              </div>
            </div>
          </details>

          {/* Hard vs Soft Explanation */}
          <div className="p-4 rounded-[var(--radius-md)] bg-accent/10 border border-accent/20">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[var(--text-footnote)] text-text-secondary mb-1">
                  <span className="font-semibold">Hard filters</span> exclude all matches outside
                  your criteria.
                </p>
                <p className="text-[var(--text-footnote)] text-text-muted">
                  <span className="font-semibold">Soft filters</span> (default) prioritize your
                  preferences but may show exceptional matches slightly outside your range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-4 border-t border-divider bg-surface">
        <Button variant="primary" size="large" onClick={handleContinue}>
          Continue to Preview
        </Button>
      </div>
    </div>
  );
}
