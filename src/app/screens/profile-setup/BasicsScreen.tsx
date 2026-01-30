import React from 'react';
import { Input } from '@/app/components/Input';
import { Dropdown } from '@/app/components/Dropdown';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

interface BasicsData {
  name: string;
  age: string;
  height?: string;
  language: string;
  education?: string;
  occupation?: string;
}

interface BasicsScreenProps {
  onContinue: (data: BasicsData) => void;
  onBack: () => void;
  initialData?: Partial<BasicsData>;
}

export function BasicsScreen({ onContinue, onBack, initialData }: BasicsScreenProps) {
  const [formData, setFormData] = React.useState<BasicsData>({
    name: initialData?.name || '',
    age: initialData?.age || '',
    height: initialData?.height || '',
    language: initialData?.language || 'English',
    education: initialData?.education || '',
    occupation: initialData?.occupation || '',
  });

  const [errors, setErrors] = React.useState<Partial<Record<keyof BasicsData, string>>>({});

  const heightOptions = [
    { label: 'Prefer not to say', value: '' },
    ...Array.from({ length: 30 }, (_, i) => {
      const inches = 54 + i; // 4'6" to 7'0"
      const feet = Math.floor(inches / 12);
      const remainingInches = inches % 12;
      return {
        label: `${feet}'${remainingInches}"`,
        value: `${feet}'${remainingInches}"`,
      };
    }),
  ];

  const languageOptions = [
    { label: 'English', value: 'English' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'French', value: 'French' },
    { label: 'German', value: 'German' },
    { label: 'Italian', value: 'Italian' },
    { label: 'Portuguese', value: 'Portuguese' },
    { label: 'Mandarin', value: 'Mandarin' },
    { label: 'Japanese', value: 'Japanese' },
    { label: 'Korean', value: 'Korean' },
    { label: 'Arabic', value: 'Arabic' },
    { label: 'Hindi', value: 'Hindi' },
    { label: 'Other', value: 'Other' },
  ];

  const educationOptions = [
    { label: 'Prefer not to say', value: '' },
    { label: 'High School', value: 'High School' },
    { label: 'Some College', value: 'Some College' },
    { label: "Bachelor's Degree", value: "Bachelor's Degree" },
    { label: "Master's Degree", value: "Master's Degree" },
    { label: 'PhD/Doctorate', value: 'PhD/Doctorate' },
    { label: 'Trade School', value: 'Trade School' },
    { label: 'Other', value: 'Other' },
  ];

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BasicsData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const ageNum = parseInt(formData.age);
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(ageNum) || ageNum < 18 || ageNum > 99) {
      newErrors.age = 'Age must be between 18 and 99';
    }

    if (!formData.language) {
      newErrors.language = 'Language is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onContinue(formData);
    }
  };

  const updateField = (field: keyof BasicsData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Basic Info" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Header */}
          <div>
            <h2 className="mb-2">Tell us about yourself</h2>
            <p className="text-[var(--text-callout)] text-text-secondary">
              Help us create your profile. Required fields are marked, others are optional.
            </p>
          </div>

          {/* Required Fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-0.5 flex-1 bg-divider" />
              <span className="text-[var(--text-caption)] text-text-muted uppercase tracking-wide">
                Required
              </span>
              <div className="h-0.5 flex-1 bg-divider" />
            </div>

            <Input
              label="First Name"
              placeholder="What should we call you?"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              error={errors.name}
              autoFocus
            />

            <Input
              label="Age"
              type="number"
              placeholder="Your age"
              value={formData.age}
              onChange={(e) => updateField('age', e.target.value)}
              error={errors.age}
            />

            <Dropdown
              label="Primary Language"
              options={languageOptions}
              value={formData.language}
              onChange={(value) => updateField('language', value)}
              error={errors.language}
            />
          </div>

          {/* Optional Fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-0.5 flex-1 bg-divider" />
              <span className="text-[var(--text-caption)] text-text-muted uppercase tracking-wide">
                Optional (Helps with matching)
              </span>
              <div className="h-0.5 flex-1 bg-divider" />
            </div>

            <Dropdown
              label="Height"
              options={heightOptions}
              value={formData.height || ''}
              onChange={(value) => updateField('height', value)}
            />

            <Dropdown
              label="Education"
              options={educationOptions}
              value={formData.education || ''}
              onChange={(value) => updateField('education', value)}
            />

            <Input
              label="Occupation"
              placeholder="e.g., Product Designer, Teacher"
              value={formData.occupation}
              onChange={(e) => updateField('occupation', e.target.value)}
            />
          </div>

          {/* Privacy Note */}
          <div className="p-4 rounded-[var(--radius-md)] bg-surface border border-divider">
            <p className="text-[var(--text-footnote)] text-text-muted text-center">
              Your information is private and only shown to verified members you match with
            </p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-4 border-t border-divider bg-surface">
        <Button variant="primary" size="large" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}