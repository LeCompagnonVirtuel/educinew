import { useState, useEffect } from 'react';
import type { AttendanceNotification } from '../types';

export function useAttendanceNotifications(schoolId: string, recipientId: string) {
  const [data, setData] = useState<AttendanceNotification[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ schoolId, recipientId });
        const response = await fetch(`/api/attendance/notifications?${params}`);
        if (!response.ok) throw new Error('Erreur');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [schoolId, recipientId]);

  return { data, loading, error };
}
