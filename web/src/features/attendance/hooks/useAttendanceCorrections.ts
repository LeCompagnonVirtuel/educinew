import { useState, useEffect } from 'react';
import type { AttendanceCorrection } from '../types';

export function useAttendanceCorrections(schoolId: string) {
  const [data, setData] = useState<AttendanceCorrection[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const response = await fetch(`/api/attendance/correction?schoolId=${schoolId}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [schoolId]);

  return { data, loading, error };
}
