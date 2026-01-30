import React from 'react';
import { Clock, Info } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

export interface TimeSlot {
  day: string;
  time: string;
  available: boolean;
}

interface AvailabilitySetupScreenProps {
  onBack: () => void;
  onContinue: (availability: TimeSlot[]) => void;
  matchName?: string;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIME_SLOTS = [
  { label: 'Morning', value: 'morning', time: '9am-12pm' },
  { label: 'Afternoon', value: 'afternoon', time: '12pm-5pm' },
  { label: 'Evening', value: 'evening', time: '5pm-9pm' },
];

export function AvailabilitySetupScreen({ onBack, onContinue, matchName }: AvailabilitySetupScreenProps) {
  const [selectedSlots, setSelectedSlots] = React.useState<Set<string>>(new Set());

  const toggleSlot = (day: string, timeValue: string) => {
    const slotId = `${day}-${timeValue}`;
    const newSlots = new Set(selectedSlots);
    
    if (newSlots.has(slotId)) {
      newSlots.delete(slotId);
    } else {
      newSlots.add(slotId);
    }
    
    setSelectedSlots(newSlots);
  };

  const handleContinue = () => {
    const availability: TimeSlot[] = [];
    selectedSlots.forEach(slotId => {
      const [day, timeValue] = slotId.split('-');
      const timeSlot = TIME_SLOTS.find(t => t.value === timeValue);
      if (timeSlot) {
        availability.push({
          day,
          time: timeSlot.time,
          available: true,
        });
      }
    });
    onContinue(availability);
  };

  const isSlotSelected = (day: string, timeValue: string) => {
    return selectedSlots.has(`${day}-${timeValue}`);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Set Availability" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
              When are you free?
            </h1>
            <p className="text-[var(--text-callout)] text-text-secondary max-w-sm mx-auto">
              {matchName 
                ? `Select times you're available for a 15-min call with ${matchName}`
                : "Select times you're typically available for intro calls"}
            </p>
          </div>

          {/* Info Callout */}
          <div className="bg-accent/5 rounded-[var(--radius-md)] p-4 border border-accent/10">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  Choose at least 3 time windows. We'll suggest specific times that work for both of you.
                </p>
              </div>
            </div>
          </div>

          {/* Weekly Grid */}
          <div>
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-3">
              This Week
            </h3>
            
            {/* Time slot legend */}
            <div className="mb-4 space-y-2">
              {TIME_SLOTS.map(slot => (
                <div key={slot.value} className="flex items-center gap-2 text-[var(--text-caption)] text-text-muted">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{slot.label}: {slot.time}</span>
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="space-y-3">
              {DAYS.map(day => (
                <div key={day}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[var(--text-callout)] font-medium text-text-primary w-12">
                      {day}
                    </span>
                    <div className="flex-1 flex gap-2">
                      {TIME_SLOTS.map(slot => (
                        <button
                          key={slot.value}
                          onClick={() => toggleSlot(day, slot.value)}
                          className={`flex-1 py-3 px-2 rounded-[var(--radius-sm)] font-medium transition-all ${
                            isSlotSelected(day, slot.value)
                              ? 'bg-accent text-accent-foreground'
                              : 'bg-background-secondary text-text-secondary hover:bg-surface border border-border-primary'
                          }`}
                        >
                          <span className="text-[var(--text-caption)] block">
                            {slot.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selection Summary */}
          {selectedSlots.size > 0 && (
            <div className="bg-surface rounded-[var(--radius-md)] border border-border-primary p-4">
              <p className="text-[var(--text-callout)] text-text-secondary mb-2">
                <span className="text-accent font-semibold">{selectedSlots.size}</span> time window{selectedSlots.size !== 1 ? 's' : ''} selected
              </p>
              {selectedSlots.size < 3 && (
                <p className="text-[var(--text-caption)] text-text-muted">
                  Select at least {3 - selectedSlots.size} more to continue
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="border-t border-border-primary bg-background p-4 safe-area-bottom">
        <Button
          variant="primary"
          size="large"
          onClick={handleContinue}
          disabled={selectedSlots.size < 3}
          className="w-full"
        >
          <span>Continue</span>
        </Button>
        <p className="text-[var(--text-footnote)] text-text-muted text-center mt-3">
          You can update your availability anytime
        </p>
      </div>
    </div>
  );
}