//
//  VerificationCaptureView.swift
//  Cohort
//

import SwiftUI
import PhotosUI

struct VerificationCaptureView: View {
    var onBack: () -> Void
    var onPhotoTaken: (Data) -> Void

    @State private var selectedItem: PhotosPickerItem?
    @State private var capturedImage: UIImage?

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: "Take a selfie", onBack: onBack)
            ScrollView {
                VStack(spacing: CohortSpacing.xl) {
                    Text("We need a clear selfie to verify your identity")
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.textSecondary)
                        .multilineTextAlignment(.center)

                    if let img = capturedImage {
                        Image(uiImage: img)
                            .resizable()
                            .scaledToFit()
                            .frame(maxHeight: 400)
                            .clipShape(RoundedRectangle(cornerRadius: CohortRadius.md))
                    } else {
                        PhotosPicker(
                            selection: $selectedItem,
                            matching: .images,
                            photoLibrary: .shared()
                        ) {
                            VStack(spacing: CohortSpacing.md) {
                                Image(systemName: "camera.fill")
                                    .font(.system(size: 48))
                                    .foregroundColor(CohortColors.accent)
                                Text("Choose from library or take a photo")
                                    .font(CohortTypography.callout())
                                    .foregroundColor(CohortColors.textSecondary)
                            }
                            .frame(maxWidth: .infinity)
                            .frame(height: 280)
                            .background(CohortColors.surface)
                            .overlay(
                                RoundedRectangle(cornerRadius: CohortRadius.md)
                                    .stroke(CohortColors.divider, lineWidth: 1)
                            )
                            .clipShape(RoundedRectangle(cornerRadius: CohortRadius.md))
                        }
                        .onChange(of: selectedItem) { _, new in
                            Task {
                                if let data = try? await new?.loadTransferable(type: Data.self) {
                                    await MainActor.run {
                                        capturedImage = UIImage(data: data)
                                    }
                                }
                            }
                        }
                    }

                    if capturedImage != nil {
                        CohortButton(title: "Submit for verification", action: {
                            guard let img = capturedImage, let data = img.jpegData(compressionQuality: 0.8) else { return }
                            onPhotoTaken(data)
                        })
                        Button("Choose different photo") {
                            selectedItem = nil
                            capturedImage = nil
                        }
                        .font(CohortTypography.callout())
                        .foregroundColor(CohortColors.accent)
                    }
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
    }
}

#Preview {
    VerificationCaptureView(onBack: {}, onPhotoTaken: { _ in })
}
