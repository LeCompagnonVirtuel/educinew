import { useState, useEffect } from 'react';
import type { AcademicYear } from '../types';

export function useAcademicYear(id: string | null) {
  const [data, setData] = useState<AcademicYear | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchAcademicYear = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/academic/years/${id}`);
        if (!response.ok) throw new Error('Année académique introuvable');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicYear();
  }, [id]);

  return { data, loading, error };
}
