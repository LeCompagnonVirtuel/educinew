import { useState } from 'react';

export function useMarkAsRead(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markAsRead = async (messageId: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/messages/${messageId}/read`, { method: 'POST' });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { markAsRead, loading, error };
}
