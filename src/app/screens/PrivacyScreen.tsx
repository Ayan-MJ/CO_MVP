import React from 'react';
import { 
  ArrowLeft, 
  Download, 
  Trash2, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react';

interface PrivacyScreenProps {
  onBack: () => void;
  onNavigateToBlockList: () => void;
  onRequestDataDownload: () => void;
  onDeleteAccount: () => void;
  blockedUsersCount: number;
}

export function PrivacyScreen({ 
  onBack, 
  onNavigateToBlockList,
  onRequestDataDownload,
  onDeleteAccount,
  blockedUsersCount
}: PrivacyScreenProps) {
  const [showDataDownloadConfirm, setShowDataDownloadConfirm] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [deleteStep, setDeleteStep] = React.useState<1 | 2>(1);
  const [confirmText, setConfirmText] = React.useState('');
  const [showDataRequestSuccess, setShowDataRequestSuccess] = React.useState(false);

  const handleDataDownloadRequest = () => {
    setShowDataDownloadConfirm(false);
    onRequestDataDownload();
    setShowDataRequestSuccess(true);
    setTimeout(() => setShowDataRequestSuccess(false), 4000);
  };

  const handleDeleteAccount = () => {
    if (deleteStep === 1) {
      setDeleteStep(2);
    } else {
      if (confirmText.toLowerCase() === 'delete') {
        setShowDeleteConfirm(false);
        setDeleteStep(1);
        setConfirmText('');
        onDeleteAccount();
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteConfirm(false);
    setDeleteStep(1);
    setConfirmText('');
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
          Privacy Controls
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Data & Privacy */}
        <div className="mb-6 mt-6">
          <h3 className="px-4 mb-3 text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide">
            Your Data
          </h3>
          <div className="bg-surface border-y border-divider">
            <button
              onClick={() => setShowDataDownloadConfirm(true)}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-input-background transition-colors border-b border-divider"
            >
              <div className="w-8 h-8 rounded-lg bg-elevated-surface flex items-center justify-center flex-shrink-0">
                <Download className="w-4 h-4 text-text-primary" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[var(--text-body)] text-text-primary">
                  Download Your Data
                </span>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  Request a copy of your information
                </p>
              </div>
            </button>

            <button
              onClick={onNavigateToBlockList}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-input-background transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-elevated-surface flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-text-primary" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[var(--text-body)] text-text-primary">
                  Blocked Users
                </span>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  {blockedUsersCount > 0 ? `${blockedUsersCount} blocked` : 'No blocked users'}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Data Download Info */}
        <div className="mx-4 mb-6 p-4 bg-elevated-surface rounded-[var(--radius-md)] border border-divider">
          <h4 className="text-[var(--text-body)] font-semibold text-text-primary mb-2">
            About Data Download
          </h4>
          <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed mb-3">
            You can request a copy of your data at any time. This includes:
          </p>
          <ul className="space-y-1 text-[var(--text-callout)] text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Profile information and photos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Match history and messages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Preferences and account settings</span>
            </li>
          </ul>
          <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed mt-3">
            We'll email you a download link within 7 days.
          </p>
        </div>

        {/* Danger Zone */}
        <div className="mb-6">
          <h3 className="px-4 mb-3 text-[var(--text-footnote)] font-semibold text-destructive uppercase tracking-wide">
            Danger Zone
          </h3>
          <div className="bg-surface border-y border-destructive/20">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-destructive/5 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-4 h-4 text-destructive" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[var(--text-body)] text-destructive font-semibold">
                  Delete Account
                </span>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  Permanently delete your account and data
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Warning Info */}
        <div className="mx-4 mb-6 p-4 bg-destructive/5 rounded-[var(--radius-md)] border border-destructive/20">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[var(--text-body)] font-semibold text-text-primary mb-1">
                Account Deletion is Permanent
              </h4>
              <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed">
                Once you delete your account, all your data including matches, messages, and profile information will be permanently removed. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Download Confirmation Modal */}
      {showDataDownloadConfirm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-[var(--radius-lg)] max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Download className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-[var(--text-title-3)] font-bold text-text-primary">
                Request Data Download?
              </h3>
            </div>
            <p className="text-[var(--text-callout)] text-text-secondary mb-6 leading-relaxed">
              We'll prepare a file with all your data and email you a download link within 7 days. The link will be valid for 14 days.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDataDownloadConfirm(false)}
                className="flex-1 px-6 py-3 bg-elevated-surface text-text-primary rounded-[var(--radius-md)] font-semibold hover:bg-input-background transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDataDownloadRequest}
                className="flex-1 px-6 py-3 bg-accent text-accent-foreground rounded-[var(--radius-md)] font-semibold hover:bg-accent/90 transition-colors"
              >
                Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-[var(--radius-lg)] max-w-sm w-full p-6">
            {deleteStep === 1 ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="text-[var(--text-title-3)] font-bold text-text-primary">
                    Delete Your Account?
                  </h3>
                </div>
                <div className="mb-6">
                  <p className="text-[var(--text-callout)] text-text-secondary mb-4 leading-relaxed">
                    This will permanently delete:
                  </p>
                  <ul className="space-y-2 mb-4">
                    {[
                      'Your profile and photos',
                      'All matches and conversations',
                      'Your preferences and settings',
                      'Subscription (if active)',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-[var(--text-callout)] text-text-secondary">
                        <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 bg-warning/10 rounded-[var(--radius-md)] border border-warning/20">
                    <p className="text-[var(--text-callout)] font-semibold text-text-primary">
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCloseDeleteModal}
                    className="flex-1 px-6 py-3 bg-elevated-surface text-text-primary rounded-[var(--radius-md)] font-semibold hover:bg-input-background transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 px-6 py-3 bg-destructive text-white rounded-[var(--radius-md)] font-semibold hover:bg-destructive/90 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="text-[var(--text-title-3)] font-bold text-text-primary">
                    Final Confirmation
                  </h3>
                </div>
                <p className="text-[var(--text-callout)] text-text-secondary mb-4 leading-relaxed">
                  To confirm account deletion, please type <span className="font-semibold text-text-primary">DELETE</span> below:
                </p>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type DELETE"
                  className="w-full px-4 py-3 bg-input-background border border-divider rounded-[var(--radius-md)] text-[var(--text-body)] text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-destructive mb-6"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleCloseDeleteModal}
                    className="flex-1 px-6 py-3 bg-elevated-surface text-text-primary rounded-[var(--radius-md)] font-semibold hover:bg-input-background transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={confirmText.toLowerCase() !== 'delete'}
                    className="flex-1 px-6 py-3 bg-destructive text-white rounded-[var(--radius-md)] font-semibold hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Delete Forever
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Data Request Success Toast */}
      {showDataRequestSuccess && (
        <div className="absolute top-20 left-4 right-4 bg-success text-white px-4 py-3 rounded-[var(--radius-md)] shadow-lg flex items-center gap-3 z-50">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="text-[var(--text-callout)] font-medium">
              Data download requested
            </p>
            <p className="text-[var(--text-caption)]">
              Check your email in 7 days
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
