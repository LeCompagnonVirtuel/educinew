import { useState } from 'react';

export function useValidateGPS() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = async (studentId: string, lat: number, lng: number): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/gps/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, lat, lng }),
      });
      if (!response.ok) throw new Error('Erreur');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { validate, loading, error };
}
