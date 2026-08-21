import { useState } from 'react';

export function useDeleteAssignment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/academic/assignments/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression");
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
}
