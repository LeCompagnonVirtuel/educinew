import { useState } from 'react';

export function useExamImport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const importMarks = async (data: Record<string, unknown>): Promise<any> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/exams/import', {
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

  return { importMarks, loading, error };
}
