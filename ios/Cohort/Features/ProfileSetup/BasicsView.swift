//
//  BasicsView.swift
//  Cohort
//

import SwiftUI

struct BasicsView: View {
    var onBack: () -> Void
    var onContinue: () -> Void
    @Binding var name: String
    @Binding var age: String
    @Binding var height: String

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Basics", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    CohortInput(label: "Name", placeholder: "Your first name", text: $name)
                    CohortInput(label: "Age", placeholder: "Age", text: $age)
                    CohortInput(label: "Height (optional)", placeholder: "e.g. 5'7\"", text: $height)
                    CohortButton(title: "Continue", action: onContinue)
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    BasicsView(onBack: {}, onContinue: {}, name: .constant(""), age: .constant(""), height: .constant(""))
}
