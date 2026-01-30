//
//  IntroHomeView.swift
//  Cohort
//

import SwiftUI

struct IntroHomeView: View {
    @Bindable var appState: AppState
    private let introService = IntroService()

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Introductions", variant: .default)
            if appState.intros.isEmpty {
                IntroEmptyStateView(
                    kind: .noIntros,
                    onRefresh: loadIntros
                )
            } else {
                ScrollView {
                    VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                        Text("This week's introductions")
                            .font(CohortTypography.title2())
                            .foregroundColor(CohortColors.textPrimary)
                        ForEach(appState.intros) { intro in
                            CohortIntroCard(intro: intro) {
                                appState.selectedIntro = intro
                            }
                        }
                    }
                    .padding(CohortSpacing.xl)
                }
            }
        }
        .background(CohortColors.background)
        .onAppear { loadIntros() }
    }

    private func loadIntros() {
        Task {
            do {
                let list = try await introService.fetchIntros()
                await MainActor.run { appState.intros = list }
            } catch {
                await MainActor.run { appState.intros = [] }
            }
        }
    }
}

#Preview {
    IntroHomeView(appState: AppState())
}
