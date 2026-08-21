import { useState, useEffect, useCallback } from 'react';

export default function useRevenues(schoolId?: string, filters?: Record<string, string>) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ schoolId });
      if (filters) Object.entries(filters).forEach(([k, v]) => params.set(k, v));
      const response = await fetch(`/api/finance/revenues?${params.toString()}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, filters]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, mutate: fetchData };
}
