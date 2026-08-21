import { useState, useCallback } from 'react';

export default function useDeleteDiscount() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (discountId?: string) => {
    if (!discountId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/finance/discounts/${discountId}`, {
        method: 'DELETE',
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
