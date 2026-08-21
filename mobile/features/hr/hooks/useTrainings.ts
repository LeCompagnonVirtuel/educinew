import { useState, useEffect, useCallback } from 'react';

export default function useTrainings(schoolId?: string, filters?: Record<string, unknown>) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ schoolId, ...filters } as Record<string, string>);
      const response = await fetch(`/api/hr/trainings?${params}`);
      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, filters]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, mutate: fetchData };
}