//
//  CohortListRow.swift
//  Cohort
//

import SwiftUI

struct CohortListRow: View {
    let label: String
    var valueText: String? = nil
    var icon: String? = nil
    var disclosure: Bool = false
    var toggleBinding: Binding<Bool>? = nil
    var onClick: (() -> Void)? = nil

    var body: some View {
        Button(action: { onClick?() }) {
            HStack(spacing: CohortSpacing.md) {
                if let icon = icon {
                    Image(systemName: icon)
                        .foregroundColor(CohortColors.textSecondary)
                }
                Text(label)
                    .font(CohortTypography.body())
                    .foregroundColor(CohortColors.textPrimary)
                    .frame(maxWidth: .infinity, alignment: .leading)
                if let valueText = valueText {
                    Text(valueText)
                        .font(CohortTypography.body())
                        .foregroundColor(CohortColors.textMuted)
                }
                if let binding = toggleBinding {
                    Toggle("", isOn: binding)
                        .labelsHidden()
                        .tint(CohortColors.accent)
                }
                if disclosure {
                    Image(systemName: "chevron.right")
                        .font(.system(size: 14, weight: .medium))
                        .foregroundColor(CohortColors.textMuted)
                }
            }
            .padding(.horizontal, CohortSpacing.lg)
            .padding(.vertical, CohortSpacing.md)
            .background(CohortColors.surface)
        }
        .buttonStyle(.plain)
    }
}

#Preview {
    VStack(spacing: 0) {
        CohortListRow(label: "Account", valueText: "Edit", disclosure: true) {}
        CohortListRow(label: "Notifications", toggleBinding: .constant(true)) {}
    }
}
