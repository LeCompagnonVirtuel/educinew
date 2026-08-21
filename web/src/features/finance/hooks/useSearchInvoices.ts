import { useState, useEffect, useCallback } from 'react';

export default function useSearchInvoices(schoolId?: string, query?: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!schoolId || !query) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ q: query });
      const response = await fetch(`/api/finance/schools/${schoolId}/invoices/search?${params.toString()}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, query]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, mutate: fetchData };
}
