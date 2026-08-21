import { useState, useEffect } from 'react';
import type { AcademicDashboard } from '../types';

export function useAcademicDashboard(schoolId: string) {
  const [data, setData] = useState<AcademicDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/academic/dashboard?schoolId=${schoolId}`);
        if (!response.ok) throw new Error('Tableau de bord introuvable');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [schoolId]);

  return { data, loading, error };
}
