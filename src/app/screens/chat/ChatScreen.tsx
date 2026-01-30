import React from 'react';
import { ArrowLeft, Plus, Mic, Send, Image as ImageIcon, Phone, Calendar, AlertCircle, Shield } from 'lucide-react';

export interface ChatMessage {
  id: string;
  type: 'user' | 'match' | 'system';
  content: string;
  timestamp: Date;
  read?: boolean;
  messageType?: 'text' | 'voice' | 'photo';
  voiceDuration?: number; // in seconds
  photoUrl?: string;
}

interface ChatScreenProps {
  matchName: string;
  matchPhoto: string;
  matchStatus: 'accepted' | 'voice-scheduled' | 'voice-done' | 'date-planning';
  messagesRemaining: number;
  onBack: () => void;
  onProposeVoiceSlots: () => void;
  onChooseDateTemplate: () => void;
  onReport: () => void;
  onBlock: () => void;
}

// Mock messages for demo
const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    type: 'system',
    content: 'You matched with Sarah! Say hello to start the conversation.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    type: 'user',
    content: 'Hey Sarah! Really enjoyed reading your profile. Your thoughts on intentional dating really resonated.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
    read: true,
  },
  {
    id: '3',
    type: 'match',
    content: 'Hi! Thanks for the message. Yeah, I think it\'s so important to be deliberate about who you spend time with.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 10 * 60 * 1000),
    read: true,
  },
  {
    id: '4',
    type: 'user',
    content: 'Absolutely. I saw you\'re in Noe Valley—I\'m in the Mission. Would love to chat more over a voice call this week?',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: '5',
    type: 'match',
    content: 'That sounds great! I\'m pretty flexible this week.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
  },
];

