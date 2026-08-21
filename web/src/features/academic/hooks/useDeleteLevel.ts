import { useState } from 'react';

export function useDeleteLevel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/academic/levels/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || 'Erreur lors de la suppression');
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
}
