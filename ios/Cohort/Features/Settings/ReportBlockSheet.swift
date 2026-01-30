//
//  ReportBlockSheet.swift
//  Cohort
//

import SwiftUI

struct ReportBlockSheet: View {
    var onDismiss: () -> Void
    var onReport: () -> Void
    var onBlock: () -> Void

    var body: some View {
        VStack(spacing: CohortSpacing.xl) {
            Text("Report or block")
                .font(CohortTypography.title3())
                .foregroundColor(CohortColors.textPrimary)
            CohortSafety(onReport: {
                onReport()
                onDismiss()
            }, onBlock: {
                onBlock()
                onDismiss()
            })
            CohortButton(title: "Cancel", variant: .tertiary, action: onDismiss)
        }
        .padding(CohortSpacing.xl)
    }
}

#Preview {
    ReportBlockSheet(onDismiss: {}, onReport: {}, onBlock: {})
}
