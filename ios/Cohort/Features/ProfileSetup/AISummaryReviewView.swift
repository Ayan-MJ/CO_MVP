//
//  AISummaryReviewView.swift
//  Cohort
//

import SwiftUI

struct AISummaryReviewView: View {
    var onBack: () -> Void
    var onContinue: () -> Void
    @Binding var summary: [String: String]

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Review summary", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    Text("We've extracted the following from your Life Map. Edit if needed.")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                    ForEach(Array(summary.keys.sorted()), id: \.self) { key in
                        VStack(alignment: .leading, spacing: CohortSpacing.sm) {
                            Text(key)
                                .font(CohortTypography.caption())
                                .fontWeight(.semibold)
                                .foregroundColor(CohortColors.textMuted)
                            Text(summary[key] ?? "")
                                .font(CohortTypography.body())
                                .foregroundColor(CohortColors.textPrimary)
                        }
                    }
                    CohortButton(title: "Continue", action: onContinue)
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
        .onAppear {
            if summary.isEmpty {
                summary = ["Intent": "LTR", "Kids": "Open", "Conflict style": "Direct"]
            }
        }
    }
}

#Preview {
    AISummaryReviewView(onBack: {}, onContinue: {}, summary: .constant([:]))
}
