import { useState } from 'react';

export function useApproveCorrection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const approve = async (id: string, reviewNote?: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/attendance/correction/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewNote }),
      });
      if (!response.ok) throw new Error('Erreur');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { approve, loading, error };
}
