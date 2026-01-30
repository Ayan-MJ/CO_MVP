import React from 'react';
import { Heart, MessageCircle, Users, Settings, Star, Shield, Camera, Mail } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { Input, TextArea, OTPInput, SegmentedControl } from '@/app/components/Input';
import { Dropdown, DateTimePicker } from '@/app/components/Dropdown';
import { Chip, ChipGroup } from '@/app/components/Chip';
import { Card, ProfileCard, IntroCard, DatePlanCard } from '@/app/components/Card';
import { ListRow, Toggle, InfoRow, ListSection } from '@/app/components/ListRow';
import { TopBar, BottomTabBar } from '@/app/components/Navigation';
import { Toast, Banner, InlineError, EmptyState, LoadingSkeleton } from '@/app/components/Feedback';
import { Rating, MultiRating } from '@/app/components/Rating';
import { SafetyCard, TrustBadge } from '@/app/components/Safety';
import { Avatar, PhotoGrid, PhotoPicker } from '@/app/components/Avatar';

export function DesignSystemShowcase() {
  const [otpValue, setOtpValue] = React.useState('');
  const [segmentValue, setSegmentValue] = React.useState('preferences');
  const [selectedChips, setSelectedChips] = React.useState<string[]>(['reading']);
  const [dealbreakers, setDealbreakers] = React.useState<string[]>(['smoking']);
  const [toggleValue, setToggleValue] = React.useState(false);
  const [ratingValue, setRatingValue] = React.useState(4);
  const [dropdownValue, setDropdownValue] = React.useState('');
  const [dateValue, setDateValue] = React.useState<Date | null>(null);
  const [photos, setPhotos] = React.useState<(string | null)[]>([
    'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=400',
    'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=400',
    null,
    null,
    null,
    null,
  ]);
  const [multiRatings, setMultiRatings] = React.useState([
    { id: 'chemistry', label: 'Chemistry', value: 5 },
    { id: 'alignment', label: 'Value Alignment', value: 4 },
  ]);

  const interestChips = [
    { id: 'reading', label: 'Reading' },
    { id: 'travel', label: 'Travel' },
    { id: 'cooking', label: 'Cooking' },
    { id: 'fitness', label: 'Fitness' },
  ];

  const dealbreakerChips = [
    { id: 'smoking', label: 'Smoking' },
    { id: 'pets', label: 'No Pets' },
  ];

  const relationshipOptions = [
    { label: 'Long-term relationship', value: 'long-term' },
    { label: 'Life partner', value: 'life-partner' },
    { label: 'Exploring options', value: 'exploring' },
  ];

  return (
    <div className="p-4 space-y-8 pb-24">
      {/* Design Tokens */}
      <section>
        <h2 className="mb-4">Design Tokens</h2>
        
        <div className="space-y-4">
          {/* Colors */}
          <div>
            <h3 className="mb-3">Colors</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-[var(--radius-sm)] bg-background border border-divider">
                <div className="w-full h-8 bg-background rounded mb-2" />
                <p className="text-[var(--text-caption)] text-text-muted">Background</p>
              </div>
              <div className="p-3 rounded-[var(--radius-sm)] bg-surface border border-divider">
                <div className="w-full h-8 bg-surface rounded mb-2" />
                <p className="text-[var(--text-caption)] text-text-muted">Surface</p>
              </div>
              <div className="p-3 rounded-[var(--radius-sm)] bg-accent border border-divider">
                <div className="w-full h-8 bg-accent rounded mb-2" />
                <p className="text-[var(--text-caption)] text-text-primary">Accent</p>
              </div>
              <div className="p-3 rounded-[var(--radius-sm)] bg-success border border-divider">
                <div className="w-full h-8 bg-success rounded mb-2" />
                <p className="text-[var(--text-caption)] text-text-primary">Success</p>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 className="mb-3">Typography</h3>
            <div className="space-y-2 p-3 rounded-[var(--radius-sm)] bg-surface">
              <p className="text-[var(--text-large-title)] font-bold">Large Title</p>
              <p className="text-[var(--text-title-1)] font-bold">Title 1</p>
              <p className="text-[var(--text-body)]">Body Text</p>
              <p className="text-[var(--text-callout)]">Callout</p>
              <p className="text-[var(--text-footnote)]">Footnote</p>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h3 className="mb-3">Buttons</h3>
        <div className="space-y-2">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="tertiary">Tertiary Button</Button>
          <Button variant="destructive">Destructive Button</Button>
          <Button variant="primary" loading>Loading...</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h3 className="mb-3">Inputs</h3>
        <div className="space-y-3">
          <Input label="Email" placeholder="your@email.com" />
          <Input label="With Error" placeholder="Invalid" error="This field is required" />
          <TextArea label="About Me" placeholder="Tell us about yourself..." />
          
          <div>
            <label className="block mb-2 text-[var(--text-callout)] font-medium text-text-primary">
              OTP Code
            </label>
            <OTPInput value={otpValue} onChange={setOtpValue} />
          </div>
          
          <div>
            <label className="block mb-2 text-[var(--text-callout)] font-medium text-text-primary">
              Tab Selection
            </label>
            <SegmentedControl
              options={[
                { label: 'Preferences', value: 'preferences' },
                { label: 'Dealbreakers', value: 'dealbreakers' },
              ]}
              value={segmentValue}
              onChange={setSegmentValue}
            />
          </div>

          <Dropdown
            label="Relationship Goal"
            placeholder="Select your goal"
            options={relationshipOptions}
            value={dropdownValue}
            onChange={setDropdownValue}
          />

          <DateTimePicker
            label="Date Preference"
            value={dateValue}
            onChange={setDateValue}
            mode="date"
          />
        </div>
      </section>

      {/* Chips */}
      <section>
        <h3 className="mb-3">Chips & Tags</h3>
        <div className="space-y-3">
          <div>
            <p className="text-[var(--text-callout)] text-text-muted mb-2">Interests</p>
            <ChipGroup
              chips={interestChips}
              selectedIds={selectedChips}
              onSelectionChange={setSelectedChips}
            />
          </div>
          <div>
            <p className="text-[var(--text-callout)] text-text-muted mb-2">Dealbreakers</p>
            <ChipGroup
              chips={dealbreakerChips}
              selectedIds={dealbreakers}
              onSelectionChange={setDealbreakers}
              variant="dealbreaker"
            />
          </div>
        </div>
      </section>

      {/* List Rows */}
      <section>
        <h3 className="mb-3">List Rows</h3>
        <ListSection title="Settings">
          <ListRow label="Notifications" disclosure onClick={() => {}} />
          <ListRow
            label="Push Notifications"
            toggle={{ checked: toggleValue, onChange: setToggleValue }}
          />
          <ListRow label="Privacy" disclosure onClick={() => {}} />
        </ListSection>
      </section>

      {/* Avatars & Photos */}
      <section>
        <h3 className="mb-3">Avatars & Photos</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar size="sm" fallback="JD" />
            <Avatar size="md" fallback="JD" online />
            <Avatar size="lg" fallback="JD" />
            <Avatar size="xl" fallback="JD" />
          </div>

          <div>
            <p className="text-[var(--text-callout)] text-text-muted mb-2">Photo Picker</p>
            <PhotoPicker
              photos={photos}
              maxPhotos={6}
              onAddPhoto={(index) => console.log('Add photo at', index)}
              onRemovePhoto={(index) => {
                const newPhotos = [...photos];
                newPhotos[index] = null;
                setPhotos(newPhotos);
              }}
            />
          </div>
        </div>
      </section>

      {/* Rating */}
      <section>
        <h3 className="mb-3">Rating Controls</h3>
        <div className="space-y-4">
          <Rating
            label="Overall Experience"
            value={ratingValue}
            onChange={setRatingValue}
          />
          <MultiRating
            ratings={multiRatings}
            onChange={(id, value) =>
              setMultiRatings((prev) =>
                prev.map((r) => (r.id === id ? { ...r, value } : r))
              )
            }
          />
        </div>
      </section>

      {/* Feedback */}
      <section>
        <h3 className="mb-3">Feedback Components</h3>
        <div className="space-y-3">
          <Toast message="Profile updated successfully" type="success" />
          <Toast message="An error occurred" type="error" />
          <Banner message="Complete your profile to get better matches" type="info" />
          <InlineError message="Please fill in all required fields" />
          
          <EmptyState
            icon={<MessageCircle className="w-8 h-8" />}
            title="No messages yet"
            description="Start a conversation"
            action={{ label: 'Browse', onClick: () => {} }}
          />
        </div>
      </section>

      {/* Safety */}
      <section>
        <h3 className="mb-3">Safety & Trust</h3>
        <div className="space-y-3">
          <SafetyCard variant="tips" />
          <div className="flex items-center gap-2">
            <span className="text-[var(--text-callout)] text-text-primary">Jane Doe</span>
            <TrustBadge verified photoVerified />
          </div>
        </div>
      </section>

      {/* Loading States */}
      <section>
        <h3 className="mb-3">Loading States</h3>
        <div className="space-y-3">
          <LoadingSkeleton variant="profile" />
          <LoadingSkeleton variant="intro" />
          <LoadingSkeleton variant="card" />
        </div>
      </section>
    </div>
  );
}
