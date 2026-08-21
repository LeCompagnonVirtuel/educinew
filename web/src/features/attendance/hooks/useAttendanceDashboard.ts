import { useState, useEffect } from 'react';
import type { AttendanceDashboard } from '../types';

export function useAttendanceDashboard(schoolId: string, date?: string) {
  const [data, setData] = useState<AttendanceDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ schoolId });
        if (date) params.append('date', date);
        const response = await fetch(`/api/attendance/dashboard?${params}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [schoolId, date]);

  return { data, loading, error };
}
