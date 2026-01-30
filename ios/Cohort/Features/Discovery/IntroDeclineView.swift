//
//  IntroDeclineView.swift
//  Cohort
//

import SwiftUI

struct IntroDeclineView: View {
    var onBack: () -> Void
    var onSubmit: (String?) -> Void

    @State private var selectedReason: String?
    private let reasons = [
        "Not my type",
        "Too far",
        "Different life stage",
        "Other",
    ]

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Decline intro", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    Text("Help us improve your matches (optional)")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                    ForEach(reasons, id: \.self) { reason in
                        Button(action: { selectedReason = selectedReason == reason ? nil : reason }) {
                            HStack {
                                Text(reason)
                                    .font(CohortTypography.body())
                                    .foregroundColor(CohortColors.textPrimary)
                                Spacer()
                                if selectedReason == reason {
                                    Image(systemName: "checkmark.circle.fill")
                                        .foregroundColor(CohortColors.accent)
                                }
                            }
                            .padding(CohortSpacing.md)
                            .background(CohortColors.surface)
                            .overlay(
                                RoundedRectangle(cornerRadius: CohortRadius.sm)
                                    .stroke(selectedReason == reason ? CohortColors.accent : CohortColors.divider, lineWidth: 1)
                            )
                            .clipShape(RoundedRectangle(cornerRadius: CohortRadius.sm))
                        }
                        .buttonStyle(.plain)
                    }
                    CohortButton(title: "Submit", action: { onSubmit(selectedReason) })
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    IntroDeclineView(onBack: {}, onSubmit: { _ in })
}
