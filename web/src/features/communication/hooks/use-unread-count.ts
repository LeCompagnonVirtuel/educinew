'use client';
import { useState, useCallback, useEffect } from 'react';

export function useUnreadCount(schoolId?: string, userId?: string) {
  const [data, setData] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId || !userId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(`/api/communication/messages/unread-count?schoolId=${schoolId}&userId=${userId}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, userId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
