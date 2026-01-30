//
//  CohortRating.swift
//  Cohort
//

import SwiftUI

struct CohortRating: View {
    let max: Int
    @Binding var value: Int
    var label: String? = nil

    var body: some View {
        VStack(alignment: .leading, spacing: CohortSpacing.sm) {
            if let label = label {
                Text(label)
                    .font(CohortTypography.callout())
                    .fontWeight(.medium)
                    .foregroundColor(CohortColors.textPrimary)
            }
            HStack(spacing: CohortSpacing.sm) {
                ForEach(1...max, id: \.self) { i in
                    Button(action: { value = i }) {
                        Image(systemName: i <= value ? "star.fill" : "star")
                            .font(.system(size: 28))
                            .foregroundColor(i <= value ? CohortColors.accent : CohortColors.textMuted)
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }
}

#Preview {
    CohortRating(max: 5, value: .constant(3), label: "Chemistry")
}
