import { useState } from 'react';
import type { Reaction } from '../types';

export function useAddReaction(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addReaction = async (messageId: string, data: Partial<Reaction>): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/messages/${messageId}/reactions`, {
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

  return { addReaction, loading, error };
}
