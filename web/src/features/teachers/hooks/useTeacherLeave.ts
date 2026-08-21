import { useState, useEffect } from 'react';
import type { TeacherLeave } from '../types';

export function useTeacherLeave(teacherId: string | null) {
  const [data, setData] = useState<TeacherLeave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teacherId) {
      setLoading(false);
      return;
    }

    const fetchLeaves = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/teachers/${teacherId}/leave`);
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [teacherId]);

  return { data, loading, error };
}
