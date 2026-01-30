import React from 'react';
import { Star } from 'lucide-react';

export interface RatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Rating({
  value,
  max = 5,
  onChange,
  label,
  readonly = false,
  size = 'md',
}: RatingProps) {
  const [hoveredValue, setHoveredValue] = React.useState<number | null>(null);
  
  const sizeStyles = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };
  
  const displayValue = hoveredValue ?? value;
  
  return (
    <div>
      {label && (
        <label className="block mb-2 text-[var(--text-callout)] font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="flex gap-1">
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayValue;
          
          return (
            <button
              key={index}
              type="button"
              onClick={() => !readonly && onChange?.(starValue)}
              onMouseEnter={() => !readonly && setHoveredValue(starValue)}
              onMouseLeave={() => !readonly && setHoveredValue(null)}
              disabled={readonly}
              className={`
                transition-all
                ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                ${isFilled ? 'text-accent' : 'text-divider'}
              `}
            >
              <Star
                className={sizeStyles[size]}
                fill={isFilled ? 'currentColor' : 'none'}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export interface MultiRatingProps {
  ratings: {
    id: string;
    label: string;
    value: number;
  }[];
  onChange?: (id: string, value: number) => void;
  readonly?: boolean;
}

export function MultiRating({ ratings, onChange, readonly = false }: MultiRatingProps) {
  return (
    <div className="space-y-4">
      {ratings.map((rating) => (
        <Rating
          key={rating.id}
          label={rating.label}
          value={rating.value}
          onChange={(value) => onChange?.(rating.id, value)}
          readonly={readonly}
        />
      ))}
    </div>
  );
}
