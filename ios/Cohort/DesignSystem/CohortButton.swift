//
//  CohortButton.swift
//  Cohort
//

import SwiftUI

struct CohortButton: View {
    enum Variant {
        case primary, secondary, tertiary, destructive
    }
    enum Size {
        case `default`, large
    }
    let title: String
    var variant: Variant = .primary
    var size: Size = .default
    var loading: Bool = false
    var disabled: Bool = false
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: CohortSpacing.sm) {
                if loading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: foregroundColor))
                }
                Text(title)
                    .font(CohortTypography.body())
                    .fontWeight(.semibold)
            }
            .frame(maxWidth: .infinity)
            .frame(height: size == .large ? 56 : 48)
            .padding(.horizontal, size == .large ? CohortSpacing.xxl : CohortSpacing.xl)
            .background(backgroundColor)
            .foregroundColor(foregroundColor)
            .overlay(
                RoundedRectangle(cornerRadius: CohortRadius.sm)
                    .stroke(borderColor, lineWidth: variant == .secondary ? 1 : 0)
            )
            .clipShape(RoundedRectangle(cornerRadius: CohortRadius.sm))
        }
        .disabled(disabled || loading)
        .opacity(disabled || loading ? 0.4 : 1)
    }

    private var backgroundColor: Color {
        switch variant {
        case .primary: return CohortColors.accent
        case .secondary: return Color.clear
        case .tertiary: return Color.clear
        case .destructive: return CohortColors.error
        }
    }

    private var foregroundColor: Color {
        switch variant {
        case .primary, .destructive: return CohortColors.accentForeground
        case .secondary, .tertiary: return CohortColors.textPrimary
        }
    }

    private var borderColor: Color {
        CohortColors.divider
    }
}

#Preview {
    VStack(spacing: 16) {
        CohortButton(title: "Primary", variant: .primary) {}
        CohortButton(title: "Secondary", variant: .secondary) {}
        CohortButton(title: "Loading", loading: true) {}
    }
    .padding()
}
