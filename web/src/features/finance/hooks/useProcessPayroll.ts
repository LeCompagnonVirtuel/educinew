import { useState, useCallback } from 'react';

export default function useProcessPayroll() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (payrollId?: string) => {
    if (!payrollId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/finance/payroll/${payrollId}/process`, {
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
