import { useState, useEffect } from 'react';
import type { AcademicYear } from '../types';

export function useAcademicYears(schoolId: string) {
  const [data, setData] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAcademicYears = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/academic/years?schoolId=${schoolId}`);
        if (!response.ok) throw new Error('Erreurs académiques introuvables');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicYears();
  }, [schoolId]);

  return { data, loading, error };
}
