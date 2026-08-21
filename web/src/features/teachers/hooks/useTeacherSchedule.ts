import { useState, useEffect } from 'react';
import type { TeacherSchedule } from '../types';

export function useTeacherSchedule(teacherId: string | null) {
  const [data, setData] = useState<TeacherSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teacherId) {
      setLoading(false);
      return;
    }

    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/teachers/${teacherId}/schedule`);
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [teacherId]);

  return { data, loading, error };
}
