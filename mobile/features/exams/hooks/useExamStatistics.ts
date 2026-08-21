import { useState, useEffect, useCallback } from 'react';

export default function useExamStatistics(examId: string | null) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback((newData: any) => {
    setData(newData);
  }, []);

  useEffect(() => {
    if (!examId) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/exams/${examId}/statistics`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [examId]);

  return { data, loading, error, mutate };
}
