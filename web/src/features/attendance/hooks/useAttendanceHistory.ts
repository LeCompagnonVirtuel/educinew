import { useState, useEffect } from 'react';
import type { AttendanceHistory } from '../types';

export function useAttendanceHistory(schoolId: string, studentId?: string) {
  const [data, setData] = useState<AttendanceHistory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        let url = `/api/attendance/history?schoolId=${schoolId}`;
        if (studentId) url += `&studentId=${studentId}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [schoolId, studentId]);

  return { data, loading, error };
}
