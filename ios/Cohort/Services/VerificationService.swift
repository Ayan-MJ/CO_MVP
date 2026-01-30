//
//  VerificationService.swift
//  Cohort
//

import Foundation

enum VerificationOutcome: String, Codable {
    case success
    case failure
    case manualReview = "manual-review"
}

struct VerificationResponse {
    let status: VerificationOutcome
    let message: String?
}

actor VerificationService {
    func submitVerificationPhoto(photoData: Data) async throws -> VerificationResponse {
        try await Task.sleep(nanoseconds: 500_000_000)
        return VerificationResponse(status: .success, message: nil)
    }
}
