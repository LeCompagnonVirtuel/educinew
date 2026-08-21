import { useState } from 'react';

export function useArchiveAcademicYear() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const archive = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/academic/years/${id}/archive`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error("Erreur lors de l'archivage");
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { archive, loading, error };
}
