import { useState } from 'react';

export function useExamLock() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lock = async (examId: string): Promise<any> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/exams/${examId}/lock`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Erreur');
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally { setLoading(false); }
  };

  const unlock = async (examId: string): Promise<any> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/exams/${examId}/unlock`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Erreur');
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally { setLoading(false); }
  };

  return { lock, unlock, loading, error };
}
