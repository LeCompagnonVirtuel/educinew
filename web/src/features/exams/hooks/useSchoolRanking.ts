import { useState, useEffect } from 'react';

export function useSchoolRanking(schoolId: string, academicYearId: string | null, termId?: string) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId || !academicYearId) { setLoading(false); return; }
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const params = new URLSearchParams({ schoolId, academicYearId });
        if (termId) params.append('termId', termId);
        const response = await fetch(`/api/exams/rankings/school?${params}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [schoolId, academicYearId, termId]);

  return { data, loading, error };
}
