import { useState, useEffect } from 'react';

export function useAssessment(id: string | null) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const response = await fetch(`/api/exams/assessments/${id}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [id]);

  return { data, loading, error };
}
