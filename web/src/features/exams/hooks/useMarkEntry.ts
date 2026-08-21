import { useState } from 'react';

export function useMarkEntry() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enter = async (data: Record<string, unknown>): Promise<any> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/exams/marks/enter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur');
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally { setLoading(false); }
  };

  return { enter, loading, error };
}
