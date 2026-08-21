import { useState, useEffect } from 'react';
import type { Attendance } from '../types';

export function useTeacherAttendances(schoolId: string, filters?: Record<string, string>) {
  const [data, setData] = useState<Attendance[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId) { setLoading(false); return; }
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const params = new URLSearchParams({ schoolId });
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            params.append(key, value);
          });
        }
        const response = await fetch(`/api/attendance/teacher?${params.toString()}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [schoolId, filters]);

  return { data, loading, error };
}
