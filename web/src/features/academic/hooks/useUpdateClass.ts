import { useState } from 'react';
import type { UpdateClassRequest, SchoolClass } from '../types';

export function useUpdateClass() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string, data: UpdateClassRequest): Promise<SchoolClass | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/academic/classes/${id}`, {
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
