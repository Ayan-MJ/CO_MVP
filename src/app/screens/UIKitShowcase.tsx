import React from 'react';
import { Heart, MessageCircle, Users, Shield, Calendar, Search } from 'lucide-react';
import { ProfileCard, IntroCard, DatePlanCard } from '@/app/components/Card';
import { ListRow, ListSection } from '@/app/components/ListRow';
import { PhotoGrid } from '@/app/components/Avatar';
import { EmptyState } from '@/app/components/Feedback';

export function UIKitShowcase() {
  return (
    <div className="p-4 space-y-8 pb-24">
      {/* Profile Card Example */}
      <section>
        <h2 className="mb-4">Profile Card</h2>
        <ProfileCard
          name="Sarah"
          age={28}
          location="San Francisco, CA"
          occupation="Product Designer"
          education="Stanford University"
          bio="Coffee enthusiast, design lover, and adventure seeker. Looking for someone who values deep conversations and spontaneous weekend trips."
          images={[
            'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2OTcyMDUyNHww&ixlib=rb-4.1.0&q=80&w=1080',
          ]}
          onLike={() => console.log('Liked')}
          onPass={() => console.log('Passed')}
          onMessage={() => console.log('Message')}
        />
      </section>

      {/* Intro Cards */}
      <section>
        <h2 className="mb-4">Intro Cards</h2>
        <div className="space-y-3">
          <IntroCard
            from="Michael"
            message="Hi! I noticed we both love hiking and coffee. Would you like to grab a cup sometime?"
            timestamp="2 hours ago"
            imageUrl="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3Njk2Nzg3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            onAccept={() => console.log('Accepted')}
            onDecline={() => console.log('Declined')}
          />
        </div>
      </section>

      {/* Date Plan Cards */}
      <section>
        <h2 className="mb-4">Date Plans</h2>
        <div className="space-y-3">
          <DatePlanCard
            title="Coffee at Blue Bottle"
            location="Ferry Building"
            date="March 15, 2026"
            time="2:00 PM"
            imageUrl="https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY5NjkxNTY4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            status="confirmed"
            onView={() => console.log('View date')}
          />
          <DatePlanCard
            title="Dinner at Mission Chinese"
            location="Mission District"
            date="March 22, 2026"
            time="7:30 PM"
            imageUrl="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400"
            status="pending"
            onView={() => console.log('View date')}
          />
        </div>
      </section>

      {/* Settings List */}
      <section>
        <h2 className="mb-4">Settings List</h2>
        <ListSection title="Account">
          <ListRow
            label="Profile"
            icon={<Users className="w-5 h-5" />}
            disclosure
            onClick={() => {}}
          />
          <ListRow
            label="Preferences"
            icon={<Heart className="w-5 h-5" />}
            disclosure
            onClick={() => {}}
          />
          <ListRow
            label="Safety & Privacy"
            icon={<Shield className="w-5 h-5" />}
            disclosure
            onClick={() => {}}
          />
        </ListSection>
      </section>

      {/* Photo Grid */}
      <section>
        <h2 className="mb-4">Photo Grid</h2>
        <PhotoGrid
          photos={[
            'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=400',
            'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=400',
            'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400',
          ]}
          onPhotoClick={(index) => console.log('Photo clicked:', index)}
        />
      </section>

      {/* Empty States */}
      <section>
        <h2 className="mb-4">Empty States</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-[var(--text-callout)] text-text-muted mb-3">No Messages</h3>
            <EmptyState
              icon={<MessageCircle className="w-8 h-8" />}
              title="No messages yet"
              description="Start a conversation to get to know someone better"
              action={{ label: 'Browse Profiles', onClick: () => console.log('Browse') }}
            />
          </div>

          <div>
            <h3 className="text-[var(--text-callout)] text-text-muted mb-3">No Matches</h3>
            <EmptyState
              icon={<Heart className="w-8 h-8" />}
              title="No matches yet"
              description="Complete your profile to start receiving curated introductions"
              action={{ label: 'Complete Profile', onClick: () => console.log('Profile') }}
            />
          </div>

          <div>
            <h3 className="text-[var(--text-callout)] text-text-muted mb-3">No Upcoming Dates</h3>
            <EmptyState
              icon={<Calendar className="w-8 h-8" />}
              title="No dates scheduled"
              description="Plan a date with one of your matches to see it here"
            />
          </div>

          <div>
            <h3 className="text-[var(--text-callout)] text-text-muted mb-3">Search Results</h3>
            <EmptyState
              icon={<Search className="w-8 h-8" />}
              title="No results found"
              description="Try adjusting your search criteria or filters"
              action={{ label: 'Clear Filters', onClick: () => console.log('Clear') }}
            />
          </div>

          <div>
            <h3 className="text-[var(--text-callout)] text-text-muted mb-3">No Introductions</h3>
            <EmptyState
              icon={<Users className="w-8 h-8" />}
              title="No new introductions this week"
              description="We're carefully selecting matches for you. Check back soon!"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
