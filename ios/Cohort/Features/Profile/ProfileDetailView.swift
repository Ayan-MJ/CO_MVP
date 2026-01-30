//
//  ProfileDetailView.swift
//  Cohort
//

import SwiftUI

struct ProfileDetailView: View {
    let intro: IntroCardData?
    var onBack: () -> Void
    var onAccept: (() -> Void)?
    var onDecline: (() -> Void)?
    var onScheduleVoice: (() -> Void)?
    var onPlanDate: (() -> Void)?

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: intro?.name ?? "Profile", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    if let intro = intro {
                        if let first = intro.photos.first, let url = URL(string: first) {
                            AsyncImage(url: url) { phase in
                                switch phase {
                                case .success(let img):
                                    img.resizable().aspectRatio(contentMode: .fill)
                                default:
                                    Rectangle().fill(CohortColors.surface)
                                }
                            }
                            .frame(height: 400)
                            .clipped()
                        }
                        VStack(alignment: .leading, spacing: CohortSpacing.md) {
                            Text("\(intro.name), \(intro.age)")
                                .font(CohortTypography.title1())
                                .foregroundColor(CohortColors.textPrimary)
                            if let loc = intro.location {
                                Text(loc)
                                    .font(CohortTypography.callout())
                                    .foregroundColor(CohortColors.textSecondary)
                            }
                            if !intro.lifeMapHighlight.isEmpty {
                                Text("\"\(intro.lifeMapHighlight)\"")
                                    .font(CohortTypography.callout())
                                    .italic()
                                    .foregroundColor(CohortColors.textPrimary)
                            }
                            Text("Why this match")
                                .font(CohortTypography.caption())
                                .fontWeight(.semibold)
                                .foregroundColor(CohortColors.textPrimary)
                            ForEach(Array(intro.matchReasons.enumerated()), id: \.offset) { _, r in
                                Text("• \(r)")
                                    .font(CohortTypography.callout())
                                    .foregroundColor(CohortColors.textSecondary)
                            }
                        }
                        .padding(CohortSpacing.lg)
                        if let onAccept = onAccept, let onDecline = onDecline {
                            HStack(spacing: CohortSpacing.md) {
                                CohortButton(title: "Decline", variant: .secondary, action: onDecline)
                                CohortButton(title: "Accept", action: onAccept)
                            }
                        }
                        if let onScheduleVoice = onScheduleVoice {
                            CohortButton(title: "Schedule voice call", action: onScheduleVoice)
                        }
                        if let onPlanDate = onPlanDate {
                            CohortButton(title: "Plan date", variant: .secondary, action: onPlanDate)
                        }
                    }
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    ProfileDetailView(intro: IntroCardData.mockList[0], onBack: {}, onAccept: {}, onDecline: {})
}
