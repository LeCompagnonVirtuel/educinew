import { useState, useEffect, useCallback } from 'react';

export default function useCashRegisterMovements(cashRegisterId?: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!cashRegisterId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/finance/cash-registers/${cashRegisterId}/movements`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [cashRegisterId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, mutate: fetchData };
}
