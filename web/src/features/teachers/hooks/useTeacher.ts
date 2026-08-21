import { useState, useEffect } from 'react';
import type { Teacher } from '../types';

export function useTeacher(id: string | null) {
  const [data, setData] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchTeacher = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/teachers/${id}`);
        if (!response.ok) throw new Error('Enseignant introuvable');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  return { data, loading, error };
}
