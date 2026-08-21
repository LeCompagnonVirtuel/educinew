import { useState, useEffect } from 'react';

export function useAttendanceDashboard(date?: string) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const params = date ? `?date=${date}` : '';
        const response = await fetch(`/api/attendance/dashboard${params}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [date]);

  return { data, loading, error };
}
