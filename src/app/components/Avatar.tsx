import React from 'react';
import { User, Plus, Camera } from 'lucide-react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  online?: boolean;
}

export function Avatar({ src, alt, size = 'md', fallback, online }: AvatarProps) {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-xl',
  };
  
  const onlineDotSize = {
    sm: 'w-2 h-2 border',
    md: 'w-3 h-3 border-2',
    lg: 'w-4 h-4 border-2',
    xl: 'w-5 h-5 border-2',
  };
  
  return (
    <div className="relative inline-block">
      <div className={`${sizeStyles[size]} rounded-full overflow-hidden bg-surface border border-divider flex items-center justify-center`}>
        {src ? (
          <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
        ) : fallback ? (
          <span className="font-semibold text-text-primary">{fallback}</span>
        ) : (
          <User className="w-1/2 h-1/2 text-text-muted" />
        )}
      </div>
      {online && (
        <div className={`absolute bottom-0 right-0 ${onlineDotSize[size]} rounded-full bg-success border-background`} />
      )}
    </div>
  );
}

export interface PhotoGridProps {
  photos: string[];
  maxPhotos?: number;
  onPhotoClick?: (index: number) => void;
}

export function PhotoGrid({ photos, maxPhotos = 6, onPhotoClick }: PhotoGridProps) {
  const displayPhotos = photos.slice(0, maxPhotos);
  
  return (
    <div className="grid grid-cols-3 gap-2">
      {displayPhotos.map((photo, index) => (
        <div
          key={index}
          onClick={() => onPhotoClick?.(index)}
          className="aspect-square rounded-[var(--radius-sm)] overflow-hidden bg-surface cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
      {displayPhotos.length < maxPhotos && (
        Array.from({ length: maxPhotos - displayPhotos.length }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="aspect-square rounded-[var(--radius-sm)] bg-input-background border border-dashed border-divider"
          />
        ))
      )}
    </div>
  );
}

export interface PhotoPickerProps {
  photos: (string | null)[];
  maxPhotos?: number;
  onAddPhoto?: (index: number) => void;
  onRemovePhoto?: (index: number) => void;
}

export function PhotoPicker({
  photos,
  maxPhotos = 6,
  onAddPhoto,
  onRemovePhoto,
}: PhotoPickerProps) {
  const slots = Array.from({ length: maxPhotos }, (_, i) => photos[i] || null);
  
  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((photo, index) => (
        <div
          key={index}
          className="aspect-square rounded-[var(--radius-sm)] overflow-hidden bg-surface relative"
        >
          {photo ? (
            <>
              <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => onRemovePhoto?.(index)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <Plus className="w-4 h-4 text-white rotate-45" />
              </button>
            </>
          ) : (
            <button
              onClick={() => onAddPhoto?.(index)}
              className="w-full h-full bg-input-background border-2 border-dashed border-divider hover:border-accent flex items-center justify-center transition-colors"
            >
              <div className="text-center">
                <Camera className="w-6 h-6 text-text-muted mx-auto mb-1" />
                <span className="text-[var(--text-caption)] text-text-muted">Add Photo</span>
              </div>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
