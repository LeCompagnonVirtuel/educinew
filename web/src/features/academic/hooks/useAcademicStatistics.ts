import { useState, useEffect } from 'react';
import type { AcademicStatistics } from '../types';

export function useAcademicStatistics(schoolId: string, academicYearId?: string) {
  const [data, setData] = useState<AcademicStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ schoolId });
        if (academicYearId) params.append('academicYearId', academicYearId);
        const response = await fetch(`/api/academic/statistics?${params}`);
        if (!response.ok) throw new Error('Statistiques introuvables');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [schoolId, academicYearId]);

  return { data, loading, error };
}
