//
//  OTPLoginView.swift
//  Cohort
//

import SwiftUI

struct OTPLoginView: View {
    var onBack: () -> Void
    var onVerified: () -> Void

    @State private var loginMethod: LoginMethod = .phone
    @State private var step: LoginStep = .input
    @State private var phoneNumber = ""
    @State private var email = ""
    @State private var otpValue = ""
    @State private var error = ""
    @State private var isLoading = false
    @State private var resendTimer = 30

    enum LoginMethod: String, CaseIterable { case phone, email }
    enum LoginStep { case input, otp }

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: step == .input ? "Sign in" : "Enter code", onBack: onBack)
            ScrollView {
                VStack(alignment: .leading, spacing: CohortSpacing.xl) {
                    if step == .input {
                        Picker("Method", selection: $loginMethod) {
                            Text("Phone").tag(LoginMethod.phone)
                            Text("Email").tag(LoginMethod.email)
                        }
                        .pickerStyle(.segmented)
                        if loginMethod == .phone {
                            CohortInput(
                                label: "Phone number",
                                placeholder: "+1 (555) 000-0000",
                                text: $phoneNumber,
                                error: error
                            )
                        } else {
                            CohortInput(
                                label: "Email",
                                placeholder: "you@example.com",
                                text: $email,
                                error: error
                            )
                        }
                        CohortButton(title: "Send code", loading: isLoading, action: sendCode)
                    } else {
                        Text("We sent a 6-digit code to \(loginMethod == .phone ? phoneNumber : email)")
                            .font(CohortTypography.callout())
                            .foregroundColor(CohortColors.textSecondary)
                        CohortOTPInput(length: 6, value: $otpValue, label: "One-time passcode")
                        if resendTimer > 0 {
                            Text("Resend code in \(resendTimer)s")
                                .font(CohortTypography.footnote())
                                .foregroundColor(CohortColors.textMuted)
                        } else {
                            Button("Resend code") {
                                resendTimer = 30
                                otpValue = ""
                            }
                            .font(CohortTypography.callout())
                            .foregroundColor(CohortColors.accent)
                        }
                        if !error.isEmpty {
                            Text(error)
                                .font(CohortTypography.footnote())
                                .foregroundColor(CohortColors.error)
                        }
                        CohortButton(title: "Verify", loading: isLoading, action: verifyOTP)
                    }
                }
                .padding(CohortSpacing.xl)
            }
        }
        .background(CohortColors.background)
        .onChange(of: otpValue) { _, _ in error = "" }
    }

    private func sendCode() {
        error = ""
        if loginMethod == .phone {
            let digits = phoneNumber.filter { $0.isNumber }
            if digits.count < 10 {
                error = "Please enter a valid phone number"
                return
            }
        } else {
            if !email.contains("@") || !email.contains(".") {
                error = "Please enter a valid email address"
                return
            }
        }
        isLoading = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            isLoading = false
            step = .otp
            resendTimer = 30
        }
    }

    private func verifyOTP() {
        error = ""
        if otpValue.count != 6 {
            error = "Please enter the complete 6-digit code"
            return
        }
        isLoading = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            isLoading = false
            if otpValue == "123456" {
                onVerified()
            } else {
                error = "Invalid code. Please try again."
                otpValue = ""
            }
        }
    }
}

#Preview {
    OTPLoginView(onBack: {}, onVerified: {})
}
