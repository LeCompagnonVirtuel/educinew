import { useState, useEffect } from 'react';
import type { SchoolClass } from '../types';

export function useClass(id: string | null) {
  const [data, setData] = useState<SchoolClass | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchClass = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/academic/classes/${id}`);
        if (!response.ok) throw new Error('Classe introuvable');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [id]);

  return { data, loading, error };
}
