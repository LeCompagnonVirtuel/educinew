import { useState, useEffect, useCallback } from 'react';

export function useMessages(conversationId: string | null, params: Record<string, string> = {}) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!conversationId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const searchParams = new URLSearchParams(params);
      const response = await fetch(`/api/messages/conversations/${conversationId}/messages?${searchParams.toString()}`);
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setData(result.data || result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [conversationId, JSON.stringify(params)]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const mutate = useCallback(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { data, loading, error, mutate };
}
