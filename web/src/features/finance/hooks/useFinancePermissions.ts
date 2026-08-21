import { useState, useEffect, useCallback } from 'react';

export default function useFinancePermissions(userId?: string, userRole?: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!userId || !userRole) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ role: userRole });
      const response = await fetch(`/api/finance/users/${userId}/permissions?${params.toString()}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [userId, userRole]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, mutate: fetchData };
}
