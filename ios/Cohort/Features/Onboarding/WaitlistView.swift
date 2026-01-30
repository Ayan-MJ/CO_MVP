//
//  WaitlistView.swift
//  Cohort
//

import SwiftUI

struct WaitlistView: View {
    let city: String
    let neighborhood: String
    let position: Int
    var onBack: () -> Void
    var onSubmitCode: (String) -> Void

    @State private var inviteCode = ""
    @State private var codeError = ""
    private let referralLink = "cohort.app/r/abc123"

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Waitlist", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    Text("You're on the list")
                        .font(CohortTypography.title1())
                        .foregroundColor(CohortColors.textPrimary)
                    Text("\(neighborhood), \(city)")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                    Text("We're opening spots in waves. You'll get an invite when it's your turn. Invite code can speed this up.")
                        .font(CohortTypography.footnote())
                        .foregroundColor(CohortColors.textMuted)

                    CohortInput(
                        label: "Have an invite code?",
                        placeholder: "Enter code",
                        text: $inviteCode,
                        error: codeError.isEmpty ? nil : codeError
                    )
                    .onChange(of: inviteCode) { _, _ in codeError = "" }

                    CohortButton(title: "Submit code", variant: .secondary, action: {
                        if inviteCode.trimmingCharacters(in: .whitespaces).isEmpty {
                            codeError = "Please enter an invite code"
                            return
                        }
                        onSubmitCode(inviteCode.trimmingCharacters(in: .whitespaces))
                    })

                    Text("Share your referral link to move up")
                        .font(CohortTypography.callout())
                        .fontWeight(.medium)
                        .foregroundColor(CohortColors.textPrimary)
                    Text(referralLink)
                        .font(CohortTypography.footnote())
                        .foregroundColor(CohortColors.accent)
                    CohortButton(title: "Copy link", variant: .tertiary, action: {
                        UIPasteboard.general.string = referralLink
                    })
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    WaitlistView(city: "New York City", neighborhood: "Chelsea", position: 120, onBack: {}, onSubmitCode: { _ in })
}
