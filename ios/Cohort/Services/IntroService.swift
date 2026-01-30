//
//  IntroService.swift
//  Cohort
//

import Foundation

actor IntroService {
    func fetchIntros() async throws -> [IntroCardData] {
        try await Task.sleep(nanoseconds: 300_000_000)
        return IntroCardData.mockList
    }
}

extension IntroCardData {
    static let mockList: [IntroCardData] = [
        IntroCardData(
            id: "intro-1",
            userId: "user-1",
            name: "Sophie",
            age: 29,
            photos: [
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
            ],
            lifeMapHighlight: "Building a life where Sunday mornings are for farmers markets and deep conversations over coffee",
            matchReasons: [
                "Both value intentional relationships over casual dating",
                "Shared interest in sustainable living and local community",
                "Similar communication styles: thoughtful, direct, emotionally aware",
            ],
            watchOuts: ["She prioritizes work-life balance; may need advance planning for spontaneous trips"],
            trustScore: 94,
            verified: true,
            expiresAt: Date().addingTimeInterval(72 * 3600),
            location: "Brooklyn, NY",
            occupation: "Product Designer",
            education: "Cornell University",
            height: "5'7\""
        ),
        IntroCardData(
            id: "intro-2",
            userId: "user-2",
            name: "Marcus",
            age: 32,
            photos: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"],
            lifeMapHighlight: "Looking for someone who gets excited about trying new restaurants and discussing big ideas",
            matchReasons: [
                "Both see relationships as partnerships for personal growth",
                "Match on core values: curiosity, authenticity, adventure",
                "Complementary strengths",
            ],
            watchOuts: ["Recently relocated for work; still building his local community"],
            trustScore: 88,
            verified: true,
            expiresAt: Date().addingTimeInterval(72 * 3600),
            location: "Manhattan, NY",
            occupation: "Management Consultant",
            education: "MIT",
            height: "6'1\""
        ),
    ]
}
