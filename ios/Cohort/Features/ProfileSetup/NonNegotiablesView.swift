//
//  NonNegotiablesView.swift
//  Cohort
//

import SwiftUI

struct NonNegotiablesView: View {
    var onBack: () -> Void
    var onContinue: () -> Void
    @Binding var selected: [String]

    private let options = ["Same faith", "No smoking", "Kids one day", "Relocation open", "Career-driven", "Family first", "Fitness matters", "No drugs"]

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Non-negotiables", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    Text("Select up to 5 dealbreakers (optional)")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                    FlowLayout(spacing: CohortSpacing.sm) {
                        ForEach(options, id: \.self) { opt in
                            CohortChip(
                                label: opt,
                                selected: selected.contains(opt),
                                variant: .dealbreaker,
                                onSelect: {
                                    if selected.contains(opt) {
                                        selected.removeAll { $0 == opt }
                                    } else if selected.count < 5 {
                                        selected.append(opt)
                                    }
                                }
                            )
                        }
                    }
                    CohortButton(title: "Continue", action: onContinue)
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

struct FlowLayout: Layout {
    var spacing: CGFloat = 8
    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let result = arrange(proposal: proposal, subviews: subviews)
        return result.size
    }
    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let result = arrange(proposal: proposal, subviews: subviews)
        for (i, pt) in result.positions.enumerated() {
            subviews[i].place(at: CGPoint(x: bounds.minX + pt.x, y: bounds.minY + pt.y), proposal: .unspecified)
        }
    }
    private func arrange(proposal: ProposedViewSize, subviews: Subviews) -> (size: CGSize, positions: [CGPoint]) {
        let maxWidth = proposal.width ?? 400
        var x: CGFloat = 0, y: CGFloat = 0
        var rowHeight: CGFloat = 0
        var positions: [CGPoint] = []
        for subview in subviews {
            let size = subview.sizeThatFits(.unspecified)
            if x + size.width > maxWidth, x > 0 {
                x = 0
                y += rowHeight + spacing
                rowHeight = 0
            }
            positions.append(CGPoint(x: x, y: y))
            rowHeight = max(rowHeight, size.height)
            x += size.width + spacing
        }
        return (CGSize(width: maxWidth, height: y + rowHeight), positions)
    }
}

#Preview {
    NonNegotiablesView(onBack: {}, onContinue: {}, selected: .constant([]))
}
