//
//  AppState.swift
//  Cohort
//

import Foundation
import SwiftUI

@Observable
final class AppState {
    var appMode: AppMode = .onboarding
    var currentOnboardingStep: OnboardingStep = .welcome
    var selectedMainTab: MainAppTab = .introductions
    var locationData: LocationData?
    var verificationError: String?
    var profilePhotos: [Data] = []
    var profileBasics: [String: String] = [:]
    var profileLifeMap: [String] = []
    var profileSummary: [String: String] = [:]
    var profileNonNegotiables: [String] = []
    var profilePreferences: [String: Any] = [:]
    var selectedIntro: IntroCardData?
    var intros: [IntroCardData] = []
    var selectedMatchId: String?
    var selectedMatchName: String?
}

enum AppMode {
    case onboarding
    case designSystem
    case mainApp
}

struct LocationData {
    let city: String
    let neighborhood: String
    let isWaitlisted: Bool
    let waitlistPosition: Int?
}
