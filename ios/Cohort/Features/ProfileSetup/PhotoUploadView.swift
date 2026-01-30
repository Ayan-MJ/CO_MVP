//
//  PhotoUploadView.swift
//  Cohort
//

import SwiftUI
import PhotosUI

struct PhotoUploadView: View {
    var onBack: () -> Void
    var onContinue: () -> Void

    @State private var selectedItems: [PhotosPickerItem] = []
    @State private var images: [UIImage] = []

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Add photos", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    Text("Add 3–5 photos of yourself")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                    PhotosPicker(
                        selection: $selectedItems,
                        maxSelectionCount: 5,
                        matching: .images,
                        photoLibrary: .shared()
                    ) {
                        Text("Choose photos")
                            .font(CohortTypography.body())
                            .foregroundColor(CohortColors.accent)
                    }
                    .onChange(of: selectedItems) { _, new in
                        Task {
                            var loaded: [UIImage] = []
                            for item in new {
                                if let data = try? await item.loadTransferable(type: Data.self), let img = UIImage(data: data) {
                                    loaded.append(img)
                                }
                            }
                            await MainActor.run { images = loaded }
                        }
                    }
                    if !images.isEmpty {
                        LazyVGrid(columns: [GridItem(.adaptive(minimum: 100))], spacing: CohortSpacing.sm) {
                            ForEach(Array(images.enumerated()), id: \.offset) { _, img in
                                Image(uiImage: img)
                                    .resizable()
                                    .scaledToFill()
                                    .frame(width: 100, height: 100)
                                    .clipShape(RoundedRectangle(cornerRadius: CohortRadius.sm))
                            }
                        }
                    }
                    CohortButton(title: "Continue", disabled: images.count < 3, action: onContinue)
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    PhotoUploadView(onBack: {}, onContinue: {})
}
