//
//  CohortInput.swift
//  Cohort
//

import SwiftUI

struct CohortInput: View {
    var label: String? = nil
    var placeholder: String = ""
    @Binding var text: String
    var error: String? = nil
    var helperText: String? = nil
    var isSecure: Bool = false

    var body: some View {
        VStack(alignment: .leading, spacing: CohortSpacing.sm) {
            if let label = label {
                Text(label)
                    .font(CohortTypography.callout())
                    .fontWeight(.medium)
                    .foregroundColor(CohortColors.textPrimary)
            }
            Group {
                if isSecure {
                    SecureField(placeholder, text: $text)
                } else {
                    TextField(placeholder, text: $text)
                }
            }
            .frame(height: 48)
            .padding(.horizontal, CohortSpacing.lg)
            .background(CohortColors.inputBackground)
            .foregroundColor(CohortColors.textPrimary)
            .overlay(
                RoundedRectangle(cornerRadius: CohortRadius.sm)
                    .stroke(error != nil ? CohortColors.error : CohortColors.divider, lineWidth: 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: CohortRadius.sm))
            .font(CohortTypography.body())

            if let err = error {
                Text(err)
                    .font(CohortTypography.footnote())
                    .foregroundColor(CohortColors.error)
            } else if let help = helperText {
                Text(help)
                    .font(CohortTypography.footnote())
                    .foregroundColor(CohortColors.textMuted)
            }
        }
    }
}

struct CohortOTPInput: View {
    let length: Int
    @Binding var value: String
    var label: String = "One-time passcode"
    @FocusState private var focused: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: CohortSpacing.sm) {
            Text(label)
                .font(CohortTypography.callout())
                .fontWeight(.medium)
                .foregroundColor(CohortColors.textPrimary)
            ZStack(alignment: .leading) {
                HStack(spacing: CohortSpacing.sm) {
                    ForEach(0..<length, id: \.self) { index in
                        let char = value.count > index ? String(value[value.index(value.startIndex, offsetBy: index)]) : ""
                        Text(char)
                            .frame(width: 48, height: 56)
                            .font(CohortTypography.title2())
                            .fontWeight(.semibold)
                            .background(CohortColors.inputBackground)
                            .overlay(
                                RoundedRectangle(cornerRadius: CohortRadius.sm)
                                    .stroke(CohortColors.divider, lineWidth: 1)
                            )
                            .clipShape(RoundedRectangle(cornerRadius: CohortRadius.sm))
                    }
                }
                TextField("", text: $value)
                    .keyboardType(.numberPad)
                    .textContentType(.oneTimeCode)
                    .frame(maxWidth: .infinity, minHeight: 56)
                    .opacity(0)
                    .focused($focused)
                    .onChange(of: value) { _, new in
                        let filtered = new.filter { $0.isNumber }
                        value = String(filtered.prefix(length))
                    }
            }
            .contentShape(Rectangle())
            .onTapGesture { focused = true }
        }
    }
}

#Preview {
    VStack {
        CohortInput(label: "Email", placeholder: "you@example.com", text: .constant(""))
        CohortOTPInput(length: 6, value: .constant("123"))
    }
    .padding()
}
