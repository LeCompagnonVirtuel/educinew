import { useState, useEffect } from 'react';

export function useSemesterAverage(studentId: string | null, classId: string | null, semester: number | null, academicYearId: string | null) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId || !classId || !semester || !academicYearId) { setLoading(false); return; }
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const params = new URLSearchParams({ studentId, classId, semester: String(semester), academicYearId });
        const response = await fetch(`/api/exams/averages/semester?${params}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [studentId, classId, semester, academicYearId]);

  return { data, loading, error };
}
