import { useState } from 'react';
import type { AcademicYear } from '../types';

export function useUpdateAcademicYear() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: string, data: Partial<AcademicYear>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/academic/years/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour');
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
