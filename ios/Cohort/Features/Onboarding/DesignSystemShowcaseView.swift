//
//  DesignSystemShowcaseView.swift
//  Cohort
//
//  Validates theme + core components (Phase 1 output).
//

import SwiftUI

struct DesignSystemShowcaseView: View {
    @State private var otpValue = ""
    @State private var ratingValue = 3
    @State private var toggleOn = true

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                Text("Cohort Design System")
                    .font(CohortTypography.largeTitle())
                    .foregroundColor(CohortColors.textPrimary)

                Group {
                    Text("Buttons")
                        .font(CohortTypography.title2())
                        .foregroundColor(CohortColors.textPrimary)
                    CohortButton(title: "Primary", variant: .primary) {}
                    CohortButton(title: "Secondary", variant: .secondary) {}
                    CohortButton(title: "Tertiary", variant: .tertiary) {}
                    CohortButton(title: "Destructive", variant: .destructive) {}
                    CohortButton(title: "Loading", loading: true) {}
                }

                Group {
                    Text("Card")
                        .font(CohortTypography.title2())
                        .foregroundColor(CohortColors.textPrimary)
                    CohortCard(elevated: true) {
                        Text("Elevated card content")
                            .foregroundColor(CohortColors.textPrimary)
                    }
                }

                Group {
                    Text("Chips")
                        .font(CohortTypography.title2())
                        .foregroundColor(CohortColors.textPrimary)
                    HStack {
                        CohortChip(label: "Selected", selected: true) {}
                        CohortChip(label: "Default") {}
                        CohortChip(label: "Dealbreaker", selected: true, variant: .dealbreaker) {}
                    }
                }

                Group {
                    Text("Input & OTP")
                        .font(CohortTypography.title2())
                        .foregroundColor(CohortColors.textPrimary)
                    CohortInput(label: "Email", placeholder: "you@example.com", text: .constant(""))
                    CohortOTPInput(length: 6, value: $otpValue)
                }

                Group {
                    Text("List rows")
                        .font(CohortTypography.title2())
                        .foregroundColor(CohortColors.textPrimary)
                    VStack(spacing: 0) {
                        CohortListRow(label: "Account", valueText: "Edit", disclosure: true) {}
                        CohortListRow(label: "Notifications", toggleBinding: $toggleOn) {}
                    }
                }

                Group {
                    Text("Top bar & Tabs")
                        .font(CohortTypography.title2())
                        .foregroundColor(CohortColors.textPrimary)
                    TopBar(title: "Settings", onBack: {})
                    BottomTabBar(
                        tabs: [
                            TabItem(id: "intros", label: "Introductions", systemImage: "sparkles"),
                            TabItem(id: "matches", label: "Matches", systemImage: "heart.fill"),
                            TabItem(id: "profile", label: "Profile", systemImage: "person"),
                        ],
                        selectedTabId: .constant("intros")
                    )
                }

                Group {
                    Text("Avatar & Rating")
                        .font(CohortTypography.title2())
                        .foregroundColor(CohortColors.textPrimary)
                    HStack {
                        CohortAvatar(size: 64)
                        CohortRating(max: 5, value: $ratingValue, label: "Chemistry")
                    }
                }

                Group {
                    Text("Safety")
                        .font(CohortTypography.title2())
                        .foregroundColor(CohortColors.textPrimary)
                    CohortSafety(onReport: {}, onBlock: {})
                }
            }
            .padding(CohortSpacing.xl)
        }
        .background(CohortColors.background)
    }
}

#Preview {
    DesignSystemShowcaseView()
}
