//
//  LifeMapView.swift
//  Cohort
//

import SwiftUI

struct LifeMapView: View {
    var onBack: () -> Void
    var onContinue: () -> Void
    @Binding var responses: [String]

    private let prompts = [
        "What are you building toward in the next 2 years?",
        "Kids and marriage timeline?",
        "What are your non-negotiables in a partner?",
        "How do you handle conflict?",
    ]

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Life Map", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    Text("Answer a few prompts so we can match you better.")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                    ForEach(Array(prompts.enumerated()), id: \.offset) { i, prompt in
                        VStack(alignment: .leading, spacing: CohortSpacing.sm) {
                            Text(prompt)
                                .font(CohortTypography.callout())
                                .fontWeight(.medium)
                                .foregroundColor(CohortColors.textPrimary)
                            TextField("Your answer", text: binding(for: i), axis: .vertical)
                                .lineLimit(3...6)
                                .padding(CohortSpacing.md)
                                .background(CohortColors.inputBackground)
                                .overlay(
                                    RoundedRectangle(cornerRadius: CohortRadius.sm)
                                        .stroke(CohortColors.divider, lineWidth: 1)
                                )
                                .clipShape(RoundedRectangle(cornerRadius: CohortRadius.sm))
                        }
                    }
                    CohortButton(title: "Continue", action: onContinue)
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
        .onAppear {
            if responses.count < prompts.count {
                responses = Array(repeating: "", count: prompts.count)
            }
        }
    }

    private func binding(for index: Int) -> Binding<String> {
        Binding(
            get: { index < responses.count ? responses[index] : "" },
            set: { new in
                if index < responses.count { responses[index] = new }
                else if index == responses.count { responses.append(new) }
            }
        )
    }
}

#Preview {
    LifeMapView(onBack: {}, onContinue: {}, responses: .constant([]))
}
