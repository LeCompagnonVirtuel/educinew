import { useState } from 'react';

export function useSendBroadcast(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (broadcastId: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/messages/broadcasts/${broadcastId}/send`, { method: 'POST' });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { send, loading, error };
}
