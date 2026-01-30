//
//  CohortChip.swift
//  Cohort
//

import SwiftUI

struct CohortChip: View {
    let label: String
    var selected: Bool = false
    var variant: Variant = .default
    var onRemove: (() -> Void)? = nil
    let onSelect: () -> Void

    enum Variant {
        case `default`, dealbreaker
    }

    var body: some View {
        Button(action: onSelect) {
            HStack(spacing: CohortSpacing.sm) {
                Text(label)
                    .font(CohortTypography.callout())
                    .fontWeight(.medium)
                if onRemove != nil {
                    Image(systemName: "xmark")
                        .font(.system(size: 12, weight: .medium))
                        .onTapGesture { onRemove?() }
                }
            }
            .padding(.horizontal, CohortSpacing.lg)
            .frame(height: 36)
            .background(backgroundColor)
            .foregroundColor(foregroundColor)
            .overlay(
                RoundedRectangle(cornerRadius: 18)
                    .stroke(borderColor, lineWidth: 1)
            )
            .clipShape(Capsule())
        }
        .buttonStyle(.plain)
    }

    private var backgroundColor: Color {
        switch variant {
        case .default:
            return selected ? CohortColors.accent : CohortColors.surface
        case .dealbreaker:
            return selected ? CohortColors.error.opacity(0.2) : CohortColors.surface
        }
    }

    private var foregroundColor: Color {
        switch variant {
        case .default:
            return selected ? CohortColors.accentForeground : CohortColors.textSecondary
        case .dealbreaker:
            return selected ? CohortColors.error : CohortColors.textSecondary
        }
    }

    private var borderColor: Color {
        switch variant {
        case .default:
            return selected ? CohortColors.accent : CohortColors.divider
        case .dealbreaker:
            return selected ? CohortColors.error.opacity(0.4) : CohortColors.divider
        }
    }
}

#Preview {
    HStack {
        CohortChip(label: "Selected", selected: true) {}
        CohortChip(label: "Dealbreaker", selected: true, variant: .dealbreaker) {}
    }
    .padding()
}
