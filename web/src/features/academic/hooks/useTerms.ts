import { useState, useEffect } from 'react';
import type { Term } from '../types';

export function useTerms(academicYearId: string | null) {
  const [data, setData] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!academicYearId) {
      setLoading(false);
      return;
    }

    const fetchTerms = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/academic/years/${academicYearId}/terms`);
        if (!response.ok) throw new Error('Trimestres introuvables');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, [academicYearId]);

  return { data, loading, error };
}
