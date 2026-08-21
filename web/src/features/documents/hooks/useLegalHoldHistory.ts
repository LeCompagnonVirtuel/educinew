'use client';
import { useState, useCallback, useEffect } from 'react';
export function useLegalHoldHistory(holdId?: string) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const params = holdId ? new URLSearchParams({ holdId }) : '';
      const result = await fetch(`/api/documents/legal-holds/history${params ? `?${params}` : ''}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred');
    } finally { setLoading(false); }
  }, [holdId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error, refetch: fetchData };
}