export function ChatScreen({
  matchName,
  matchPhoto,
  matchStatus,
  messagesRemaining,
  onBack,
  onProposeVoiceSlots,
  onChooseDateTemplate,
  onReport,
  onBlock,
}: ChatScreenProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = React.useState('');
  const [showQuickActions, setShowQuickActions] = React.useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = React.useState(false);
  const [recordingDuration, setRecordingDuration] = React.useState(0);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const recordingIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice recording timer
  React.useEffect(() => {
    if (isRecordingVoice) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= 60) {
            // Auto-stop at 60 seconds
            handleStopRecording();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setRecordingDuration(0);
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecordingVoice]);

  const handleSendMessage = () => {
    if (inputText.trim() && messagesRemaining > 0) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: inputText.trim(),
        timestamp: new Date(),
        read: false,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleStartRecording = () => {
    setIsRecordingVoice(true);
  };

  const handleStopRecording = () => {
    setIsRecordingVoice(false);
    // In real app, would save the voice note
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: 'Voice message',
      messageType: 'voice',
      voiceDuration: recordingDuration,
      timestamp: new Date(),
      read: false,
    };
    setMessages([...messages, newMessage]);
    setRecordingDuration(0);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGuardrailMessage = () => {
    if (matchStatus === 'accepted') {
      return 'Keep it brief—schedule a voice check to continue';
    } else if (matchStatus === 'voice-scheduled') {
      return 'Voice call scheduled—save the chat for later';
    } else if (matchStatus === 'voice-done') {
      return 'Focus on planning your date together';
    }
    return null;
  };

  const guardrailMessage = getGuardrailMessage();

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="bg-surface border-b border-divider px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-input-background rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <img src={matchPhoto} alt={matchName} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
          <h2 className="text-[var(--text-headline)] font-semibold text-text-primary">{matchName}</h2>
          <p className="text-[var(--text-caption)] text-text-secondary">
            {matchStatus === 'accepted' && 'Just matched'}
            {matchStatus === 'voice-scheduled' && 'Voice call scheduled'}
            {matchStatus === 'voice-done' && 'Voice call completed'}
            {matchStatus === 'date-planning' && 'Planning your date'}
          </p>
        </div>
        <button
          onClick={() => setShowQuickActions(!showQuickActions)}
          className="p-2 hover:bg-input-background rounded-full transition-colors"
        >
          <Plus className={`w-5 h-5 text-text-primary transition-transform ${showQuickActions ? 'rotate-45' : ''}`} />
        </button>
      </div>

      {/* Guardrail Banner */}
      {guardrailMessage && (
        <div className="sticky top-0 z-10 bg-accent text-white border-b border-accent/60 px-4 py-3 flex items-center gap-3 shadow-sm">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-4 h-4 text-white" />
          </div>
          <p className="text-[var(--text-footnote)] font-semibold tracking-[-0.01em]">{guardrailMessage}</p>
        </div>
      )}

      {/* Quick Actions Sheet */}
      {showQuickActions && (
        <div className="bg-surface border-b border-divider px-4 py-3 space-y-2">
          {matchStatus === 'accepted' && (
            <button
              onClick={() => {
                setShowQuickActions(false);
                onProposeVoiceSlots();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-accent/10 hover:bg-accent/20 transition-colors"
            >
              <Phone className="w-5 h-5 text-accent" />
              <div className="flex-1 text-left">
                <p className="text-[var(--text-callout)] font-medium text-text-primary">Propose voice slots</p>
                <p className="text-[var(--text-caption)] text-text-secondary">Schedule your first call</p>
              </div>
            </button>
          )}
          {(matchStatus === 'voice-done' || matchStatus === 'date-planning') && (
            <button
              onClick={() => {
                setShowQuickActions(false);
                onChooseDateTemplate();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-accent/10 hover:bg-accent/20 transition-colors"
            >
              <Calendar className="w-5 h-5 text-accent" />
              <div className="flex-1 text-left">
                <p className="text-[var(--text-callout)] font-medium text-text-primary">Choose date template</p>
                <p className="text-[var(--text-caption)] text-text-secondary">Browse curated date ideas</p>
              </div>
            </button>
          )}
          <div className="border-t border-divider pt-2 space-y-2">
            <button
              onClick={() => {
                setShowQuickActions(false);
                onReport();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-input-background transition-colors"
            >
              <AlertCircle className="w-5 h-5 text-warning" />
              <p className="text-[var(--text-callout)] text-text-primary">Report conversation</p>
            </button>
            <button
              onClick={() => {
                setShowQuickActions(false);
                onBlock();
              }}
              className="w-full flex items-center gap-3 p-3 rounded-[var(--radius-md)] hover:bg-input-background transition-colors"
            >
              <Shield className="w-5 h-5 text-destructive" />
              <p className="text-[var(--text-callout)] text-destructive">Block user</p>
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message, index) => {
          const showTimestamp =
            index === 0 || new Date(message.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 5 * 60 * 1000;

          if (message.type === 'system') {
            return (
              <div key={message.id} className="flex justify-center">
                <div className="bg-surface border border-divider rounded-full px-4 py-2 max-w-[280px]">
                  <p className="text-[var(--text-caption)] text-text-secondary text-center">{message.content}</p>
                </div>
              </div>
            );
          }

          const isUser = message.type === 'user';

          return (
            <div key={message.id}>
              {showTimestamp && (
                <p className="text-[var(--text-caption)] text-text-muted text-center mb-2">{formatTime(message.timestamp)}</p>
              )}
              <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] ${isUser ? 'order-2' : 'order-1'}`}>
                  {message.messageType === 'voice' ? (
                    <div
                      className={`rounded-[18px] px-4 py-3 flex items-center gap-3 ${
                        isUser ? 'bg-accent text-white' : 'bg-surface text-text-primary border border-divider'
                      }`}
                    >
                      <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                        <Mic className="w-4 h-4" />
                      </button>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/30 rounded-full">
                          <div className="h-full w-0 bg-white rounded-full"></div>
                        </div>
                        <span className="text-[var(--text-caption)]">{formatDuration(message.voiceDuration || 0)}</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`rounded-[18px] px-4 py-2.5 ${
                        isUser ? 'bg-accent text-white' : 'bg-surface text-text-primary border border-divider'
                      }`}
                    >
                      <p className="text-[var(--text-callout)] leading-relaxed">{message.content}</p>
                    </div>
                  )}
                  {isUser && (
                    <div className="flex items-center justify-end gap-1 mt-1 px-2">
                      <span className="text-[var(--text-caption)] text-text-muted">
                        {message.read ? 'Read' : 'Delivered'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Limit Indicator */}
      {messagesRemaining <= 10 && matchStatus === 'accepted' && (
        <div className="px-4 py-2 bg-warning/10 border-t border-warning/20">
          <p className="text-[var(--text-caption)] text-warning text-center">
            {messagesRemaining} messages remaining until voice step
          </p>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-surface border-t border-divider px-4 py-3">
        {isRecordingVoice ? (
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 bg-destructive/10 rounded-full px-4 py-3">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
              <span className="text-[var(--text-callout)] text-destructive font-medium">
                Recording {formatDuration(recordingDuration)}
              </span>
              <span className="text-[var(--text-caption)] text-text-muted ml-auto">
                {60 - recordingDuration}s left
              </span>
            </div>
            <button
              onClick={handleStopRecording}
              className="p-3 bg-accent rounded-full hover:bg-accent/90 transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button className="p-2.5 hover:bg-input-background rounded-full transition-colors">
                <ImageIcon className="w-5 h-5 text-text-secondary" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="w-full bg-input-background text-text-primary placeholder:text-text-muted rounded-full px-4 py-2.5 text-[var(--text-callout)] focus:outline-none focus:ring-2 focus:ring-accent/50"
                  disabled={messagesRemaining === 0}
                />
              </div>
              {inputText.trim() ? (
                <button
                  onClick={handleSendMessage}
                  disabled={messagesRemaining === 0}
                  className="p-2.5 bg-accent rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              ) : (
                <button
                  onClick={handleStartRecording}
                  className="p-2.5 hover:bg-input-background rounded-full transition-colors"
                >
                  <Mic className="w-5 h-5 text-text-secondary" />
                </button>
              )}
            </div>
            {matchStatus === 'accepted' && (
              <div className="flex justify-end">
                <div className="flex items-center gap-2 rounded-full bg-accent/10 text-accent px-3 py-1 text-[var(--text-caption)] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  {messagesRemaining} messages left
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
