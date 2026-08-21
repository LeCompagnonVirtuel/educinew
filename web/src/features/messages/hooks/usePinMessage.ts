import { useState } from 'react';

export function usePinMessage(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pin = async (id: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/messages/${id}/pin`, { method: 'POST' });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  const unpin = async (id: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/messages/${id}/unpin`, { method: 'POST' });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { pin, unpin, loading, error };
}
