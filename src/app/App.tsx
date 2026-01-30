import React from 'react';
import { Settings, Users, Sparkles, Heart } from 'lucide-react';
// Intro flow screens
import { WelcomeScreen } from '@/app/screens/WelcomeScreen';
import { CitySelectionScreen } from '@/app/screens/CitySelectionScreen';
import { WaitlistScreen } from '@/app/screens/WaitlistScreen';
import { OTPLoginScreen } from '@/app/screens/OTPLoginScreen';
import { VerificationIntroScreen } from '@/app/screens/VerificationIntroScreen';
import { VerificationCaptureScreen } from '@/app/screens/VerificationCaptureScreen';
import {
  VerificationInProgressScreen,
  VerificationSuccessScreen,
  VerificationFailureScreen,
  VerificationManualReviewScreen,
} from '@/app/screens/VerificationStatusScreens';
import { SoftPaywallScreen } from '@/app/screens/SoftPaywallScreen';
import { PhotoUploadScreen } from '@/app/screens/profile-setup/PhotoUploadScreen';
import { BasicsScreen } from '@/app/screens/profile-setup/BasicsScreen';
import { LifeMapScreen } from '@/app/screens/profile-setup/LifeMapScreen';
import { AISummaryReviewScreen } from '@/app/screens/profile-setup/AISummaryReviewScreen';
import { NonNegotiablesScreen } from '@/app/screens/profile-setup/NonNegotiablesScreen';
import { PreferencesScreen } from '@/app/screens/profile-setup/PreferencesScreen';
import { ProfilePreviewScreen } from '@/app/screens/profile-setup/ProfilePreviewScreen';
import { DesignSystemShowcase } from '@/app/screens/DesignSystemShowcase';
import { UIKitShowcase } from '@/app/screens/UIKitShowcase';
import { TopBar, BottomTabBar } from '@/app/components/Navigation';
import { IntroHomeScreen } from '@/app/screens/IntroHomeScreen';
import { IntroDetailScreen } from '@/app/screens/IntroDetailScreen';
import { IntroMatchScreen } from '@/app/screens/IntroMatchScreen';
import { IntroEmptyState } from '@/app/screens/IntroEmptyStates';
import { IntroDeclineScreen } from '@/app/screens/IntroDeclineScreen';
import { IntroCardData } from '@/app/components/IntroCard';
// Match management screens
import { MatchesListScreen, MatchData } from '@/app/screens/matches/MatchesListScreen';
import { MatchDetailScreen } from '@/app/screens/matches/MatchDetailScreen';
import { AvailabilitySetupScreen, TimeSlot } from '@/app/screens/matches/AvailabilitySetupScreen';
import { VoiceSchedulingScreen, ProposedTimeSlot } from '@/app/screens/matches/VoiceSchedulingScreen';
import { VoiceSchedulingPendingScreen } from '@/app/screens/matches/VoiceSchedulingPendingScreen';
import { VoiceSchedulingConfirmedScreen } from '@/app/screens/matches/VoiceSchedulingConfirmedScreen';
import { PostVoiceFeedbackScreen } from '@/app/screens/matches/PostVoiceFeedbackScreen';
import { DatePlanningScreen } from '@/app/screens/matches/DatePlanningScreen';
import { RescheduleScreen } from '@/app/screens/matches/RescheduleScreen';
import { MoreTimeSlotsScreen } from '@/app/screens/matches/MoreTimeSlotsScreen';
import { ChatScreen } from '@/app/screens/chat/ChatScreen';
import { ReportBlockSheet } from '@/app/screens/chat/ReportBlockSheet';
import { ProfileDetailScreen, ProfileData } from '@/app/screens/ProfileDetailScreen';
import { SettingsHomeScreen } from '@/app/screens/SettingsHomeScreen';
import { SubscriptionScreen } from '@/app/screens/SubscriptionScreen';
import { VerificationScreen } from '@/app/screens/VerificationScreen';
import { PrivacyScreen } from '@/app/screens/PrivacyScreen';
import { BlockListScreen } from '@/app/screens/BlockListScreen';
import { SafetyCenterScreen } from '@/app/screens/SafetyCenterScreen';
import { LegalScreen } from '@/app/screens/LegalScreen';
import { TermsOfServiceScreen } from '@/app/screens/TermsOfServiceScreen';
import { PrivacyPolicyScreen } from '@/app/screens/PrivacyPolicyScreen';

type OnboardingStep =
  | 'welcome'
  | 'city-selection'
  | 'waitlist'
  | 'otp-login'
  | 'verification-intro'
  | 'verification-capture'
  | 'verification-in-progress'
  | 'verification-success'
  | 'verification-failure'
  | 'verification-manual-review'
  | 'soft-paywall'
  | 'profile-photos'
  | 'profile-basics'
  | 'profile-lifemap'
  | 'profile-review'
  | 'profile-non-negotiables'
  | 'profile-preferences'
  | 'profile-preview'
  | 'profile-complete'
  | 'intro-home'
  | 'intro-detail'
  | 'intro-match'
  | 'intro-decline'
  | 'intro-empty-not-verified'
  | 'intro-empty-not-subscribed'
  | 'intro-empty-no-intros'
  | 'matches-list'
  | 'match-detail'
  | 'match-availability-setup'
  | 'match-voice-scheduling'
  | 'match-voice-pending'
  | 'match-voice-confirmed'
  | 'match-feedback'
  | 'match-date-planning'
  | 'match-reschedule'
  | 'match-more-slots'
  | 'match-chat'
  | 'profile-detail-intro'
  | 'profile-detail-match'
  | 'settings-home'
  | 'settings-subscription'
  | 'settings-verification'
  | 'settings-privacy'
  | 'settings-block-list'
  | 'settings-safety'
  | 'settings-legal'
  | 'settings-terms'
  | 'settings-privacy-policy';

