import { useState } from 'react';

export function useValidateGPS() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ valid: boolean; distance?: number; radius?: number } | null>(null);

  const validate = async (studentId: string, latitude: number, longitude: number): Promise<{ valid: boolean; distance?: number; radius?: number }> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/gps/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId, latitude, longitude }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur de validation GPS');
      setResult(data);
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(msg);
      throw err;
    } finally { setLoading(false); }
  };

  return { validate, result, loading, error };
}
