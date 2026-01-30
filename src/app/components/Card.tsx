import React from 'react';
import { Heart, X, MessageCircle, MapPin, Briefcase, GraduationCap } from 'lucide-react';

export interface CardProps {
  children: React.ReactNode;
  elevated?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, elevated = false, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-[var(--radius-md)] border border-divider
        ${elevated ? 'bg-elevated-surface shadow-[var(--shadow-lg)]' : 'bg-surface shadow-[var(--shadow-sm)]'}
        ${onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export interface ProfileCardProps {
  name: string;
  age: number;
  location: string;
  occupation?: string;
  education?: string;
  bio?: string;
  images: string[];
  onLike?: () => void;
  onPass?: () => void;
  onMessage?: () => void;
}

export function ProfileCard({
  name,
  age,
  location,
  occupation,
  education,
  bio,
  images,
  onLike,
  onPass,
  onMessage,
}: ProfileCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  return (
    <Card elevated className="overflow-hidden w-full max-w-sm">
      {/* Image Stack */}
      <div className="relative aspect-[3/4] bg-surface">
        <img
          src={images[currentImageIndex]}
          alt={`${name}'s photo ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Image indicators */}
        <div className="absolute top-3 left-3 right-3 flex gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-0.5 flex-1 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Info overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-[var(--text-title-1)] font-bold mb-1">
            {name}, {age}
          </h3>
          <div className="flex items-center gap-1.5 text-[var(--text-callout)] mb-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          {occupation && (
            <div className="flex items-center gap-1.5 text-[var(--text-footnote)] mb-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{occupation}</span>
            </div>
          )}
          {education && (
            <div className="flex items-center gap-1.5 text-[var(--text-footnote)]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{education}</span>
            </div>
          )}
        </div>
      </div>
      
      {bio && (
        <div className="p-4">
          <p className="text-[var(--text-callout)] text-text-secondary line-clamp-3">{bio}</p>
        </div>
      )}
      
      {/* Action buttons */}
      {(onLike || onPass || onMessage) && (
        <div className="p-4 flex items-center justify-center gap-4">
          {onPass && (
            <button
              onClick={onPass}
              className="w-14 h-14 rounded-full bg-surface border-2 border-divider flex items-center justify-center hover:bg-elevated-surface active:scale-95 transition-all"
            >
              <X className="w-6 h-6 text-text-secondary" />
            </button>
          )}
          {onMessage && (
            <button
              onClick={onMessage}
              className="w-12 h-12 rounded-full bg-surface border border-divider flex items-center justify-center hover:bg-elevated-surface active:scale-95 transition-all"
            >
              <MessageCircle className="w-5 h-5 text-accent" />
            </button>
          )}
          {onLike && (
            <button
              onClick={onLike}
              className="w-14 h-14 rounded-full bg-accent flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              <Heart className="w-6 h-6 text-accent-foreground" fill="currentColor" />
            </button>
          )}
        </div>
      )}
    </Card>
  );
}

export interface IntroCardProps {
  from: string;
  message: string;
  timestamp: string;
  imageUrl: string;
  onAccept?: () => void;
  onDecline?: () => void;
}

export function IntroCard({
  from,
  message,
  timestamp,
  imageUrl,
  onAccept,
  onDecline,
}: IntroCardProps) {
  return (
    <Card className="p-4">
      <div className="flex gap-3 mb-3">
        <img
          src={imageUrl}
          alt={from}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="text-[var(--text-callout)] font-semibold text-text-primary">{from}</h4>
          <p className="text-[var(--text-footnote)] text-text-muted">{timestamp}</p>
        </div>
      </div>
      <p className="text-[var(--text-callout)] text-text-secondary mb-4">{message}</p>
      {(onAccept || onDecline) && (
        <div className="flex gap-2">
          {onDecline && (
            <button
              onClick={onDecline}
              className="flex-1 h-10 rounded-[var(--radius-sm)] bg-surface border border-divider text-[var(--text-callout)] font-medium text-text-secondary hover:bg-elevated-surface active:scale-[0.98] transition-all"
            >
              Decline
            </button>
          )}
          {onAccept && (
            <button
              onClick={onAccept}
              className="flex-1 h-10 rounded-[var(--radius-sm)] bg-accent text-[var(--text-callout)] font-semibold text-accent-foreground hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Accept
            </button>
          )}
        </div>
      )}
    </Card>
  );
}

export interface DatePlanCardProps {
  title: string;
  location: string;
  date: string;
  time: string;
  imageUrl: string;
  status?: 'pending' | 'confirmed' | 'completed';
  onView?: () => void;
}

export function DatePlanCard({
  title,
  location,
  date,
  time,
  imageUrl,
  status = 'pending',
  onView,
}: DatePlanCardProps) {
  const statusColors = {
    pending: 'bg-warning/20 text-warning',
    confirmed: 'bg-success/20 text-success',
    completed: 'bg-surface text-text-muted',
  };
  
  const statusLabels = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    completed: 'Completed',
  };
  
  return (
    <Card elevated onClick={onView} className="overflow-hidden">
      <div className="flex">
        <img
          src={imageUrl}
          alt={title}
          className="w-24 h-24 object-cover"
        />
        <div className="flex-1 p-3">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-[var(--text-callout)] font-semibold text-text-primary">{title}</h4>
            <span className={`px-2 py-0.5 rounded-full text-[var(--text-caption)] font-medium ${statusColors[status]}`}>
              {statusLabels[status]}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-[var(--text-footnote)] text-text-secondary flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              {location}
            </p>
            <p className="text-[var(--text-footnote)] text-text-muted">
              {date} • {time}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
