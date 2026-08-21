import { useState, useCallback } from 'react';

export default function useCancelPayment() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (paymentId?: string) => {
    if (!paymentId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/finance/payments/${paymentId}/cancel`, {
        method: 'POST',
      });
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, mutate };
}
