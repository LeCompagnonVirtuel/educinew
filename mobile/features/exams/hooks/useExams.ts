import { useState, useEffect, useCallback } from 'react';

export default function useExams(filters: Record<string, string> = {}) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback((newData: any[]) => {
    setData(newData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`/api/exams?${params.toString()}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result.data || result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [JSON.stringify(filters)]);

  return { data, loading, error, mutate };
}
