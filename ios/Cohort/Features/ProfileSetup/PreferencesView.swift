//
//  PreferencesView.swift
//  Cohort
//

import SwiftUI

struct PreferencesView: View {
    var onBack: () -> Void
    var onContinue: () -> Void
    @Binding var ageMin: String
    @Binding var ageMax: String
    @Binding var distance: String

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Preferences", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    Text("Age range")
                        .font(CohortTypography.callout())
                        .fontWeight(.medium)
                        .foregroundColor(CohortColors.textPrimary)
                    HStack(spacing: CohortSpacing.md) {
                        CohortInput(placeholder: "Min", text: $ageMin)
                        Text("–")
                            .foregroundColor(CohortColors.textMuted)
                        CohortInput(placeholder: "Max", text: $ageMax)
                    }
                    CohortInput(label: "Max distance (miles)", placeholder: "e.g. 25", text: $distance)
                    CohortButton(title: "Continue", action: onContinue)
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    PreferencesView(onBack: {}, onContinue: {}, ageMin: .constant("25"), ageMax: .constant("40"), distance: .constant("25"))
}
