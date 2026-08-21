import { useState } from 'react';

export function useRejectCorrection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reject = async (id: string, reviewNote?: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/attendance/correction/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewNote }),
      });
      if (!response.ok) throw new Error('Erreur');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { reject, loading, error };
}
