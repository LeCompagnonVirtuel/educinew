import { useState, useEffect, useCallback } from 'react';

export function useConversations(params: Record<string, string> = {}) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const searchParams = new URLSearchParams(params);
      const response = await fetch(`/api/messages/conversations?${searchParams.toString()}`);
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setData(result.data || result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const mutate = useCallback(() => {
    fetchConversations();
  }, [fetchConversations]);

  return { data, loading, error, mutate };
}
