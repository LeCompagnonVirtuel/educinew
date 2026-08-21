import { useState, useEffect, useCallback } from 'react';

export default function usePayment(paymentId?: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!paymentId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/finance/payments/${paymentId}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [paymentId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, mutate: fetchData };
}
