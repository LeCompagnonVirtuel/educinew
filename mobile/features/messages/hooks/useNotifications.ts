import { useState, useEffect, useCallback } from 'react';

export function useNotifications(userId: string | null, params: Record<string, string> = {}) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const searchParams = new URLSearchParams(params);
      const response = await fetch(`/api/messages/notifications?userId=${userId}&${searchParams.toString()}`);
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setData(result.data || result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [userId, JSON.stringify(params)]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const mutate = useCallback(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return { data, loading, error, mutate };
}
