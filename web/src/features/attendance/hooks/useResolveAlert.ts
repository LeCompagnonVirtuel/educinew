import { useState } from 'react';

export function useResolveAlert() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolve = async (id: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/attendance/alerts/${id}/resolve`, { method: 'POST' });
      if (!response.ok) throw new Error('Erreur');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { resolve, loading, error };
}
