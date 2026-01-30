//
//  OnboardingStep.swift
//  Cohort
//

import Foundation

enum OnboardingStep: String, CaseIterable {
    case welcome
    case citySelection
    case waitlist
    case otpLogin
    case verificationIntro
    case verificationCapture
    case verificationInProgress
    case verificationSuccess
    case verificationFailure
    case verificationManualReview
    case softPaywall
    case profilePhotos
    case profileBasics
    case profileLifeMap
    case profileReview
    case profileNonNegotiables
    case profilePreferences
    case profilePreview
    case profileComplete
}

enum MainAppTab: String, CaseIterable {
    case introductions
    case matches
    case profile
}
