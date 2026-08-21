import { useState } from 'react';

export function useArchiveTeacher() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const archive = async (id: string, reason?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/teachers/${id}/archive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || 'Erreur lors de l\'archivage');
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { archive, loading, error };
}
