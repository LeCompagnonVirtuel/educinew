import { useState, useEffect } from 'react';
import type { UnreadNotifications } from '../types';

export function useUnreadNotifications(schoolId: string | null) {
  const [data, setData] = useState<UnreadNotifications | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId) { setLoading(false); return; }
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const response = await fetch(`/api/messages/notifications/unread?schoolId=${schoolId}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [schoolId]);

  return { data, loading, error };
}
