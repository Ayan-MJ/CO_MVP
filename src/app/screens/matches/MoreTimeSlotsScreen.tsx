import React from 'react';
import { Calendar, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';
import { ProposedTimeSlot } from './VoiceSchedulingScreen';

interface MoreTimeSlotsScreenProps {
  matchName: string;
  matchPhoto: string;
  onBack: () => void;
  onSelectSlot: (slot: ProposedTimeSlot) => void;
  onUpdateAvailability: () => void;
}

export function MoreTimeSlotsScreen({
  matchName,
  matchPhoto,
  onBack,
  onSelectSlot,
  onUpdateAvailability,
}: MoreTimeSlotsScreenProps) {
  const [selectedSlotId, setSelectedSlotId] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(0);

  // Generate more time slots across different days
  const allSlots: ProposedTimeSlot[] = React.useMemo(() => {
    const now = new Date();
    const slots: ProposedTimeSlot[] = [];

    // Generate slots for the next 7 days
    for (let dayOffset = 1; dayOffset <= 7; dayOffset++) {
      // Morning slot
      const morning = new Date(now);
      morning.setDate(morning.getDate() + dayOffset);
      morning.setHours(10, 0, 0, 0);
      const morningDay = morning.toLocaleDateString('en-US', { weekday: 'long' });
      slots.push({
        id: `more-${dayOffset}-morning`,
        date: morning,
        label: `${morningDay} at 10:00 AM`,
        dayLabel: morningDay,
        timeLabel: '10:00 AM',
      });

      // Afternoon slot
      const afternoon = new Date(now);
      afternoon.setDate(afternoon.getDate() + dayOffset);
      afternoon.setHours(14, 30, 0, 0);
      const afternoonDay = afternoon.toLocaleDateString('en-US', { weekday: 'long' });
      slots.push({
        id: `more-${dayOffset}-afternoon`,
        date: afternoon,
        label: `${afternoonDay} at 2:30 PM`,
        dayLabel: afternoonDay,
        timeLabel: '2:30 PM',
      });

      // Evening slot
      const evening = new Date(now);
      evening.setDate(evening.getDate() + dayOffset);
      evening.setHours(19, 0, 0, 0);
      const eveningDay = evening.toLocaleDateString('en-US', { weekday: 'long' });
      slots.push({
        id: `more-${dayOffset}-evening`,
        date: evening,
        label: `${eveningDay} at 7:00 PM`,
        dayLabel: eveningDay,
        timeLabel: '7:00 PM',
      });
    }

    return slots;
  }, []);

  const SLOTS_PER_PAGE = 6;
  const totalPages = Math.ceil(allSlots.length / SLOTS_PER_PAGE);
  const currentSlots = allSlots.slice(
    currentPage * SLOTS_PER_PAGE,
    (currentPage + 1) * SLOTS_PER_PAGE
  );

  const selectedSlot = allSlots.find(s => s.id === selectedSlotId);

  const handleConfirm = () => {
    if (selectedSlot) {
      onSelectSlot(selectedSlot);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="More Times" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-4 border-accent/20">
              <img src={matchPhoto} alt={matchName} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
              More Available Times
            </h1>
            <p className="text-[var(--text-callout)] text-text-secondary">
              Additional times based on your availability
            </p>
          </div>

          {/* Page indicator */}
          <div className="flex items-center justify-between">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-full ${
                currentPage === 0
                  ? 'text-text-muted cursor-not-allowed'
                  : 'text-text-primary hover:bg-background-secondary'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <p className="text-[var(--text-callout)] text-text-secondary">
              Page {currentPage + 1} of {totalPages}
            </p>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className={`p-2 rounded-full ${
                currentPage === totalPages - 1
                  ? 'text-text-muted cursor-not-allowed'
                  : 'text-text-primary hover:bg-background-secondary'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Time Slots Grid */}
          <div className="space-y-3">
            {currentSlots.map((slot) => (
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

          {/* Update Availability */}
          <div className="pt-2">
            <button
              onClick={onUpdateAvailability}
              className="w-full p-3 rounded-[var(--radius-md)] border border-border-primary bg-background-secondary hover:bg-surface transition-colors"
            >
              <p className="text-[var(--text-callout)] text-text-secondary">
                Don't see a good time? <span className="text-accent font-medium">Update availability</span>
              </p>
            </button>
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
          <span>Confirm This Time</span>
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
