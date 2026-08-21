import { useState, useEffect } from 'react';
import type { TeacherAvailability } from '../types';

export function useTeacherAvailability(teacherId: string | null) {
  const [data, setData] = useState<TeacherAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teacherId) {
      setLoading(false);
      return;
    }

    const fetchAvailability = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/teachers/${teacherId}/availability`);
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [teacherId]);

  return { data, loading, error };
}
