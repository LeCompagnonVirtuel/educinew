import { useState } from 'react';

export function useMarkNotificationRead() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markRead = async (id: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/attendance/notifications/${id}/read`, { method: 'POST' });
      if (!response.ok) throw new Error('Erreur');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { markRead, loading, error };
}
