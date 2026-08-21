import { useState, useEffect } from 'react';
import type { Subject } from '../types';

export function useSubject(id: string | null) {
  const [data, setData] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchSubject = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/academic/subjects/${id}`);
        if (!response.ok) throw new Error('Matière introuvable');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  return { data, loading, error };
}
