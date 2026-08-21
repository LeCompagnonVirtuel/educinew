import { useState, useEffect } from 'react';
import type { AcademicEvent } from '../types';

export function useAcademicEvents(schoolId: string, academicYearId?: string) {
  const [data, setData] = useState<AcademicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ schoolId });
        if (academicYearId) params.append('academicYearId', academicYearId);
        const response = await fetch(`/api/academic/calendar?${params}`);
        if (!response.ok) throw new Error('Événements introuvables');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [schoolId, academicYearId]);

  return { data, loading, error };
}
