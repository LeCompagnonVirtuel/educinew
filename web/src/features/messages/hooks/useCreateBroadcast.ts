import { useState } from 'react';
import type { Broadcast } from '../types';

export function useCreateBroadcast(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: Partial<Broadcast>): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/messages/broadcasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { create, loading, error };
}
