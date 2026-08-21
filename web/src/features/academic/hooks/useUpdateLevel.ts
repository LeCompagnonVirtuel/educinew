import { useState } from 'react';
import type { UpdateLevelRequest, Level } from '../types';

export function useUpdateLevel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string, data: UpdateLevelRequest): Promise<Level | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/academic/levels/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || 'Erreur lors de la mise à jour');
      }
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}
