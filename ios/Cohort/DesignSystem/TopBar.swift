//
//  TopBar.swift
//  Cohort
//

import SwiftUI

struct TopBar: View {
    var title: String? = nil
    var variant: Variant = .default
    var onBack: (() -> Void)? = nil

    enum Variant { case `default`, transparent }

    var body: some View {
        HStack(spacing: 0) {
            if onBack != nil {
                Button(action: { onBack?() }) {
                    Image(systemName: "chevron.left")
                        .font(.system(size: 18, weight: .medium))
                        .foregroundColor(CohortColors.accent)
                }
                .frame(width: 44, alignment: .leading)
            }

            if let title = title {
                Text(title)
                    .font(CohortTypography.body())
                    .fontWeight(.semibold)
                    .foregroundColor(CohortColors.textPrimary)
            }

            Spacer(minLength: 44)
        }
        .frame(height: 56)
        .padding(.horizontal, CohortSpacing.lg)
        .background(variant == .transparent ? Color.clear : CohortColors.surface)
        .overlay(
            Rectangle()
                .frame(height: 1)
                .foregroundColor(variant == .transparent ? Color.clear : CohortColors.divider),
            alignment: .bottom
        )
    }
}

#Preview {
    TopBar(title: "Settings", onBack: {})
}
