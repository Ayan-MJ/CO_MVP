//
//  IntroCardData.swift
//  Cohort
//

import Foundation

struct IntroCardData: Identifiable {
    let id: String
    let userId: String
    let name: String
    let age: Int
    let photos: [String]
    let lifeMapHighlight: String
    let matchReasons: [String]
    let watchOuts: [String]
    let trustScore: Int
    let verified: Bool
    let expiresAt: Date
    var location: String?
    var occupation: String?
    var education: String?
    var height: String?
}
