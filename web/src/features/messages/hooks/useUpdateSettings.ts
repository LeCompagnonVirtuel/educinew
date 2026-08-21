import { useState } from 'react';
import type { Settings } from '../types';

export function useUpdateSettings(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (schoolId: string, data: Partial<Settings>): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/messages/settings?schoolId=${schoolId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { update, loading, error };
}
