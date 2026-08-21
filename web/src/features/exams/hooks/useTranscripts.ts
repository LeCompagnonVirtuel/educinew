import { useState, useEffect } from 'react';

export function useTranscripts(schoolId: string, academicYearId?: string) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId) { setLoading(false); return; }
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const params = new URLSearchParams({ schoolId });
        if (academicYearId) params.append('academicYearId', academicYearId);
        const response = await fetch(`/api/exams/transcripts?${params.toString()}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [schoolId, academicYearId]);

  return { data, loading, error };
}
