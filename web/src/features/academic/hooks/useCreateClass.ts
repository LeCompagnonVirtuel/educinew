import { useState } from 'react';
import type { CreateClassRequest, SchoolClass } from '../types';

export function useCreateClass() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: CreateClassRequest): Promise<SchoolClass | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/academic/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || 'Erreur lors de la création');
      }
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
}
