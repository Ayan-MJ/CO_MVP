//
//  ProfilePreviewView.swift
//  Cohort
//

import SwiftUI

struct ProfilePreviewView: View {
    var onBack: () -> Void
    var onComplete: () -> Void
    let name: String
    let age: String

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Profile preview", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    Text("This is what others will see")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                    CohortCard(elevated: true, onClick: nil) {
                        VStack(alignment: .leading, spacing: CohortSpacing.md) {
                            HStack {
                                CohortAvatar(size: 64)
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(name.isEmpty ? "Your name" : name)
                                        .font(CohortTypography.title3())
                                        .foregroundColor(CohortColors.textPrimary)
                                    if !age.isEmpty {
                                        Text("\(age) years old")
                                            .font(CohortTypography.footnote())
                                            .foregroundColor(CohortColors.textMuted)
                                    }
                                }
                                Spacer()
                            }
                            Text("Verified")
                                .font(CohortTypography.caption())
                                .foregroundColor(CohortColors.success)
                        }
                    }
                    CohortButton(title: "Complete setup", size: .large, action: onComplete)
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    ProfilePreviewView(onBack: {}, onComplete: {}, name: "Alex", age: "30")
}
