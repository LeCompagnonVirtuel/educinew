import { useState, useEffect } from 'react';

export function useEndSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const end = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/attendance/session/${id}/end`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Erreur');
      await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return { end, loading, error };
}
