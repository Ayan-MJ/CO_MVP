//
//  ChatView.swift
//  Cohort
//

import SwiftUI

struct ChatMessage: Identifiable {
    let id: String
    let text: String
    let isFromMe: Bool
    let timestamp: Date
}

struct ChatView: View {
    let matchName: String
    var onBack: () -> Void
    var onReportBlock: () -> Void

    @State private var messages: [ChatMessage] = [
        ChatMessage(id: "1", text: "Hi! Looking forward to our voice call.", isFromMe: false, timestamp: Date()),
        ChatMessage(id: "2", text: "Same here! Saturday works for me.", isFromMe: true, timestamp: Date()),
    ]
    @State private var inputText = ""

    var body: some View {
        VStack(spacing: 0) {
            TopBar(title: matchName, onBack: onBack)
            ScrollViewReader { proxy in
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: CohortSpacing.sm) {
                        ForEach(messages) { msg in
                            HStack {
                                if msg.isFromMe { Spacer(minLength: 60) }
                                Text(msg.text)
                                    .font(CohortTypography.body())
                                    .foregroundColor(msg.isFromMe ? CohortColors.accentForeground : CohortColors.textPrimary)
                                    .padding(CohortSpacing.md)
                                    .background(msg.isFromMe ? CohortColors.accent : CohortColors.surface)
                                    .clipShape(RoundedRectangle(cornerRadius: CohortRadius.md))
                                if !msg.isFromMe { Spacer(minLength: 60) }
                            }
                        }
                    }
                    .padding(CohortSpacing.lg)
                }
            }
            HStack(spacing: CohortSpacing.sm) {
                TextField("Message", text: $inputText)
                    .textFieldStyle(.roundedBorder)
                Button("Send") {
                    if !inputText.isEmpty {
                        messages.append(ChatMessage(id: UUID().uuidString, text: inputText, isFromMe: true, timestamp: Date()))
                        inputText = ""
                    }
                }
                .font(CohortTypography.callout())
                .foregroundColor(CohortColors.accent)
            }
            .padding(CohortSpacing.md)
            .background(CohortColors.surface)
            Button("Report / Block", action: onReportBlock)
                .font(CohortTypography.footnote())
                .foregroundColor(CohortColors.textMuted)
        }
        .background(CohortColors.background)
    }
}

#Preview {
    ChatView(matchName: "Sophie", onBack: {}, onReportBlock: {})
}
