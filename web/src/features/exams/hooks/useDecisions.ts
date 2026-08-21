import { useState, useEffect } from 'react';

export function useDecisions(schoolId: string, classId?: string, termId?: string) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId) { setLoading(false); return; }
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const params = new URLSearchParams({ schoolId });
        if (classId) params.append('classId', classId);
        if (termId) params.append('termId', termId);
        const response = await fetch(`/api/exams/decisions?${params.toString()}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [schoolId, classId, termId]);

  return { data, loading, error };
}
