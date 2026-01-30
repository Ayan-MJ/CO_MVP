import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { ChipGroup } from '@/app/components/Chip';
import { Toggle } from '@/app/components/ListRow';
import { TopBar } from '@/app/components/Navigation';
import { Slider } from '@/app/components/ui/slider';

interface AISummaryData {
  intent: string;
  kidsTimeline: string;
  relocation: {
    openToRelocate: boolean;
    openToLongDistance: boolean;
    radiusMiles: number;
    preferredRegions: string[];
  };
  lifestyleRails: {
    socialEnergy: number;
    adventure: number;
    routine: number;
  };
  values: string[];
  conflictStyle: string;
  bio: string;
  personality: string[];
  lifestyle: string[];
  interests: string[];
}

interface AISummaryReviewScreenProps {
  onContinue: (data: AISummaryData) => void;
  onBack: () => void;
  promptAnswers: any[];
}

export function AISummaryReviewScreen({
  onContinue,
  onBack,
  promptAnswers,
}: AISummaryReviewScreenProps) {
  const intentOptions = [
    { id: 'long-term', label: 'Long-term partnership' },
    { id: 'marriage', label: 'Marriage-minded' },
    { id: 'exploring', label: 'Exploring with intention' },
    { id: 'growth', label: 'Focused on growth together' },
  ];
  const kidsTimelineOptions = [
    { id: 'soon', label: 'Want kids soon (0–2 years)' },
    { id: 'someday', label: 'Someday (3–5 years)' },
    { id: 'open', label: 'Open to partner preference' },
    { id: 'not-sure', label: 'Not sure yet' },
    { id: 'no-kids', label: 'Don’t want kids' },
  ];
  const relocationRegions = [
    { id: 'west', label: 'West Coast' },
    { id: 'mountain', label: 'Mountain West' },
    { id: 'central', label: 'Central US' },
    { id: 'south', label: 'South' },
    { id: 'east', label: 'East Coast' },
    { id: 'international', label: 'Open to international' },
  ];
  const valuesOptions = [
    { id: 'authenticity', label: 'Authenticity' },
    { id: 'growth', label: 'Growth mindset' },
    { id: 'kindness', label: 'Kindness' },
    { id: 'ambition', label: 'Ambition' },
    { id: 'family', label: 'Family' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'community', label: 'Community' },
  ];
  const conflictStyleOptions = [
    { id: 'talk-it-out', label: 'Talk it out right away' },
    { id: 'space-then-talk', label: 'Need space, then talk' },
    { id: 'humor', label: 'Use humor to reset' },
    { id: 'direct', label: 'Direct and practical' },
  ];

  const [intent, setIntent] = React.useState('long-term');
  const [kidsTimeline, setKidsTimeline] = React.useState('someday');
  const [openToRelocate, setOpenToRelocate] = React.useState(true);
  const [openToLongDistance, setOpenToLongDistance] = React.useState(false);
  const [relocationRadius, setRelocationRadius] = React.useState([25]);
  const [preferredRegions, setPreferredRegions] = React.useState<string[]>(['west']);
  const [socialEnergy, setSocialEnergy] = React.useState([65]);
  const [adventure, setAdventure] = React.useState([60]);
  const [routine, setRoutine] = React.useState([45]);
  const [values, setValues] = React.useState<string[]>([
    'authenticity',
    'growth',
    'kindness',
  ]);
  const [conflictStyle, setConflictStyle] = React.useState('talk-it-out');

  const getLabel = (options: { id: string; label: string }[], id: string) =>
    options.find((option) => option.id === id)?.label ?? '';

  const getRailDescriptor = (value: number, low: string, high: string) => {
    if (value <= 35) return low;
    if (value >= 65) return high;
    return 'Balanced';
  };

  const lifestyleSummary = [
    getRailDescriptor(socialEnergy[0], 'Homebody', 'Social'),
    getRailDescriptor(adventure[0], 'Comfort-focused', 'Adventurous'),
    getRailDescriptor(routine[0], 'Spontaneous', 'Planner'),
  ];

  const handleContinue = () => {
    const intentLabel = getLabel(intentOptions, intent);
    const conflictLabel = getLabel(conflictStyleOptions, conflictStyle);
    const valuesLabels = values.map((valueId) => getLabel(valuesOptions, valueId)).filter(Boolean);

    onContinue({
      intent,
      kidsTimeline,
      relocation: {
        openToRelocate,
        openToLongDistance,
        radiusMiles: relocationRadius[0],
        preferredRegions,
      },
      lifestyleRails: {
        socialEnergy: socialEnergy[0],
        adventure: adventure[0],
        routine: routine[0],
      },
      values: valuesLabels,
      conflictStyle,
      bio: `${intentLabel} focused on building a relationship rooted in ${valuesLabels
        .slice(0, 2)
        .join(' & ')}.`,
      personality: [conflictLabel],
      lifestyle: lifestyleSummary,
      interests: preferredRegions
        .map((regionId) => getLabel(relocationRegions, regionId))
        .filter(Boolean),
    });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Review Profile" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="p-4 rounded-[var(--radius-lg)] bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h2 className="mb-2">AI Profile Summary</h2>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  We've analyzed your answers to create your profile. Review and edit anything that
                  doesn't feel right.
                </p>
              </div>
            </div>
          </div>

          {/* Structured Life Map Sections */}
          <div className="space-y-4">
            <div className="p-4 rounded-[var(--radius-md)] bg-surface border border-divider space-y-3">
              <div>
                <h3 className="text-[var(--text-callout)] font-semibold text-text-primary">Intent</h3>
                <p className="text-[var(--text-caption)] text-text-muted">
                  How you describe the kind of relationship you are seeking.
                </p>
              </div>
              <ChipGroup
                chips={intentOptions}
                selectedIds={[intent]}
                onSelectionChange={(selected) => setIntent(selected[0] ?? intent)}
                multiSelect={false}
              />
            </div>

            <div className="p-4 rounded-[var(--radius-md)] bg-surface border border-divider space-y-3">
              <div>
                <h3 className="text-[var(--text-callout)] font-semibold text-text-primary">
                  Kids timeline
                </h3>
                <p className="text-[var(--text-caption)] text-text-muted">
                  Align expectations around family planning.
                </p>
              </div>
              <ChipGroup
                chips={kidsTimelineOptions}
                selectedIds={[kidsTimeline]}
                onSelectionChange={(selected) => setKidsTimeline(selected[0] ?? kidsTimeline)}
                multiSelect={false}
              />
            </div>

            <div className="p-4 rounded-[var(--radius-md)] bg-surface border border-divider space-y-4">
              <div>
                <h3 className="text-[var(--text-callout)] font-semibold text-text-primary">
                  Relocation
                </h3>
                <p className="text-[var(--text-caption)] text-text-muted">
                  Clarify how flexible you are about moving or distance.
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[var(--text-callout)] text-text-primary">Open to relocating</p>
                  <p className="text-[var(--text-caption)] text-text-muted">
                    Willing to move for the right connection.
                  </p>
                </div>
                <Toggle checked={openToRelocate} onChange={setOpenToRelocate} />
              </div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[var(--text-callout)] text-text-primary">Open to long-distance</p>
                  <p className="text-[var(--text-caption)] text-text-muted">
                    Comfortable building something while apart.
                  </p>
                </div>
                <Toggle checked={openToLongDistance} onChange={setOpenToLongDistance} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[var(--text-callout)] text-text-primary">Relocation radius</p>
                  <span className="text-[var(--text-callout)] text-text-secondary">
                    {relocationRadius[0]} miles
                  </span>
                </div>
                <Slider
                  value={relocationRadius}
                  onValueChange={setRelocationRadius}
                  min={0}
                  max={250}
                  step={5}
                />
              </div>
              <div className="space-y-2">
                <p className="text-[var(--text-callout)] text-text-primary">Preferred regions</p>
                <ChipGroup
                  chips={relocationRegions}
                  selectedIds={preferredRegions}
                  onSelectionChange={setPreferredRegions}
                />
              </div>
            </div>

            <div className="p-4 rounded-[var(--radius-md)] bg-surface border border-divider space-y-4">
              <div>
                <h3 className="text-[var(--text-callout)] font-semibold text-text-primary">
                  Lifestyle rails
                </h3>
                <p className="text-[var(--text-caption)] text-text-muted">
                  Balance points that describe how you live day to day.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[var(--text-callout)] text-text-primary">Social energy</p>
                  <span className="text-[var(--text-callout)] text-text-secondary">
                    {getRailDescriptor(socialEnergy[0], 'Homebody', 'Social')}
                  </span>
                </div>
                <Slider value={socialEnergy} onValueChange={setSocialEnergy} min={0} max={100} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[var(--text-callout)] text-text-primary">Adventure level</p>
                  <span className="text-[var(--text-callout)] text-text-secondary">
                    {getRailDescriptor(adventure[0], 'Comfort-focused', 'Adventurous')}
                  </span>
                </div>
                <Slider value={adventure} onValueChange={setAdventure} min={0} max={100} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[var(--text-callout)] text-text-primary">Routine style</p>
                  <span className="text-[var(--text-callout)] text-text-secondary">
                    {getRailDescriptor(routine[0], 'Spontaneous', 'Planner')}
                  </span>
                </div>
                <Slider value={routine} onValueChange={setRoutine} min={0} max={100} />
              </div>
            </div>

            <div className="p-4 rounded-[var(--radius-md)] bg-surface border border-divider space-y-3">
              <div>
                <h3 className="text-[var(--text-callout)] font-semibold text-text-primary">Values</h3>
                <p className="text-[var(--text-caption)] text-text-muted">
                  Prioritize what matters most to you.
                </p>
              </div>
              <ChipGroup chips={valuesOptions} selectedIds={values} onSelectionChange={setValues} />
            </div>

            <div className="p-4 rounded-[var(--radius-md)] bg-surface border border-divider space-y-3">
              <div>
                <h3 className="text-[var(--text-callout)] font-semibold text-text-primary">
                  Conflict style
                </h3>
                <p className="text-[var(--text-caption)] text-text-muted">
                  How you prefer to resolve disagreements.
                </p>
              </div>
              <ChipGroup
                chips={conflictStyleOptions}
                selectedIds={[conflictStyle]}
                onSelectionChange={(selected) => setConflictStyle(selected[0] ?? conflictStyle)}
                multiSelect={false}
              />
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 rounded-[var(--radius-md)] bg-accent/10 border border-accent/20">
            <p className="text-[var(--text-footnote)] text-text-secondary">
              <span className="font-semibold">💡 Tip:</span> Adjust any selections so they feel
              true to you. These Life Map details power your matching preferences.
            </p>
          </div>

          {/* Data Source */}
          <div className="text-center">
            <p className="text-[var(--text-caption)] text-text-muted">
              Generated from {promptAnswers.length} Life Map {promptAnswers.length === 1 ? 'answer' : 'answers'}
            </p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-4 border-t border-divider bg-surface">
        <Button variant="primary" size="large" onClick={handleContinue}>
          Looks Good, Continue
        </Button>
      </div>
    </div>
  );
}
