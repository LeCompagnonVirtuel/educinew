import { useState } from 'react';
import type { CreateLevelRequest, Level } from '../types';

export function useCreateLevel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: CreateLevelRequest): Promise<Level | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/academic/levels', {
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
