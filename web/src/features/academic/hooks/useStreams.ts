import { useState, useEffect } from 'react';
import type { Stream } from '../types';

export function useStreams(schoolId: string) {
  const [data, setData] = useState<Stream[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreams = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/academic/streams?schoolId=${schoolId}`);
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchStreams();
  }, [schoolId]);

  return { data, loading, error };
}
