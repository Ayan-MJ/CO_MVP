//
//  VoiceSchedulingView.swift
//  Cohort
//

import SwiftUI

struct VoiceSchedulingView: View {
    var onBack: () -> Void
    var onConfirm: () -> Void

    @State private var selectedSlot: String?

    private let slots = ["Sat 2:00 PM", "Sun 10:00 AM", "Sun 4:00 PM"]

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Schedule voice call", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    Text("Propose a 15-min voice slot")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                    ForEach(slots, id: \.self) { slot in
                        Button(action: { selectedSlot = slot }) {
                            HStack {
                                Text(slot)
                                    .font(CohortTypography.body())
                                    .foregroundColor(CohortColors.textPrimary)
                                Spacer()
                                if selectedSlot == slot {
                                    Image(systemName: "checkmark.circle.fill")
                                        .foregroundColor(CohortColors.accent)
                                }
                            }
                            .padding(CohortSpacing.md)
                            .background(CohortColors.surface)
                            .overlay(
                                RoundedRectangle(cornerRadius: CohortRadius.sm)
                                    .stroke(selectedSlot == slot ? CohortColors.accent : CohortColors.divider, lineWidth: 1)
                            )
                            .clipShape(RoundedRectangle(cornerRadius: CohortRadius.sm))
                        }
                        .buttonStyle(.plain)
                    }
                    CohortButton(title: "Send proposal", disabled: selectedSlot == nil, action: onConfirm)
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    VoiceSchedulingView(onBack: {}, onConfirm: {})
}
