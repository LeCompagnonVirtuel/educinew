import { useState, useEffect, useMemo } from 'react';
import type { Attendance } from '../types';

export function useTeacherAttendances(schoolId: string, filters?: Record<string, string>) {
  const [data, setData] = useState<Attendance[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filtersKey = useMemo(() => JSON.stringify(filters || {}), [filters]);

  useEffect(() => {
    if (!schoolId) { setLoading(false); return; }
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const params = new URLSearchParams({ schoolId });
        const parsed = JSON.parse(filtersKey);
        Object.entries(parsed).forEach(([key, value]) => {
          params.append(key, value as string);
        });
        const response = await fetch(`/api/attendance/teacher?${params.toString()}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [schoolId, filtersKey]);

  return { data, loading, error };
}
