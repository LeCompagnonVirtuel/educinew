import { useState, useCallback } from 'react';

export default function useWaiveLateFee() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (lateFeeId?: string) => {
    if (!lateFeeId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/finance/late-fees/${lateFeeId}/waive`, {
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
