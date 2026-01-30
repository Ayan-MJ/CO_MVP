//
//  VerificationStatusViews.swift
//  Cohort
//

import SwiftUI

struct VerificationInProgressView: View {
    var body: some View {
        VStack(spacing: CohortSpacing.xl) {
            ProgressView()
                .scaleEffect(1.5)
                .tint(CohortColors.accent)
            Text("Verifying your photo...")
                .font(CohortTypography.title3())
                .foregroundColor(CohortColors.textPrimary)
            Text("This usually takes a few seconds")
                .font(CohortTypography.footnote())
                .foregroundColor(CohortColors.textMuted)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(CohortColors.background)
    }
}

struct VerificationSuccessView: View {
    var onContinue: () -> Void

    var body: some View {
        VStack(spacing: CohortSpacing.xl) {
            Image(systemName: "checkmark.circle.fill")
                .font(.system(size: 64))
                .foregroundColor(CohortColors.success)
            Text("You're verified")
                .font(CohortTypography.title1())
                .foregroundColor(CohortColors.textPrimary)
            Text("You can now complete your profile and start receiving introductions.")
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

struct VerificationFailureView: View {
    let message: String
    var onRetry: () -> Void
    var onBack: () -> Void

    var body: some View {
        VStack(spacing: CohortSpacing.xl) {
            Image(systemName: "xmark.circle.fill")
                .font(.system(size: 64))
                .foregroundColor(CohortColors.error)
            Text("Verification didn't work")
                .font(CohortTypography.title1())
                .foregroundColor(CohortColors.textPrimary)
            Text(message)
                .font(CohortTypography.callout())
                .foregroundColor(CohortColors.textSecondary)
                .multilineTextAlignment(.center)
            CohortButton(title: "Try again", action: onRetry)
            Button("Go back", action: onBack)
                .font(CohortTypography.callout())
                .foregroundColor(CohortColors.accent)
        }
        .padding(CohortSpacing.xl)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(CohortColors.background)
    }
}

struct VerificationManualReviewView: View {
    var onContinue: () -> Void

    var body: some View {
        VStack(spacing: CohortSpacing.xl) {
            Image(systemName: "clock.fill")
                .font(.system(size: 64))
                .foregroundColor(CohortColors.warning)
            Text("Under review")
                .font(CohortTypography.title1())
                .foregroundColor(CohortColors.textPrimary)
            Text("We're manually reviewing your verification. We'll notify you within 24 hours. You can continue setting up your profile.")
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

#Preview("Success") {
    VerificationSuccessView(onContinue: {})
}

#Preview("Failure") {
    VerificationFailureView(message: "We could not verify your photo. Please try again.", onRetry: {}, onBack: {})
}
