import { useState, useEffect } from 'react';
import type { AttendanceSettings } from '../types';

export function useAttendanceSettings(schoolId: string) {
  const [data, setData] = useState<AttendanceSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ schoolId });
        const response = await fetch(`/api/attendance/settings?${params}`);
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
  }, [schoolId]);

  return { data, loading, error };
}
