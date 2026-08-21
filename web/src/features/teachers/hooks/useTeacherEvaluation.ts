import { useState, useEffect } from 'react';
import type { TeacherEvaluation } from '../types';

export function useTeacherEvaluation(teacherId: string | null) {
  const [data, setData] = useState<TeacherEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teacherId) {
      setLoading(false);
      return;
    }

    const fetchEvaluations = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/teachers/${teacherId}/evaluations`);
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluations();
  }, [teacherId]);

  return { data, loading, error };
}
