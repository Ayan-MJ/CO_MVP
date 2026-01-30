# Cohort iOS

Native SwiftUI app for Cohort (premium LTR dating app). This project is the iOS client described in the [MVP build plan](../Documents/1)%20MVP%20build%20plan%20(iOS-only)%20—%20phased%20sprints%20+%20concrete%20deliverables.md) and [MVP PRD](../Documents/MVP%20PRD%20—%20Cohort%20(working%20name).md).

## Requirements

- Xcode 15+
- iOS 17.0+ deployment target

## Opening the project

### Option A: XcodeGen (recommended)

If you have [XcodeGen](https://github.com/yonaskolb/XcodeGen) installed:

```bash
cd ios
xcodegen generate
open Cohort.xcodeproj
```

### Option B: Create project in Xcode

1. Open Xcode → File → New → Project.
2. Choose **App** (iOS), SwiftUI, Swift, iOS 17+.
3. Product name: **Cohort**, Organization identifier: **com.cohort**.
4. Save inside the `ios/` folder (so the project is `ios/Cohort.xcodeproj`).
5. Delete the default "Cohort" group and add the existing `Cohort` folder (with all subfolders) to the target.

## Running

Select the **Cohort** scheme and run on a simulator or device (Cmd+R). Phase 1 shows the Design System showcase screen.

## Structure

- **App/** — `CohortApp.swift`, app entry and root routing.
- **Core/Theme/** — Design tokens (colors, spacing, typography, radius).
- **Core/Navigation/** — `OnboardingStep`, `AppState` (observable).
- **DesignSystem/** — Reusable UI (Button, Card, Chip, Input, ListRow, TopBar, BottomTabBar, Avatar, Rating, Safety, IntroCard).
- **Features/** — Onboarding (DesignSystemShowcase; Phase 2 adds Welcome, Verification, Profile flows), Discovery, Match, Settings.
- **Models/** — `IntroCardData`, etc.
- **Services/** — `VerificationService`, `IntroService` (mock).

## Phases

- **Phase 1:** Project + design system (theme + components + showcase). Done.
- **Phase 2:** Onboarding flow (welcome → city → waitlist → OTP → verification → paywall → profile → complete). Done.
- **Phase 3:** Discovery (intro home, detail, accept/decline, empty states). Done.
- **Phase 4:** Match + voice scheduling + date planning + chat. Done.
- **Phase 5:** Profile detail, Settings, Safety. Done.

The web prototype in the repo root (`npm run dev`) remains the design reference until the iOS app is complete.
