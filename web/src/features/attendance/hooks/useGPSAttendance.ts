import { useState } from 'react';

export function useGPSAttendance() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const checkIn = async (studentId: string, latitude: number, longitude: number): Promise<any> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/gps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId, latitude, longitude }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Erreur pointage GPS');
      setData(result);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(msg);
      throw err;
    } finally { setLoading(false); }
  };

  return { checkIn, data, loading, error };
}
