'use client';
import { useState, useCallback, useEffect } from 'react';
import { Notification } from '../types';

export function useNotifications(schoolId?: string, userId?: string, read?: boolean) {
  const [data, setData] = useState<Notification[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (schoolId) params.append('schoolId', schoolId);
      if (userId) params.append('userId', userId);
      if (read !== undefined) params.append('read', read.toString());
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const result = await fetch(`/api/communication/notifications${queryString}`);
      const json = await result.json();
      if (!result.ok) throw new Error(json.error);
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, userId, read]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