interface LocationData {
  city: string;
  neighborhood: string;
  isWaitlisted: boolean;
  waitlistPosition?: number;
}

type AppMode = 'onboarding' | 'design-system' | 'main-app';

export default function App() {
  const [appMode, setAppMode] = React.useState<AppMode>('onboarding');
  const [currentStep, setCurrentStep] = React.useState<OnboardingStep>('welcome');
  const [activeTab, setActiveTab] = React.useState('design-system');
  const [mainAppTab, setMainAppTab] = React.useState('introductions'); // For main app bottom nav
  const [locationData, setLocationData] = React.useState<LocationData | null>(null);

  // Simulate verification result - in real app, this would be from API
  const [verificationResult] = React.useState<'success' | 'failure' | 'manual-review'>('success');

  // Profile setup data
  const [profilePhotos, setProfilePhotos] = React.useState<any[]>([]);
  const [profileBasics, setProfileBasics] = React.useState<any>({});
  const [profileLifeMap, setProfileLifeMap] = React.useState<any[]>([]);
  const [profileSummary, setProfileSummary] = React.useState<any>({});
  const [profileNonNegotiables, setProfileNonNegotiables] = React.useState<string[]>([]);
  const [profilePreferences, setProfilePreferences] = React.useState<any>({});

  // Intro flow state
  const [selectedIntro, setSelectedIntro] = React.useState<IntroCardData | null>(null);

  // Match management state
  const [selectedMatch, setSelectedMatch] = React.useState<MatchData | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<ProposedTimeSlot | null>(null);
  const [userAvailability, setUserAvailability] = React.useState<TimeSlot[]>([]);
  const [showSafetySheet, setShowSafetySheet] = React.useState<'report' | 'block' | null>(null);

  const handleWelcomeContinue = () => {
    setCurrentStep('city-selection');
  };

  const handleCitySelection = (city: string, neighborhood: string, isWaitlisted: boolean) => {
    const location: LocationData = {
      city,
      neighborhood,
      isWaitlisted,
      waitlistPosition: isWaitlisted ? Math.floor(Math.random() * 100) + 20 : undefined,
    };
    setLocationData(location);

    if (isWaitlisted) {
      setCurrentStep('waitlist');
    } else {
      setCurrentStep('otp-login');
    }
  };

  const handleWaitlistCodeSubmit = (code: string) => {
    console.log('Invite code submitted:', code);
    setCurrentStep('otp-login');
  };

  const handleOTPVerified = () => {
    setCurrentStep('verification-intro');
  };

  const handleStartVerification = () => {
    setCurrentStep('verification-capture');
  };

  const handlePhotoTaken = (photoData: string) => {
    console.log('Photo captured:', photoData);
    setCurrentStep('verification-in-progress');
    
    setTimeout(() => {
      if (verificationResult === 'success') {
        setCurrentStep('verification-success');
      } else if (verificationResult === 'failure') {
        setCurrentStep('verification-failure');
      } else {
        setCurrentStep('verification-manual-review');
      }
    }, 3000);
  };

  const handleVerificationSuccess = () => {
    setCurrentStep('soft-paywall');
  };

  const handleVerificationRetry = () => {
    setCurrentStep('verification-intro');
  };

  const handleSubscribe = () => {
    setCurrentStep('profile-photos');
  };

  const handleBackNavigation = () => {
    const backMap: Partial<Record<OnboardingStep, OnboardingStep>> = {
      'city-selection': 'welcome',
      'waitlist': 'city-selection',
      'otp-login': locationData?.isWaitlisted ? 'waitlist' : 'city-selection',
      'verification-intro': 'otp-login',
      'verification-capture': 'verification-intro',
      'verification-in-progress': 'verification-intro',
      'verification-failure': 'verification-intro',
      'verification-manual-review': 'verification-intro',
      'soft-paywall': 'verification-success',
    };

    const previousStep = backMap[currentStep];
    if (previousStep) {
      setCurrentStep(previousStep);
    }
  };

  const designSystemTabs = [
    {
      id: 'design-system',
      label: 'Design System',
      icon: <Settings className="w-6 h-6" />,
    },
    {
      id: 'ui-kit',
      label: 'UI Kit',
      icon: <Users className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Mode Toggle */}
      <div className="max-w-[393px] mx-auto p-4 bg-surface border-b border-divider">
        <div className="flex gap-2">
          <button
            onClick={() => setAppMode('onboarding')}
            className={`flex-1 px-4 py-2 rounded-[var(--radius-sm)] font-semibold transition-all ${
              appMode === 'onboarding'
                ? 'bg-accent text-accent-foreground'
                : 'bg-input-background text-text-secondary hover:text-text-primary'
            }`}
          >
            Onboarding Flow
          </button>
          <button
            onClick={() => setAppMode('design-system')}
            className={`flex-1 px-4 py-2 rounded-[var(--radius-sm)] font-semibold transition-all ${
              appMode === 'design-system'
                ? 'bg-accent text-accent-foreground'
                : 'bg-input-background text-text-secondary hover:text-text-primary'
            }`}
          >
            Design System
          </button>
        </div>
      </div>

      {/* iPhone 15 Pro Container */}
      <div className="max-w-[393px] mx-auto h-[852px] bg-background overflow-hidden">
        {appMode === 'onboarding' ? (
          <>
            {currentStep === 'welcome' && (
              <WelcomeScreen onContinue={handleWelcomeContinue} />
            )}

            {currentStep === 'city-selection' && (
              <CitySelectionScreen
                onBack={handleBackNavigation}
                onContinue={handleCitySelection}
              />
            )}

            {currentStep === 'waitlist' && locationData && (
              <WaitlistScreen
                city={locationData.city}
                neighborhood={locationData.neighborhood}
                position={locationData.waitlistPosition || 0}
                onBack={handleBackNavigation}
                onSubmitCode={handleWaitlistCodeSubmit}
              />
            )}

            {currentStep === 'otp-login' && (
              <OTPLoginScreen
                onBack={handleBackNavigation}
                onVerified={handleOTPVerified}
              />
            )}

            {currentStep === 'verification-intro' && (
              <VerificationIntroScreen
                onBack={handleBackNavigation}
                onStart={handleStartVerification}
              />
            )}

            {currentStep === 'verification-capture' && (
              <VerificationCaptureScreen
                onBack={handleBackNavigation}
                onPhotoTaken={handlePhotoTaken}
              />
            )}

            {currentStep === 'verification-in-progress' && (
              <VerificationInProgressScreen onBack={handleBackNavigation} />
            )}

            {currentStep === 'verification-success' && (
              <VerificationSuccessScreen onContinue={handleVerificationSuccess} />
            )}

            {currentStep === 'verification-failure' && (
              <VerificationFailureScreen
                onRetry={handleVerificationRetry}
                onSupport={() => console.log('Contact support')}
              />
            )}

            {currentStep === 'verification-manual-review' && (
              <VerificationManualReviewScreen onBack={handleBackNavigation} />
            )}

            {currentStep === 'soft-paywall' && (
              <SoftPaywallScreen
                onBack={handleBackNavigation}
                onSubscribe={handleSubscribe}
                onSkip={handleSubscribe}
              />
            )}

            {currentStep === 'profile-photos' && (
              <PhotoUploadScreen
                onBack={handleBackNavigation}
                onContinue={(photos) => {
                  setProfilePhotos(photos);
                  setCurrentStep('profile-basics');
                }}
                initialPhotos={profilePhotos}
              />
            )}

            {currentStep === 'profile-basics' && (
              <BasicsScreen
                onBack={handleBackNavigation}
                onContinue={(basics) => {
                  setProfileBasics(basics);
                  setCurrentStep('profile-lifemap');
                }}
                initialData={profileBasics}
              />
            )}

            {currentStep === 'profile-lifemap' && (
              <LifeMapScreen
                onBack={handleBackNavigation}
                onContinue={(answers) => {
                  setProfileLifeMap(answers);
                  setCurrentStep('profile-review');
                }}
                initialAnswers={profileLifeMap}
              />
            )}

            {currentStep === 'profile-review' && (
              <AISummaryReviewScreen
                onBack={handleBackNavigation}
                onContinue={(summary) => {
                  setProfileSummary(summary);
                  setCurrentStep('profile-non-negotiables');
                }}
                promptAnswers={profileLifeMap}
              />
            )}

            {currentStep === 'profile-non-negotiables' && (
              <NonNegotiablesScreen
                onBack={handleBackNavigation}
                onContinue={(selected) => {
                  setProfileNonNegotiables(selected);
                  setCurrentStep('profile-preferences');
                }}
                initialSelected={profileNonNegotiables}
              />
            )}

            {currentStep === 'profile-preferences' && (
              <PreferencesScreen
                onBack={handleBackNavigation}
                onContinue={(prefs) => {
                  setProfilePreferences(prefs);
                  setCurrentStep('profile-preview');
                }}
                initialData={profilePreferences}
              />
            )}

            {currentStep === 'profile-preview' && (
              <ProfilePreviewScreen
                onBack={handleBackNavigation}
                onComplete={() => setCurrentStep('profile-complete')}
                onEdit={(section) => {
                  // Map section to appropriate screen
                  const sectionMap: Record<string, OnboardingStep> = {
                    photos: 'profile-photos',
                    basics: 'profile-basics',
                    bio: 'profile-review',
                    personality: 'profile-review',
                    lifestyle: 'profile-review',
                    values: 'profile-review',
                    interests: 'profile-review',
                  };
                  const targetStep = sectionMap[section];
                  if (targetStep) setCurrentStep(targetStep);
                }}
                profileData={{
                  name: profileBasics.name || 'Alex',
                  age: profileBasics.age || '28',
                  location: `${locationData?.city || 'San Francisco'}, ${locationData?.neighborhood || 'SoMa'}`,
                  photos: profilePhotos.map((p) => p.url),
                  bio: profileSummary.bio || 'Creative professional looking for meaningful connection.',
                  personality: profileSummary.personality || [],
                  lifestyle: profileSummary.lifestyle || [],
                  values: profileSummary.values || [],
                  interests: profileSummary.interests || [],
                  education: profileBasics.education,
                  occupation: profileBasics.occupation,
                  height: profileBasics.height,
                }}
              />
            )}

            {currentStep === 'profile-complete' && (
              <div className="flex flex-col items-center justify-center h-full bg-background p-6">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-accent" />
                  </div>
                  <h1 className="text-[var(--text-title-1)] font-bold text-text-primary mb-3">
                    You're All Set!
                  </h1>
                  <p className="text-[var(--text-callout)] text-text-secondary mb-6">
                    Your profile is complete. Start receiving curated introductions every week.
                  </p>
                  <button
                    onClick={() => {
                      setAppMode('main-app');
                      setMainAppTab('introductions');
                    }}
                    className="w-full px-6 py-4 bg-accent text-white rounded-[var(--radius-md)] font-semibold hover:bg-accent/90 transition-colors"
                  >
                    Enter Cohort
                  </button>
                </div>
              </div>
            )}

            {/* Intro Screens */}
            {currentStep === 'intro-home' && (
              <IntroHomeScreen
                onIntroClick={(intro) => {
                  setSelectedIntro(intro);
                  setCurrentStep('intro-detail');
                }}
              />
            )}

            {currentStep === 'intro-detail' && selectedIntro && (
              <IntroDetailScreen
                intro={selectedIntro}
                onBack={() => setCurrentStep('intro-home')}
                onAccept={(introId) => {
                  console.log('Accepted intro:', introId);
                  setCurrentStep('intro-match');
                }}
                onDecline={(introId) => {
                  setCurrentStep('intro-decline');
                }}
              />
            )}

            {currentStep === 'intro-match' && selectedIntro && (
              <IntroMatchScreen
                intro={selectedIntro}
                onBack={() => setCurrentStep('intro-detail')}
                onStartConversation={() => {
                  console.log('Starting conversation with:', selectedIntro.name);
                  // In real app, would navigate to messages
                  setCurrentStep('intro-home');
                }}
              />
            )}

            {currentStep === 'intro-decline' && selectedIntro && (
              <IntroDeclineScreen
                introName={selectedIntro.name}
                onBack={() => setCurrentStep('intro-detail')}
                onConfirm={(reason) => {
                  console.log('Declined with reason:', reason);
                  setCurrentStep('intro-home');
                }}
              />
            )}

            {currentStep === 'intro-empty-not-verified' && (
              <IntroEmptyState
                type="not-verified"
                onAction={() => setCurrentStep('verification-intro')}
              />
            )}

            {currentStep === 'intro-empty-not-subscribed' && (
              <IntroEmptyState
                type="not-subscribed"
                onAction={() => setCurrentStep('soft-paywall')}
              />
            )}

            {currentStep === 'intro-empty-no-intros' && (
              <IntroEmptyState
                type="no-intros"
                onAction={() => setCurrentStep('profile-photos')}
              />
            )}

            {/* Match Management Screens */}
            {currentStep === 'matches-list' && (
              <MatchesListScreen
                onMatchClick={(match) => {
                  setSelectedMatch(match);
                  setCurrentStep('match-detail');
                }}
              />
            )}

            {currentStep === 'match-detail' && selectedMatch && (
              <MatchDetailScreen
                match={selectedMatch}
                onBack={() => setCurrentStep('matches-list')}
                onScheduleVoice={() => {
                  if (userAvailability.length === 0) {
                    setCurrentStep('match-availability-setup');
                  } else {
                    setCurrentStep('match-voice-scheduling');
                  }
                }}
                onSetAvailability={() => setCurrentStep('match-availability-setup')}
                onShareFeedback={() => setCurrentStep('match-feedback')}
                onPlanDate={() => {
                  setCurrentStep('match-date-planning');
                }}
                onViewSchedule={() => setCurrentStep('match-voice-confirmed')}
                onOpenChat={() => setCurrentStep('match-chat')}
              />
            )}

            {currentStep === 'match-availability-setup' && selectedMatch && (
              <AvailabilitySetupScreen
                onBack={() => setCurrentStep('match-detail')}
                onContinue={(availability) => {
                  setUserAvailability(availability);
                  setCurrentStep('match-voice-scheduling');
                }}
                matchName={selectedMatch.name}
              />
            )}

            {currentStep === 'match-voice-scheduling' && selectedMatch && (
              <VoiceSchedulingScreen
                matchName={selectedMatch.name}
                matchPhoto={selectedMatch.photo}
                onBack={() => setCurrentStep('match-detail')}
                onSelectSlot={(slot) => {
                  setSelectedTimeSlot(slot);
                  setCurrentStep('match-voice-pending');
                }}
                onNeedMoreOptions={() => {
                  setCurrentStep('match-more-slots');
                }}
              />
            )}

            {currentStep === 'match-voice-pending' && selectedMatch && selectedTimeSlot && (
              <VoiceSchedulingPendingScreen
                matchName={selectedMatch.name}
                matchPhoto={selectedMatch.photo}
                proposedTime={selectedTimeSlot.label}
                onBack={() => setCurrentStep('match-voice-scheduling')}
                onCancel={() => {
                  setSelectedTimeSlot(null);
                  setCurrentStep('match-detail');
                }}
                onAutoConfirm={() => setCurrentStep('match-voice-confirmed')}
              />
            )}

            {currentStep === 'match-voice-confirmed' && selectedMatch && selectedTimeSlot && (
              <VoiceSchedulingConfirmedScreen
                matchName={selectedMatch.name}
                matchPhoto={selectedMatch.photo}
                scheduledDate={selectedTimeSlot.date}
                onBack={() => setCurrentStep('match-detail')}
                onReschedule={() => setCurrentStep('match-reschedule')}
                onCancel={() => {
                  setSelectedTimeSlot(null);
                  setCurrentStep('match-detail');
                }}
                onAddToCalendar={() => {
                  console.log('Add to calendar clicked');
                }}
              />
            )}

            {currentStep === 'match-feedback' && selectedMatch && (
              <PostVoiceFeedbackScreen
                matchName={selectedMatch.name}
                matchPhoto={selectedMatch.photo}
                onBack={() => setCurrentStep('match-detail')}
                onSubmitFeedback={(rating, notes) => {
                  console.log('Feedback submitted:', rating, notes);
                  // If positive feedback, unlock date planning
                  if (rating === 'great' || rating === 'good') {
                    setCurrentStep('match-date-planning');
                  } else {
                    setCurrentStep('matches-list');
                  }
                }}
                isLocked={selectedMatch.status !== 'voice-done'}
              />
            )}

            {currentStep === 'match-date-planning' && selectedMatch && (
              <DatePlanningScreen
                matchName={selectedMatch.name}
                matchPhoto={selectedMatch.photo}
                onBack={() => setCurrentStep('match-detail')}
                onSelectDateIdea={(idea) => {
                  console.log('Selected date idea:', idea);
                  setCurrentStep('matches-list');
                }}
                onProposeCustomDate={() => {
                  console.log('Propose custom date');
                  setCurrentStep('matches-list');
                }}
              />
            )}

            {currentStep === 'match-reschedule' && selectedMatch && selectedTimeSlot && (
              <RescheduleScreen
                matchName={selectedMatch.name}
                matchPhoto={selectedMatch.photo}
                currentScheduledDate={selectedTimeSlot.date}
                onBack={() => setCurrentStep('match-voice-confirmed')}
                onSelectNewSlot={(slot) => {
                  setSelectedTimeSlot(slot);
                  setCurrentStep('match-voice-confirmed');
                }}
                onCancelCall={() => {
                  setSelectedTimeSlot(null);
                  setCurrentStep('match-detail');
                }}
              />
            )}

            {currentStep === 'match-more-slots' && selectedMatch && (
              <MoreTimeSlotsScreen
                matchName={selectedMatch.name}
                matchPhoto={selectedMatch.photo}
                onBack={() => setCurrentStep('match-voice-scheduling')}
                onSelectSlot={(slot) => {
                  setSelectedTimeSlot(slot);
                  setCurrentStep('match-voice-pending');
                }}
                onUpdateAvailability={() => setCurrentStep('match-availability-setup')}
              />
            )}

            {currentStep === 'match-chat' && selectedMatch && (
              <ChatScreen
                matchName={selectedMatch.name}
                matchPhoto={selectedMatch.photo}
                matchStatus={selectedMatch.status}
                messagesRemaining={15}
                onBack={() => setCurrentStep('match-detail')}
                onProposeVoiceSlots={() => {
                  if (userAvailability.length === 0) {
                    setCurrentStep('match-availability-setup');
                  } else {
                    setCurrentStep('match-voice-scheduling');
                  }
                }}
                onChooseDateTemplate={() => setCurrentStep('match-date-planning')}
                onReport={() => setShowSafetySheet('report')}
                onBlock={() => setShowSafetySheet('block')}
              />
            )}

            {/* Safety Sheet */}
            {showSafetySheet && selectedMatch && (
              <ReportBlockSheet
                matchName={selectedMatch.name}
                type={showSafetySheet}
                onClose={() => setShowSafetySheet(null)}
                onConfirm={(reason) => {
                  console.log(`${showSafetySheet} action:`, reason);
                  setShowSafetySheet(null);
                  if (showSafetySheet === 'block') {
                    setCurrentStep('matches-list');
                  }
                }}
              />
            )}

            {/* Profile Detail Screens */}
            {currentStep === 'profile-detail-intro' && (
              <ProfileDetailScreen
                profile={{
                  id: 'user-profile-1',
                  name: 'Elena',
                  age: 29,
                  photos: [
                    'https://images.unsplash.com/photo-1666980226747-bf29624ae485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
                    'https://images.unsplash.com/photo-1758598304332-94b40ce7c7b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc2OTc1Mzc3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
                  ],
                  location: 'San Francisco, Mission District',
                  verified: true,
                  occupation: 'Product Designer at Stripe',
                  education: 'Stanford University',
                  height: '5\'7"',
                  bio: 'I\'m a designer who loves solving complex problems with simple, elegant solutions. Outside of work, you\'ll find me exploring SF\'s food scene, practicing yoga, or working on my ceramics practice.',
                  lifeMap: {
                    timeline: [
                      { label: 'Kids timeline', value: 'Want children in 3-5 years' },
                      { label: 'Open to relocation', value: 'Open to moving for the right person' },
                      { label: 'Current life stage', value: 'Building career, ready for partnership' },
                    ],
                    lifestyle: [
                      { category: 'Drinks', value: 'Socially' },
                      { category: 'Smoking', value: 'Never' },
                      { category: 'Exercise', value: '3-4x per week' },
                      { category: 'Diet', value: 'Flexitarian' },
                    ],
                  },
                  values: [
                    { name: 'Emotional intelligence', importance: 'essential' },
                    { name: 'Curiosity', importance: 'essential' },
                    { name: 'Authenticity', importance: 'essential' },
                    { name: 'Personal growth', importance: 'important' },
                    { name: 'Creativity', importance: 'important' },
                    { name: 'Sustainability', importance: 'flexible' },
                  ],
                  conflictStyle: {
                    primary: 'Collaborative problem-solver',
                    description: 'I believe in addressing issues directly but compassionately. I value open communication and finding solutions that work for both people.',
                  },
                  nonNegotiables: [
                    'Wants children eventually',
                    'Emotional availability and self-awareness',
                    'Shared values around honesty and growth',
                    'Respect for work-life balance',
                  ],
                  matchReasons: {
                    compatibilityScore: 91,
                    reasons: [
                      'Both prioritize emotional intelligence and open communication',
                      'Aligned timeline for children (both want kids in 3-5 years)',
                      'Shared love for SF food scene and cultural exploration',
                      'Complementary working styles: both value deep work + collaboration',
                    ],
                    watchOuts: [
                      'Different exercise routines (she prefers yoga, you prefer running)',
                      'Discuss ideal weekend balance of social vs. alone time',
                    ],
                  },
                }}
                context="intro"
                onBack={() => setCurrentStep('intro-home')}
                onAccept={() => {
                  console.log('Accepted intro from profile detail');
                  setCurrentStep('intro-match');
                }}
                onDecline={() => setCurrentStep('intro-decline')}
                onReport={() => setShowSafetySheet('report')}
                onBlock={() => setShowSafetySheet('block')}
              />
            )}

            {currentStep === 'profile-detail-match' && (
              <ProfileDetailScreen
                profile={{
                  id: 'user-profile-2',
                  name: 'Marcus',
                  age: 32,
                  photos: [
                    'https://images.unsplash.com/photo-1758599543126-59e3154d7195?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMG91dGRvb3JzfGVufDF8fHx8MTc2OTc2OTAzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
                  ],
                  location: 'San Francisco, Pacific Heights',
                  verified: true,
                  reliabilityScore: {
                    responseRate: 94,
                    punctuality: 'excellent',
                    feedbackRating: 4.8,
                  },
                  occupation: 'Engineering Manager at Figma',
                  education: 'UC Berkeley',
                  height: '6\'1"',
                  bio: 'Engineering leader passionate about building great teams and products. I value deep conversations, outdoor adventures, and finding balance between ambition and presence.',
                  lifeMap: {
                    timeline: [
                      { label: 'Kids timeline', value: 'Open to children, timing flexible' },
                      { label: 'Open to relocation', value: 'Prefer to stay in SF/Bay Area' },
                      { label: 'Current life stage', value: 'Established career, seeking life partner' },
                    ],
                    lifestyle: [
                      { category: 'Drinks', value: 'Occasionally' },
                      { category: 'Smoking', value: 'Never' },
                      { category: 'Exercise', value: '5-6x per week' },
                      { category: 'Diet', value: 'No restrictions' },
                    ],
                  },
                  values: [
                    { name: 'Authenticity', importance: 'essential' },
                    { name: 'Partnership', importance: 'essential' },
                    { name: 'Growth mindset', importance: 'important' },
                    { name: 'Adventure', importance: 'important' },
                    { name: 'Humor', importance: 'flexible' },
                  ],
                  conflictStyle: {
                    primary: 'Direct but thoughtful',
                    description: 'I prefer addressing things head-on with kindness. I need time to process, but I always come back to the conversation.',
                  },
                  nonNegotiables: [
                    'Mutual respect and equal partnership',
                    'Active lifestyle and health consciousness',
                    'Open communication and emotional maturity',
                  ],
                  matchReasons: {
                    compatibilityScore: 88,
                    reasons: [
                      'Both value partnership and seeing relationships as teamwork',
                      'Match on core values: authenticity, growth, curiosity',
                      'Complementary strengths: your creativity + his analytical mindset',
                      'Shared commitment to health and active lifestyles',
                    ],
                    watchOuts: [
                      'Different perspectives on ideal kids timeline',
                      'His location preference (wants to stay in Bay Area long-term)',
                    ],
                  },
                }}
                context="match"
                matchStatus="voice-done"
                onBack={() => setCurrentStep('matches-list')}
                onScheduleVoice={() => setCurrentStep('match-availability-setup')}
                onPlanDate={() => setCurrentStep('match-date-planning')}
                onReport={() => setShowSafetySheet('report')}
                onBlock={() => setShowSafetySheet('block')}
              />
            )}

            {/* Settings Screens */}
            {currentStep === 'settings-home' && (
              <SettingsHomeScreen
                onBack={() => setCurrentStep('intro-home')}
                onNavigate={(screen) => {
                  const screenMap: Record<string, OnboardingStep> = {
                    'account-info': 'profile-basics',
                    'verification': 'settings-verification',
                    'subscription': 'settings-subscription',
                    'privacy': 'settings-privacy',
                    'safety': 'settings-safety',
                    'notifications': 'intro-home', // Placeholder
                    'help': 'intro-home', // Placeholder
                    'legal': 'settings-legal',
                  };
                  const targetStep = screenMap[screen] as OnboardingStep;
                  if (targetStep) setCurrentStep(targetStep);
                }}
                onLogout={() => {
                  console.log('Logged out');
                  setCurrentStep('welcome');
                }}
                userInfo={{
                  name: profileBasics.name || 'Alex Chen',
                  email: 'alex.chen@email.com',
                  isVerified: true,
                  subscriptionStatus: 'active',
                }}
              />
            )}

            {currentStep === 'settings-subscription' && (
              <SubscriptionScreen
                onBack={() => setCurrentStep('settings-home')}
                subscriptionData={{
                  status: 'active',
                  plan: 'monthly',
                  renewalDate: 'February 15, 2026',
                  price: '$29.99/month',
                }}
                onRestorePurchases={() => console.log('Restore purchases')}
                onManageSubscription={() => console.log('Manage via App Store')}
              />
            )}

            {currentStep === 'settings-verification' && (
              <VerificationScreen
                onBack={() => setCurrentStep('settings-home')}
                verificationStatus={{
                  status: 'verified',
                  submittedDate: 'January 20, 2026',
                }}
                onStartVerification={() => setCurrentStep('verification-capture')}
                onRetryVerification={() => setCurrentStep('verification-capture')}
                onContactSupport={() => console.log('Contact support')}
              />
            )}

            {currentStep === 'settings-privacy' && (
              <PrivacyScreen
                onBack={() => setCurrentStep('settings-home')}
                onNavigateToBlockList={() => setCurrentStep('settings-block-list')}
                onRequestDataDownload={() => console.log('Data download requested')}
                onDeleteAccount={() => {
                  console.log('Account deleted');
                  setCurrentStep('welcome');
                }}
                blockedUsersCount={2}
              />
            )}

            {currentStep === 'settings-block-list' && (
              <BlockListScreen
                onBack={() => setCurrentStep('settings-privacy')}
                blockedUsers={[
                  {
                    id: 'blocked-1',
                    name: 'Jason',
                    age: 31,
                    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njk3NjkwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
                    blockedDate: '2 days ago',
                  },
                  {
                    id: 'blocked-2',
                    name: 'Michael',
                    age: 28,
                    photo: 'https://images.unsplash.com/photo-1758599543126-59e3154d7195?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMG91dGRvb3JzfGVufDF8fHx8MTc2OTc2OTAzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
                    blockedDate: '1 week ago',
                  },
                ]}
                onUnblockUser={(userId) => console.log('Unblocked:', userId)}
              />
            )}

            {currentStep === 'settings-safety' && (
              <SafetyCenterScreen
                onBack={() => setCurrentStep('settings-home')}
                onNavigateToBlockList={() => setCurrentStep('settings-block-list')}
                blockedUsersCount={2}
              />
            )}

            {currentStep === 'settings-legal' && (
              <LegalScreen
                onBack={() => setCurrentStep('settings-home')}
                onNavigate={(screen) => {
                  if (screen === 'terms') setCurrentStep('settings-terms');
                  if (screen === 'privacy') setCurrentStep('settings-privacy-policy');
                }}
              />
            )}

            {currentStep === 'settings-terms' && (
              <TermsOfServiceScreen
                onBack={() => setCurrentStep('settings-legal')}
              />
            )}

            {currentStep === 'settings-privacy-policy' && (
              <PrivacyPolicyScreen
                onBack={() => setCurrentStep('settings-legal')}
              />
            )}

            {/* Debug Navigation */}
            <div className="absolute bottom-0 left-0 right-0 max-w-[393px] mx-auto bg-surface border-t border-divider p-3">
              <p className="text-[var(--text-caption)] text-text-muted mb-2">
                Current: {currentStep}
              </p>
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setCurrentStep('welcome')}
                  className="px-2 py-1 text-[10px] bg-accent-muted rounded text-accent"
                >
                  Welcome
                </button>
                <button
                  onClick={() => setCurrentStep('city-selection')}
                  className="px-2 py-1 text-[10px] bg-accent-muted rounded text-accent"
                >
                  City
                </button>
                <button
                  onClick={() => {
                    setLocationData({ city: 'SF', neighborhood: 'SoMa', isWaitlisted: true, waitlistPosition: 45 });
                    setCurrentStep('waitlist');
                  }}
                  className="px-2 py-1 text-[10px] bg-accent-muted rounded text-accent"
                >
                  Waitlist
                </button>
                <button
                  onClick={() => setCurrentStep('otp-login')}
                  className="px-2 py-1 text-[10px] bg-accent-muted rounded text-accent"
                >
                  OTP
                </button>
                <button
                  onClick={() => setCurrentStep('verification-capture')}
                  className="px-2 py-1 text-[10px] bg-accent-muted rounded text-accent"
                >
                  Camera
                </button>
                <button
                  onClick={() => setCurrentStep('soft-paywall')}
                  className="px-2 py-1 text-[10px] bg-accent-muted rounded text-accent"
                >
                  Paywall
                </button>
                <button
                  onClick={() => setCurrentStep('profile-photos')}
                  className="px-2 py-1 text-[10px] bg-success/20 rounded text-success font-semibold"
                >
                  Profile
                </button>
                <button
                  onClick={() => setCurrentStep('profile-preview')}
                  className="px-2 py-1 text-[10px] bg-success/20 rounded text-success font-semibold"
                >
                  Preview
                </button>
                <button
                  onClick={() => setCurrentStep('intro-home')}
                  className="px-2 py-1 text-[10px] bg-accent/20 rounded text-accent font-semibold"
                >
                  Intros
                </button>
                <button
                  onClick={() => setCurrentStep('intro-empty-not-verified')}
                  className="px-2 py-1 text-[10px] bg-warning/20 rounded text-warning"
                >
                  Empty
                </button>
                <button
                  onClick={() => setCurrentStep('matches-list')}
                  className="px-2 py-1 text-[10px] bg-success/20 rounded text-success font-semibold"
                >
                  Matches
                </button>
                <button
                  onClick={() => {
                    // Set up a mock match for the chat
                    setSelectedMatch({
                      id: 'match-1',
                      userId: 'user-1',
                      name: 'Sophie',
                      age: 29,
                      photo: 'https://images.unsplash.com/photo-1758598304332-94b40ce7c7b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc2OTc1Mzc3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
                      status: 'accepted',
                      matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
                      compatibilityScore: 94,
                      topMatchReasons: ['Both value intentional relationships'],
                      actionNeeded: 'Schedule your intro voice call',
                      daysUntilExpiry: 6,
                    });
                    setCurrentStep('match-chat');
                  }}
                  className="px-2 py-1 text-[10px] bg-accent/20 rounded text-accent font-semibold"
                >
                  Chat
                </button>
                <button
                  onClick={() => setCurrentStep('profile-detail-intro')}
                  className="px-2 py-1 text-[10px] bg-accent/20 rounded text-accent font-semibold"
                >
                  Profile (Intro)
                </button>
                <button
                  onClick={() => setCurrentStep('profile-detail-match')}
                  className="px-2 py-1 text-[10px] bg-success/20 rounded text-success font-semibold"
                >
                  Profile (Match)
                </button>
                <button
                  onClick={() => setCurrentStep('settings-home')}
                  className="px-2 py-1 text-[10px] bg-warning/20 rounded text-warning font-semibold"
                >
                  Settings
                </button>
              </div>
            </div>
          </>
        ) : appMode === 'main-app' ? (
          <>
            {/* Main App with Bottom Tabs */}
            <div className="h-full flex flex-col relative">
              {/* Content Area */}
              <div className="flex-1 overflow-hidden">
                {mainAppTab === 'introductions' && (
                  <IntroHomeScreen
                    onIntroClick={(intro) => {
                      setSelectedIntro(intro);
                      setCurrentStep('intro-detail');
                      setAppMode('onboarding'); // Temporarily switch to onboarding mode for detail view
                    }}
                  />
                )}

                {mainAppTab === 'matches' && (
                  <MatchesListScreen
                    onMatchClick={(match) => {
                      setSelectedMatch(match);
                      setCurrentStep('match-detail');
                      setAppMode('onboarding'); // Temporarily switch to onboarding mode for detail view
                    }}
                  />
                )}
              </div>

              {/* Bottom Tab Bar */}
              <div className="absolute bottom-0 left-0 right-0">
                <BottomTabBar
                  tabs={[
                    {
                      id: 'introductions',
                      label: 'Introductions',
                      icon: <Sparkles className="w-6 h-6" />,
                      badge: 3,
                    },
                    {
                      id: 'matches',
                      label: 'Matches',
                      icon: <Heart className="w-6 h-6" />,
                      badge: 2,
                    },
                  ]}
                  activeTab={mainAppTab}
                  onTabChange={setMainAppTab}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <TopBar title={activeTab === 'design-system' ? 'Design System' : 'UI Kit'} />
            
            <div className="h-[calc(852px-56px-80px)] overflow-y-auto">
              {activeTab === 'design-system' ? (
                <DesignSystemShowcase />
              ) : (
                <UIKitShowcase />
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 max-w-[393px] mx-auto">
              <BottomTabBar
                tabs={designSystemTabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}