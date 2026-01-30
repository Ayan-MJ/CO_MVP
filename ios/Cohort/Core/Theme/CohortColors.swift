//
//  CohortColors.swift
//  Cohort
//
//  Design tokens from theme.css — light/dark support.
//

import SwiftUI

enum CohortColors {
    // MARK: - Semantic (use fallback hex colors; optional: add Assets for light/dark variants)

    static var background: Color { .cohortBackground }
    static var surface: Color { .cohortSurface }
    static var elevatedSurface: Color { .cohortElevatedSurface }
    static var divider: Color { .cohortDivider }

    static var textPrimary: Color { .cohortTextPrimary }
    static var textSecondary: Color { .cohortTextSecondary }
    static var textMuted: Color { .cohortTextMuted }

    static var accent: Color { .cohortAccent }
    static var accentMuted: Color { .cohortAccentMuted }
    static var accentForeground: Color { .cohortAccentForeground }

    static var success: Color { .cohortSuccess }
    static var warning: Color { .cohortWarning }
    static var error: Color { .cohortError }
    static var destructive: Color { .cohortError }

    static var focusRing: Color { Color(hex: 0xC9A574).opacity(0.4) }
    static var inputBackground: Color { .cohortInputBackground }
}

// Fallback: use hardcoded hex when asset catalog not yet filled
extension Color {
    static let cohortBackground = Color(hex: 0xFEFEFE)
    static let cohortSurface = Color(hex: 0xFFFFFF)
    static let cohortElevatedSurface = Color(hex: 0xFFFFFF)
    static let cohortDivider = Color(white: 0, opacity: 0.08)

    static let cohortTextPrimary = Color(hex: 0x1A1A1A)
    static let cohortTextSecondary = Color(hex: 0x6B6B6B)
    static let cohortTextMuted = Color(hex: 0x9A9A9A)

    static let cohortAccent = Color(hex: 0xC9A574)
    static let cohortAccentMuted = Color(hex: 0xE8D9C3)
    static let cohortAccentForeground = Color(hex: 0xFFFFFF)

    static let cohortSuccess = Color(hex: 0x4CAF50)
    static let cohortWarning = Color(hex: 0xFF9800)
    static let cohortError = Color(hex: 0xE53935)
    static let cohortInputBackground = Color(hex: 0xF5F5F5)

    init(hex: Int) {
        let r = Double((hex >> 16) & 0xFF) / 255
        let g = Double((hex >> 8) & 0xFF) / 255
        let b = Double(hex & 0xFF) / 255
        self.init(red: r, green: g, blue: b)
    }
}
