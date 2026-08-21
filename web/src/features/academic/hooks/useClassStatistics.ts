import { useState, useEffect } from 'react';
import type { AcademicStatistics } from '../types';

export function useClassStatistics(schoolId: string) {
  const [data, setData] = useState<AcademicStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/academic/classes/statistics?schoolId=${schoolId}`);
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
