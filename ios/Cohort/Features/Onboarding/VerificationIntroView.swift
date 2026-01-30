//
//  VerificationIntroView.swift
//  Cohort
//

import SwiftUI

struct VerificationIntroView: View {
    var onBack: () -> Void
    var onStart: () -> Void

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Photo Verification", onBack: onBack)
            ScrollView {
                VStack(spacing: CohortSpacing.xl) {
                    Image(systemName: "shield.fill")
                        .font(.system(size: 40))
                        .foregroundColor(CohortColors.accent)
                        .frame(width: 80, height: 80)
                        .background(CohortColors.accentMuted)
                        .clipShape(Circle())
                        .padding(.top, CohortSpacing.lg)

                    Text("Verify your photos")
                        .font(CohortTypography.title1())
                        .foregroundColor(CohortColors.textPrimary)
                    Text("Help us keep Cohort safe and authentic for everyone")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                        .multilineTextAlignment(.center)

                    VStack(alignment: .leading, spacing: CohortSpacing.md) {
                        Text("Why we verify")
                            .font(CohortTypography.callout())
                            .fontWeight(.semibold)
                            .foregroundColor(CohortColors.textPrimary)
                        reasonRow(title: "Build trust", subtitle: "Verified profiles help everyone feel confident they're talking to real people")
                        reasonRow(title: "Prevent catfishing", subtitle: "Verification confirms you are who you say you are")
                        reasonRow(title: "Community standard", subtitle: "All Cohort members are verified before they can send intros")
                    }
                    .padding(CohortSpacing.lg)
                    .background(CohortColors.surface)
                    .overlay(
                        RoundedRectangle(cornerRadius: CohortRadius.md)
                            .stroke(CohortColors.divider, lineWidth: 1)
                    )
                    .clipShape(RoundedRectangle(cornerRadius: CohortRadius.md))

                    CohortButton(title: "Start verification", size: .large, action: onStart)
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }

    private func reasonRow(title: String, subtitle: String) -> some View {
        HStack(alignment: .top, spacing: CohortSpacing.md) {
            Image(systemName: "checkmark.circle.fill")
                .foregroundColor(CohortColors.success)
                .font(.system(size: 16))
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(CohortTypography.callout())
                    .fontWeight(.medium)
                    .foregroundColor(CohortColors.textPrimary)
                Text(subtitle)
                    .font(CohortTypography.footnote())
                    .foregroundColor(CohortColors.textMuted)
            }
        }
    }
}

#Preview {
    VerificationIntroView(onBack: {}, onStart: {})
}
