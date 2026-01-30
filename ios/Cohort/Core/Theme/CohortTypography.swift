//
//  CohortTypography.swift
//  Cohort
//
//  SF Pro — Large Title, Title 1–3, Body, Callout, Footnote, Caption.
//

import SwiftUI

enum CohortTypography {
    static func largeTitle(_ scheme: ColorScheme = .light) -> Font {
        .system(size: 34, weight: .bold)
    }
    static func title1(_ scheme: ColorScheme = .light) -> Font {
        .system(size: 28, weight: .bold)
    }
    static func title2(_ scheme: ColorScheme = .light) -> Font {
        .system(size: 22, weight: .semibold)
    }
    static func title3(_ scheme: ColorScheme = .light) -> Font {
        .system(size: 20, weight: .semibold)
    }
    static func body(_ scheme: ColorScheme = .light) -> Font {
        .system(size: 17, weight: .regular)
    }
    static func callout(_ scheme: ColorScheme = .light) -> Font {
        .system(size: 16, weight: .medium)
    }
    static func footnote(_ scheme: ColorScheme = .light) -> Font {
        .system(size: 13, weight: .regular)
    }
    static func caption(_ scheme: ColorScheme = .light) -> Font {
        .system(size: 12, weight: .regular)
    }
}
