import { useState } from 'react';
import type { Message } from '../types';

export function useEditMessage(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const edit = async (id: string, data: Partial<Message>): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/messages/${id}`, {
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

  return { edit, loading, error };
}
