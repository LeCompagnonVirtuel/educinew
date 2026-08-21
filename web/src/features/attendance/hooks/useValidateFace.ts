import { useState } from 'react';

export function useValidateFace() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = async (studentId: string, imageUrl: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/face/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, imageUrl }),
      });
      if (!response.ok) throw new Error('Erreur');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { validate, loading, error };
}
