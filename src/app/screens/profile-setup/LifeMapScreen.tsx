import React from 'react';
import { Mic, Check, Sparkles } from 'lucide-react';
import { TextArea } from '@/app/components/Input';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

interface PromptAnswer {
  promptId: string;
  prompt: string;
  answer: string;
  hasVoiceRecording?: boolean;
}

interface LifeMapScreenProps {
  onContinue: (answers: PromptAnswer[]) => void;
  onBack: () => void;
  initialAnswers?: PromptAnswer[];
}

const lifeMapPrompts = [
  {
    id: 'weekend',
    prompt: 'My ideal weekend looks like...',
    placeholder: 'Describe what recharges you...',
    helperText: 'Share how you like to spend your downtime',
  },
  {
    id: 'values',
    prompt: 'What I value most in a partner is...',
    placeholder: 'What qualities matter most to you?',
    helperText: "Be specific about what you're looking for",
  },
  {
    id: 'future',
    prompt: 'In 5 years, I see myself...',
    placeholder: 'Where are you headed in life?',
    helperText: 'Share your vision for the future',
  },
  {
    id: 'passion',
    prompt: 'I\'m most passionate about...',
    placeholder: 'What gets you excited?',
    helperText: 'Could be work, hobbies, causes, or interests',
  },
  {
    id: 'growth',
    prompt: 'Right now I\'m working on...',
    placeholder: 'Personal or professional growth...',
    helperText: 'Show what you\'re focusing on currently',
  },
];

