import { useState } from 'react';
import type { Message } from '../types';

export function useMessageSearch() {
  const [data, setData] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (schoolId: string, query: string, filters?: Record<string, string>): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const params = new URLSearchParams({ schoolId, query });
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          params.append(key, value);
        });
      }
      const response = await fetch(`/api/messages/search?${params.toString()}`);
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { search, data, loading, error };
}
