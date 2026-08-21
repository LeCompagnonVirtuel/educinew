import { useState } from 'react';

export function useExamPublish() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const publish = async (examId: string): Promise<any> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/exams/${examId}/publish`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Erreur');
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally { setLoading(false); }
  };

  const unpublish = async (examId: string): Promise<any> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/exams/${examId}/unpublish`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Erreur');
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally { setLoading(false); }
  };

  return { publish, unpublish, loading, error };
}
