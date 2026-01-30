//
//  MatchesListView.swift
//  Cohort
//

import SwiftUI

struct MatchItem: Identifiable {
    let id: String
    let name: String
    let status: String // "action_needed" | "scheduled" | "past"
}

struct MatchesListView: View {
    var onBack: (() -> Void)? = nil
    var onSelectMatch: (String, String) -> Void

    @State private var matches: [MatchItem] = [
        MatchItem(id: "m1", name: "Sophie", status: "action_needed"),
        MatchItem(id: "m2", name: "Marcus", status: "scheduled"),
    ]

    var body: some View {
        VStack(spacing: 0) {
            if let onBack = onBack {
                TopBar(title: "Matches", onBack: onBack)
            } else {
                TopBar(title: "Matches", variant: .default)
            }
            List {
                Section("Action needed") {
                    ForEach(matches.filter { $0.status == "action_needed" }) { m in
                        Button(action: { onSelectMatch(m.id, m.name) }) {
                            HStack {
                                CohortAvatar(size: 44)
                                Text(m.name)
                                    .font(CohortTypography.body())
                                    .foregroundColor(CohortColors.textPrimary)
                                Spacer()
                                Image(systemName: "chevron.right")
                                    .font(.caption)
                                    .foregroundColor(CohortColors.textMuted)
                            }
                        }
                    }
                }
                Section("Scheduled") {
                    ForEach(matches.filter { $0.status == "scheduled" }) { m in
                        Button(action: { onSelectMatch(m.id, m.name) }) {
                            HStack {
                                CohortAvatar(size: 44)
                                Text(m.name)
                                    .font(CohortTypography.body())
                                    .foregroundColor(CohortColors.textPrimary)
                                Spacer()
                                Image(systemName: "chevron.right")
                                    .font(.caption)
                                    .foregroundColor(CohortColors.textMuted)
                            }
                        }
                    }
                }
            }
            .listStyle(.insetGrouped)
        }
        .background(CohortColors.background)
    }
}

#Preview {
    MatchesListView(onSelectMatch: { _, _ in })
}
