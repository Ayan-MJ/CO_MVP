//
//  BottomTabBar.swift
//  Cohort
//

import SwiftUI

struct TabItem: Identifiable {
    let id: String
    let label: String
    let systemImage: String
    var badge: Int? = nil
}

struct BottomTabBar: View {
    let tabs: [TabItem]
    @Binding var selectedTabId: String

    var body: some View {
        HStack(spacing: 0) {
            ForEach(tabs) { tab in
                Button(action: { selectedTabId = tab.id }) {
                    VStack(spacing: 4) {
                        ZStack(alignment: .topTrailing) {
                            Image(systemName: tab.systemImage)
                                .font(.system(size: 22, weight: .medium))
                            if let badge = tab.badge, badge > 0 {
                                Text("\(badge)")
                                    .font(.caption2)
                                    .foregroundColor(.white)
                                    .padding(4)
                                    .background(CohortColors.accent)
                                    .clipShape(Circle())
                                    .offset(x: 8, y: -8)
                            }
                        }
                        Text(tab.label)
                            .font(CohortTypography.caption())
                    }
                    .frame(maxWidth: .infinity)
                    .foregroundColor(selectedTabId == tab.id ? CohortColors.accent : CohortColors.textMuted)
                }
                .buttonStyle(.plain)
            }
        }
        .frame(height: 80)
        .padding(.bottom, 8)
        .background(CohortColors.surface)
        .overlay(
            Rectangle()
                .frame(height: 1)
                .foregroundColor(CohortColors.divider),
            alignment: .top
        )
    }
}

#Preview {
    BottomTabBar(
        tabs: [
            TabItem(id: "intros", label: "Introductions", systemImage: "sparkles"),
            TabItem(id: "matches", label: "Matches", systemImage: "heart.fill", badge: 2),
            TabItem(id: "profile", label: "Profile", systemImage: "person"),
        ],
        selectedTabId: .constant("intros")
    )
}
