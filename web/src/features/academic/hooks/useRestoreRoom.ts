import { useState } from 'react';

export function useRestoreRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const restore = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/academic/rooms/${id}/restore`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error("Erreur lors de la restauration");
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { restore, loading, error };
}