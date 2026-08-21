import { useState, useEffect } from 'react';
import type { Level } from '../types';

export function useLevels(schoolId: string) {
  const [data, setData] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLevels = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/academic/levels?schoolId=${schoolId}`);
        if (!response.ok) throw new Error('Niveaux introuvables');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, [schoolId]);

  return { data, loading, error };
}
