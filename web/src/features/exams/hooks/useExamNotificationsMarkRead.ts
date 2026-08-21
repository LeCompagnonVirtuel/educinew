import { useState } from 'react';

export function useExamNotificationsMarkRead() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markRead = async (id: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch(`/api/exams/notifications/${id}/read`, {
        method: 'PUT',
      });
      if (!response.ok) throw new Error('Erreur');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  const markAllRead = async (userId: string): Promise<void> => {
    setLoading(true); setError(null);
    try {
      const response = await fetch('/api/exams/notifications/read-all', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) throw new Error('Erreur');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally { setLoading(false); }
  };

  return { markRead, markAllRead, loading, error };
}
