import { useState } from 'react';

export function useRestoreTeacher() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const restore = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/teachers/${id}/restore`, { method: 'POST' });
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || 'Erreur lors de la restauration');
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { restore, loading, error };
}
