import { useState } from 'react';

export function useDeleteBroadcast(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/messages/broadcasts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { remove, loading, error };
}
