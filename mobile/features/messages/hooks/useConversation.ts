import { useState, useEffect, useCallback } from 'react';

export function useConversation(id: string | null) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConversation = useCallback(async () => {
    if (!id) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/messages/conversations/${id}`);
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  const mutate = useCallback(() => {
    fetchConversation();
  }, [fetchConversation]);

  return { data, loading, error, mutate };
}
