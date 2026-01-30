//
//  DatePlanningView.swift
//  Cohort
//

import SwiftUI

struct DatePlanningView: View {
    var onBack: () -> Void
    var onConfirm: () -> Void

    @State private var selectedTemplate: String?

    private let templates = ["Coffee", "Walk", "Casual dinner", "Museum + coffee"]

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Plan date", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    Text("Choose a date template")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                    ForEach(templates, id: \.self) { t in
                        Button(action: { selectedTemplate = t }) {
                            HStack {
                                Text(t)
                                    .font(CohortTypography.body())
                                    .foregroundColor(CohortColors.textPrimary)
                                Spacer()
                                if selectedTemplate == t {
                                    Image(systemName: "checkmark.circle.fill")
                                        .foregroundColor(CohortColors.accent)
                                }
                            }
                            .padding(CohortSpacing.md)
                            .background(CohortColors.surface)
                            .overlay(
                                RoundedRectangle(cornerRadius: CohortRadius.sm)
                                    .stroke(selectedTemplate == t ? CohortColors.accent : CohortColors.divider, lineWidth: 1)
                            )
                            .clipShape(RoundedRectangle(cornerRadius: CohortRadius.sm))
                        }
                        .buttonStyle(.plain)
                    }
                    CohortButton(title: "Confirm", disabled: selectedTemplate == nil, action: onConfirm)
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    DatePlanningView(onBack: {}, onConfirm: {})
}
