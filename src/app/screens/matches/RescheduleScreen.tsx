import React from 'react';
import { Calendar, AlertCircle, Phone } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';
import { ProposedTimeSlot } from './VoiceSchedulingScreen';

interface RescheduleScreenProps {
  matchName: string;
  matchPhoto: string;
  currentScheduledDate: Date;
  onBack: () => void;
  onSelectNewSlot: (slot: ProposedTimeSlot) => void;
  onCancelCall: () => void;
}

export function RescheduleScreen({
  matchName,
  matchPhoto,
  currentScheduledDate,
  onBack,
  onSelectNewSlot,
  onCancelCall,
}: RescheduleScreenProps) {
  const [selectedSlotId, setSelectedSlotId] = React.useState<string | null>(null);

  // Generate alternative time slots
  const alternativeSlots: ProposedTimeSlot[] = React.useMemo(() => {
    const now = new Date();
    const slots: ProposedTimeSlot[] = [];

    // Tomorrow different time
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 0, 0, 0);
    slots.push({
      id: 'reschedule-1',
      date: tomorrow,
      label: 'Tomorrow at 2:00 PM',
      dayLabel: 'Tomorrow',
      timeLabel: '2:00 PM',
    });

    // 2 days from now
    const twoDays = new Date(now);
    twoDays.setDate(twoDays.getDate() + 2);
    twoDays.setHours(18, 0, 0, 0);
    const twoDaysName = twoDays.toLocaleDateString('en-US', { weekday: 'long' });
    slots.push({
      id: 'reschedule-2',
      date: twoDays,
      label: `${twoDaysName} at 6:00 PM`,
      dayLabel: twoDaysName,
      timeLabel: '6:00 PM',
    });

    // 3 days from now morning
    const threeDays = new Date(now);
    threeDays.setDate(threeDays.getDate() + 3);
    threeDays.setHours(11, 0, 0, 0);
    const threeDaysName = threeDays.toLocaleDateString('en-US', { weekday: 'long' });
    slots.push({
      id: 'reschedule-3',
      date: threeDays,
      label: `${threeDaysName} at 11:00 AM`,
      dayLabel: threeDaysName,
      timeLabel: '11:00 AM',
    });

    // 4 days from now evening
    const fourDays = new Date(now);
    fourDays.setDate(fourDays.getDate() + 4);
    fourDays.setHours(19, 30, 0, 0);
    const fourDaysName = fourDays.toLocaleDateString('en-US', { weekday: 'long' });
    slots.push({
      id: 'reschedule-4',
      date: fourDays,
      label: `${fourDaysName} at 7:30 PM`,
      dayLabel: fourDaysName,
      timeLabel: '7:30 PM',
    });

    return slots;
  }, []);

  const selectedSlot = alternativeSlots.find(s => s.id === selectedSlotId);

  const formatCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    };
    return currentScheduledDate.toLocaleDateString('en-US', options);
  };

  const handleConfirmReschedule = () => {
    if (selectedSlot) {
      onSelectNewSlot(selectedSlot);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Reschedule Call" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-4 border-accent/20">
              <img src={matchPhoto} alt={matchName} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
              Reschedule with {matchName}
            </h1>
            <p className="text-[var(--text-callout)] text-text-secondary">
              Choose a new time that works better for you
            </p>
          </div>

          {/* Current Scheduled Time */}
          <div className="bg-warning/5 rounded-[var(--radius-md)] p-4 border border-warning/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                  Currently scheduled
                </h3>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  {formatCurrentDate()}
                </p>
              </div>
            </div>
          </div>

          {/* New Time Options */}
          <div>
            <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-3">
              Pick a new time
            </h3>
            <div className="space-y-3">
              {alternativeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`w-full p-4 rounded-[var(--radius-lg)] border transition-all ${
                    selectedSlotId === slot.id
                      ? 'border-accent bg-accent/10'
                      : 'border-border-primary bg-surface hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedSlotId === slot.id
                          ? 'bg-accent text-white'
                          : 'bg-background-secondary text-text-muted'
                      }`}
                    >
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[var(--text-body)] font-semibold text-text-primary">
                        {slot.dayLabel}
                      </p>
                      <p className="text-[var(--text-callout)] text-text-secondary">
                        {slot.timeLabel}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedSlotId === slot.id
                          ? 'border-accent bg-accent'
                          : 'border-border-primary'
                      }`}
                    >
                      {selectedSlotId === slot.id && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Cancel Call Option */}
          <div className="pt-2">
            <button
              onClick={onCancelCall}
              className="w-full p-3 rounded-[var(--radius-md)] hover:bg-background-secondary transition-colors"
            >
              <span className="text-[var(--text-callout)] text-text-muted">
                Cancel this call completely
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="border-t border-border-primary bg-background p-4 safe-area-bottom">
        <Button
          variant="primary"
          size="large"
          onClick={handleConfirmReschedule}
          disabled={!selectedSlotId}
          className="w-full"
        >
          <Phone className="w-5 h-5" />
          <span>Confirm New Time</span>
        </Button>
        {selectedSlot && (
          <p className="text-[var(--text-footnote)] text-text-muted text-center mt-3">
            {matchName} will be notified of the change
          </p>
        )}
      </div>
    </div>
  );
}
