import { useState, useEffect } from 'react';
import type { TeacherAssignment } from '../types';

export function useTeacherAssignments(teacherId: string | null) {
  const [data, setData] = useState<TeacherAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teacherId) {
      setLoading(false);
      return;
    }

    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/teachers/${teacherId}/assignments`);
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [teacherId]);

  return { data, loading, error };
}
