export type VerificationOutcome = 'success' | 'failure' | 'manual-review';

export interface VerificationResponse {
  status: VerificationOutcome;
  message?: string;
}

export async function submitVerificationPhoto(photoData: string): Promise<VerificationResponse> {
  if (!photoData) {
    throw new Error('We could not read your photo. Please try again.');
  }

  await Promise.resolve();

  return {
    status: 'success',
  };
}
