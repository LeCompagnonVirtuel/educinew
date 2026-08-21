import { useState, useEffect } from 'react';
import type { TimetableSlot, AcademicFilters } from '../types';

export function useTimetable(schoolId: string, filters?: AcademicFilters) {
  const [data, setData] = useState<TimetableSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ schoolId });
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              params.append(key, String(value));
            }
          });
        }
        const response = await fetch(`/api/academic/timetable?${params}`);
        if (!response.ok) throw new Error('Emploi du temps introuvable');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [schoolId, filters]);

  return { data, loading, error };
}
