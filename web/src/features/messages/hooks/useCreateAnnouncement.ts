import { useState } from 'react';
import type { Announcement } from '../types';

export function useCreateAnnouncement(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: Partial<Announcement>): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/messages/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { create, loading, error };
}
