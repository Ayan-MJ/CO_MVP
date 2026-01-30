import React from 'react';
import { ArrowLeft, Shield, X } from 'lucide-react';

interface BlockedUser {
  id: string;
  name: string;
  age: number;
  photo: string;
  blockedDate: string;
}

interface BlockListScreenProps {
  onBack: () => void;
  blockedUsers: BlockedUser[];
  onUnblockUser: (userId: string) => void;
}

export function BlockListScreen({ onBack, blockedUsers, onUnblockUser }: BlockListScreenProps) {
  const [showUnblockConfirm, setShowUnblockConfirm] = React.useState<string | null>(null);

  const handleUnblock = (userId: string) => {
    onUnblockUser(userId);
    setShowUnblockConfirm(null);
  };

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-divider bg-surface flex items-center">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full hover:bg-input-background transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <h1 className="flex-1 text-center text-[var(--text-headline)] font-bold text-text-primary">
          Blocked Users
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {blockedUsers.length > 0 ? (
          <>
            {/* Info */}
            <div className="mx-4 mt-4 mb-4 p-4 bg-elevated-surface rounded-[var(--radius-md)] border border-divider">
              <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed">
                Blocked users cannot see your profile or contact you. You won't see their profile in introductions.
              </p>
            </div>

            {/* Blocked Users List */}
            <div className="bg-surface border-y border-divider">
              {blockedUsers.map((user, index) => (
                <div
                  key={user.id}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    index < blockedUsers.length - 1 ? 'border-b border-divider' : ''
                  }`}
                >
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-[var(--text-body)] font-semibold text-text-primary">
                      {user.name}, {user.age}
                    </h3>
                    <p className="text-[var(--text-callout)] text-text-secondary">
                      Blocked {user.blockedDate}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowUnblockConfirm(user.id)}
                    className="px-4 py-2 bg-elevated-surface border border-divider text-text-primary rounded-[var(--radius-md)] text-[var(--text-callout)] font-medium hover:bg-input-background transition-colors"
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center px-6 py-12">
            <div className="text-center max-w-xs">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-[var(--text-title-3)] font-bold text-text-primary mb-2">
                No Blocked Users
              </h3>
              <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed">
                You haven't blocked anyone yet. Blocked users won't be able to see or contact you.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Unblock Confirmation Modal */}
      {showUnblockConfirm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-[var(--radius-lg)] max-w-sm w-full p-6">
            <h3 className="text-[var(--text-title-3)] font-bold text-text-primary mb-2">
              Unblock User?
            </h3>
            <p className="text-[var(--text-callout)] text-text-secondary mb-6 leading-relaxed">
              This person will be able to see your profile and may appear in your introductions again.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowUnblockConfirm(null)}
                className="flex-1 px-6 py-3 bg-elevated-surface text-text-primary rounded-[var(--radius-md)] font-semibold hover:bg-input-background transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUnblock(showUnblockConfirm)}
                className="flex-1 px-6 py-3 bg-accent text-accent-foreground rounded-[var(--radius-md)] font-semibold hover:bg-accent/90 transition-colors"
              >
                Unblock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
