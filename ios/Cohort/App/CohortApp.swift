//
//  CohortApp.swift
//  Cohort
//

import SwiftUI

@main
struct CohortApp: App {
    @State private var appState = AppState()

    var body: some Scene {
        WindowGroup {
            RootView(appState: appState)
        }
    }
}

struct RootView: View {
    @Bindable var appState: AppState

    var body: some View {
        Group {
            switch appState.appMode {
            case .onboarding:
                OnboardingRootView(appState: appState)
            case .designSystem:
                DesignSystemShowcaseView()
            case .mainApp:
                MainAppRootView(appState: appState)
            }
        }
        .preferredColorScheme(nil)
    }
}

struct MainAppRootView: View {
    @Bindable var appState: AppState

    var body: some View {
        TabView(selection: $appState.selectedMainTab) {
            introductionsTab
            matchesTab
            profileTab
        }
        .overlay(alignment: .bottom) {
            BottomTabBar(
                tabs: [
                    TabItem(id: MainAppTab.introductions.rawValue, label: "Introductions", systemImage: "sparkles"),
                    TabItem(id: MainAppTab.matches.rawValue, label: "Matches", systemImage: "heart.fill"),
                    TabItem(id: MainAppTab.profile.rawValue, label: "Profile", systemImage: "person"),
                ],
                selectedTabId: Binding(
                    get: { appState.selectedMainTab.rawValue },
                    set: { appState.selectedMainTab = MainAppTab(rawValue: $0) ?? .introductions }
                )
            )
        }
        .padding(.bottom, 80)
    }

    private var introductionsTab: some View {
        Group {
            if let intro = appState.selectedIntro {
                IntroDetailView(
                    intro: intro,
                    onBack: { appState.selectedIntro = nil },
                    onAccept: {
                        appState.intros.removeAll { $0.id == intro.id }
                        appState.selectedIntro = nil
                    },
                    onDecline: {
                        appState.intros.removeAll { $0.id == intro.id }
                        appState.selectedIntro = nil
                    }
                )
            } else {
                IntroHomeView(appState: appState)
            }
        }
        .tag(MainAppTab.introductions)
    }

    private var matchesTab: some View {
        Group {
            if let matchId = appState.selectedMatchId, let matchName = appState.selectedMatchName {
                MatchDetailView(
                    matchId: matchId,
                    matchName: matchName,
                    onBack: {
                        appState.selectedMatchId = nil
                        appState.selectedMatchName = nil
                    },
                    onScheduleVoice: { /* could push VoiceSchedulingView */ },
                    onOpenChat: { /* could push ChatView */ }
                )
            } else {
                MatchesListView(onSelectMatch: { id, name in
                    appState.selectedMatchId = id
                    appState.selectedMatchName = name
                })
            }
        }
        .tag(MainAppTab.matches)
    }

    private var profileTab: some View {
        SettingsHomeView(onBack: {})
            .tag(MainAppTab.profile)
    }
}

struct MatchesListPlaceholderView: View {
    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Matches", variant: .default)
            Spacer()
            Text("Your matches will appear here")
                .font(CohortTypography.callout())
                .foregroundColor(CohortColors.textMuted)
            Spacer()
        }
        .background(CohortColors.background)
    }
}
