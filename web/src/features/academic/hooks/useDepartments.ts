import { useState, useEffect } from 'react';
import type { Department } from '../types';

export function useDepartments(schoolId: string) {
  const [data, setData] = useState<Department[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/academic/departments?schoolId=${schoolId}`);
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [schoolId]);

  return { data, loading, error };
}