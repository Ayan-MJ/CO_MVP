//
//  SoftPaywallView.swift
//  Cohort
//

import SwiftUI

struct SoftPaywallView: View {
    var onContinue: () -> Void

    var body: some View {
        VStack(spacing: CohortSpacing.xl) {
            Image(systemName: "sparkles")
                .font(.system(size: 48))
                .foregroundColor(CohortColors.accent)
            Text("Subscription required")
                .font(CohortTypography.title1())
                .foregroundColor(CohortColors.textPrimary)
            Text("Subscribe to unlock weekly curated introductions and start matching.")
                .font(CohortTypography.callout())
                .foregroundColor(CohortColors.textSecondary)
                .multilineTextAlignment(.center)
            CohortButton(title: "Continue", size: .large, action: onContinue)
        }
        .padding(CohortSpacing.xl)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(CohortColors.background)
    }
}

#Preview {
    SoftPaywallView(onContinue: {})
}
