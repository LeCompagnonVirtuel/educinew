import { useState } from 'react';
import type { SyncConversations } from '../types';

export function useSyncConversations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SyncConversations | null>(null);

  const sync = async (schoolId: string, lastSync?: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const params = new URLSearchParams({ schoolId });
      if (lastSync) params.append('lastSync', lastSync);
      const response = await fetch(`/api/messages/sync/conversations?${params.toString()}`);
      if (!response.ok) throw new Error('Erreur');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { sync, data, loading, error };
}
