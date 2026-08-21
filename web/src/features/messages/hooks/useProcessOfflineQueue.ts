import { useState } from 'react';

export function useProcessOfflineQueue(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const process = async (schoolId: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/messages/offline-queue/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolId }),
      });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { process, loading, error };
}
