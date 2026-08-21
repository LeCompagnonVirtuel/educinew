import { useState } from 'react';

export function useExamPublication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const publish = async (data: Record<string, unknown>): Promise<any> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/exams/publish', {
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

  return { publish, loading, error };
}
