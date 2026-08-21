import { useState } from 'react';

export function useValidateQR() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = async (sessionId: string, studentId: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/qr/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, studentId }),
      });
      if (!response.ok) throw new Error('Erreur');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { validate, loading, error };
}
