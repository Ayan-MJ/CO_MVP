//
//  CohortCard.swift
//  Cohort
//

import SwiftUI

struct CohortCard<Content: View>: View {
    var elevated: Bool = false
    var onClick: (() -> Void)? = nil
    @ViewBuilder let content: () -> Content

    var body: some View {
        content()
            .padding(CohortSpacing.lg)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(elevated ? CohortColors.elevatedSurface : CohortColors.surface)
            .overlay(
                RoundedRectangle(cornerRadius: CohortRadius.md)
                    .stroke(CohortColors.divider, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: CohortRadius.md))
            .shadow(color: .black.opacity(elevated ? 0.08 : 0.05), radius: elevated ? 6 : 2, x: 0, y: 1)
            .contentShape(Rectangle())
            .onTapGesture { if onClick != nil { onClick?() } }
    }
}

#Preview {
    CohortCard(elevated: true) {
        Text("Card content")
            .foregroundColor(CohortColors.textPrimary)
    }
    .padding()
}
