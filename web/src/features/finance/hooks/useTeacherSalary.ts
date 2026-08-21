import { useState, useEffect, useCallback } from 'react';

export default function useTeacherSalary(teacherId?: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!teacherId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/finance/teachers/${teacherId}/salary`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [teacherId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, mutate: fetchData };
}
