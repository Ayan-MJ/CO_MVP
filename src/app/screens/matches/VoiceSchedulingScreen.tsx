import React from 'react';
import { Phone, Calendar, Info, Clock } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

export interface ProposedTimeSlot {
  id: string;
  date: Date;
  label: string; // e.g., "Tomorrow at 7:00 PM"
  dayLabel: string; // e.g., "Tomorrow"
  timeLabel: string; // e.g., "7:00 PM"
}

interface VoiceSchedulingScreenProps {
  matchName: string;
  matchPhoto: string;
  onBack: () => void;
  onSelectSlot: (slot: ProposedTimeSlot) => void;
  onNeedMoreOptions: () => void;
}

export function VoiceSchedulingScreen({
  matchName,
  matchPhoto,
  onBack,
  onSelectSlot,
  onNeedMoreOptions,
}: VoiceSchedulingScreenProps) {
  const [selectedSlotId, setSelectedSlotId] = React.useState<string | null>(null);

  // Generate 3 proposed time slots based on mutual availability
  const proposedSlots: ProposedTimeSlot[] = React.useMemo(() => {
    const now = new Date();
    const slots: ProposedTimeSlot[] = [];

    // Tomorrow evening
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(19, 0, 0, 0);
    slots.push({
      id: 'slot-1',
      date: tomorrow,
      label: 'Tomorrow at 7:00 PM',
      dayLabel: 'Tomorrow',
      timeLabel: '7:00 PM',
    });

    // Day after tomorrow morning
    const dayAfter = new Date(now);
    dayAfter.setDate(dayAfter.getDate() + 2);
    dayAfter.setHours(10, 30, 0, 0);
    const dayAfterName = dayAfter.toLocaleDateString('en-US', { weekday: 'long' });
    slots.push({
      id: 'slot-2',
      date: dayAfter,
      label: `${dayAfterName} at 10:30 AM`,
      dayLabel: dayAfterName,
      timeLabel: '10:30 AM',
    });

    // 3 days from now evening
    const threeDays = new Date(now);
    threeDays.setDate(threeDays.getDate() + 3);
    threeDays.setHours(18, 30, 0, 0);
    const threeDaysName = threeDays.toLocaleDateString('en-US', { weekday: 'long' });
    slots.push({
      id: 'slot-3',
      date: threeDays,
      label: `${threeDaysName} at 6:30 PM`,
      dayLabel: threeDaysName,
      timeLabel: '6:30 PM',
    });

    return slots;
  }, []);

  const selectedSlot = proposedSlots.find(s => s.id === selectedSlotId);

  const handleConfirm = () => {
    if (selectedSlot) {
      onSelectSlot(selectedSlot);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Schedule Call" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-4 border-accent/20">
              <img src={matchPhoto} alt={matchName} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
              Schedule with {matchName}
            </h1>
            <p className="text-[var(--text-callout)] text-text-secondary max-w-sm mx-auto">
              Choose a time that works best for your 15-minute intro call
            </p>
          </div>

          {/* Call Format Info */}
          <div className="bg-accent/5 rounded-[var(--radius-md)] p-4 border border-accent/10">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent" />
                  <p className="text-[var(--text-callout)] text-text-primary font-medium">
                    15-minute voice call
                  </p>
                </div>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  Audio-only to keep things low-pressure. You'll get a reminder 15 minutes before.
                </p>
              </div>
            </div>
          </div>

          {/* Proposed Time Slots */}
          <div>
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-3">
              Suggested Times
            </h3>
            <p className="text-[var(--text-callout)] text-text-secondary mb-4">
              Based on both your availabilities
            </p>
            
            <div className="space-y-3">
              {proposedSlots.map((slot, index) => {
                const proposerLabel =
                  index % 2 === 0 ? 'Your proposed times' : 'Their proposed times';
                const isSelected = selectedSlotId === slot.id;

                return (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`w-full p-4 rounded-[var(--radius-lg)] border transition-all ${
                      isSelected
                        ? 'border-accent bg-accent/10'
                        : 'border-border-primary bg-surface hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isSelected
                            ? 'bg-accent text-white'
                            : 'bg-background-secondary text-text-muted'
                        }`}
                      >
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[var(--text-body)] font-semibold text-text-primary">
                            {slot.dayLabel}
                          </p>
                          <span className="text-[var(--text-footnote)] text-text-muted px-2 py-0.5 rounded-full border border-border-primary bg-background-secondary">
                            {proposerLabel}
                          </span>
                          {isSelected && (
                            <span className="text-[var(--text-footnote)] text-accent px-2 py-0.5 rounded-full border border-accent/40 bg-accent/10">
                              Pending confirmation
                            </span>
                          )}
                        </div>
                        <p className="text-[var(--text-callout)] text-text-secondary">
                          {slot.timeLabel}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
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

          {/* Need More Options */}
          <button
            onClick={onNeedMoreOptions}
            className="w-full p-3 rounded-[var(--radius-md)] border border-border-primary bg-background-secondary hover:bg-surface transition-colors"
          >
            <p className="text-[var(--text-callout)] text-text-secondary">
              None of these work? <span className="text-accent font-medium">See more times</span>
            </p>
          </button>

          {/* What to Expect */}
          <div className="bg-surface rounded-[var(--radius-md)] border border-border-primary p-4">
            <h4 className="text-[var(--text-callout)] font-semibold text-text-primary mb-3">
              What to expect
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[var(--text-callout)] text-text-secondary">
                <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>15 minutes to see if there's chemistry</span>
              </li>
              <li className="flex items-start gap-2 text-[var(--text-callout)] text-text-secondary">
                <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>We'll call you both at the scheduled time</span>
              </li>
              <li className="flex items-start gap-2 text-[var(--text-callout)] text-text-secondary">
                <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>Share feedback after to unlock date planning</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="border-t border-border-primary bg-background p-4 safe-area-bottom">
        <Button
          variant="primary"
          size="large"
          onClick={handleConfirm}
          disabled={!selectedSlotId}
          className="w-full"
        >
          <Phone className="w-5 h-5" />
          <span>Confirm Call</span>
        </Button>
        {selectedSlot && (
          <p className="text-[var(--text-footnote)] text-text-muted text-center mt-3">
            {selectedSlot.label}
          </p>
        )}
      </div>
    </div>
  );
}
