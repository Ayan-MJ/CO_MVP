import React from 'react';
import { Camera, RotateCcw, X, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/Button';

interface VerificationCaptureScreenProps {
  onBack: () => void;
  onPhotoTaken: (photoData: string) => void;
}

export function VerificationCaptureScreen({ onBack, onPhotoTaken }: VerificationCaptureScreenProps) {
  const [currentPose, setCurrentPose] = React.useState<'neutral' | 'smile'>('neutral');
  const [capturedPhoto, setCapturedPhoto] = React.useState<string | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const poses = [
    {
      id: 'neutral',
      title: 'Look straight at camera',
      instruction: 'Position your face in the frame with a neutral expression',
    },
    {
      id: 'smile',
      title: 'Now smile',
      instruction: 'Keep your face in the same position and smile naturally',
    },
  ];

  const currentPoseData = poses.find((p) => p.id === currentPose);

  const simulateCapture = () => {
    setIsProcessing(true);
    // Simulate camera capture
    setTimeout(() => {
      // Create a mock photo (in real app, this would be actual camera data)
      setCapturedPhoto('mock-photo-data');
      setIsProcessing(false);
    }, 500);
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    setCurrentPose('neutral');
  };

  const handleConfirm = () => {
    if (capturedPhoto) {
      onPhotoTaken(capturedPhoto);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-divider">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
        >
          <X className="w-6 h-6 text-text-primary" />
        </button>
        <h3 className="text-[var(--text-body)] font-semibold text-text-primary">
          Photo Verification
        </h3>
        <div className="w-10" />
      </div>

      {/* Camera View */}
      <div className="flex-1 relative bg-black">
        {!capturedPhoto ? (
          <>
            {/* Mock Camera View */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[280px] h-[280px]">
                {/* Face Oval Guide */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 280 280"
                  fill="none"
                >
                  <ellipse
                    cx="140"
                    cy="140"
                    rx="100"
                    ry="130"
                    stroke="white"
                    strokeWidth="3"
                    strokeDasharray="8 4"
                    opacity="0.8"
                  />
                </svg>

                {/* Center Circle for positioning */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white opacity-50" />

                {/* Mock Face Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Camera className="w-24 h-24 text-white" />
                </div>
              </div>
            </div>

            {/* Instruction Overlay */}
            <div className="absolute top-8 left-4 right-4">
              <div className="bg-black/70 backdrop-blur-sm rounded-[var(--radius-md)] p-4 text-center">
                <h3 className="text-[var(--text-callout)] font-semibold text-white mb-1">
                  {currentPoseData?.title}
                </h3>
                <p className="text-[var(--text-footnote)] text-white/80">
                  {currentPoseData?.instruction}
                </p>
              </div>
            </div>

            {/* Pose Progress */}
            <div className="absolute top-32 left-1/2 -translate-x-1/2 flex gap-2">
              {poses.map((pose, idx) => (
                <div
                  key={pose.id}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentPose === pose.id
                      ? 'bg-accent w-6'
                      : idx < poses.findIndex((p) => p.id === currentPose)
                      ? 'bg-success'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Captured Photo Preview */}
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="w-[280px] h-[280px] bg-surface/20 rounded-[var(--radius-md)] flex items-center justify-center">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-3" />
                  <p className="text-white text-[var(--text-callout)] font-medium">
                    Photo captured
                  </p>
                  <p className="text-white/60 text-[var(--text-footnote)]">
                    Review your photo below
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="bg-background p-6 space-y-4">
        {!capturedPhoto ? (
          <>
            {/* Tips */}
            <div className="bg-surface rounded-[var(--radius-sm)] p-3 border border-divider">
              <p className="text-[var(--text-caption)] text-text-muted text-center">
                💡 Make sure your face is well-lit and clearly visible
              </p>
            </div>

            {/* Capture Button */}
            <button
              onClick={simulateCapture}
              disabled={isProcessing}
              className={`
                w-20 h-20 mx-auto flex items-center justify-center
                rounded-full bg-accent shadow-lg
                ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:scale-95'}
                transition-all
              `}
            >
              <div className="w-16 h-16 rounded-full border-4 border-accent-foreground" />
            </button>

            <p className="text-[var(--text-caption)] text-text-muted text-center">
              {isProcessing ? 'Processing...' : 'Tap to capture'}
            </p>
          </>
        ) : (
          <div className="space-y-3">
            <Button variant="primary" size="large" onClick={handleConfirm}>
              Use This Photo
            </Button>
            <Button variant="secondary" onClick={handleRetake}>
              <RotateCcw className="w-5 h-5" />
              Retake Photo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
