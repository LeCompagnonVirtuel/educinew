import { useState, useEffect } from 'react';
import type { TeacherStatistics } from '../types';

export function useTeacherStatistics(schoolId: string | null) {
  const [data, setData] = useState<TeacherStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId) {
      setLoading(false);
      return;
    }

    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/teachers/statistics?schoolId=${schoolId}`);
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [schoolId]);

  return { data, loading, error };
}
