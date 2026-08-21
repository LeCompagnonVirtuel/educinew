import { useState, useEffect } from 'react';
import type { AttendanceStatistics } from '../types';

export function useAttendanceStatistics(schoolId: string, academicYearId: string) {
  const [data, setData] = useState<AttendanceStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ schoolId, academicYearId });
        const response = await fetch(`/api/attendance/statistics?${params}`);
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
  }, [schoolId, academicYearId]);

  return { data, loading, error };
}
