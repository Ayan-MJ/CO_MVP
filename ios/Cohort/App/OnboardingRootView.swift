//
//  OnboardingRootView.swift
//  Cohort
//

import SwiftUI

struct OnboardingRootView: View {
    @Bindable var appState: AppState
    private let verificationService = VerificationService()

    var body: some View {
        Group {
            switch appState.currentOnboardingStep {
            case .welcome:
                WelcomeView(onContinue: { appState.currentOnboardingStep = .citySelection })
            case .citySelection:
                CitySelectionView(
                    onBack: { appState.currentOnboardingStep = .welcome },
                    onContinue: { city, neighborhood, isWaitlisted in
                        appState.locationData = LocationData(
                            city: city,
                            neighborhood: neighborhood,
                            isWaitlisted: isWaitlisted,
                            waitlistPosition: isWaitlisted ? Int.random(in: 20...120) : nil
                        )
                        appState.currentOnboardingStep = isWaitlisted ? .waitlist : .otpLogin
                    }
                )
            case .waitlist:
                WaitlistView(
                    city: appState.locationData?.city ?? "",
                    neighborhood: appState.locationData?.neighborhood ?? "",
                    position: appState.locationData?.waitlistPosition ?? 0,
                    onBack: { appState.currentOnboardingStep = .citySelection },
                    onSubmitCode: { _ in appState.currentOnboardingStep = .otpLogin }
                )
            case .otpLogin:
                OTPLoginView(
                    onBack: { appState.currentOnboardingStep = appState.locationData?.isWaitlisted == true ? .waitlist : .citySelection },
                    onVerified: { appState.currentOnboardingStep = .verificationIntro }
                )
            case .verificationIntro:
                VerificationIntroView(
                    onBack: { appState.currentOnboardingStep = .otpLogin },
                    onStart: { appState.currentOnboardingStep = .verificationCapture }
                )
            case .verificationCapture:
                VerificationCaptureView(
                    onBack: { appState.currentOnboardingStep = .verificationIntro },
                    onPhotoTaken: { data in
                        appState.currentOnboardingStep = .verificationInProgress
                        Task {
                            do {
                                let response = try await verificationService.submitVerificationPhoto(photoData: data)
                                await MainActor.run {
                                    switch response.status {
                                    case .success:
                                        appState.currentOnboardingStep = .verificationSuccess
                                    case .failure:
                                        appState.verificationError = response.message ?? "We could not verify your photo. Please try again."
                                        appState.currentOnboardingStep = .verificationFailure
                                    case .manualReview:
                                        appState.currentOnboardingStep = .verificationManualReview
                                    }
                                }
                            } catch {
                                await MainActor.run {
                                    appState.verificationError = error.localizedDescription
                                    appState.currentOnboardingStep = .verificationFailure
                                }
                            }
                        }
                    }
                )
            case .verificationInProgress:
                VerificationInProgressView()
            case .verificationSuccess:
                VerificationSuccessView(onContinue: { appState.currentOnboardingStep = .softPaywall })
            case .verificationFailure:
                VerificationFailureView(
                    message: appState.verificationError ?? "Verification failed.",
                    onRetry: { appState.currentOnboardingStep = .verificationCapture },
                    onBack: { appState.currentOnboardingStep = .verificationIntro }
                )
            case .verificationManualReview:
                VerificationManualReviewView(onContinue: { appState.currentOnboardingStep = .softPaywall })
            case .softPaywall:
                SoftPaywallView(onContinue: { appState.currentOnboardingStep = .profilePhotos })
            case .profilePhotos:
                PhotoUploadView(
                    onBack: { appState.currentOnboardingStep = .softPaywall },
                    onContinue: { appState.currentOnboardingStep = .profileBasics }
                )
            case .profileBasics:
                BasicsView(
                    onBack: { appState.currentOnboardingStep = .profilePhotos },
                    onContinue: { appState.currentOnboardingStep = .profileLifeMap },
                    name: Binding(get: { appState.profileBasics["name"] ?? "" }, set: { appState.profileBasics["name"] = $0 }),
                    age: Binding(get: { appState.profileBasics["age"] ?? "" }, set: { appState.profileBasics["age"] = $0 }),
                    height: Binding(get: { appState.profileBasics["height"] ?? "" }, set: { appState.profileBasics["height"] = $0 })
                )
            case .profileLifeMap:
                LifeMapView(
                    onBack: { appState.currentOnboardingStep = .profileBasics },
                    onContinue: { appState.currentOnboardingStep = .profileReview },
                    responses: $appState.profileLifeMap
                )
            case .profileReview:
                AISummaryReviewView(
                    onBack: { appState.currentOnboardingStep = .profileLifeMap },
                    onContinue: { appState.currentOnboardingStep = .profileNonNegotiables },
                    summary: Binding(
                        get: { appState.profileSummary },
                        set: { appState.profileSummary = $0 }
                    )
                )
            case .profileNonNegotiables:
                NonNegotiablesView(
                    onBack: { appState.currentOnboardingStep = .profileReview },
                    onContinue: { appState.currentOnboardingStep = .profilePreferences },
                    selected: $appState.profileNonNegotiables
                )
            case .profilePreferences:
                PreferencesView(
                    onBack: { appState.currentOnboardingStep = .profileNonNegotiables },
                    onContinue: { appState.currentOnboardingStep = .profilePreview },
                    ageMin: Binding(get: { (appState.profilePreferences["ageMin"] as? String) ?? "25" }, set: { appState.profilePreferences["ageMin"] = $0 }),
                    ageMax: Binding(get: { (appState.profilePreferences["ageMax"] as? String) ?? "40" }, set: { appState.profilePreferences["ageMax"] = $0 }),
                    distance: Binding(get: { (appState.profilePreferences["distance"] as? String) ?? "25" }, set: { appState.profilePreferences["distance"] = $0 })
                )
            case .profilePreview:
                ProfilePreviewView(
                    onBack: { appState.currentOnboardingStep = .profilePreferences },
                    onComplete: {
                        appState.currentOnboardingStep = .profileComplete
                        appState.appMode = .mainApp
                    },
                    name: appState.profileBasics["name"] ?? "",
                    age: appState.profileBasics["age"] ?? ""
                )
            case .profileComplete:
                MainAppRootView(appState: appState)
            }
        }
    }
}
