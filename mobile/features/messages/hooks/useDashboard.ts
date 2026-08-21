import { useState, useEffect, useCallback } from 'react';

export function useDashboard() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/messages/dashboard');
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const mutate = useCallback(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, loading, error, mutate };
}
