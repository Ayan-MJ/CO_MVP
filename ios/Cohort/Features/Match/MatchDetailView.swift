//
//  MatchDetailView.swift
//  Cohort
//

import SwiftUI

struct MatchDetailView: View {
    let matchId: String
    let matchName: String
    var onBack: () -> Void
    var onScheduleVoice: () -> Void
    var onOpenChat: () -> Void

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: matchName, onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    HStack {
                        CohortAvatar(size: 80)
                        VStack(alignment: .leading, spacing: 4) {
                            Text(matchName)
                                .font(CohortTypography.title2())
                                .foregroundColor(CohortColors.textPrimary)
                            Text("Voice call pending")
                                .font(CohortTypography.footnote())
                                .foregroundColor(CohortColors.textMuted)
                        }
                        Spacer()
                    }
                    .padding(CohortSpacing.lg)
                    .background(CohortColors.surface)
                    .overlay(
                        RoundedRectangle(cornerRadius: CohortRadius.md)
                            .stroke(CohortColors.divider, lineWidth: 1)
                    )
                    .clipShape(RoundedRectangle(cornerRadius: CohortRadius.md))
                    CohortButton(title: "Schedule voice call", action: onScheduleVoice)
                    CohortButton(title: "Open chat", variant: .secondary, action: onOpenChat)
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    MatchDetailView(matchId: "m1", matchName: "Sophie", onBack: {}, onScheduleVoice: {}, onOpenChat: {})
}
