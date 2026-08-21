import { useState, useCallback } from 'react';
import type { SyncMessages } from '../types';

export function useSyncMessages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SyncMessages | null>(null);

  const sync = async (schoolId: string, lastSync?: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const params = new URLSearchParams({ schoolId });
      if (lastSync) params.append('lastSync', lastSync);
      const response = await fetch(`/api/messages/sync?${params.toString()}`);
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { sync, data, loading, error };
}
