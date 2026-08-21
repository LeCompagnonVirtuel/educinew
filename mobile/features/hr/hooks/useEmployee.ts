import { useState, useEffect, useCallback } from 'react';

export default function useEmployee(employeeId?: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!employeeId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/hr/employees/${employeeId}`);
      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, mutate: fetchData };
}