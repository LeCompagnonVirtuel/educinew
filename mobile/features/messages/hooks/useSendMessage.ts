import { useState, useCallback } from 'react';

export function useSendMessage(conversationId: string) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (payload: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/messages/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Erreur lors de l\'envoi');
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  const mutate = useCallback(() => {}, []);

  return { data, loading, error, mutate, sendMessage };
}
