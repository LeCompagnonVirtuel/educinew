import { useState } from 'react';
import type { CreateSectionRequest, Section } from '../types';

export function useCreateSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: CreateSectionRequest): Promise<Section | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/academic/sections', {
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
