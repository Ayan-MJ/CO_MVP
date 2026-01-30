import React from 'react';
import { Camera, X, Info, GripVertical, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { TopBar } from '@/app/components/Navigation';

interface Photo {
  id: string;
  url: string;
  isPrimary?: boolean;
}

interface PhotoUploadScreenProps {
  onContinue: (photos: Photo[]) => void;
  onBack: () => void;
  initialPhotos?: Photo[];
}

export function PhotoUploadScreen({ onContinue, onBack, initialPhotos = [] }: PhotoUploadScreenProps) {
  const [photos, setPhotos] = React.useState<Photo[]>(initialPhotos);
  const [showTips, setShowTips] = React.useState(false);
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const minPhotos = 3;
  const maxPhotos = 5;
  const canContinue = photos.length >= minPhotos;

  const handleAddPhoto = () => {
    if (photos.length < maxPhotos) {
      // Simulate photo upload - in real app, open camera/gallery
      const newPhoto: Photo = {
        id: Date.now().toString(),
        url: `https://images.unsplash.com/photo-${1649589244330 + photos.length}?w=400`,
        isPrimary: photos.length === 0,
      };
      setPhotos([...photos, newPhoto]);
    }
  };

  const handleRemovePhoto = (id: string) => {
    const updatedPhotos = photos.filter((p) => p.id !== id);
    // If removed primary, make first photo primary
    if (updatedPhotos.length > 0 && !updatedPhotos.some((p) => p.isPrimary)) {
      updatedPhotos[0].isPrimary = true;
    }
    setPhotos(updatedPhotos);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newPhotos = [...photos];
    const draggedPhoto = newPhotos[draggedIndex];
    newPhotos.splice(draggedIndex, 1);
    newPhotos.splice(index, 0, draggedPhoto);

    setPhotos(newPhotos);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const qualityTips = [
    'Face clearly visible in good lighting',
    'Mix of portrait and full-body shots',
    'Show your personality and interests',
    'Recent photos (within last year)',
    'No group shots as primary photo',
    'Avoid heavy filters or excessive editing',
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <TopBar title="Add Photos" onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Header */}
          <div>
            <h2 className="mb-2">Show your best self</h2>
            <p className="text-[var(--text-callout)] text-text-secondary">
              Add {minPhotos}–{maxPhotos} photos. Your first photo is what others see first.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="space-y-3">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`relative bg-surface rounded-[var(--radius-md)] overflow-hidden border-2 transition-all ${
                  draggedIndex === index
                    ? 'border-accent scale-[0.98] opacity-50'
                    : 'border-divider'
                }`}
              >
                {/* Photo */}
                <div className="aspect-[4/5] relative">
                  <img
                    src={photo.url}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Primary Badge */}
                  {photo.isPrimary && (
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-accent text-accent-foreground text-[var(--text-caption)] font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Primary
                    </div>
                  )}

                  {/* Drag Handle */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-5 h-5 text-white" />
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="absolute bottom-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-error transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  {/* Position Indicator */}
                  <div className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[var(--text-caption)] font-medium">
                    #{index + 1}
                  </div>
                </div>
              </div>
            ))}

            {/* Add Photo Button */}
            {photos.length < maxPhotos && (
              <button
                onClick={handleAddPhoto}
                className="w-full aspect-[4/5] rounded-[var(--radius-md)] border-2 border-dashed border-divider bg-surface hover:bg-elevated-surface hover:border-accent transition-all flex flex-col items-center justify-center gap-3"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-accent" />
                </div>
                <div className="text-center">
                  <p className="text-[var(--text-callout)] font-semibold text-text-primary">
                    Add Photo
                  </p>
                  <p className="text-[var(--text-footnote)] text-text-muted">
                    {photos.length}/{maxPhotos} added
                  </p>
                </div>
              </button>
            )}
          </div>

          {/* Quality Tips */}
          <button
            onClick={() => setShowTips(!showTips)}
            className="w-full p-4 rounded-[var(--radius-md)] bg-accent/10 border border-accent/20 flex items-start gap-3 text-left hover:bg-accent/15 transition-colors"
          >
            <Info className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-[var(--text-callout)] font-semibold text-text-primary mb-1">
                Photo Quality Tips
              </p>
              {showTips ? (
                <ul className="space-y-1.5 mt-2">
                  {qualityTips.map((tip, idx) => (
                    <li
                      key={idx}
                      className="text-[var(--text-footnote)] text-text-secondary flex items-start gap-2"
                    >
                      <span className="text-accent mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[var(--text-footnote)] text-text-secondary">
                  Tap to see tips for great photos
                </p>
              )}
            </div>
          </button>

          {/* Progress Indicator */}
          {!canContinue && (
            <div className="p-4 rounded-[var(--radius-md)] bg-surface border border-divider">
              <p className="text-[var(--text-callout)] text-text-secondary text-center">
                Add {minPhotos - photos.length} more {minPhotos - photos.length === 1 ? 'photo' : 'photos'} to continue
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-4 border-t border-divider bg-surface">
        <Button
          variant="primary"
          size="large"
          disabled={!canContinue}
          onClick={() => onContinue(photos)}
        >
          Continue
        </Button>
        {canContinue && photos.length < maxPhotos && (
          <p className="text-[var(--text-footnote)] text-text-muted text-center mt-2">
            You can add {maxPhotos - photos.length} more {maxPhotos - photos.length === 1 ? 'photo' : 'photos'}
          </p>
        )}
      </div>
    </div>
  );
}
