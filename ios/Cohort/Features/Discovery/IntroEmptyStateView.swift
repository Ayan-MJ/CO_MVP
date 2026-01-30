//
//  IntroEmptyStateView.swift
//  Cohort
//

import SwiftUI

enum IntroEmptyKind {
    case notVerified
    case notSubscribed
    case noIntros
}

struct IntroEmptyStateView: View {
    let kind: IntroEmptyKind
    var onRefresh: (() -> Void)? = nil

    var body: some View {
        VStack(spacing: CohortSpacing.xl) {
            Spacer()
            Image(systemName: iconName)
                .font(.system(size: 48))
                .foregroundColor(CohortColors.textMuted)
            Text(title)
                .font(CohortTypography.title3())
                .foregroundColor(CohortColors.textPrimary)
                .multilineTextAlignment(.center)
            Text(subtitle)
                .font(CohortTypography.callout())
                .foregroundColor(CohortColors.textSecondary)
                .multilineTextAlignment(.center)
            if let onRefresh = onRefresh, kind == .noIntros {
                CohortButton(title: "Refresh", variant: .secondary, action: onRefresh)
            }
            Spacer()
        }
        .padding(CohortSpacing.xl)
    }

    private var iconName: String {
        switch kind {
        case .notVerified: return "shield.slash"
        case .notSubscribed: return "lock.fill"
        case .noIntros: return "sparkles"
        }
    }

    private var title: String {
        switch kind {
        case .notVerified: return "Complete verification"
        case .notSubscribed: return "Subscription required"
        case .noIntros: return "No introductions this week"
        }
    }

    private var subtitle: String {
        switch kind {
        case .notVerified: return "Verify your photos to unlock weekly introductions."
        case .notSubscribed: return "Subscribe to receive curated introductions."
        case .noIntros: return "Next batch in a few days. Check back soon."
        }
    }
}

#Preview {
    IntroEmptyStateView(kind: .noIntros, onRefresh: {})
}
