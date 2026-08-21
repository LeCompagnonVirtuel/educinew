'use client';
import { useState, useCallback, useEffect } from 'react';
export function useRetentionHistory(scheduleId?: string) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const params = scheduleId ? new URLSearchParams({ scheduleId }) : '';
      const result = await fetch(`/api/documents/retention/history${params ? `?${params}` : ''}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred');
    } finally { setLoading(false); }
  }, [scheduleId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error, refetch: fetchData };
}
