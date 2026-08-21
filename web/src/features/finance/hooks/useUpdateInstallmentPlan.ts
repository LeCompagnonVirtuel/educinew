import { useState, useCallback } from 'react';

export default function useUpdateInstallmentPlan() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async ({ planId, ...payload }: { planId?: string; [key: string]: unknown } = {}) => {
    if (!planId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/finance/installment-plans/${planId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
