import { useState, useEffect, useCallback } from 'react';

export default function useFinanceNotifications(userId?: string, schoolId?: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!userId || !schoolId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/finance/schools/${schoolId}/users/${userId}/notifications`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [userId, schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, mutate: fetchData };
}
