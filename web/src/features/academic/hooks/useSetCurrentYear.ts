import { useState } from 'react';

export function useSetCurrentYear() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setCurrent = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/academic/years/${id}/set-current`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error("Erreur lors de la définition de l'année courante");
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { setCurrent, loading, error };
}
