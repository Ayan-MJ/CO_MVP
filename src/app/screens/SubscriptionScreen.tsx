import React from 'react';
import { ArrowLeft, Crown, Calendar, CreditCard, ExternalLink, CheckCircle, RefreshCw } from 'lucide-react';

interface SubscriptionScreenProps {
  onBack: () => void;
  subscriptionData: {
    status: 'active' | 'expired' | 'none';
    plan?: 'monthly' | 'annual';
    renewalDate?: string;
    price?: string;
  };
  onRestorePurchases: () => void;
  onManageSubscription: () => void;
}

export function SubscriptionScreen({ 
  onBack, 
  subscriptionData, 
  onRestorePurchases,
  onManageSubscription 
}: SubscriptionScreenProps) {
  const [showRestoreSuccess, setShowRestoreSuccess] = React.useState(false);
  const [isRestoring, setIsRestoring] = React.useState(false);

  const handleRestorePurchases = async () => {
    setIsRestoring(true);
    // Simulate restore process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRestoring(false);
    setShowRestoreSuccess(true);
    onRestorePurchases();
    setTimeout(() => setShowRestoreSuccess(false), 3000);
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
          Subscription
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Subscription Status Card */}
        <div className="mx-4 mt-6 mb-6">
          {subscriptionData.status === 'active' ? (
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-[var(--radius-lg)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-[var(--text-title-3)] font-bold text-text-primary">
                    Premium Active
                  </h2>
                  <p className="text-[var(--text-callout)] text-text-secondary capitalize">
                    {subscriptionData.plan} Plan
                  </p>
                </div>
              </div>

              {/* Renewal Info */}
              {subscriptionData.renewalDate && (
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-text-secondary" />
                  <span className="text-[var(--text-callout)] text-text-secondary">
                    Renews {subscriptionData.renewalDate}
                  </span>
                </div>
              )}

              {subscriptionData.price && (
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-text-secondary" />
                  <span className="text-[var(--text-callout)] text-text-secondary">
                    {subscriptionData.price}
                  </span>
                </div>
              )}
            </div>
          ) : subscriptionData.status === 'expired' ? (
            <div className="bg-elevated-surface border border-warning/20 rounded-[var(--radius-lg)] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h2 className="text-[var(--text-title-3)] font-bold text-text-primary">
                    Subscription Expired
                  </h2>
                  <p className="text-[var(--text-callout)] text-text-secondary">
                    Renew to continue premium features
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-elevated-surface border border-divider rounded-[var(--radius-lg)] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
                  <Crown className="w-6 h-6 text-text-muted" />
                </div>
                <div>
                  <h2 className="text-[var(--text-title-3)] font-bold text-text-primary">
                    Free Account
                  </h2>
                  <p className="text-[var(--text-callout)] text-text-secondary">
                    Upgrade to unlock premium features
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Premium Benefits */}
        {subscriptionData.status === 'active' && (
          <div className="mb-6">
            <h3 className="px-4 mb-3 text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide">
              Premium Benefits
            </h3>
            <div className="bg-surface border-y border-divider px-4 py-4">
              <div className="space-y-3">
                {[
                  'Weekly curated introductions',
                  'Voice call coordination',
                  'Date planning templates',
                  'Advanced filters & preferences',
                  'Priority verification',
                  'Unlimited messaging',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-[var(--text-callout)] text-text-primary">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mb-6">
          <h3 className="px-4 mb-3 text-[var(--text-footnote)] font-semibold text-text-secondary uppercase tracking-wide">
            Manage Subscription
          </h3>
          <div className="bg-surface border-y border-divider">
            <button
              onClick={handleRestorePurchases}
              disabled={isRestoring}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-input-background transition-colors border-b border-divider disabled:opacity-50"
            >
              <div className="w-8 h-8 rounded-lg bg-elevated-surface flex items-center justify-center flex-shrink-0">
                <RefreshCw className={`w-4 h-4 text-text-primary ${isRestoring ? 'animate-spin' : ''}`} />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[var(--text-body)] text-text-primary">
                  {isRestoring ? 'Restoring...' : 'Restore Purchases'}
                </span>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  Restore previous subscriptions
                </p>
              </div>
            </button>

            <button
              onClick={onManageSubscription}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-input-background transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-elevated-surface flex items-center justify-center flex-shrink-0">
                <ExternalLink className="w-4 h-4 text-text-primary" />
              </div>
              <div className="flex-1 text-left">
                <span className="text-[var(--text-body)] text-text-primary">
                  Manage via App Store
                </span>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  Update payment or cancel subscription
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Info Note */}
        <div className="mx-4 mb-6 p-4 bg-elevated-surface rounded-[var(--radius-md)] border border-divider">
          <p className="text-[var(--text-callout)] text-text-secondary leading-relaxed">
            Subscriptions are managed through your Apple ID. You can cancel anytime from your App Store settings. Cancellations take effect at the end of the current billing period.
          </p>
        </div>
      </div>

      {/* Restore Success Toast */}
      {showRestoreSuccess && (
        <div className="absolute top-20 left-4 right-4 bg-success text-white px-4 py-3 rounded-[var(--radius-md)] shadow-lg flex items-center gap-3 z-50">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-[var(--text-callout)] font-medium">
            Purchases restored successfully
          </span>
        </div>
      )}
    </div>
  );
}
