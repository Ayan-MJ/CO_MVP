//
//  CohortSafety.swift
//  Cohort
//

import SwiftUI

struct CohortSafety: View {
    var onReport: (() -> Void)? = nil
    var onBlock: (() -> Void)? = nil

    var body: some View {
        VStack(spacing: CohortSpacing.sm) {
            if let onReport = onReport {
                Button(action: onReport) {
                    HStack {
                        Image(systemName: "exclamationmark.triangle")
                        Text("Report")
                    }
                    .font(CohortTypography.body())
                    .foregroundColor(CohortColors.warning)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, CohortSpacing.md)
                }
                .buttonStyle(.plain)
            }
            if let onBlock = onBlock {
                Button(action: onBlock) {
                    HStack {
                        Image(systemName: "nosign")
                        Text("Block")
                    }
                    .font(CohortTypography.body())
                    .foregroundColor(CohortColors.destructive)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, CohortSpacing.md)
                }
                .buttonStyle(.plain)
            }
        }
    }
}

#Preview {
    CohortSafety(onReport: {}, onBlock: {})
}
