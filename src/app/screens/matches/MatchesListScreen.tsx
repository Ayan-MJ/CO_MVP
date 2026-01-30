import React from 'react';
import { Clock, Calendar, CheckCircle, ChevronRight, Phone } from 'lucide-react';
import { TopBar } from '@/app/components/Navigation';

export type MatchStatus = 
  | 'accepted' // Just matched, need to schedule voice
  | 'availability-needed' // User needs to set availability
  | 'voice-scheduled' // Voice call scheduled
  | 'voice-done' // Voice call completed
  | 'date-planning'; // Ready for date planning

export interface MatchData {
  id: string;
  userId: string;
  name: string;
  age: number;
  photo: string;
  status: MatchStatus;
  matchedAt: Date;
  compatibilityScore: number;
  // Voice call details
  voiceScheduledFor?: Date;
  voiceDoneAt?: Date;
  // Key match reasons
  topMatchReasons: string[];
  // Nudge/action needed
  actionNeeded?: string;
  daysUntilExpiry?: number;
}

interface MatchesListScreenProps {
  onMatchClick: (match: MatchData) => void;
  onBack?: () => void;
}

// Mock data
const mockMatches: MatchData[] = [
  {
    id: 'match-1',
    userId: 'user-1',
    name: 'Sophie',
    age: 29,
    photo: 'https://images.unsplash.com/photo-1758598304332-94b40ce7c7b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc2OTc1Mzc3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'accepted',
    matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    compatibilityScore: 94,
    topMatchReasons: [
      'Both value intentional relationships',
      'Shared interest in sustainable living',
      'Similar communication styles',
    ],
    actionNeeded: 'Schedule your intro voice call',
    daysUntilExpiry: 6,
  },
  {
    id: 'match-2',
    userId: 'user-2',
    name: 'Marcus',
    age: 32,
    photo: 'https://images.unsplash.com/photo-1758599543126-59e3154d7195?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMG91dGRvb3JzfGVufDF8fHx8MTc2OTc2OTAzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'voice-scheduled',
    matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    compatibilityScore: 88,
    voiceScheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 48), // In 2 days
    topMatchReasons: [
      'Both see relationships as partnerships',
      'Match on core values: curiosity, authenticity',
      'Complementary strengths',
    ],
  },
  {
    id: 'match-3',
    userId: 'user-3',
    name: 'Elena',
    age: 27,
    photo: 'https://images.unsplash.com/photo-1666980226747-bf29624ae485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'voice-done',
    matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    compatibilityScore: 91,
    voiceScheduledFor: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    voiceDoneAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    topMatchReasons: [
      'Aligned on wanting children within 3-5 years',
      'Both value emotional intelligence',
      'Strong lifestyle overlap',
    ],
    actionNeeded: 'Share feedback and plan your first date',
  },
  {
    id: 'match-4',
    userId: 'user-4',
    name: 'James',
    age: 30,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'date-planning',
    matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14 days ago
    compatibilityScore: 89,
    voiceScheduledFor: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    voiceDoneAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    topMatchReasons: [
      'Both prioritize personal growth',
      'Shared love for outdoor activities',
      'Compatible communication styles',
    ],
  },
];

