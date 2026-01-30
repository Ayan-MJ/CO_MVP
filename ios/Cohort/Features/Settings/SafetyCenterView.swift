//
//  SafetyCenterView.swift
//  Cohort
//

import SwiftUI

struct SafetyCenterView: View {
    var onBack: () -> Void

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Safety center", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    Text("Reporting guidelines")
                        .font(CohortTypography.title3())
                        .foregroundColor(CohortColors.textPrimary)
                    Text("If you see harassment, scam, misrepresentation, hate, or off-platform coercion, report it. We review high-severity reports within 24 hours.")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                    Text("Blocked users")
                        .font(CohortTypography.title3())
                        .foregroundColor(CohortColors.textPrimary)
                    Text("Blocked users cannot message you or see your profile.")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                    Text("Safety check-in")
                        .font(CohortTypography.title3())
                        .foregroundColor(CohortColors.textPrimary)
                    Text("After a scheduled date time, we may prompt you to confirm you're safe. This is not an emergency service.")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    SafetyCenterView(onBack: {})
}
