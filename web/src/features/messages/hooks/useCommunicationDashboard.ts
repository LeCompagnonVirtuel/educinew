import { useState, useEffect } from 'react';
import type { CommunicationDashboard } from '../types';

export function useCommunicationDashboard(schoolId: string | null, date?: string) {
  const [data, setData] = useState<CommunicationDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId) { setLoading(false); return; }
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const params = new URLSearchParams({ schoolId });
        if (date) params.append('date', date);
        const response = await fetch(`/api/messages/dashboard?${params.toString()}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally { setLoading(false); }
    };
    fetchData();
  }, [schoolId, date]);

  return { data, loading, error };
}
