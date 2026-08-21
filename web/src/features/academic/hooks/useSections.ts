import { useState, useEffect } from 'react';
import type { Section } from '../types';

export function useSections(schoolId: string) {
  const [data, setData] = useState<Section[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/academic/sections?schoolId=${schoolId}`);
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [schoolId]);

  return { data, loading, error };
}
