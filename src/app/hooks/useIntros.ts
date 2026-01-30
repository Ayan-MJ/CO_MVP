import React from 'react';
import { IntroCardData } from '@/app/components/IntroCard';
import { fetchIntros } from '@/app/services/introService';

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong while loading introductions.';
};

export function useIntros() {
  const [intros, setIntros] = React.useState<IntroCardData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadIntros = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchIntros();
      setIntros(data);
    } catch (caught) {
      setError(getErrorMessage(caught));
      setIntros([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadIntros();
  }, [loadIntros]);

  return {
    intros,
    isLoading,
    error,
    refresh: loadIntros,
  };
}
