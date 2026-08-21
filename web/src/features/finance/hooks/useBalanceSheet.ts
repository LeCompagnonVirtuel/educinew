import { useState, useEffect, useCallback } from 'react';

export default function useBalanceSheet(schoolId?: string, asOf?: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (asOf) params.append('asOf', asOf);
      const queryString = params.toString();
      const url = `/api/finance/schools/${schoolId}/balance-sheet${queryString ? `?${queryString}` : ''}`;
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, asOf]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, mutate: fetchData };
}