export function MatchesListScreen({ onMatchClick, onBack }: MatchesListScreenProps) {
  // Group matches by section
  const actionNeeded = mockMatches.filter(m => 
    m.status === 'accepted' || m.status === 'availability-needed' || m.status === 'voice-done'
  );
  const scheduled = mockMatches.filter(m => m.status === 'voice-scheduled');
  const past = mockMatches.filter(m => m.status === 'date-planning');

  return (
    <div className="flex flex-col h-full bg-background">
      {onBack && <TopBar title="Matches" onBack={onBack} />}

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="text-center pt-2">
            <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
              Your Matches
            </h1>
            <p className="text-[var(--text-callout)] text-text-secondary">
              {actionNeeded.length > 0 ? (
                <span className="text-accent font-medium">{actionNeeded.length} action{actionNeeded.length !== 1 ? 's' : ''} needed</span>
              ) : (
                "You're all caught up"
              )}
            </p>
          </div>

          {/* Action Needed Section */}
          {actionNeeded.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-accent" />
                <h2 className="text-[var(--text-callout)] font-semibold text-text-primary uppercase tracking-wide">
                  Action Needed
                </h2>
              </div>
              <div className="space-y-3">
                {actionNeeded.map(match => (
                  <MatchCard key={match.id} match={match} onClick={() => onMatchClick(match)} />
                ))}
              </div>
            </div>
          )}

          {/* Scheduled Section */}
          {scheduled.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-success" />
                <h2 className="text-[var(--text-callout)] font-semibold text-text-primary uppercase tracking-wide">
                  Scheduled
                </h2>
              </div>
              <div className="space-y-3">
                {scheduled.map(match => (
                  <MatchCard key={match.id} match={match} onClick={() => onMatchClick(match)} />
                ))}
              </div>
            </div>
          )}

          {/* Past Section */}
          {past.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-text-muted" />
                <h2 className="text-[var(--text-callout)] font-semibold text-text-primary uppercase tracking-wide">
                  Past Calls
                </h2>
              </div>
              <div className="space-y-3">
                {past.map(match => (
                  <MatchCard key={match.id} match={match} onClick={() => onMatchClick(match)} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {mockMatches.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Phone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-[var(--text-title-3)] font-semibold text-text-primary mb-2">
                No matches yet
              </h3>
              <p className="text-[var(--text-callout)] text-text-secondary max-w-xs mx-auto">
                Check back Monday for your weekly introductions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface MatchCardProps {
  match: MatchData;
  onClick: () => void;
}

function MatchCard({ match, onClick }: MatchCardProps) {
  const getStatusConfig = () => {
    switch (match.status) {
      case 'accepted':
        return {
          label: 'New Match',
          color: 'accent',
          bgColor: 'bg-accent/10',
          textColor: 'text-accent',
        };
      case 'availability-needed':
        return {
          label: 'Set Availability',
          color: 'warning',
          bgColor: 'bg-warning/10',
          textColor: 'text-warning',
        };
      case 'voice-scheduled':
        return {
          label: 'Call Scheduled',
          color: 'success',
          bgColor: 'bg-success/10',
          textColor: 'text-success',
        };
      case 'voice-done':
        return {
          label: 'Call Complete',
          color: 'accent',
          bgColor: 'bg-accent/10',
          textColor: 'text-accent',
        };
      case 'date-planning':
        return {
          label: 'Planning Date',
          color: 'text-muted',
          bgColor: 'bg-background-secondary',
          textColor: 'text-text-muted',
        };
    }
  };

  const statusConfig = getStatusConfig();

  const formatScheduledTime = () => {
    if (!match.voiceScheduledFor) return null;
    
    const now = new Date();
    const diff = match.voiceScheduledFor.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 0) return 'Past';
    if (hours < 24) return `In ${hours}h`;
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-surface rounded-[var(--radius-lg)] border border-border-primary p-4 hover:bg-elevated-surface active:scale-[0.98] transition-all text-left"
    >
      <div className="flex gap-3">
        {/* Photo */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
          </div>
          {/* Status dot */}
          {match.status === 'accepted' && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center border-2 border-surface">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <h3 className="text-[var(--text-body)] font-semibold text-text-primary truncate">
                {match.name}, {match.age}
              </h3>
              <p className="text-[var(--text-caption)] text-text-secondary">
                {match.compatibilityScore}% compatible
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-text-muted flex-shrink-0" />
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-2">
            <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${statusConfig.bgColor}`}>
              <span className={`text-[var(--text-caption)] font-medium ${statusConfig.textColor}`}>
                {statusConfig.label}
              </span>
            </div>
            {match.voiceScheduledFor && match.status === 'voice-scheduled' && (
              <span className="text-[var(--text-caption)] text-text-muted">
                {formatScheduledTime()}
              </span>
            )}
          </div>

          {/* Action needed */}
          {match.actionNeeded && (
            <p className="text-[var(--text-callout)] text-accent font-medium">
              {match.actionNeeded}
            </p>
          )}

          {/* Expiry warning */}
          {match.daysUntilExpiry && match.daysUntilExpiry <= 3 && (
            <p className="text-[var(--text-caption)] text-warning mt-1">
              Schedule within {match.daysUntilExpiry} days or match expires
            </p>
          )}
        </div>
      </div>
    </button>
  );
}