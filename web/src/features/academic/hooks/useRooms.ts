import { useState, useEffect } from 'react';
import type { Room, AcademicFilters } from '../types';

export function useRooms(schoolId: string, filters?: AcademicFilters) {
  const [data, setData] = useState<Room[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ schoolId });
        if (filters?.status !== undefined) {
          params.append('status', String(filters.status));
        }
        const response = await fetch(`/api/academic/rooms?${params}`);
        if (!response.ok) throw new Error('Erreur lors du chargement');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [schoolId, filters]);

  return { data, loading, error };
}