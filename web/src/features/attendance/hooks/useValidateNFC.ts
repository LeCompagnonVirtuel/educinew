import { useState } from 'react';

export function useValidateNFC() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = async (sessionId: string, deviceId: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/attendance/nfc/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, deviceId }),
      });
      if (!response.ok) throw new Error('Erreur');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { validate, loading, error };
}
