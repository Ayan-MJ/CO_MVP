import React from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  User, 
  ShieldCheck, 
  Crown, 
  Lock, 
  Bell, 
  HelpCircle,
  Shield,
  FileText,
  LogOut
} from 'lucide-react';

interface SettingsHomeScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  userInfo: {
    name: string;
    email: string;
    isVerified: boolean;
    subscriptionStatus: 'active' | 'expired' | 'none';
  };
}

export function SettingsHomeScreen({ onBack, onNavigate, onLogout, userInfo }: SettingsHomeScreenProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Account Information',
          description: 'Name, email, phone number',
          screen: 'account-info',
        },
        {
          icon: ShieldCheck,
          label: 'Verification',
          description: userInfo.isVerified ? 'Verified' : 'Not verified',
          screen: 'verification',
          badge: !userInfo.isVerified ? 'Action needed' : undefined,
          badgeColor: !userInfo.isVerified ? 'bg-warning' : undefined,
        },
        {
          icon: Crown,
          label: 'Subscription',
          description: userInfo.subscriptionStatus === 'active' ? 'Premium Active' : 'Free',
          screen: 'subscription',
        },
      ],
    },
    {
      title: 'Privacy & Safety',
      items: [
        {
          icon: Lock,
          label: 'Privacy Controls',
          description: 'Data, account deletion, blocked users',
          screen: 'privacy',
        },
        {
          icon: Shield,
          label: 'Safety Center',
          description: 'Reporting, safety resources',
          screen: 'safety',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Manage notification settings',
          screen: 'notifications',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          description: 'FAQs, contact us',
          screen: 'help',
        },
        {
          icon: FileText,
          label: 'Legal',
          description: 'Terms, privacy policy',
          screen: 'legal',
        },
      ],
    },
  ];

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-divider bg-surface flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full hover:bg-input-background transition-colors flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <h1 className="text-[var(--text-headline)] font-bold text-text-primary">Settings</h1>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* User Info Header */}
        <div className="mx-4 mt-3 mb-4 px-3 py-2.5 bg-surface/50 rounded-[var(--radius-md)] border border-divider/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
            <User className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[var(--text-callout)] font-semibold text-text-primary truncate">
              {userInfo.name}
            </h2>
            <p className="text-[var(--text-footnote)] text-text-secondary truncate">
              {userInfo.email}
            </p>
          </div>
          {userInfo.isVerified && (
            <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span className="text-[var(--text-caption)] text-success font-medium">
                Verified
              </span>
            </div>
          )}
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-5">
            <h3 className="px-4 mb-2 text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide">
              {section.title}
            </h3>
            <div className="mx-4 bg-surface/40 rounded-[var(--radius-md)] border border-divider/60">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={() => onNavigate(item.screen)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-input-background/70 transition-colors ${
                      itemIndex < section.items.length - 1 ? 'border-b border-divider/50' : ''
                    }`}
                  >
                    <div className="w-7 h-7 rounded-md bg-elevated-surface/70 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--text-callout)] text-text-primary">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-[var(--text-caption)] font-medium ${item.badgeColor || 'bg-accent'} text-white`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[var(--text-footnote)] text-text-secondary">
                        {item.description}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="px-4 pb-8">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-surface border border-divider text-destructive rounded-[var(--radius-md)] font-semibold hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-[var(--radius-lg)] max-w-sm w-full p-6">
            <h3 className="text-[var(--text-title-3)] font-bold text-text-primary mb-2">
              Log Out?
            </h3>
            <p className="text-[var(--text-callout)] text-text-secondary mb-6">
              You'll need to log back in to continue using Cohort.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-6 py-3 bg-elevated-surface text-text-primary rounded-[var(--radius-md)] font-semibold hover:bg-input-background transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                }}
                className="flex-1 px-6 py-3 bg-destructive text-white rounded-[var(--radius-md)] font-semibold hover:bg-destructive/90 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
