//
//  CohortIntroCard.swift
//  Cohort
//

import SwiftUI

struct CohortIntroCard: View {
    let intro: IntroCardData
    let onClick: () -> Void

    private var hoursLeft: Int {
        max(0, Calendar.current.dateComponents([.hour], from: Date(), to: intro.expiresAt).hour ?? 0)
    }

    var body: some View {
        Button(action: onClick) {
            VStack(alignment: .leading, spacing: 0) {
                photoSection
                contentSection
            }
            .background(CohortColors.surface)
            .overlay(
                RoundedRectangle(cornerRadius: CohortRadius.lg)
                    .stroke(CohortColors.divider, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: CohortRadius.lg))
        }
        .buttonStyle(.plain)
    }

    private var photoSection: some View {
        ZStack(alignment: .bottomLeading) {
            if let first = intro.photos.first, let url = URL(string: first) {
                AsyncImage(url: url) { phase in
                    switch phase {
                    case .success(let img): img.resizable().aspectRatio(contentMode: .fill)
                    default: Rectangle().fill(CohortColors.surface)
                    }
                }
                .frame(height: 320)
                .clipped()
            } else {
                Rectangle()
                    .fill(CohortColors.surface)
                    .frame(height: 320)
            }
            LinearGradient(colors: [.clear, .black.opacity(0.8)], startPoint: .top, endPoint: .bottom)
                .frame(height: 320)
            VStack(alignment: .leading, spacing: 4) {
                Text("\(intro.name), \(intro.age)")
                    .font(CohortTypography.title2())
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                HStack(spacing: 4) {
                    ForEach(0..<5, id: \.self) { i in
                        Circle()
                            .fill(i < (intro.trustScore / 20) ? CohortColors.accent : Color.white.opacity(0.3))
                            .frame(width: 4, height: 4)
                    }
                    Text("\(intro.trustScore)% match")
                        .font(CohortTypography.caption())
                        .foregroundColor(.white.opacity(0.8))
                }
                if hoursLeft < 24 {
                    Text("\(hoursLeft)h left")
                        .font(CohortTypography.caption())
                        .fontWeight(.medium)
                        .foregroundColor(CohortColors.accent)
                }
            }
            .padding(CohortSpacing.md)
            if intro.verified {
                VStack {
                    HStack {
                        Circle().fill(CohortColors.success).frame(width: 6, height: 6)
                        Text("Verified").font(CohortTypography.caption()).fontWeight(.medium).foregroundColor(.white)
                    }
                    .padding(.horizontal, 8).padding(.vertical, 4)
                    .background(Color.black.opacity(0.6))
                    .clipShape(Capsule())
                    Spacer()
                }
                .frame(maxWidth: .infinity, alignment: .trailing)
                .padding(CohortSpacing.md)
            }
        }
        .frame(height: 320)
    }

    private var contentSection: some View {
        VStack(alignment: .leading, spacing: CohortSpacing.md) {
            if !intro.lifeMapHighlight.isEmpty {
                Text("\"\(intro.lifeMapHighlight)\"")
                    .font(CohortTypography.callout())
                    .italic()
                    .foregroundColor(CohortColors.textPrimary)
                    .padding(CohortSpacing.md)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .background(CohortColors.accent.opacity(0.05))
                    .overlay(
                        RoundedRectangle(cornerRadius: CohortRadius.sm)
                            .stroke(CohortColors.accent.opacity(0.1), lineWidth: 1)
                    )
                    .clipShape(RoundedRectangle(cornerRadius: CohortRadius.sm))
            }
            VStack(alignment: .leading, spacing: CohortSpacing.sm) {
                Text("WHY THIS MATCH")
                    .font(CohortTypography.caption())
                    .fontWeight(.semibold)
                    .foregroundColor(CohortColors.textPrimary)
                ForEach(Array(intro.matchReasons.prefix(3).enumerated()), id: \.offset) { _, r in
                    HStack(alignment: .top, spacing: CohortSpacing.sm) {
                        Circle().fill(CohortColors.accent).frame(width: 4, height: 4).padding(.top, 6)
                        Text(r).font(CohortTypography.callout()).foregroundColor(CohortColors.textSecondary)
                    }
                }
            }
            if !intro.watchOuts.isEmpty {
                VStack(alignment: .leading, spacing: CohortSpacing.sm) {
                    Text("CONSIDER")
                        .font(CohortTypography.caption())
                        .fontWeight(.semibold)
                        .foregroundColor(CohortColors.textPrimary)
                    ForEach(Array(intro.watchOuts.prefix(2).enumerated()), id: \.offset) { _, w in
                        HStack(alignment: .top, spacing: CohortSpacing.sm) {
                            Circle().fill(CohortColors.warning).frame(width: 4, height: 4).padding(.top, 6)
                            Text(w).font(CohortTypography.callout()).foregroundColor(CohortColors.textSecondary)
                        }
                    }
                }
            }
            HStack {
                Text("View full profile")
                    .font(CohortTypography.callout())
                    .fontWeight(.medium)
                    .foregroundColor(CohortColors.accent)
                Spacer()
                Image(systemName: "chevron.right")
                    .font(.system(size: 14, weight: .medium))
                    .foregroundColor(CohortColors.accent)
            }
            .padding(.top, CohortSpacing.sm)
        }
        .padding(CohortSpacing.lg)
    }
}

#Preview {
    CohortIntroCard(
        intro: IntroCardData(
            id: "1",
            userId: "u1",
            name: "Sophie",
            age: 29,
            photos: [],
            lifeMapHighlight: "Building a life where Sunday mornings are for farmers markets",
            matchReasons: ["Aligned on LTR", "Shared values", "Similar communication"],
            watchOuts: ["May need advance planning"],
            trustScore: 94,
            verified: true,
            expiresAt: Date().addingTimeInterval(3600 * 48)
        ),
        onClick: {}
    )
    .padding()
}
