import React from 'react';
import { Heart, Sparkles, MessageCircle, Calendar } from 'lucide-react';
import { IntroCardData } from '@/app/components/IntroCard';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

interface IntroMatchScreenProps {
  intro: IntroCardData;
  onStartConversation: () => void;
  onBack?: () => void;
}

const conversationStarters = [
  "I loved reading about your Sunday morning ritual. What's your go-to farmers market find?",
  "Your life map really resonated with me. What does 'deep conversations over coffee' look like for you?",
  "I noticed we both value intentional relationships. What does that mean to you in practice?",
];

export function IntroMatchScreen({ intro, onStartConversation, onBack }: IntroMatchScreenProps) {
  const [selectedStarter, setSelectedStarter] = React.useState<string | null>(null);
  const [customMessage, setCustomMessage] = React.useState('');
  const [showCelebration, setShowCelebration] = React.useState(true);

  React.useEffect(() => {
    // Hide celebration animation after 3 seconds
    const timer = setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (selectedStarter || customMessage.trim()) {
      // In real app, this would send the message via API
      console.log('Sending message:', selectedStarter || customMessage);
      onStartConversation();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background relative">
      {onBack && <TopBar title="" onBack={onBack} />}

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
          <div className="text-center space-y-6 animate-in fade-in zoom-in duration-700">
            <div className="relative">
              <div className="absolute inset-0 animate-ping">
                <div className="w-32 h-32 mx-auto rounded-full bg-accent/20" />
              </div>
              <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                <Heart className="w-16 h-16 text-accent fill-accent animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-[var(--text-large-title)] font-bold text-text-primary mb-2">
                It's a Match!
              </h1>
              <p className="text-[var(--text-title-3)] text-accent font-medium">
                You and {intro.name} are connected
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Match Header */}
          <div className="text-center pt-4">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-accent/20">
              <img
                src={intro.photos[0]}
                alt={intro.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-[var(--text-title-1)] font-bold text-text-primary mb-2">
              You matched with {intro.name}!
            </h2>
            <p className="text-[var(--text-callout)] text-text-secondary max-w-sm mx-auto">
              Start a conversation and see where this connection takes you
            </p>
          </div>

          {/* Why This Matters */}
          <div className="bg-accent/5 rounded-[var(--radius-lg)] p-4 border border-accent/10">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[var(--text-callout)] font-semibold text-text-primary mb-2">
                  Why we think you'll connect
                </h3>
                <ul className="space-y-1.5">
                  {intro.matchReasons.slice(0, 2).map((reason, index) => (
                    <li key={index} className="text-[var(--text-callout)] text-text-secondary flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Conversation Starters */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-5 h-5 text-text-secondary" />
              <h3 className="text-[var(--text-callout)] font-semibold text-text-primary">
                Start the conversation
              </h3>
            </div>
            <p className="text-[var(--text-callout)] text-text-secondary mb-4">
              Choose a thoughtful opener, or write your own message below
            </p>
            
            <div className="space-y-3">
              {conversationStarters.map((starter, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedStarter(selectedStarter === starter ? null : starter);
                    setCustomMessage('');
                  }}
                  className={`w-full text-left p-4 rounded-[var(--radius-md)] border transition-all ${
                    selectedStarter === starter
                      ? 'border-accent bg-accent/10'
                      : 'border-border-primary bg-background-secondary hover:border-accent/50'
                  }`}
                >
                  <p className="text-[var(--text-callout)] text-text-primary">
                    "{starter}"
                  </p>
                </button>
              ))}
            </div>

            {/* Custom Message */}
            <div className="mt-4">
              <div className="relative">
                <textarea
                  value={customMessage}
                  onChange={(e) => {
                    setCustomMessage(e.target.value);
                    if (e.target.value.trim()) {
                      setSelectedStarter(null);
                    }
                  }}
                  placeholder="Or write your own message..."
                  className="w-full min-h-[100px] p-4 rounded-[var(--radius-md)] border border-border-primary bg-background-secondary text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-accent transition-colors"
                  maxLength={500}
                />
                <div className="absolute bottom-3 right-3 text-[var(--text-footnote)] text-text-muted">
                  {customMessage.length}/500
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-background-secondary rounded-[var(--radius-md)] p-4 border border-border-primary">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                  Pro tip
                </h4>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  Reference something specific from {intro.name}'s profile to show you've taken the time to learn about them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="border-t border-border-primary bg-background p-4 safe-area-bottom">
        <Button
          variant="primary"
          size="large"
          onClick={handleSendMessage}
          disabled={!selectedStarter && !customMessage.trim()}
          className="w-full"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Send Message</span>
        </Button>
        <p className="text-[var(--text-footnote)] text-text-muted text-center mt-3">
          You can also reach out later from your Matches
        </p>
      </div>
    </div>
  );
}
