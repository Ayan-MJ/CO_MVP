//
//  WelcomeView.swift
//  Cohort
//

import SwiftUI

struct WelcomeView: View {
    var onContinue: () -> Void

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                VStack(alignment: .leading, spacing: CohortSpacing.lg) {
                    Image(systemName: "heart.fill")
                        .font(.system(size: 32))
                        .foregroundColor(CohortColors.accentForeground)
                        .frame(width: 64, height: 64)
                        .background(CohortColors.accent)
                        .clipShape(Circle())
                    Text("Cohort")
                        .font(CohortTypography.largeTitle())
                        .foregroundColor(CohortColors.textPrimary)
                    Text("Intentional dating for serious relationships")
                        .font(CohortTypography.title3())
                        .foregroundColor(CohortColors.textSecondary)
                }
                .padding(.top, 64)
                .padding(.bottom, CohortSpacing.xxl)

                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    valueRow(icon: "person.3.fill", title: "3 curated introductions weekly", subtitle: "Quality over quantity. We match you with compatible people in your city.")
                    valueRow(icon: "shield.fill", title: "Verified members only", subtitle: "Every member is photo-verified for authenticity and safety.")
                    valueRow(icon: "heart.fill", title: "Built for real connection", subtitle: "No endless swiping. Focus on meaningful conversations with compatible matches.")
                }
                .padding(.vertical, CohortSpacing.xxl)

                CohortCard(elevated: false, onClick: nil) {
                    Text("Trusted by thousands of professionals seeking long-term relationships")
                        .font(CohortTypography.caption())
                        .foregroundColor(CohortColors.textMuted)
                        .multilineTextAlignment(.center)
                        .frame(maxWidth: .infinity)
                }
                .padding(.bottom, CohortSpacing.xl)

                CohortButton(title: "Get Started", size: .large, action: onContinue)
            }
            .padding(CohortSpacing.xl)
        }
        .background(CohortColors.background)
    }

    private func valueRow(icon: String, title: String, subtitle: String) -> some View {
        HStack(alignment: .top, spacing: CohortSpacing.lg) {
            Image(systemName: icon)
                .font(.system(size: 20))
                .foregroundColor(CohortColors.accent)
                .frame(width: 40, height: 40)
                .background(CohortColors.accentMuted)
                .clipShape(Circle())
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(CohortTypography.callout())
                    .fontWeight(.semibold)
                    .foregroundColor(CohortColors.textPrimary)
                Text(subtitle)
                    .font(CohortTypography.footnote())
                    .foregroundColor(CohortColors.textMuted)
            }
        }
    }
}

#Preview {
    WelcomeView(onContinue: {})
}
