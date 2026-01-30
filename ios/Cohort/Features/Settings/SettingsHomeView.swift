//
//  SettingsHomeView.swift
//  Cohort
//

import SwiftUI

struct SettingsHomeView: View {
    var onBack: (() -> Void)? = nil

    var body: some View {
        VStack(spacing: 0) {
            if onBack != nil {
                TopBar(title: "Settings", onBack: onBack!)
            } else {
                TopBar(title: "Settings", variant: .default)
            }
            ScrollView {
                VStack(spacing: 0) {
                    CohortListRow(label: "Account", valueText: "Edit", disclosure: true) {}
                    CohortListRow(label: "Verification", valueText: "Verified", disclosure: true) {}
                    CohortListRow(label: "Subscription", valueText: "Manage", disclosure: true) {}
                    CohortListRow(label: "Privacy", disclosure: true) {}
                    CohortListRow(label: "Notifications", toggleBinding: .constant(true)) {}
                    CohortListRow(label: "Block list", disclosure: true) {}
                    CohortListRow(label: "Safety center", disclosure: true) {}
                    CohortListRow(label: "Terms of Service", disclosure: true) {}
                    CohortListRow(label: "Privacy Policy", disclosure: true) {}
                }
                .padding(CohortSpacing.lg)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    SettingsHomeView(onBack: {})
}
