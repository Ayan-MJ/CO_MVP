//
//  CohortAvatar.swift
//  Cohort
//

import SwiftUI

struct CohortAvatar: View {
    var imageURL: String? = nil
    var placeholder: String = "person.fill"
    var size: CGFloat = 48

    var body: some View {
        Group {
            if let urlString = imageURL, let url = URL(string: urlString) {
                AsyncImage(url: url) { phase in
                    switch phase {
                    case .success(let image):
                        image.resizable().aspectRatio(contentMode: .fill)
                    case .failure, .empty:
                        Image(systemName: placeholder)
                            .font(.system(size: size * 0.5))
                            .foregroundColor(CohortColors.textMuted)
                    @unknown default:
                        Image(systemName: placeholder)
                            .font(.system(size: size * 0.5))
                            .foregroundColor(CohortColors.textMuted)
                    }
                }
            } else {
                Image(systemName: placeholder)
                    .font(.system(size: size * 0.5))
                    .foregroundColor(CohortColors.textMuted)
            }
        }
        .frame(width: size, height: size)
        .clipShape(Circle())
        .background(Circle().fill(CohortColors.surface))
        .overlay(
            Circle().stroke(CohortColors.divider, lineWidth: 1)
        )
    }
}

#Preview {
    CohortAvatar(size: 64)
}
