import React from 'react';
import { Eye, Check, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';
import { PhotoGrid } from '@/app/components/Avatar';
import { TrustBadge } from '@/app/components/Safety';
import { Chip } from '@/app/components/Chip';

interface ProfileData {
  name: string;
  age: string;
  location: string;
  photos: string[];
  bio: string;
  personality: string[];
  lifestyle: string[];
  values: string[];
  interests: string[];
  education?: string;
  occupation?: string;
  height?: string;
}

interface ProfilePreviewScreenProps {
  onComplete: () => void;
  onBack: () => void;
  onEdit: (section: string) => void;
  profileData: ProfileData;
}

export function ProfilePreviewScreen({
  onComplete,
  onBack,
  onEdit,
  profileData,
}: ProfilePreviewScreenProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Profile Preview" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 pb-6">
          {/* Preview Mode Badge */}
          <div className="sticky top-0 z-10 bg-gradient-to-b from-background to-transparent pb-4">
            <div className="mx-4 mt-4 p-3 rounded-[var(--radius-md)] bg-accent/10 border border-accent/20 flex items-center gap-2">
              <Eye className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="text-[var(--text-footnote)] text-text-secondary">
                <span className="font-semibold">Preview mode:</span> This is what others will see
              </p>
            </div>
          </div>

          {/* Profile Header */}
          <div className="px-4">
            {/* Photos */}
            <div className="mb-4">
              <PhotoGrid photos={profileData.photos} />
              <button
                onClick={() => onEdit('photos')}
                className="mt-2 w-full py-2 text-[var(--text-callout)] text-accent font-semibold hover:opacity-70 transition-opacity"
              >
                Edit Photos
              </button>
            </div>

            {/* Name & Age with Trust Badge */}
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-[var(--text-large-title)] font-bold text-text-primary">
                {profileData.name}, {profileData.age}
              </h1>
              <TrustBadge verified photoVerified size="lg" />
            </div>

            {/* Location & Basics */}
            <div className="space-y-1 mb-4">
              <p className="text-[var(--text-callout)] text-text-secondary">
                📍 {profileData.location}
              </p>
              {profileData.occupation && (
                <p className="text-[var(--text-callout)] text-text-secondary">
                  💼 {profileData.occupation}
                </p>
              )}
              {profileData.education && (
                <p className="text-[var(--text-callout)] text-text-secondary">
                  🎓 {profileData.education}
                </p>
              )}
              {profileData.height && (
                <p className="text-[var(--text-callout)] text-text-secondary">
                  📏 {profileData.height}
                </p>
              )}
            </div>

            <button
              onClick={() => onEdit('basics')}
              className="text-[var(--text-callout)] text-accent font-semibold hover:opacity-70 transition-opacity"
            >
              Edit Basics
            </button>
          </div>

          {/* Bio */}
          <div className="px-4">
            <div className="p-4 rounded-[var(--radius-lg)] bg-surface border border-divider">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[var(--text-title-3)] font-semibold text-text-primary">
                  About Me
                </h3>
                <button
                  onClick={() => onEdit('bio')}
                  className="text-[var(--text-callout)] text-accent font-semibold hover:opacity-70 transition-opacity"
                >
                  Edit
                </button>
              </div>
              <p className="text-[var(--text-callout)] text-text-primary leading-relaxed">
                {profileData.bio}
              </p>
            </div>
          </div>

          {/* Personality */}
          {profileData.personality.length > 0 && (
            <div className="px-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[var(--text-title-3)] font-semibold text-text-primary">
                  Personality
                </h3>
                <button
                  onClick={() => onEdit('personality')}
                  className="text-[var(--text-callout)] text-accent font-semibold hover:opacity-70 transition-opacity"
                >
                  Edit
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.personality.map((trait) => (
                  <Chip key={trait} label={trait} selected={false} />
                ))}
              </div>
            </div>
          )}

          {/* Lifestyle */}
          {profileData.lifestyle.length > 0 && (
            <div className="px-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[var(--text-title-3)] font-semibold text-text-primary">
                  Lifestyle
                </h3>
                <button
                  onClick={() => onEdit('lifestyle')}
                  className="text-[var(--text-callout)] text-accent font-semibold hover:opacity-70 transition-opacity"
                >
                  Edit
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.lifestyle.map((item) => (
                  <Chip key={item} label={item} selected={false} />
                ))}
              </div>
            </div>
          )}

          {/* Values */}
          {profileData.values.length > 0 && (
            <div className="px-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[var(--text-title-3)] font-semibold text-text-primary">
                  Core Values
                </h3>
                <button
                  onClick={() => onEdit('values')}
                  className="text-[var(--text-callout)] text-accent font-semibold hover:opacity-70 transition-opacity"
                >
                  Edit
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.values.map((value) => (
                  <Chip key={value} label={value} selected={false} />
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {profileData.interests.length > 0 && (
            <div className="px-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[var(--text-title-3)] font-semibold text-text-primary">
                  Interests
                </h3>
                <button
                  onClick={() => onEdit('interests')}
                  className="text-[var(--text-callout)] text-accent font-semibold hover:opacity-70 transition-opacity"
                >
                  Edit
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest) => (
                  <Chip key={interest} label={interest} selected={false} />
                ))}
              </div>
            </div>
          )}

          {/* Trust & Safety Indicators */}
          <div className="mx-4 p-4 rounded-[var(--radius-lg)] bg-success/10 border border-success/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div>
                <h4 className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                  Verified Profile
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[var(--text-footnote)] text-text-secondary">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Phone verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-footnote)] text-text-secondary">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Photo verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-footnote)] text-text-secondary">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Profile reviewed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quality Check */}
          <div className="mx-4 p-4 rounded-[var(--radius-md)] bg-accent/10 border border-accent/20">
            <p className="text-[var(--text-footnote)] text-text-secondary text-center">
              <span className="font-semibold">✨ Profile Quality: Excellent</span>
              <br />
              Your profile is complete and optimized for high-quality matches
            </p>
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <div className="p-4 border-t border-divider bg-surface space-y-3">
        <Button variant="primary" size="large" onClick={onComplete}>
          <Check className="w-5 h-5" />
          Complete Profile
        </Button>
        <p className="text-[var(--text-caption)] text-text-muted text-center">
          You can edit your profile anytime from settings
        </p>
      </div>
    </div>
  );
}
