import { useState } from 'react';
import type { AcademicSearch } from '../types';

export function useAcademicSearch() {
  const [data, setData] = useState<AcademicSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (schoolId: string, query: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ schoolId, query });
      const response = await fetch(`/api/academic/search?${params}`);
      if (!response.ok) throw new Error('Recherche échouée');
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, search };
}
