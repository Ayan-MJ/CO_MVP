import React from 'react';
import { Sparkles, Edit2, Check, AlertCircle } from 'lucide-react';
import { Input, TextArea } from '@/app/components/Input';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

interface ExtractedField {
  label: string;
  value: string;
  confidence: 'high' | 'medium' | 'low';
  editable: boolean;
  key: string;
}

interface AISummaryData {
  bio: string;
  personality: string[];
  lifestyle: string[];
  values: string[];
  interests: string[];
}

interface AISummaryReviewScreenProps {
  onContinue: (data: AISummaryData) => void;
  onBack: () => void;
  promptAnswers: any[];
}

export function AISummaryReviewScreen({
  onContinue,
  onBack,
  promptAnswers,
}: AISummaryReviewScreenProps) {
  // Simulate AI extraction from prompt answers
  const [extractedFields, setExtractedFields] = React.useState<ExtractedField[]>([
    {
      label: 'Bio Summary',
      value:
        'Creative professional who values deep conversations and outdoor adventures. Looking for a genuine connection built on shared values and mutual growth.',
      confidence: 'high',
      editable: true,
      key: 'bio',
    },
    {
      label: 'Personality Traits',
      value: 'Thoughtful, Adventurous, Creative, Empathetic',
      confidence: 'high',
      editable: true,
      key: 'personality',
    },
    {
      label: 'Lifestyle',
      value: 'Active, Social, Career-focused, Health-conscious',
      confidence: 'medium',
      editable: true,
      key: 'lifestyle',
    },
    {
      label: 'Core Values',
      value: 'Authenticity, Growth, Kindness, Ambition',
      confidence: 'high',
      editable: true,
      key: 'values',
    },
    {
      label: 'Interests',
      value: 'Hiking, Coffee culture, Design, Travel',
      confidence: 'medium',
      editable: true,
      key: 'interests',
    },
  ]);

  const [editingField, setEditingField] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState('');

  const startEditing = (field: ExtractedField) => {
    setEditingField(field.key);
    setEditValue(field.value);
  };

  const saveEdit = (key: string) => {
    setExtractedFields((fields) =>
      fields.map((f) => (f.key === key ? { ...f, value: editValue, confidence: 'high' } : f))
    );
    setEditingField(null);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const handleContinue = () => {
    const bioField = extractedFields.find((f) => f.key === 'bio');
    const personalityField = extractedFields.find((f) => f.key === 'personality');
    const lifestyleField = extractedFields.find((f) => f.key === 'lifestyle');
    const valuesField = extractedFields.find((f) => f.key === 'values');
    const interestsField = extractedFields.find((f) => f.key === 'interests');

    onContinue({
      bio: bioField?.value || '',
      personality: personalityField?.value.split(',').map((v) => v.trim()) || [],
      lifestyle: lifestyleField?.value.split(',').map((v) => v.trim()) || [],
      values: valuesField?.value.split(',').map((v) => v.trim()) || [],
      interests: interestsField?.value.split(',').map((v) => v.trim()) || [],
    });
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-error';
      default:
        return 'text-text-muted';
    }
  };

  const getConfidenceLabel = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'High confidence';
      case 'medium':
        return 'Medium confidence';
      case 'low':
        return 'Low confidence - please review';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Review Profile" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div className="p-4 rounded-[var(--radius-lg)] bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h2 className="mb-2">AI Profile Summary</h2>
                <p className="text-[var(--text-callout)] text-text-secondary">
                  We've analyzed your answers to create your profile. Review and edit anything that
                  doesn't feel right.
                </p>
              </div>
            </div>
          </div>

          {/* Extracted Fields */}
          <div className="space-y-4">
            {extractedFields.map((field) => (
              <div
                key={field.key}
                className="p-4 rounded-[var(--radius-md)] bg-surface border border-divider"
              >
                {/* Field Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-[var(--text-callout)] font-semibold text-text-primary">
                        {field.label}
                      </h4>
                      {field.confidence !== 'high' && (
                        <div
                          className={`w-2 h-2 rounded-full ${
                            field.confidence === 'medium' ? 'bg-warning' : 'bg-error'
                          }`}
                          title={getConfidenceLabel(field.confidence)}
                        />
                      )}
                    </div>
                    {field.confidence !== 'high' && (
                      <p className="text-[var(--text-caption)] text-text-muted">
                        {getConfidenceLabel(field.confidence)}
                      </p>
                    )}
                  </div>

                  {field.editable && editingField !== field.key && (
                    <button
                      onClick={() => startEditing(field)}
                      className="flex items-center gap-1 text-accent hover:opacity-70 transition-opacity"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="text-[var(--text-caption)] font-medium">Edit</span>
                    </button>
                  )}
                </div>

                {/* Field Value or Edit Mode */}
                {editingField === field.key ? (
                  <div className="space-y-3">
                    {field.key === 'bio' ? (
                      <TextArea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        rows={4}
                        autoFocus
                      />
                    ) : (
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        autoFocus
                      />
                    )}
                    <div className="flex gap-2">
                      <Button variant="primary" onClick={() => saveEdit(field.key)}>
                        <Check className="w-4 h-4" />
                        Save
                      </Button>
                      <Button variant="secondary" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[var(--text-callout)] text-text-primary leading-relaxed">
                    {field.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="p-4 rounded-[var(--radius-md)] bg-accent/10 border border-accent/20">
            <p className="text-[var(--text-footnote)] text-text-secondary">
              <span className="font-semibold">💡 Tip:</span> Yellow or red indicators suggest our AI
              is less certain. Take a moment to review those fields for accuracy.
            </p>
          </div>

          {/* Data Source */}
          <div className="text-center">
            <p className="text-[var(--text-caption)] text-text-muted">
              Generated from {promptAnswers.length} Life Map {promptAnswers.length === 1 ? 'answer' : 'answers'}
            </p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-4 border-t border-divider bg-surface">
        <Button variant="primary" size="large" onClick={handleContinue}>
          Looks Good, Continue
        </Button>
      </div>
    </div>
  );
}