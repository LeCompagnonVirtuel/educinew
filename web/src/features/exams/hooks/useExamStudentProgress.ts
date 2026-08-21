import { useState, useEffect } from 'react';

export function useExamStudentProgress(schoolId: string, studentId: string | null, academicYearId: string | null) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId || !studentId || !academicYearId) { setLoading(false); return; }
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const params = new URLSearchParams({ schoolId, studentId, academicYearId });
        const response = await fetch(`/api/exams/analytics/student-progress?${params}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [schoolId, studentId, academicYearId]);

  return { data, loading, error };
}
