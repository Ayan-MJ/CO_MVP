//
//  IntroDetailView.swift
//  Cohort
//

import SwiftUI

struct IntroDetailView: View {
    let intro: IntroCardData
    var onBack: () -> Void
    var onAccept: () -> Void
    var onDecline: () -> Void

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: intro.name, onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
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
                            HStack(alignment: .top, spacing: CohortSpacing.sm) {
                                Circle().fill(CohortColors.accent).frame(width: 4, height: 4).padding(.top, 6)
                                Text(r).font(CohortTypography.callout()).foregroundColor(CohortColors.textSecondary)
                            }
                        }
                        if !intro.watchOuts.isEmpty {
                            Text("Consider")
                                .font(CohortTypography.caption())
                                .fontWeight(.semibold)
                                .foregroundColor(CohortColors.textPrimary)
                            ForEach(Array(intro.watchOuts.enumerated()), id: \.offset) { _, w in
                                HStack(alignment: .top, spacing: CohortSpacing.sm) {
                                    Circle().fill(CohortColors.warning).frame(width: 4, height: 4).padding(.top, 6)
                                    Text(w).font(CohortTypography.callout()).foregroundColor(CohortColors.textSecondary)
                                }
                            }
                        }
                    }
                    .padding(CohortSpacing.lg)
                    HStack(spacing: CohortSpacing.md) {
                        CohortButton(title: "Decline", variant: .secondary, action: onDecline)
                        CohortButton(title: "Accept", variant: .primary, action: onAccept)
                    }
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    IntroDetailView(
        intro: IntroCardData.mockList[0],
        onBack: {},
        onAccept: {},
        onDecline: {}
    )
}
