import { useState, useEffect } from 'react';
import type { AttendanceTimeline } from '../types';

export function useAttendanceTimeline(schoolId: string, studentId?: string) {
  const [data, setData] = useState<AttendanceTimeline | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ schoolId });
        if (studentId) params.append('studentId', studentId);
        const response = await fetch(`/api/attendance/timeline?${params}`);
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
  }, [schoolId, studentId]);

  return { data, loading, error };
}