export function LifeMapScreen({ onContinue, onBack, initialAnswers = [] }: LifeMapScreenProps) {
  const [currentPromptIndex, setCurrentPromptIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<PromptAnswer[]>(initialAnswers);
  const [currentAnswer, setCurrentAnswer] = React.useState('');
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordingSeconds, setRecordingSeconds] = React.useState(0);
  const recordingIntervalRef = React.useRef<number | null>(null);
  const recordingTimeoutRef = React.useRef<number | null>(null);

  const minPrompts = 3;
  const maxPrompts = 5;
  const currentPrompt = lifeMapPrompts[currentPromptIndex];
  const answeredCount = answers.length;
  const canContinue = answeredCount >= minPrompts;
  const canAddMore = answeredCount < maxPrompts && currentPromptIndex < lifeMapPrompts.length - 1;

  React.useEffect(() => {
    // Load existing answer if available
    const existingAnswer = answers.find((a) => a.promptId === currentPrompt.id);
    setCurrentAnswer(existingAnswer?.answer || '');
  }, [currentPromptIndex, currentPrompt.id, answers]);

  React.useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else if (recordingIntervalRef.current) {
      window.clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }

    return () => {
      if (recordingIntervalRef.current) {
        window.clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    };
  }, [isRecording]);

  React.useEffect(() => {
    return () => {
      if (recordingTimeoutRef.current) {
        window.clearTimeout(recordingTimeoutRef.current);
        recordingTimeoutRef.current = null;
      }
    };
  }, []);

  const handleSaveAndNext = () => {
    if (currentAnswer.trim()) {
      const newAnswer: PromptAnswer = {
        promptId: currentPrompt.id,
        prompt: currentPrompt.prompt,
        answer: currentAnswer.trim(),
      };

      // Update or add answer
      const existingIndex = answers.findIndex((a) => a.promptId === currentPrompt.id);
      let updatedAnswers;
      if (existingIndex >= 0) {
        updatedAnswers = [...answers];
        updatedAnswers[existingIndex] = newAnswer;
      } else {
        updatedAnswers = [...answers, newAnswer];
      }
      setAnswers(updatedAnswers);

      // Move to next prompt if available
      if (currentPromptIndex < lifeMapPrompts.length - 1) {
        setCurrentPromptIndex(currentPromptIndex + 1);
        setCurrentAnswer('');
      }
    }
  };

  const handleSkipPrompt = () => {
    if (currentPromptIndex < lifeMapPrompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      setCurrentAnswer('');
    }
  };

  const handleVoiceCapture = () => {
    if (isRecording) {
      if (recordingTimeoutRef.current) {
        window.clearTimeout(recordingTimeoutRef.current);
        recordingTimeoutRef.current = null;
      }
      setIsRecording(false);
      setRecordingSeconds(0);
      return;
    }

    setRecordingSeconds(0);
    setIsRecording(true);
    // In real app: start/stop voice recording and transcribe
    recordingTimeoutRef.current = window.setTimeout(() => {
      setIsRecording(false);
      setRecordingSeconds(0);
      // Simulate transcription
      setCurrentAnswer(
        currentAnswer +
          (currentAnswer ? ' ' : '') +
          'This is a simulated voice transcription...'
      );
    }, 2000);
  };

  const isAnswered = answers.some((a) => a.promptId === currentPrompt.id);
  const formattedRecordingTime = `${Math.floor(recordingSeconds / 60)}:${String(
    recordingSeconds % 60
  ).padStart(2, '0')}`;

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Life Map" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <h2>Share your story</h2>
            </div>
            <p className="text-[var(--text-callout)] text-text-secondary">
              Answer {minPrompts}–{maxPrompts} prompts. Your answers help AI create meaningful matches.
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-callout)] text-text-muted">
              {answeredCount} of {minPrompts} minimum answered
            </span>
            <div className="flex gap-1.5">
              {lifeMapPrompts.slice(0, maxPrompts).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx < answeredCount
                      ? 'bg-accent w-6'
                      : idx === currentPromptIndex
                      ? 'bg-accent/40 w-6'
                      : 'bg-divider w-4'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Current Prompt */}
          <div className="space-y-4">
            <div className="p-4 rounded-[var(--radius-lg)] bg-surface border border-divider">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-[var(--text-title-3)] font-semibold text-text-primary">
                  {currentPrompt.prompt}
                </h3>
                {isAnswered && (
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                )}
              </div>
              <p className="text-[var(--text-footnote)] text-text-muted">
                {currentPrompt.helperText}
              </p>
            </div>

            <TextArea
              placeholder={currentPrompt.placeholder}
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              rows={6}
            />

            {/* Voice Capture */}
            <button
              onClick={handleVoiceCapture}
              className={`w-full p-4 rounded-[var(--radius-md)] border transition-all flex items-center justify-center gap-2 ${
                isRecording
                  ? 'bg-error/10 border-error text-error'
                  : 'bg-surface border-divider text-text-primary hover:bg-elevated-surface'
              }`}
            >
              <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
              <span className="text-[var(--text-callout)] font-medium">
                {isRecording ? 'Recording... (tap to stop)' : 'Speak your answer'}
              </span>
              <span className="text-[var(--text-footnote)] tabular-nums text-text-muted">
                {formattedRecordingTime}
              </span>
            </button>

            <p className="text-[var(--text-caption)] text-text-muted text-center">
              {isRecording ? 'Tap to stop • Max 60s per prompt' : 'Max 60s per prompt'}
            </p>

            <p className="text-[var(--text-caption)] text-text-muted text-center">
              💡 Speaking your answer helps our AI understand your personality better
            </p>
          </div>

          {/* Answered Prompts Summary */}
          {answers.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-0.5 flex-1 bg-divider" />
                <span className="text-[var(--text-caption)] text-text-muted uppercase tracking-wide">
                  Your Answers
                </span>
                <div className="h-0.5 flex-1 bg-divider" />
              </div>
              {answers.map((answer, idx) => (
                <button
                  key={answer.promptId}
                  onClick={() => {
                    const promptIndex = lifeMapPrompts.findIndex((p) => p.id === answer.promptId);
                    setCurrentPromptIndex(promptIndex);
                  }}
                  className="w-full p-3 rounded-[var(--radius-md)] bg-surface border border-divider text-left hover:bg-elevated-surface transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-success/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--text-caption)] text-text-muted mb-1">
                        {answer.prompt}
                      </p>
                      <p className="text-[var(--text-callout)] text-text-primary truncate">
                        {answer.answer}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-divider bg-surface space-y-2">
        {currentAnswer.trim() && (
          <Button variant="primary" size="large" onClick={handleSaveAndNext}>
            {canAddMore ? 'Save & Next Prompt' : 'Save Answer'}
          </Button>
        )}

        {canContinue ? (
          <Button variant="secondary" onClick={() => onContinue(answers)}>
            Continue to Review ({answeredCount} answers)
          </Button>
        ) : (
          <Button variant="tertiary" onClick={handleSkipPrompt} disabled={!canAddMore}>
            Skip This Prompt
          </Button>
        )}

        <p className="text-[var(--text-footnote)] text-text-muted text-center">
          {canContinue
            ? canAddMore
              ? `You can add ${maxPrompts - answeredCount} more ${maxPrompts - answeredCount === 1 ? 'answer' : 'answers'}`
              : 'All prompts answered!'
            : `${minPrompts - answeredCount} more ${minPrompts - answeredCount === 1 ? 'answer' : 'answers'} required`}
        </p>
      </div>
    </div>
  );
}
