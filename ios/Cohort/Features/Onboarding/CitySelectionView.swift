//
//  CitySelectionView.swift
//  Cohort
//

import SwiftUI

struct Neighborhood: Identifiable {
    let id: String
    let name: String
    let status: String // "live" | "waitlist"
    var waitlistSize: Int?
}

struct CityOption: Identifiable {
    let id: String
    let name: String
    let neighborhoods: [Neighborhood]
}

private let citiesData: [CityOption] = [
    CityOption(id: "nyc", name: "New York City", neighborhoods: [
        Neighborhood(id: "nyc-williamsburg", name: "Williamsburg", status: "live"),
        Neighborhood(id: "nyc-upper-west", name: "Upper West Side", status: "live"),
        Neighborhood(id: "nyc-chelsea", name: "Chelsea", status: "waitlist", waitlistSize: 120),
        Neighborhood(id: "nyc-east-village", name: "East Village", status: "live"),
    ]),
    CityOption(id: "sf", name: "San Francisco", neighborhoods: [
        Neighborhood(id: "sf-soma", name: "SoMa", status: "live"),
        Neighborhood(id: "sf-marina", name: "Marina District", status: "live"),
        Neighborhood(id: "sf-mission", name: "Mission District", status: "live"),
        Neighborhood(id: "sf-hayes", name: "Hayes Valley", status: "waitlist", waitlistSize: 45),
    ]),
]

struct CitySelectionView: View {
    var onBack: () -> Void
    var onContinue: (String, String, Bool) -> Void

    @State private var searchQuery = ""
    @State private var selectedCity: CityOption?
    @State private var selectedNeighborhood: Neighborhood?

    private var filteredCities: [CityOption] {
        if searchQuery.isEmpty { return citiesData }
        let q = searchQuery.lowercased()
        return citiesData.filter {
            $0.name.lowercased().contains(q) ||
            $0.neighborhoods.contains { $0.name.lowercased().contains(q) }
        }
    }

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Select location", onBack: onBack)
            VStack(alignment: .leading, spacing: CohortSpacing.lg) {
                CohortInput(label: "Search city or neighborhood", placeholder: "e.g. New York, Brooklyn", text: $searchQuery)
                ScrollView {
                    VStack(alignment: .leading, spacing: CohortSpacing.md) {
                        ForEach(filteredCities) { city in
                            Text(city.name)
                                .font(CohortTypography.title3())
                                .foregroundColor(CohortColors.textPrimary)
                            ForEach(city.neighborhoods) { nb in
                                Button(action: {
                                    selectedCity = city
                                    selectedNeighborhood = nb
                                }) {
                                    HStack {
                                        VStack(alignment: .leading, spacing: 2) {
                                            Text(nb.name)
                                                .font(CohortTypography.body())
                                                .foregroundColor(CohortColors.textPrimary)
                                            if nb.status == "waitlist" {
                                                Text("Waitlist • \(nb.waitlistSize ?? 0) ahead")
                                                    .font(CohortTypography.caption())
                                                    .foregroundColor(CohortColors.textMuted)
                                            }
                                        }
                                        Spacer()
                                        if selectedCity?.id == city.id && selectedNeighborhood?.id == nb.id {
                                            Image(systemName: "checkmark.circle.fill")
                                                .foregroundColor(CohortColors.accent)
                                        } else {
                                            Image(systemName: "chevron.right")
                                                .font(.caption)
                                                .foregroundColor(CohortColors.textMuted)
                                        }
                                    }
                                    .padding(CohortSpacing.md)
                                    .background(CohortColors.surface)
                                    .overlay(
                                        RoundedRectangle(cornerRadius: CohortRadius.sm)
                                            .stroke(selectedCity?.id == city.id && selectedNeighborhood?.id == nb.id ? CohortColors.accent : CohortColors.divider, lineWidth: 1)
                                    )
                                    .clipShape(RoundedRectangle(cornerRadius: CohortRadius.sm))
                                }
                                .buttonStyle(.plain)
                            }
                        }
                    }
                }
                Spacer(minLength: 24)
                CohortButton(
                    title: "Continue",
                    variant: .primary,
                    disabled: selectedCity == nil || selectedNeighborhood == nil,
                    action: {
                        guard let city = selectedCity, let nb = selectedNeighborhood else { return }
                        onContinue(city.name, nb.name, nb.status == "waitlist")
                    }
                )
            }
            .padding(CohortSpacing.lg)
        }
        .background(CohortColors.background)
    }
}

#Preview {
    CitySelectionView(onBack: {}, onContinue: { _, _, _ in })
}
